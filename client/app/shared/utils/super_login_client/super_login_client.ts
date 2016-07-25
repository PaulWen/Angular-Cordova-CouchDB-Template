import {Http, Headers} from '@angular/http';
import {
    CanActivate, Router, ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import {SuperloginHttpRequestor} from "./superlogin_http_requestor";
import {Config} from "../../../config";
import {SuperLoginClientError} from "./super_login_client_error";
import {error} from "util";
import {SuperLoginClientDoneResponse} from "./super_login_client_done_reponse";
import {SuperLoginClientErrorResponse} from "./super_login_client_error_reponse";
import {Logger} from "../logger";
import {SuperLoginClientDatabaseInitializer} from "./super_login_client_database_initializer";
import {Observable} from "rxjs/Rx";

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

////////////////////////////////////////////Constants/////////////////////////////////////////////

    private static get SESSION_TOKEN_COOKIE(): string {return 'session_token';};

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
     * Cunstructor of the class SuperLoginClient.
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

    public canActivate(): Observable<boolean> | boolean {
        // check if the user is already authenticated
        if (this.isAuthenticated()) {
            return true;

        // if the user is not yet authenticated try to authenticate him by using the cookie data
        } else {
            return Observable.create((observer) => {
                this.checkAuthentication().subscribe(
                    (isAuthenticated: boolean)=>{
                        // if user is authenticated
                        if (isAuthenticated) {
                            // check if the user already confirmed his email
                            if (this.emailConfirmed) {
                                // let him pass
                                return true;
                            } else {
                                // TODO if the user has not yet confirmed his email, route him to the page where it says that he has to confirm his email
                            }

                        // if user is not yet authenticated
                        } else {
                            // route the user to the login page
                            this.router.navigate([this.loginPageRoute]);
                            return false;
                        }
                    }
                )
            });
        }
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    /**
     * This function creates a cookie.
     *
     * @param cookieName name of the cookie
     * @param cookieValue value of the cookie
     * @param expirationDate time in days until the cookie expires
     */
    private setCookie(cookieName, cookieValue, expirationDate) {
        var date = new Date();
        date.setTime(date.getTime() + (expirationDate*24*60*60*1000));
        var expires = "expires="+ date.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + "; " + expires;
    }

    /**
     * This function returns the value of a specific cookie.
     *
     * @param cookieName name of the cookie
     * @returns {any} value of the cookie
     */
    private getCookie(cookieName) {
        var name = cookieName + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length,c.length);
            }
        }
        return "";
    }


    /**
     * This method checks whether or not the user is already authenticated and a session token exists.
     *
     * CAUTION: The method does not check if the session token is still valid! Therefore the method
     * does not need any connection to the database and works synchronous.
     *
     * @returns {boolean} true is a session token already exists
     */
    public isAuthenticated(): boolean {
        return this.authenticationBearer !== null;
    }

    /**
     * This methods checks if the user is already authenticated.
     * It checks if there is a session token either stored in a cookie or in an object of this class.
     * In case there is a stored session token, this session token gets validated to check if it is still valid.
     *
     * @returns {Observable<boolean>} returns true or false once it knows if the user is already authenticated
     */
    public checkAuthentication(): Observable<boolean> {
        // create an observable which will be completed as soon as the authentication check got completely finished
        return Observable.create((observer) => {
            // check if the user already logged in earlier and if a valid session token got stored in the cookies
            if (this.authenticationBearer == null && this.getCookie(SuperLoginClient.SESSION_TOKEN_COOKIE) != "") {
                this.authenticationBearer = this.getCookie(SuperLoginClient.SESSION_TOKEN_COOKIE);
            }

            // check if the currently known authentication bearer is still valid
            if (this.authenticationBearer != null ) {
                this.httpRequestor.getJsonData("http://localhost:3000/auth/session", this.authenticationBearer).subscribe(
                    // is still valid
                    (data: any) => {
                        // finish the authentication
                        this.finishAuthentication(false);

                        // renew the session token
                        this.renewSessionToken();

                        // end the observable and return the result
                        observer.next(true);
                        observer.complete();
                    },

                    // is not valid anymore
                    (errorObject) => {
                        // make sure that no invalid session token is stored in the cookie
                        this.setCookie(SuperLoginClient.SESSION_TOKEN_COOKIE, "", -1);

                        // create error object to evaluate the error
                        var superLoginClientError: SuperLoginClientError = new SuperLoginClientError(errorObject);

                        // Log the Error
                        Logger.log(superLoginClientError.getErrorMessage());

                        // check if error = unauthorized
                        if (superLoginClientError.checkForError(SuperLoginClientError.UNAUTHORIZED)) {
                            this.authenticationBearer = null;
                        }

                        observer.next(false);
                        observer.complete();
                    }
                );
            } else {
                observer.next(false);
                observer.complete();
            }
        });
    }

    /**
     * This function should get called once the user loged in successfully.
     * The function makes sure that the app gets provided with all the information it needs.
     *
     * @param data
     * @param stayAuthenticated set true, if the session token should get stored in a cookie, so that the session token can be reused for the next login
     */
    private finishAuthentication(stayAuthenticated: boolean) {
        //TODO check if the users email already got confirmed
        this.emailConfirmed = true;

        // providing the app with the URLs to the user databases
        this.userDB();


        // if user wants to stay logged in even after he closed the browser, the session token needs to be stored in a cookie
        if (stayAuthenticated) {
            this.setCookie(SuperLoginClient.SESSION_TOKEN_COOKIE, this.authenticationBearer, 14)
        }
    }

    /**
     * The function uses superlogin-client to register the user with the given information.
     *
     * @param firstName of the user
     * @param email of the user
     * @param password of the user
     * @param done callback function once the request was successful
     * @param error callback function in case an error occurred
     */
    public register(firstName: string, email: string, password: string, done: SuperLoginClientDoneResponse, error: SuperLoginClientErrorResponse) {
        this.httpRequestor.postJsonData("http://localhost:3000/auth/register", null, {
            firstName: firstName,
            // since the username is not allowed to include Capital letters we have to make sure that it does not
            email: email.toLocaleLowerCase(),
            password: password,
            confirmPassword: password
        }).subscribe(
            (data: any) => {
                // save the new session token
                this.authenticationBearer = data.token + ":" + data.password;

                // finish the authentication
                this.finishAuthentication(false);
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
     * @param stayAuthenticated set true, if the session token should get stored in a cookie, so that the session token can be reused for the next login
     * @param done callback function once the request was successful
     * @param error callback function in case an error occurred
     */
    public login(email: string, password: string, stayAuthenticated: boolean , done: SuperLoginClientDoneResponse, error: SuperLoginClientErrorResponse)  {
        // log the user in
        this.httpRequestor.postJsonData("http://localhost:3000/auth/login", null, {
            // since the username is not allowed to include Capital letters we have to make sure that it does not
            username: email.toLocaleLowerCase(),
            password: password,
        }).subscribe(
            (data: any) => {
                // save the new session token
                this.authenticationBearer = data.token + ":" + data.password;

                // finish the authentication
                this.finishAuthentication(stayAuthenticated);
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
     * The method loggs out the user. The current session token gets invalid.
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

    /**
     * This method renews the current session token.
     */
    private renewSessionToken(): void {
        this.httpRequestor.postJsonData("http://localhost:3000/auth/refresh/", this.authenticationBearer, {}).subscribe(
            (data: any) => {
                // all done successfully
            },
            (errorObject) => {
                var superLoginClientError: SuperLoginClientError = new SuperLoginClientError(errorObject);

                // Log the Error
                Logger.error(superLoginClientError.getErrorMessage());
            }
        );
    }

    /**
     * This method loads all the database names of the users databases and passes those to the DatabaseInitializer.
     */
    private userDB(): void {
        // load the database names
        this.httpRequestor.getJsonData("http://localhost:3000/auth/user-db/", this.authenticationBearer).subscribe(
            // if the database names got loaded successfully
            (data: any) => {
                // give the database names to the database initializer
                this.databaseInitializer.initializeDatabases(data);
            },

            // in case of an error
            (errorObject) => {
                var superLoginClientError: SuperLoginClientError = new SuperLoginClientError(errorObject);

                // Log the Error
                Logger.error(superLoginClientError.getErrorMessage());
            }
        );
    }
}