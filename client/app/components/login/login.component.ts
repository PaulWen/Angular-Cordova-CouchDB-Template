import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {SuperLoginClient} from "../../shared/utils/super_login_client/super_login_client";
import {SuperLoginClientError} from "../../shared/utils/super_login_client/super_login_client_error";
import {AppRoutes} from "../../app_routes";
import {MDL} from "../../shared/utils/mdl/MaterialDesignLiteUpgradeElement";
import {Logger} from "../../shared/utils/logger";

@Component({
    selector: 'login-component',
    templateUrl: 'app/components/login/login.component.html',
    styleUrls: ['app/components/login/login.component.css']
})
export class LoginComponent {
////////////////////////////////////////////Properties////////////////////////////////////////////

    private superLoginClient: SuperLoginClient;

    private router: Router;

////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor(superLoginClient: SuperLoginClient, router: Router) {
        this.superLoginClient = superLoginClient;
        this.router = router;
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    private register(name: string, email: string, password: string) {
        this.superLoginClient.register(name, email, password, () => {
            // successfully registred
            this.router.navigate([AppRoutes.BOARD_ROUTE]);

            // log user in
            this.login(email, password, false);
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

    private login(email: string, password: string, rememberLogin: boolean) {
        this.superLoginClient.loginWithCredentials(email, password, rememberLogin, () => {
            // successfully loged-in
            this.router.navigate([AppRoutes.BOARD_ROUTE]);

        }, (error: SuperLoginClientError) => {
            // error
            if (error.checkForError(SuperLoginClientError.LOGIN_ERR_1)) {
                alert(SuperLoginClientError.LOGIN_ERR_1);
            }
            if (error.checkForError(SuperLoginClientError.LOGIN_ERR_2)) {
                alert(SuperLoginClientError.LOGIN_ERR_2);
            }
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