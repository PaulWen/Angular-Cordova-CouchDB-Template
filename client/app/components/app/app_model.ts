import {Board} from "../../shared/model/board/board";
import {Injectable} from "@angular/core";
import {BoardDatabase} from "../../shared/model/databases/board_database";
/**
 * This interface defines all the methods a board needs to get an board document out of the board database and also
 * to put the board document back into the board database. Furthermore, the interface defines methods
 * to retrieve the board settings.
 */
@Injectable()
export class AppModel {

////////////////////////////////////////////Properties////////////////////////////////////////////

    private boardDatabase: BoardDatabase;

////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor(boardDatabase: BoardDatabase) {
        this.boardDatabase = boardDatabase;
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    public getBoard(id:string): Board {
        return new Board(this.boardDatabase, id);
    }

}