import {Http, Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import {SuperloginHttpRequestor} from "./superlogin_http_requestor";
import {Config} from "../../../config";
import {SuperLoginClientError} from "./super_login_client_error";
import {error} from "util";
import {SuperLoginClientDoneResponse} from "./super_login_client_done_reponse";
import {SuperLoginClientErrorResponse} from "./super_login_client_error_reponse";
import {Logger} from "../logger";

/**
 * This class is a service which implements TypeScript methods to communicate
 * with the Serverlogin API running on the server.
 *
 * The Service can only handle one login at a time!
 */
@Injectable()
export class SuperLoginClient {

////////////////////////////////////////////Properties////////////////////////////////////////////

    /** provides functions to easily perform http requests */
    private httpRequestor: SuperloginHttpRequestor;

    /** temporary authentication bearer for the current session */
    private authenticationBearer : string;

////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor(httpRequestor: SuperloginHttpRequestor) {
        this.httpRequestor = httpRequestor;
        this.authenticationBearer = null;
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    /**
     * The function uses superlogin-client to register the user with the given information.
     *
     * @param firstname of the user
     * @param email of the user
     * @param password of the user
     */
    public register(firstname: string, email: string, password: string, done: SuperLoginClientDoneResponse, error: SuperLoginClientErrorResponse) {
        this.httpRequestor.postJsonData("http://localhost:3000/auth/register", null, {
            firstname: firstname,
            email: email,
            password: password,
            confirmPassword: password
        }).subscribe(
            (data: any) => {
                console.dir(data);
                done();
            },
            (errorObject) => {
                var superLoginClientError: SuperLoginClientError = new SuperLoginClientError(errorObject);

                // Log the Error
                Logger.error(superLoginClientError.getErrorMessage());

                // call the error callback function
                error(superLoginClientError);
            }
        );
    }

    /**
     * The function uses superlogin-client to login the user withe the given credentials.
     *
     * @param email of the user
     * @param password of the user
     * @param done callback function once the request was successful
     * @param error callback function in case an error occurred
     */
    public login(email: string, password: string, done: SuperLoginClientDoneResponse, error: SuperLoginClientErrorResponse)  {
        this.httpRequestor.postJsonData("http://localhost:3000/auth/login", null, {
            username: email,
            password: password,
        }).subscribe(
            (data: any) => {
                console.dir(data);
                this.authenticationBearer = data.token + ":" + data.password;
                alert(this.authenticationBearer);
                done();
            },
            (errorObject) => {
                var superLoginClientError: SuperLoginClientError = new SuperLoginClientError(errorObject);

                // Log the Error
                Logger.error(superLoginClientError.getErrorMessage());

                // call the error callback function
                error(superLoginClientError);
            }
        );
    }

    /**
     *
     * 
     * @param done callback function once the request was successful
     * @param error callback function in case an error occurred
     */
    public logout(done: SuperLoginClientDoneResponse, error: SuperLoginClientErrorResponse)  {
        this.httpRequestor.postJsonData("http://localhost:3000/auth/logout", this.authenticationBearer, {}).subscribe(
            (data: any) => {
                done();
            },
            (errorObject) => {
                var superLoginClientError: SuperLoginClientError = new SuperLoginClientError(errorObject);

                // Log the Error
                Logger.error(superLoginClientError.getErrorMessage());

                // call the error callback function
                error(superLoginClientError);
            }
        );
    }

    /**
     * This method checks if the user is currently authenticated.
     *
     * @param trueCallback gets called if the user is already authenticated
     * @param falseCallback gets called if the user is not yet authenticated
     */
    public isAuthenticated(trueCallback: SuperLoginClientDoneResponse, falseCallback: SuperLoginClientDoneResponse) {
        this.httpRequestor.getJsonData("http://localhost:3000/auth/session", this.authenticationBearer).subscribe(
            (data: any) => {
                trueCallback();
            },
            (errorObject) => {
                var superLoginClientError: SuperLoginClientError = new SuperLoginClientError(errorObject);

                // Log the Error
                Logger.error(superLoginClientError.getErrorMessage());

                // check if error = unauthorized
                if (superLoginClientError.checkForError(SuperLoginClientError.UNAUTHORIZED)) {
                    falseCallback();
                }
            }
        );
    }

    /**
     * This function checks if a email is already in use.
     *
     * @param email
     * @param trueCallback gets called if the email is already in use
     * @param falseCallback gets called if the email is not yet in use
     */
    public isEmailInUse(email: string, trueCallback: SuperLoginClientDoneResponse, falseCallback: SuperLoginClientDoneResponse) {
       this.httpRequestor.getJsonData("http://localhost:3000/auth/validateEmailUsername/" + email, null).subscribe(
            (data: any) => {
                trueCallback();
            },
            (errorObject) => {
                var superLoginClientError: SuperLoginClientError = new SuperLoginClientError(errorObject);

                // Log the Error
                Logger.error(superLoginClientError.getErrorMessage());

                // check if error = email already in use
                if (superLoginClientError.checkForError(SuperLoginClientError.AUTH_ERR_1)) {
                    falseCallback();
                }
            }
        );
    }

    public getClientDatabases(): string[] {
        return null;
    }
}