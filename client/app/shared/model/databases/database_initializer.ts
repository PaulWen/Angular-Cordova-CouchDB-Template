import {Injectable} from "@angular/core";
import {SuperLoginClientDatabaseInitializer} from "../../utils/super_login_client/super_login_client_database_initializer";
import {BoardDatabase} from "./board_database";

/**
 * This class describes how the URLs of the databases of the app are getting updated in case
 * they change.
 */
@Injectable()
export class DatabaseInitializer extends SuperLoginClientDatabaseInitializer {

////////////////////////////////////////////Properties////////////////////////////////////////////

    private boardDatabase: BoardDatabase;
    
////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor(boardDatabase: BoardDatabase) {
        super();
        this.boardDatabase = boardDatabase;
    }

////////////////////////////////////////Inherited Methods//////////////////////////////////////////

   public initializeDatabases(user_databases:string[]):void {
       this.boardDatabase.initializeDatabase(user_databases[0]);
   }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    
    
}