import {SuperLoginClientInitializeModel} from "../utils/super_login_client/super_login_client_fill_model_interface";
import {AppModelInterface} from "../../components/app/app_model_interface";
import {Board} from "./board/board";
import {Database} from "./database/database";
/**
 * This is the model of the client app.
 * It containes referneces to all user databases once it got initialized.
 */
export class Model implements SuperLoginClientInitializeModel, AppModelInterface {

////////////////////////////////////////////Properties////////////////////////////////////////////

    private boardDatabase: Database;
    private listDatabase: Database;
    private cardDatabase: Database;
    private settingsDatabase: Database;
    private userDatabase: Database;

////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor() {
        this.boardDatabase = null;
    }

/////////////////////////////////////////////Inharitated Methods///////////////////////////////////////////////

    public initializeModel(user_databases:string[]): void {
        this.boardDatabase = new Database(user_databases[0]);
    }


    public getBoard(id:string): Board {
        return new Board(this.boardDatabase, id);
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

}