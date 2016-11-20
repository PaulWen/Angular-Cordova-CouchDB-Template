import {NgModule, ExceptionHandler} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {BoardDatabase} from "./shared/databases/board/board_database";
import {BoardDatabaseLoader} from "./shared/databases/board/board_database_loader";
import {AppExceptionHandler} from "./exception_handler";
import {SuperLoginClient} from "./shared/utils/super_login_client/super_login_client";
import {SuperloginHttpRequestor} from "./shared/utils/super_login_client/superlogin_http_requestor";
import {Router} from "@angular/router";
import {HttpModule} from "@angular/http";
import {AppRoutes, routing} from "./app_routes";
import {DatabaseInitializer} from "./shared/databases/database_initializer";
import {BoardComponent} from "./components/board/board.component";
import {MDL} from "./shared/utils/mdl/MaterialDesignLiteUpgradeElement";
import {ErrorComponent} from "./components/error/error.component";
import {LoginComponent} from "./components/login/login.component";
import {PageNotFoundComponent} from "./components/page_not_found/page_not_found.component";
import {SortablejsModule} from "angular-sortablejs";
import {PouchDbModel} from "./shared/utils/pouch_db/pouch_db_directive";

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
        MDL,
        PouchDbModel
    ],
    bootstrap: [AppComponent],
    providers: [
        AppModule.exceptionHandlerProvider,
        SuperloginHttpRequestor,
        AppModule.boardDocumentLoaderProvider,
        AppModule.superLoginClientProvider
    ]
})
export class AppModule {

////////////////////////////////////////////Properties////////////////////////////////////////////

    // the following properties should not be available in the complete application but are needed
    // needed multiple times in providers for providing all needed objects

    /** This object is the only object of the {@link BoardDatabase} that gets used
     * in this application. */
    private static boardDatabase = new BoardDatabase();

////////////////////////////////////////////Providers/////////////////////////////////////////////

    /**
     * This provider provides a {@link BoardDatabaseLoader}.
     */
    private static boardDocumentLoaderProvider = {
        provide: BoardDatabaseLoader,
        useValue: AppModule.boardDatabase
    };

    /**
     * This provider provides a {@link SuperLoginClient}.
     */
    private static superLoginClientProvider = {
        provide: SuperLoginClient,
        useFactory: (httpRequestor, router) => {
            return new SuperLoginClient(httpRequestor, new DatabaseInitializer(AppModule.boardDatabase), router, AppRoutes.LOGIN_ROUTE);
        },
        deps: [SuperloginHttpRequestor, Router]
    };

    /**
     * This provider provides a {@link ExceptionHandler}.
     */
    private static exceptionHandlerProvider = {
        provide:ExceptionHandler,
        useClass: AppExceptionHandler
    }
}