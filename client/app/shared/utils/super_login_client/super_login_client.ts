import {Http, Headers} from '@angular/http';
import {CanActivate, Router} from '@angular/router';
import { Injectable } from '@angular/core';
import {SuperloginHttpRequestor} from "./superlogin_http_requestor";
import {Config} from "../../../config";
import {SuperLoginClientError} from "./super_login_client_error";
import {error} from "util";
import {SuperLoginClientDoneResponse} from "./super_login_client_done_reponse";
import {SuperLoginClientErrorResponse} from "./super_login_client_error_reponse";
import {Logger} from "../logger";
import {SuperLoginClientDatabaseInitializer} from "./super_login_client_database_initializer";

/**
 * This class is a service which implements TypeScript methods to communicate
 * with the ServerLogin API running on the server.
 *
 * The only purposes of the class are:
 *  1) register users
 *  2) login users --> initializes the all databases used by the app by calling a initialize function
 *  3) logout users
 *  4) check if user is logged in
 *  5) renew connection that that session does not end before user is done
 *  6) change password or email
 *
 * The Service can only handle one login at a time!
 */
@Injectable()
export class SuperLoginClient implements CanActivate {

////////////////////////////////////////////Properties////////////////////////////////////////////

    /** provides functions to easily perform http requests */
    private httpRequestor: SuperloginHttpRequestor;

    /** the router which allows routing */
    private router: Router;

    /** temporary authentication bearer for the current session */
    private authenticationBearer : string;

    /** defines a function which gets called to  */
    private databaseInitializer: SuperLoginClientDatabaseInitializer;


    /** tells if the user already confirmed his email */
    private emailConfirmed: boolean;

    // ROUTES
    /** the route in the application to the login page */
    private loginPageRoute: string;

////////////////////////////////////////////Constructor////////////////////////////////////////////

    /**
     *
     * @param httpRequestor
     * @param databaseInitializer
     * @param router
     * @param loginPageRoute the rout which points at the login page - that is where not yet authenticated users get directed to
     */
    constructor(httpRequestor: SuperloginHttpRequestor, databaseInitializer: SuperLoginClientDatabaseInitializer, router: Router, loginPageRoute: string) {
        this.httpRequestor = httpRequestor;
        this.databaseInitializer = databaseInitializer;
        this.router = router;

        this.authenticationBearer = null;
        this.emailConfirmed = null;


        this.loginPageRoute = loginPageRoute;
    }

////////////////////////////////////////Inherited Methods//////////////////////////////////////////

    public canActivate(): boolean {
        // check if the user is authenticated
        if (this.isAuthenticated()) {
            // check if the user already confirmed his email
            if (this.emailConfirmed) {
                // let him pass
                return true;
            } else {
                // TODO if the user has not yet confirmed his email, route him to the page where it says that he has to confirm his email
            }

        // if the user is not yet authenticated
        } else {
            // route the user to the login page
            this.router.navigate([this.loginPageRoute]);
            return false;
        }
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    public isAuthenticated(): boolean {
        return this.authenticationBearer !== null;
    }

    /**
     * This function should get called once the user loged in successfully.
     * The function makes sure that the app gets provided with all the information it needs.
     *
     * @param data
     */
    private finishLogin(data: any) {
        // save the authentication bearer for the current session
        this.authenticationBearer = data.token + ":" + data.password;

        //TODO check if the users email already got confirmed
        this.emailConfirmed = true;

        // providing the app with the URLs to the user databases
        this.databaseInitializer.initializeDatabases(data.userDBs);
    }

    /**
     * The function uses superlogin-client to register the user with the given information.
     *
     * @param firstName of the user
     * @param email of the user
     * @param password of the user
     */
    public register(firstName: string, email: string, password: string, done: SuperLoginClientDoneResponse, error: SuperLoginClientErrorResponse) {
        this.httpRequestor.postJsonData("http://localhost:3000/auth/register", null, {
            firstName: firstName,
            email: email,
            password: password,
            confirmPassword: password
        }).subscribe(
            (data: any) => {
                this.finishLogin(data);
                done();
                Logger.log("New account created.");
            },
            (errorObject) => {
                var superLoginClientError: SuperLoginClientError = new SuperLoginClientError(errorObject);

                // Log the Error
                Logger.error(superLoginClientError.getErrorMessage());

                // call the error callback function
                error(superLoginClientError);

                Logger.log("Could not create new account.");
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
                this.finishLogin(data);
                done();
                Logger.log("Authenticated.");
            },
            (errorObject) => {
                var superLoginClientError: SuperLoginClientError = new SuperLoginClientError(errorObject);

                // Log the Error
                Logger.error(superLoginClientError.getErrorMessage());

                // call the error callback function
                error(superLoginClientError);

                Logger.log("Authentication failed.");
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
    private checkAuthentication(trueCallback: SuperLoginClientDoneResponse, falseCallback: SuperLoginClientDoneResponse) {
        this.httpRequestor.getJsonData("http://localhost:3000/auth/session", this.authenticationBearer).subscribe(
            (data: any) => {
                trueCallback();
            },
            (errorObject) => {
                var superLoginClientError: SuperLoginClientError = new SuperLoginClientError(errorObject);

                // Log the Error
                Logger.log(superLoginClientError.getErrorMessage());

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
}