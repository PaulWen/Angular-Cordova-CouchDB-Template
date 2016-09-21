import {PouchDbDatabase} from "../../utils/pouch_db/pouch_db_database";
import {BoardDocument} from "./board_document";
import {BoardDatabaseLoader} from "./board_database_loader";
import {Logger} from "../../utils/logger";

/**
 * This class extends from "PouchDbDatabase". It gets only used for managing a CouchDB database
 * which stores board documents. The BoardDatabase implements the {@link BoardDatabaseLoader}.
 */
export class BoardDatabase extends PouchDbDatabase<BoardDocument> implements BoardDatabaseLoader {

////////////////////////////////////////////Properties////////////////////////////////////////////


    
////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor() {
        super(BoardDocument);

    }

////////////////////////////////////////Inherited Methods//////////////////////////////////////////


/////////////////////////////////////////////Methods///////////////////////////////////////////////

}