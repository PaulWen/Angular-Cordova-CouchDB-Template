import {bootstrap}    from '@angular/platform-browser-dynamic';

import {AppComponent} from "./components/app/app";
import {HTTP_PROVIDERS} from "@angular/http";
import {SuperLoginClientDatabaseInitializer} from "./shared/utils/super_login_client/super_login_client_database_initializer";
import {provide} from "@angular/core";
import {SuperLoginClient} from "./shared/utils/super_login_client/super_login_client";
import {DatabaseInitializer} from "./shared/model/databases/database_initializer";
import {BoardDatabase} from "./shared/model/databases/board_database";
import {SuperloginHttpRequestor} from "./shared/utils/super_login_client/superlogin_http_requestor";

bootstrap(AppComponent,    [HTTP_PROVIDERS,
                            SuperloginHttpRequestor,
                            BoardDatabase,
                            provide(SuperLoginClientDatabaseInitializer, {useClass: DatabaseInitializer}),
                            SuperLoginClient
                            ]);
