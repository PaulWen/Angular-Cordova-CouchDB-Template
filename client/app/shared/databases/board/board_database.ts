import {PouchDbDatabase} from "../../utils/pouch_db/pouch_db_database";
import {BoardDocument} from "./board_document";
import {BoardDocumentLoader} from "./board_document_loader";

/**
 * This class extends from "PouchDbDatabase". It gets only used for managing a CouchDB database
 * which stores board documents. The BoardDatabase implements the {@link BoardDocumentLoader}.
 */
export class BoardDatabase extends PouchDbDatabase<BoardDocument> implements BoardDocumentLoader {

////////////////////////////////////////////Properties////////////////////////////////////////////


    
////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor() {
        super(BoardDocument);

    }

////////////////////////////////////////Inherited Methods//////////////////////////////////////////


/////////////////////////////////////////////Methods///////////////////////////////////////////////

}