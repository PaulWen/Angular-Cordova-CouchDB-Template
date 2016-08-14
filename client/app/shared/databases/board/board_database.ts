import {PouchDbDatabase} from "../../utils/pouchdb_database";
import {BoardDocument} from "./board_document";

/**
 * This class extends from "PouchDbDatabase". It gets only used for managing a CouchDB database
 * which stores board documents with the structure of "BoardDocument" objects.
 */
export class BoardDatabase extends PouchDbDatabase<BoardDocument> {

////////////////////////////////////////////Properties////////////////////////////////////////////


    
////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor() {
        super();
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

}