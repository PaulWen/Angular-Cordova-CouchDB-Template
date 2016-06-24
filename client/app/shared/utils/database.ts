import {BoardDocument} from "../model/board/board_document";

/**
 * This class represents one CouchDB database.
 * It can be customized using generics so that it returns different types of document objects according to the database it
 * is managing.
 */
export class Database<DocumentType> {

////////////////////////////////////////////Properties////////////////////////////////////////////

    // PouchDB object representing the database
    private database: any;

////////////////////////////////////////////Constructor////////////////////////////////////////////

    /**
     * Constructor of the class "Database"
     *
     * @param url to the original database
     */
    constructor(url?:string) {
        if (url != null) {
            this.initializeDatabase(url);
        }
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    /**
     *
     * @param url to the original database
     */
    public initializeDatabase(url: string): void {

    }

    public getDocument(id: string): DocumentType {
        return null;
    }

    public newDocument(): DocumentType {
        return null;
    }
}