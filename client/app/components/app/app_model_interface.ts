import {Board} from "../../shared/model/board/board";
/**
 * This interface defines all the methods a board needs to get an board document out of the board database and also
 * to put the board document back into the board database. Furthermore, the interface defines methods
 * to retrieve the board settings.
 */
export interface AppModelInterface {

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    getBoard(id: string): Board

}