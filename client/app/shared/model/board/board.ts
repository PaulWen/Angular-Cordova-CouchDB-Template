import {Injectable} from "@angular/core";
import {Database} from "../database/database";

/**
 * This class gets used to get and set values from a specific board.
 * The class takes the database has the data source and also saves all changes right in the database.
 */
@Injectable()
export class Board {

////////////////////////////////////////////Properties////////////////////////////////////////////

    private database: Database;
    private id: string;

////////////////////////////////////////////Constructor////////////////////////////////////////////

    /**
     *
     * @param database database which retunrs and manages BoardDataObjects
     * @param id
     */
    constructor(database: Database, id: string) {
        this.database = database;
        this.id = id;
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    public getId(): string {
        this.database.getDocument(this.id);
        return "";
    }

}