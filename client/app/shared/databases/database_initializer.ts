import {SuperLoginClientDatabaseInitializer} from "../utils/super_login_client/super_login_client_database_initializer";
import {BoardDatabase} from "./board/board_database";

/**
 * This class describes how the URLs of the databases of the app are getting updated in case
 * they change.
 */
export class DatabaseInitializer extends SuperLoginClientDatabaseInitializer {

////////////////////////////////////////////Properties////////////////////////////////////////////

    private boardDatabase: BoardDatabase;
    
////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor(boardDatabase: BoardDatabase) {
        super();
        this.boardDatabase = boardDatabase;
    }

////////////////////////////////////////Inherited Methods//////////////////////////////////////////

   public initializeDatabases(user_databases: any): void {
       this.boardDatabase.initializeDatabase(user_databases.boards);
   }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    
    
}