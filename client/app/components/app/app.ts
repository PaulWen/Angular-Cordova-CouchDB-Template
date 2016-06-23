import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {TestComponent} from "../test/test";
import {MDL} from "../../directives/MaterialDesignLiteUpgradeElement";
import {SuperLoginClient} from "../../shared/utils/super_login_client/super_login_client";
import {SuperLoginClientError} from "../../shared/utils/super_login_client/super_login_client_error";

@Component({
    selector: 'my-app',
    templateUrl: 'app/components/app/app.html',
    directives: [ROUTER_DIRECTIVES, MDL],
    providers: [ROUTER_PROVIDERS, SuperLoginClient]
})
@RouteConfig([
    {
        path: '/test',
        name: 'Test',
        component: TestComponent,
    }
])
export class AppComponent {
////////////////////////////////////////////Properties////////////////////////////////////////////

    private superLoginClient: SuperLoginClient;

    private test: string;

////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor(superLoginClient: SuperLoginClient) {
        this.superLoginClient = superLoginClient;
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    private register(name: string, email: string, password: string) {
        try {
            this.superLoginClient.register(name, email, password);
            alert("hallo1");
        } catch (error) {
            if (error instanceof SuperLoginClientError) {
                alert("hallo2");
                if ((<SuperLoginClientError>error).checkForError(SuperLoginClientError.AUTH_ERR_1)) {
                }
                if ((<SuperLoginClientError>error).checkForError(SuperLoginClientError.AUTH_ERR_2)) {
                }
                if ((<SuperLoginClientError>error).checkForError(SuperLoginClientError.AUTH_ERR_3)) {
                }
                if ((<SuperLoginClientError>error).checkForError(SuperLoginClientError.AUTH_ERR_4)) {
                    alert(SuperLoginClientError.AUTH_ERR_4);
                }
                if ((<SuperLoginClientError>error).checkForError(SuperLoginClientError.AUTH_ERR_5)) {
                    alert(SuperLoginClientError.AUTH_ERR_5);
                }
                if ((<SuperLoginClientError>error).checkForError(SuperLoginClientError.AUTH_ERR_6)) {
                    alert(SuperLoginClientError.AUTH_ERR_6);
                }
            }
        }
    }

    private login(email: string, password: string) {
        try {
            this.superLoginClient.login(email, password);
        } catch (error) {
            console.dir(error);
        }
    }

}