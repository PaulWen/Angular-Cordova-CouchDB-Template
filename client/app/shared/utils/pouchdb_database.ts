import {BoardDocument} from "../databases/board/board_document";
import {Logger} from "./logger";
import PouchDB from "pouchdb";
import {DocumentList} from "pouchdb";

/**
 * This class represents one CouchDB database.
 * It can be customized using generics so that it returns different types of document objects according to the database it
 * is managing.
 *
 * This class is based on "await" instead of promises. Doing so makes it possible for the class to already handel any errors or merge conflicts.
 * Furthermore, the class already provides the result documents in the correct data type.
 */
export class PouchDbDatabase<DocumentType> {

////////////////////////////////////////////Properties////////////////////////////////////////////

    // PouchDB objects representing the database
    /** object representing the original database on the server */
    private remoteDatabase: any;
    /** object representing the local replication of the database on the server */
    private localDatabase: any;

////////////////////////////////////////////Constructor////////////////////////////////////////////

    /**
     * Constructor of the class "PouchDbDatabase"
     *
     * @param url to the original database
     */
    constructor(url?:string) {
        if (url != null) {
            this.initializeDatabase(url);
        } else {
            this.remoteDatabase = null;
            this.localDatabase = null;
        }
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    /**
     *
     * @param url to the original database
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
     * Example:
     *  // if request was successful try to update the first name
     *  XX.then((doc)=>{
     *      return <DocumentType>doc;
     *  })
     *  //if there was an error, return the error code
     *  .catch(function(error) {
     *      Logger.error(error);
     *  });
     *
     *
     *
     * @param id the id of the wanted document
     *
     * @return a promise which will return the wanted document
     */
    public getDocument(id: string): Promise<DocumentType> {
        return this.localDatabase.get(id);
    }

    /**
     * This function returns all the ids of the documents included in the database.
     *
     *
     * Example:
     *  XX.then(function (result) {
     *       // handle result
     *  }).catch(function (error) {
     *      Logger.error(error);
     *  });
     *
     *
     * @return a promise which will return an object which includes all the ids of the the documents included in the database
     */
    public getAllDocumentIDs(): Promise<DocumentList> {
        return this.localDatabase.allDocs({
            include_docs: false,
            attachments: false
        });
    }

    /**
     * This method loads a document in the database.
     *
     *
     * Example:
     *  // give feedback to the user whether or not setting a new first name was successful
     *  XX.then((response) => {
     *      if (response.ok == true) {
     *           res.sendStatus(200);
     *      }
     *  })
     *  .catch(function(error) {
     *      res.sendStatus(500);
     *  });
     *
     *
     *
     * @param doc the document that should get loaded in the database
     *
     * @return a promise which will return whether or not the operation was successful
     */
    public putDocument(doc: DocumentType): Promise<DocumentList> {
        // upload the updated user data
        return this.localDatabase.put(doc);
    }

    public newDocument(): DocumentType {
        return null;
    }

    /**
     * This method deletes a document in the database by setting the doc._deleted flag to true.
     *
     * @param doc the document that should get deleted from the the database
     *
     * @return a promise which will return whether or not the operation was successful
     */
    public removeDocument(doc: DocumentType): Promise<DocumentList> {
        // delete document
        return this.localDatabase.remove(doc);
    }
}