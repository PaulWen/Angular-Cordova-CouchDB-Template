import {Logger} from "../logger";
import PouchDB from "pouchdb";
import {PouchDbDocument} from "./pouch_db_document";

/**
 * This abstract class is based on PouchDB and represents one CouchDB database.
 * It can be customized using generics so that it returns different types of document objects according to the database it
 * is managing.
 * This class already implements all the basic functions every database has to provide.
 *
 * This class is based on "async/await" instead of promises. Doing so makes it possible for the class to already handel any errors or merge conflicts.
 * Furthermore, the class already provides the result documents in the correct data type.
 */
export abstract class PouchDbDatabase<DocumentType extends PouchDbDocument<DocumentType>> {

////////////////////////////////////////////Properties////////////////////////////////////////////

    /** the class of the <DocumentType> in order to be able to create objects of this class */
    private documentCreator: {new (json: any): DocumentType;};

    // PouchDB objects representing the database
    /** object representing the original database on the server */
    private remoteDatabase: any;
    /** object representing the local replication of the database on the server */
    private localDatabase: any;

////////////////////////////////////////////Constructor////////////////////////////////////////////

    /**
     * Constructor of the class "PouchDbDatabase"
     *
     * @param documentCreator the class of the <DocumentType> in order to be able to create objects of this class
     * @param url to the original database
     */
    constructor(documentCreator: {new (json: any): DocumentType;}, url?:string) {
        this.documentCreator = documentCreator;

        if (url) {
            this.initializeDatabase(url);
        } else {
            this.remoteDatabase = null;
            this.localDatabase = null;
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
        this.localDatabase = new PouchDB('local');

        // sync the local and the remote database
        this.localDatabase.sync(this.remoteDatabase, {
            // sync in real-time
            live: true
        }).on('change', function (change) {
            Logger.debug("Something changed in the database.");
        }).on('error', function (error) {
            Logger.error(error);
        });
    }

    /**
     * This method returns an document with a specific id.
     *
     * @param id the id of the wanted document
     *
     * @return the wanted document or null if an error occurred
     */
    public async getDocument(id: string): Promise<DocumentType> {
        try {
            // load the wanted document from the database and save it in the right DocumentType
            return new this.documentCreator(await this.localDatabase.get(id));
        } catch (error) {
            Logger.error(error);
            return null;
        }
    }

    /**
     * This function returns all the documents included in the database listed in an array.
     *
     * @return all the documents included in the database listed in an array or null if an error occurred
     */
    public async getAllDocuments(): Promise<DocumentType[]> {
        try {
            var documentList: DocumentType[] = [];

            // load all the documents from the database
            var databaseResponse = await this.localDatabase.allDocs({
                include_docs: true,
                attachments: false
            });

            // put all the documents in a typed array
            for(var i: number = 0; i < databaseResponse.rows.length; i++) {
                documentList[i] = new this.documentCreator(databaseResponse.rows[i].doc);
            }

            // return all the documents in an array
            return documentList;
        } catch (error) {
            Logger.error(error);
            return null;
        }
    }

    /**
     * This method loads a document in the database.
     *
     * @param document the document that should get loaded in the database
     *
     * @return true if the operation was successfully or false in the case of an error
     */
    public async putDocument(document: DocumentType): Promise<boolean> {
        try {
            // upload the document
            await this.localDatabase.put(document.serializeToJsonObject());
            return true;
        } catch (error) {
            Logger.error(error);
            return false;
        }
    }

    /**
     * This function creates an new document from the type <DocumentType> in the database.
     *
     * @return the new created document or null if an error occurred
     */
    public async newDocument(): Promise<DocumentType> {
        try {
            // upload the updated user data
            var newDocument = await this.localDatabase.post({});

            // convert the new created document to the right object type
            return new this.documentCreator(newDocument);
        } catch (error) {
            Logger.error(error);
            return null;
        }
    }

    /**
     * This method marks a document as in the database.
     *
     * @param document the document that should get marked as deleted
     */
    public deleteDocument(document: DocumentType) {
        // delete document
        document._deleted = false;

        // upload document to the database
        this.putDocument(document);
    }
}