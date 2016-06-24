import {BoardDataObject} from "../board/board_data_object";

/**
 * This class represents one database.
 * It can be customized using generics so that it returns diffrent types of objects according to the database it
 * is managing.
 */
export class Database {

////////////////////////////////////////////Properties////////////////////////////////////////////

    // PouchDB object representing the database
    private database: any;

////////////////////////////////////////////Constructor////////////////////////////////////////////

    /**
     * Constructor of the class "Database"
     *
     * @param url to the original database
     */
    constructor(url: string) {

    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    public getDocument(id: string): BoardDataObject {
        return null;
    }

    public newDocument(): BoardDataObject {
        return null;
    }
}