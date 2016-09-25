import {Logger} from "../logger";
import PouchDB from "pouchdb";
import {PouchDbDocument} from "./pouch_db_document";
import {PouchDbLoaderInterface} from "./pouch_db_loader_interface";
import {PouchDbAllDocumentsView} from "./pouch_db_all_documents_view";
import ChangeListener = PouchDbDatabase.ChangeListener;

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
 * They should implement a specific {@link PouchDbLoaderInterface} which describes, what functions
 * the class that, implements this class, should provide.
 *
 * THEY ARE ONLY ALLOWED to provide functions for the purpose of GETTING documents out of the database and
 * provide them in the form of a specific {@link PouchDbDocument}.
 *
 * THEY ARE NOT ALLOWED to functions for adding new documents
 * or uploading documents to the database!! For those purposes the already implemented functions which this class
 * provides should get used!!
 */
export abstract class PouchDbDatabase<DocumentType extends PouchDbDocument<DocumentType>> implements PouchDbLoaderInterface<DocumentType> {

////////////////////////////////////////////Properties////////////////////////////////////////////

    /** the class of the <DocumentType> in order to be able to create objects of this class */
    private documentCreator: {new (json: any, database: PouchDbDatabase<DocumentType>): DocumentType;};

    // PouchDB objects representing the database
    /** object representing the original database on the server */
    private remoteDatabase: any;
    /** Object representing the database on the client side. This databse instance is
     * an replication of the database on the server and gets synced with that in real-time. */
    protected database: any;

    // lists of listeners
    /** dictionary which lists all the listeners listening to specific documents */
    private documentChangeListener: { [id: string] : PouchDbDatabase.ChangeListener[]};
    /** array of all listeners which wants to be notified if any document in the database changes */
    private allDocumentsChangeListener: PouchDbDatabase.ChangeListener[];

////////////////////////////////////////////Constructor////////////////////////////////////////////

    /**
     * Constructor of the class "PouchDbDatabase"
     *
     * @param documentCreator the class of the <DocumentType> in order to be able to create objects of this class
     * @param url to the original database
     */
    constructor(documentCreator: {new (json: any, database: PouchDbDatabase<DocumentType>): DocumentType;}, url?: string) {
        this.documentChangeListener = {};
        this.allDocumentsChangeListener = [];
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
            return new this.documentCreator(await this.database.get(id), this);
        } catch (error) {
            Logger.error(error);
            return null;
        }
    }

    public async getAllDocumentsView():Promise<PouchDbAllDocumentsView<DocumentType>> {
        return new PouchDbAllDocumentsView(await this.getAllDocuments(), this);
    }

    public async newDocument(): Promise<DocumentType> {
        try {
            // upload the updated user data
            let newDocument = await this.database.post({});

            // convert the new created document to the right object type
            return new this.documentCreator({
                _id: newDocument.id,
                _rev: newDocument.rev
            }, this);
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
        }).on('error', function (error) {
            Logger.error(error);
        });

        // register a change listener at the database that listens for ALL changes
        this.database.changes({
            live: true,
            since: "now",
            include_docs: true,
            limit: 1
        }).on('change', (function (change) {
            this.onChange(change.doc);
        }).bind(this)).on('error', function (error) {
            Logger.error(error);
        });
    }

    /**
     * This function returns all the documents included in the database listed in an array.
     *
     * @return all the documents included in the database listed in an array or null if an error occurred
     */
    private async getAllDocuments(): Promise<DocumentType[]> {
        try {
            let documentList: DocumentType[] = [];

            // load all the documents from the database
            let databaseResponse = await this.database.allDocs({
                include_docs: true,
                attachments: false
            });

            // put all the documents in a typed array
            for (let i: number = 0; i < databaseResponse.rows.length; i++) {
                documentList[i] = new this.documentCreator(databaseResponse.rows[i].doc, this);
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
     * This function allows to register a change listener which will be called whenever
     * a document in this database with a specific id changes.
     *
     * @param _id id of the document the listener wants to be notified about whenever it changes
     * @param changeListener the {@link PouchDbDatabase.ChangeListener} which will be called whenever the specific document changes
     */
    public registerDocumentChangeListener(_id: string, changeListener: PouchDbDatabase.ChangeListener) {
        // check if the document is not yet in this view present and has to be included
        if (this.documentChangeListener[_id] == undefined) {
            this.documentChangeListener[_id] = [changeListener];
        } else {
            this.documentChangeListener[_id].push(changeListener);
        }
    }


    /**
     * This function allows to register a change listener which will be called whenever
     * any document in this database changes.
     *
     * @param changeListener the {@link PouchDbDatabase.ChangeListener} which will be called whenever the specific document changes
     */
    public registerAllDocumentsChangeListener(changeListener: PouchDbDatabase.ChangeListener) {
        this.allDocumentsChangeListener.push(changeListener);
    }

    /**
     * This function unregisters all {@link PouchDbDatabase.ChangeListener} registers to this database.
     *
     * @param changeListener the {@link PouchDbDatabase.ChangeListener} that has to be unregistered
     */
    public unregisterChangeListener(changeListener: PouchDbDatabase.ChangeListener) {
        // remove the listener from {@link PouchDbDatabase#documentChangeListener}
        for (let key in this.documentChangeListener) {
            let index = this.documentChangeListener[key].indexOf(changeListener, 0);
            if (index > -1) {
                this.documentChangeListener[key].splice(index, 1);
            }
        }

        // remove the listener from {@link PouchDbDatabase#allDocumentsChangeListener}
        let index = this.allDocumentsChangeListener.indexOf(changeListener, 0);
        if (index > -1) {
            this.allDocumentsChangeListener.splice(index, 1);
        }
    }

    /**
     * This function gets called when ever any document in the database changes.
     * It notifies all registered change listeners.
     *
     * @param json a JSON object from the database which changed
     */
    private onChange(json: any) {
        // check if any changeListener is listening to this specific document
        if (this.documentChangeListener[json._id] !== undefined) {
            // notify all listeners that are specifically listening to the current document
            for (let changeListener of this.documentChangeListener[json._id]) {
                changeListener.onChange(json);
            }
        }

        // notify all listeners that are listening to all changes
        for (let changeListener of this.allDocumentsChangeListener) {
            changeListener.onChange(json);
        }
    }
}

//////////////////////////////////////////Inner Classes////////////////////////////////////////////

export module PouchDbDatabase {

    /**
     * This interface enables listeners to listen for changes in a document.
     * The function {@link ChangeListener#onChange} will be called whenever a document in the database
     * changes that the listener is interested in.
     */
    export interface ChangeListener {

        /**
         * This function takes a JSON object which changed and determines if it
         * has to be included in or excluded from this view by calling the function
         * {@link PouchDbDocumentView#onChange}.
         *
         * @param json the JSON object representing the document which changed in the database
         */
        onChange(json: any): void;
    }

}