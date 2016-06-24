import {Database} from "../../utils/database";
import {BoardDocument} from "../board/board_document";
import {AppModel} from "../../../components/app/app_model";

/**
 * This class extends from "Database". It gets only used for managing a CouchDB database
 * which stores board documents with the structure of "BoardDocument" objects.
 */
export class BoardDatabase extends Database<BoardDocument> {

////////////////////////////////////////////Properties////////////////////////////////////////////


////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor() {
        super();
        var test: BoardDocument = super.getDocument("");
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

}