import {SuperLoginClientDatabaseInitializer} from "../utils/super_login_client/super_login_client_database_initializer";
import {PouchDbDatabase} from "../utils/pouch_db/pouch_db_database";
import {BoardDocument} from "./board/board_document";
import {AppModule} from "../../app.module";
import {Inject} from "@angular/core";

/**
 * This class describes how the URLs of the databases of the app are getting updated in case
 * they change.
 */
export class DatabaseInitializer extends SuperLoginClientDatabaseInitializer {

////////////////////////////////////////////Properties////////////////////////////////////////////

    private boardDatabase: PouchDbDatabase;
    
////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor(@Inject(AppModule.BOARD_DATABASE)boardDatabase:PouchDbDatabase) {
        super();
        this.boardDatabase = boardDatabase;
    }

////////////////////////////////////////Inherited Methods//////////////////////////////////////////

   public initializeDatabases(user_databases: any): void {
       this.boardDatabase.initializeDatabase(user_databases.boards);
   }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    
    
}