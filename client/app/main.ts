///<reference path="shared/databases/board/board_database.ts"/>
import {bootstrap}    from '@angular/platform-browser-dynamic';

import {HTTP_PROVIDERS} from "@angular/http";
import {Router, provideRouter} from '@angular/router';
import {SuperLoginClientDatabaseInitializer} from "./shared/utils/super_login_client/super_login_client_database_initializer";
import {provide, ComponentRef} from "@angular/core";
import {SuperLoginClient} from "./shared/utils/super_login_client/super_login_client";
import {SuperloginHttpRequestor} from "./shared/utils/super_login_client/superlogin_http_requestor";
import {BoardDatabase} from "./shared/databases/board/board_database";
import {DatabaseInitializer} from "./shared/databases/database_initializer";
import {AppRoutesConfig, AppRoutes} from "./app_routes";
import {AppComponent} from "./components/app/app.component";


//  http://stackoverflow.com/questions/34289761/angular-2-equivalent-to-router-resolve-data-for-new-router/38138019#38138019

bootstrap(AppComponent, [   provideRouter(AppRoutesConfig),
                            HTTP_PROVIDERS,
                            SuperloginHttpRequestor,
                            BoardDatabase,
                            // Router,
                            provide(SuperLoginClientDatabaseInitializer, {useClass: DatabaseInitializer}),
                            provide(SuperLoginClient, {
                                useFactory: (httpRequestor, databaseInitializer, router) => {
                                    return new SuperLoginClient(httpRequestor, databaseInitializer, router, AppRoutes.LOGIN_ROUTE);
                                },
                                deps: [SuperloginHttpRequestor, SuperLoginClientDatabaseInitializer, Router]
                            })
]);


