import {Logger} from "../logger";
import PouchDB from "pouchdb";
import {PouchDbDocument} from "./pouch_db_document";
import {PouchDbDocumentLoaderInterface} from "./pouch_db_document_loader_interface";

/**
 * This abstract class is based on PouchDB and represents one CouchDB database.
 * It can be customized using generics so that it returns different types of document objects according to the database it
 * is managing.
 * This class already implements all the basic functions every database has to provide.
 *
 * This class is based on "async/await" instead of promises. Doing so makes it possible for the class to already handel any errors or merge conflicts.
 * Furthermore, the class already provides the result documents in the correct data type.
 *
 *
 *
 * HOW TO EXTEND FROM THIS CLASS:
 *
 * Classes that implement this class should represent databases for a specific {@link PouchDbDocument}.
 * They should implement a specific {@link PouchDbDocumentLoaderInterface} which describes, what functions
 * the class that, implements this class, should provide.
 *
 * THEY ARE ONLY ALLOWED to provide functions for the purpose of GETTING documents out of the database and
 * provide them in the form of a specific {@link PouchDbDocument}.
 *
 * THEY ARE NOT ALLOWED to functions for adding new documents
 * or uploading documents to the database!! For those purposes the already implemented functions which this class
 * provides should get used!!
 */
export abstract class PouchDbDatabase<DocumentType extends PouchDbDocument<DocumentType>> implements PouchDbDocumentLoaderInterface<DocumentType> {

////////////////////////////////////////////Properties////////////////////////////////////////////

    /** the class of the <DocumentType> in order to be able to create objects of this class */
    private documentCreator: {new (json: any, database: PouchDbDatabase<DocumentType>, changeListener: PouchDbDocument.ChangeListener): DocumentType;};

    // PouchDB objects representing the database
    /** object representing the original database on the server */
    private remoteDatabase: any;
    /** Object representing the database on the client side. This databse instance is
     * an replication of the database on the server and gets synced with that in real-time. */
    protected database: any;

////////////////////////////////////////////Constructor////////////////////////////////////////////

    /**
     * Constructor of the class "PouchDbDatabase"
     *
     * @param documentCreator the class of the <DocumentType> in order to be able to create objects of this class
     * @param url to the original database
     */
    constructor(documentCreator: {new (json: any, database: PouchDbDatabase<DocumentType>, changeListener: PouchDbDocument.ChangeListener): DocumentType;}, url?:string) {
        this.documentCreator = documentCreator;

        if (url) {
            this.initializeDatabase(url);
        } else {
            this.remoteDatabase = null;
            this.database = null;
        }
    }
////////////////////////////////////////Inherited Methods//////////////////////////////////////////

    public async getDocument(id: string): Promise<DocumentType> {
        try {
            // load the wanted document from the database and save it in the right DocumentType
            return this.createNewDocumentInstance(await this.database.get(id));
        } catch (error) {
            Logger.error(error);
            return null;
        }
    }

    public async getAllDocuments(): Promise<DocumentType[]> {
        try {
            let documentList: DocumentType[] = [];

            // load all the documents from the database
            let databaseResponse = await this.database.allDocs({
                include_docs: true,
                attachments: false
            });

            // put all the documents in a typed array
            for(let i: number = 0; i < databaseResponse.rows.length; i++) {
                documentList[i] = this.createNewDocumentInstance(databaseResponse.rows[i].doc);
            }

            // return all the documents in an array
            return documentList;
        } catch (error) {
            Logger.error(error);
            return null;
        }
    }

    public async newDocument(): Promise<DocumentType> {
        try {
            // upload the updated user data
            let newDocument = await this.database.post({});

            // convert the new created document to the right object type
            return await this.createNewDocumentInstance({
                _id: newDocument.id,
                _rev: newDocument.rev
            });
        } catch (error) {
            Logger.error(error);
            return null;
        }
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    /**
     * This function initializes the PouchDB database objects needed to build up a
     * connection to the CouchDB database. The local and the remote database get synced
     * in real-time.
     *
     * This function can also be used to change the URL of the database if necessary.
     *
     * @param url to the CouchDB database
     */
    public initializeDatabase(url: string): void {
        // create PouchDB database objects
        this.remoteDatabase = new PouchDB(url);
        this.database = new PouchDB('local');

        // sync the local and the remote database
        this.database.sync(this.remoteDatabase, {
            // sync in real-time
            live: true
        }).on('change', function (change) {
            Logger.debug("Something changed in the database.");
        }).on('error', function (error) {
            Logger.error(error);
        });
    }

    /**
     * This method loads a document in the database.
     *
     * @param json the document, which should get loaded in the database,  as an json object
     *
     * @return true if the operation was successfully or false in the case of an error
     */
    public async putDocument(json: any): Promise<boolean> {
        try {
            // upload the document
            await this.database.put(json);
            return true;
        } catch (error) {
            Logger.error(error);
            return false;
        }
    }

    /**
     * This function creates an new instance of {@link DocumentType} by taking a json object,
     * which represents the data of the object, as the input.
     *
     * @param json the data of the {@link DocumentType} that should get created
     * @return {DocumentType} the new document instance
     */
    private createNewDocumentInstance(json: any): DocumentType {
        // create a new change listener for the new object
        let changeListener: PouchDbDocument.ChangeListener = new PouchDbDocument.ChangeListener();

        Logger.debug(json._id);
        Logger.debug(json._idd);

        // register a change listener at the database
        this.database.changes({
            live: true,
            since: "now",
            include_docs: true,
            doc_ids: [json._id]
        }).on('change', function(change) {
            changeListener.change(change.doc);
        }).on('error', function (error) {
            Logger.error(error);
            return null;
        });

        // load the wanted document from the database and save it in the right DocumentType
        return new this.documentCreator(json, this, changeListener);
    }
}