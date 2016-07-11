import {BoardDatabase} from "./board_database";
import {Database} from "../../utils/database";
import {BoardDocument} from "./board_document";

/**
 * This class gets used to get and set values from a specific board.
 * The class takes the database has the data source and also saves all changes right in the database.
 */
export class Board {

////////////////////////////////////////////Properties////////////////////////////////////////////

    private database: Database<BoardDocument>;
    private id: string;

////////////////////////////////////////////Constructor////////////////////////////////////////////

    /**
     *
     * @param database database which returns and manages BoardDataObjects
     * @param id
     */
    constructor(database: Database<BoardDocument>, id: string) {
        this.database = database;
        this.id = id;
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    public getId(): string {
        this.database.getDocument(this.id);
        return "";
    }

}