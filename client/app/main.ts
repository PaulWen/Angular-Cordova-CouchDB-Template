import {bootstrap}    from '@angular/platform-browser-dynamic';

import {AppComponent} from "./components/app/app";
import {HTTP_PROVIDERS} from "@angular/http";
import {HttpRequestor} from "./shared/utils/http_requestor";

bootstrap(AppComponent,  [HTTP_PROVIDERS, HttpRequestor]);