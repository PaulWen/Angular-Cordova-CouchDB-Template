import {NgModule, ExceptionHandler, OpaqueToken} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {AppExceptionHandler} from "./exception_handler";
import {SuperLoginClient} from "./shared/utils/super_login_client/super_login_client";
import {SuperloginHttpRequestor} from "./shared/utils/super_login_client/superlogin_http_requestor";
import {HttpModule} from "@angular/http";
import {routing} from "./app_routes";
import {DatabaseInitializer} from "./shared/databases/database_initializer";
import {BoardComponent} from "./components/board/board.component";
import {MDL} from "./shared/utils/mdl/MaterialDesignLiteUpgradeElement";
import {ErrorComponent} from "./components/error/error.component";
import {LoginComponent} from "./components/login/login.component";
import {PageNotFoundComponent} from "./components/page_not_found/page_not_found.component";
import {SortablejsModule} from "angular-sortablejs";
import {PouchDbDatabase} from "./shared/utils/pouch_db/pouch_db_database";
import {BoardDocument} from "./shared/databases/board/board_document";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        routing,
        SortablejsModule
    ],
    declarations: [
        AppComponent,
        BoardComponent,
        LoginComponent,
        ErrorComponent,
        PageNotFoundComponent,
        MDL
    ],
    bootstrap: [AppComponent],
    providers: [
        SuperloginHttpRequestor,
        AppModule.exceptionHandlerProvider,
        AppModule.boardDocumentDatabaseProvider,
        AppModule.databaseInitializerProvider,
        AppModule.superLoginClientProvider
    ]
})
export class AppModule {

////////////////////////////////////////////Properties////////////////////////////////////////////

    // the following tokens represent the different databases uses by this application

    /** this token represents the database which contains {@link BoardDocument}s */
    public static get BOARD_DATABASE(): OpaqueToken {return new OpaqueToken('board_database');};

////////////////////////////////////////////Providers/////////////////////////////////////////////

    /**
     * This provider provides a {@link PouchDbDatabase}.
     */
    private static boardDocumentDatabaseProvider = {
        provide:AppModule.BOARD_DATABASE,
        useClass: PouchDbDatabase
    };

    /**
     * This provider provides a {@link DatabaseInitializer}.
     */
    private static databaseInitializerProvider = {
        provide: DatabaseInitializer,
        useClass: DatabaseInitializer
    };

    /**
     * This provider provides a {@link SuperLoginClient}.
     */
    private static superLoginClientProvider = {
        provide: SuperLoginClient,
        useClass: SuperLoginClient
    };

    /**
     * This provider provides a {@link ExceptionHandler}.
     */
    private static exceptionHandlerProvider = {
        provide:ExceptionHandler,
        useClass: AppExceptionHandler
    }
}