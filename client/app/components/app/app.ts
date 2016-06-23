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
        this.superLoginClient.register(name, email, password, () => {
            // successfully registred
            alert("successfully registred");
        }, (error: SuperLoginClientError) => {
            // error
            if (error.checkForError(SuperLoginClientError.AUTH_ERR_1)) {
                alert(SuperLoginClientError.AUTH_ERR_1);
            }
            if (error.checkForError(SuperLoginClientError.AUTH_ERR_2)) {
                alert(SuperLoginClientError.AUTH_ERR_2);
            }
            if (error.checkForError(SuperLoginClientError.AUTH_ERR_3)) {
                alert(SuperLoginClientError.AUTH_ERR_3);
            }
            if (error.checkForError(SuperLoginClientError.AUTH_ERR_4)) {
                alert(SuperLoginClientError.AUTH_ERR_4);
            }
            if (error.checkForError(SuperLoginClientError.AUTH_ERR_5)) {
                alert(SuperLoginClientError.AUTH_ERR_5);
            }
            if (error.checkForError(SuperLoginClientError.AUTH_ERR_6)) {
                alert(SuperLoginClientError.AUTH_ERR_6);
            }
        });
    }

    private login(email: string, password: string) {
        this.superLoginClient.login(email, password, () => {
            // successfully logedin
            alert("successfully loged-in");
        }, (error: SuperLoginClientError) => {
            // error
            if (error.checkForError(SuperLoginClientError.LOGIN_ERR_1)) {
                alert(SuperLoginClientError.LOGIN_ERR_1);
            }
        });
    }

    private logout() {
        this.superLoginClient.logout(() => {
            // successfully logedin
            alert("successfully loged-out");
        }, (error: SuperLoginClientError) => {
        });
    }

    private session() {
        this.superLoginClient.logout(() => {
            // successfully ask for session information
            alert("session successful");
        }, (error: SuperLoginClientError) => {
        });
    }

    private validateEmail(email: string) {
        this.superLoginClient.isEmailInUse(email, () => {
            alert("email NOT in use");
        }, () => {
            alert("email in use");
        });
    }
}