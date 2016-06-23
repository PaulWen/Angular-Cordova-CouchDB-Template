import {bootstrap}    from '@angular/platform-browser-dynamic';

import {AppComponent} from "./components/app/app";
import {HTTP_PROVIDERS} from "@angular/http";
import {SuperloginHttpRequestor} from "./shared/utils/super_login_client/superlogin_http_requestor";

bootstrap(AppComponent,  [HTTP_PROVIDERS, SuperloginHttpRequestor]);