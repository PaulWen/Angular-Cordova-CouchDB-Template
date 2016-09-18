System.register(["@angular/router", "@angular/core", "./superlogin_http_requestor", "./super_login_client_error", "../logger", "./super_login_client_database_initializer", "rxjs/Rx"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var router_1, core_1, superlogin_http_requestor_1, super_login_client_error_1, logger_1, super_login_client_database_initializer_1, Rx_1;
    var SuperLoginClient;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (superlogin_http_requestor_1_1) {
                superlogin_http_requestor_1 = superlogin_http_requestor_1_1;
            },
            function (super_login_client_error_1_1) {
                super_login_client_error_1 = super_login_client_error_1_1;
            },
            function (logger_1_1) {
                logger_1 = logger_1_1;
            },
            function (super_login_client_database_initializer_1_1) {
                super_login_client_database_initializer_1 = super_login_client_database_initializer_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            /**
             * This class is a service which implements TypeScript methods to communicate
             * with the ServerLogin API running on the server.
             *
             * The purposes of the class are:
             *  1) register users
             *  2) login users --> initializes the all databases used by the app by calling a initialize function
             *  3) logout users
             *  4) check if user is logged in
             *  5) renew connection that that session does not end before user is done
             *  6) change password or email
             *
             *
             *  How the class handles authentication:
             *      1) user logs in with his credentials which this class sends to the server to verify the credentials
             *      2) server returns a session token which can be used from know on the authenticate the user
             *      3) the session token gets stored in...
             *          a) the session storage in case the user does not want the app to remember the login
             *          b) the local storage in case the user wants the app to remember the login
             *      4) user leaves the page/app
             *          a) the user will be logged out (session token becomes invalid)
             *          b) if the user wants the app to remember the login, the user does not get logged out
             *
             * The Service can only handle one login at a time!
             */
            let SuperLoginClient_1;
            let SuperLoginClient = SuperLoginClient_1 = class SuperLoginClient {
                ////////////////////////////////////////////Constructor////////////////////////////////////////////
                /**
                 * Constructor of the class SuperLoginClient.
                 *
                 * @param httpRequestor
                 * @param databaseInitializer
                 * @param router
                 * @param loginPageRoute the rout which points at the login page - that is where not yet authenticated users get directed to
                 */
                constructor(httpRequestor, databaseInitializer, router, loginPageRoute) {
                    this.httpRequestor = httpRequestor;
                    this.databaseInitializer = databaseInitializer;
                    this.router = router;
                    this.loginPageRoute = loginPageRoute;
                    this.authenticated = false;
                }
                ////////////////////////////////////////////Constants/////////////////////////////////////////////
                static get SESSION_TOKEN_STORAGE_ID() { return 'session_token'; }
                ;
                ////////////////////////////////////////Inherited Methods//////////////////////////////////////////
                /**
                 *  This method checks if the user is already authenticated.
                 *
                 * @returns true or false depending on if the user is already authenticated
                 */
                canActivate() {
                    return true;
                    // check if the user is already authenticated
                    if (this.authenticated) {
                        return true;
                    }
                    else {
                        if (this.isSessionTokenStoredPersistent() != null) {
                            return Rx_1.Observable.create((observer) => {
                                this.loginWithSessionToken(this.getSessionToken(), this.isSessionTokenStoredPersistent(), () => {
                                    // end the observable and return the result
                                    observer.next(true);
                                    observer.complete();
                                }, (error) => {
                                    // remove the invalid session token stored in the session/local storage
                                    this.deleteSessionToken();
                                    // end the observable and return the result
                                    observer.next(false);
                                    observer.complete();
                                    // route the user to the login page
                                    this.router.navigate([this.loginPageRoute]);
                                });
                            });
                        }
                        else {
                            // route the user to the login page
                            this.router.navigate([this.loginPageRoute]);
                            return false;
                        }
                    }
                }
                /////////////////////////////////////////////Methods///////////////////////////////////////////////
                ///////////////////////////////////////////////////////////////////////////////////////////////
                // METHODS TO STORE SESSION TOKEN IN THE LOCAL OR SESSION STORAGE
                ///////////////////////////////////////////////////////////////////////////////////////////////
                /**
                 * The method saves a session token in either the local or session storage.
                 *
                 * @param persistent indicated if the data should be stored so that it also exists after the browser session (after an browser restart)
                 * @param sessionToken the token that should get stored
                 */
                saveSessionToken(persistent, sessionToken) {
                    // remove all current savings
                    this.deleteSessionToken();
                    // save the session token
                    if (persistent) {
                        window.localStorage.setItem(SuperLoginClient_1.SESSION_TOKEN_STORAGE_ID, sessionToken);
                    }
                    else {
                        window.sessionStorage.setItem(SuperLoginClient_1.SESSION_TOKEN_STORAGE_ID, sessionToken);
                    }
                }
                /**
                 * This method removes all session token data out of the session and local storage.
                 */
                deleteSessionToken() {
                    // delete session token from the session storage
                    window.sessionStorage.removeItem(SuperLoginClient_1.SESSION_TOKEN_STORAGE_ID);
                    // delete session token from the local storage
                    window.localStorage.removeItem(SuperLoginClient_1.SESSION_TOKEN_STORAGE_ID);
                }
                /**
                 * This method checks if the session token gets stored persistent in the local storage.
                 *
                 * @returns true = local storage, false = session storage, null = no session token gets stored at all
                 */
                isSessionTokenStoredPersistent() {
                    if (window.localStorage.getItem(SuperLoginClient_1.SESSION_TOKEN_STORAGE_ID)) {
                        return true;
                    }
                    else if (window.sessionStorage.getItem(SuperLoginClient_1.SESSION_TOKEN_STORAGE_ID)) {
                        return false;
                    }
                    else {
                        return null;
                    }
                }
                /**
                 * This method returns the session token out of the session or local storage.
                 *
                 * @returns a string representing the current session token or null in case no session token is stored in the storage
                 */
                getSessionToken() {
                    let isSessionTokenStoredPersistent = this.isSessionTokenStoredPersistent();
                    // check if a session token got stored anywhere
                    if (isSessionTokenStoredPersistent != null) {
                        // if the session token gets stored persistent return the value of the local storage
                        if (isSessionTokenStoredPersistent) {
                            return window.localStorage.getItem(SuperLoginClient_1.SESSION_TOKEN_STORAGE_ID);
                        }
                        else {
                            return window.sessionStorage.getItem(SuperLoginClient_1.SESSION_TOKEN_STORAGE_ID);
                        }
                    }
                    else {
                        return null;
                    }
                }
                ///////////////////////////////////////////////////////////////////////////////////////////////
                // METHODS TO LOGIN THE USER
                ///////////////////////////////////////////////////////////////////////////////////////////////
                /**
                 * The function uses superlogin-client to login the user withe the given credentials.
                 *
                 * @param email of the user
                 * @param password of the user
                 * @param stayAuthenticated set true, if the session token should get stored in a cookie, so that the session token can be reused for the next login
                 * @param done callback function once the request was successful
                 * @param error callback function in case an error occurred
                 */
                loginWithCredentials(email, password, stayAuthenticated, done, error) {
                    // log the user in
                    this.httpRequestor.postJsonData("http://localhost:3000/auth/login", null, {
                        // since the username is not allowed to include Capital letters we have to make sure that it does not
                        username: email.toLocaleLowerCase(),
                        password: password
                    }).subscribe((data) => {
                        // finish the authentication
                        this.finishAuthentication(data.token + ":" + data.password, stayAuthenticated, done, error);
                        logger_1.Logger.log("Authenticated.");
                    }, (errorObject) => {
                        // create error object to evaluate the error
                        let superLoginClientError = new super_login_client_error_1.SuperLoginClientError(errorObject);
                        // Log the Error
                        logger_1.Logger.error(superLoginClientError.getErrorMessage());
                        // call the error callback function
                        error(superLoginClientError);
                        logger_1.Logger.log("Authentication failed.");
                    });
                }
                /**
                 * This methods tries to authenticate the user with a given session token by checking
                 * if the given session token is still valid.
                 *
                 * @param sessionToken the session token which should be used for authentication
                 * @param stayAuthenticated set true, if the session token should get stored in a cookie, so that the session token can be reused for the next login
                 * @param done callback function once the request was successful
                 * @param error callback function in case an error occurred
                 *
                 * @returns {Observable<boolean>} returns true or false depending on if a valid session token could be loaded
                 */
                loginWithSessionToken(sessionToken, stayAuthenticated, done, error) {
                    // check if the given session token is valid
                    this.httpRequestor.getJsonData("http://localhost:3000/auth/session", sessionToken).subscribe(
                    // if session token is still valid
                        (data) => {
                        // finish the authentication
                        this.finishAuthentication(sessionToken, stayAuthenticated, done, error);
                        logger_1.Logger.log("Authenticated.");
                    }, 
                    // if session token is not valid anymore
                        (errorObject) => {
                        // call the error callback function
                        error(new super_login_client_error_1.SuperLoginClientError(errorObject));
                    });
                }
                /**
                 * This function should get called once the user got successfully authenticated.
                 * The function makes sure that the app gets provided with all the information it needs.
                 *
                 * @param sessionToken the valid session token for the users current session
                 * @param stayAuthenticated set true, if the session token should get stored in a cookie, so that the session token can be reused for the next login
                 * @param done callback function once the request was successful
                 * @param error callback function in case an error occurred
                 */
                finishAuthentication(sessionToken, stayAuthenticated, done, error) {
                    // set authenticated to true
                    this.authenticated = true;
                    // store the current session token
                    this.saveSessionToken(stayAuthenticated, sessionToken);
                    // extend the session token
                    this.extendSessionToken();
                    // providing the app with the URLs to the user databases
                    this.initializeUserDatabases(done, error);
                }
                /**
                 * This method loads all the database names of the users databases and passes those to the DatabaseInitializer.
                 *
                 * @param done callback function once the request was successful
                 * @param error callback function in case an error occurred
                 */
                initializeUserDatabases(done, error) {
                    // load the database names
                    this.httpRequestor.getJsonData("http://localhost:3000/auth/user-db/", this.getSessionToken()).subscribe(
                    // if the database names got loaded successfully
                        (data) => {
                        // give the database names to the database initializer
                        this.databaseInitializer.initializeDatabases(data);
                        done();
                    }, 
                    // in case of an error
                        (errorObject) => {
                        let superLoginClientError = new super_login_client_error_1.SuperLoginClientError(errorObject);
                        // call the error callback function
                        error(new super_login_client_error_1.SuperLoginClientError(errorObject));
                    });
                }
                ///////////////////////////////////////////////////////////////////////////////////////////////
                // OTHER METHODS FOR COMMUNICATING WITH SUPERLOGIN
                ///////////////////////////////////////////////////////////////////////////////////////////////
                /**
                 * The function uses superlogin-client to register the user with the given information. The user will not
                 * be logged in afterwards.
                 *
                 * @param firstName of the user
                 * @param email of the user
                 * @param password of the user
                 * @param done callback function once the request was successful
                 * @param error callback function in case an error occurred
                 */
                register(firstName, email, password, done, error) {
                    this.httpRequestor.postJsonData("http://localhost:3000/auth/register", null, {
                        firstName: firstName,
                        // since the username is not allowed to include Capital letters we have to make sure that it does not
                        email: email.toLocaleLowerCase(),
                        password: password,
                        confirmPassword: password
                    }).subscribe((data) => {
                        done();
                        logger_1.Logger.log("New account created.");
                    }, (errorObject) => {
                        let superLoginClientError = new super_login_client_error_1.SuperLoginClientError(errorObject);
                        // Log the Error
                        logger_1.Logger.error(superLoginClientError.getErrorMessage());
                        // call the error callback function
                        error(superLoginClientError);
                        logger_1.Logger.log("Could not create new account.");
                    });
                }
                /**
                 * The method logs out the user. The current session token gets invalid.
                 *
                 * @param done callback function once the request was successful
                 * @param error callback function in case an error occurred
                 */
                logout(done, error) {
                    this.httpRequestor.postJsonData("http://localhost:3000/auth/logout", this.getSessionToken(), {}).subscribe((data) => {
                        done();
                        this.authenticated = false;
                    }, (errorObject) => {
                        let superLoginClientError = new super_login_client_error_1.SuperLoginClientError(errorObject);
                        // Log the Error
                        logger_1.Logger.error(superLoginClientError.getErrorMessage());
                        // call the error callback function
                        error(superLoginClientError);
                    });
                }
                /**
                 * This function checks if a email is already in use.
                 *
                 * @param email
                 * @param trueCallback gets called if the email is already in use
                 * @param falseCallback gets called if the email is not yet in use
                 */
                isEmailInUse(email, trueCallback, falseCallback) {
                    this.httpRequestor.getJsonData("http://localhost:3000/auth/validateEmailUsername/" + email, null).subscribe((data) => {
                        trueCallback();
                    }, (errorObject) => {
                        let superLoginClientError = new super_login_client_error_1.SuperLoginClientError(errorObject);
                        // Log the Error
                        logger_1.Logger.error(superLoginClientError.getErrorMessage());
                        // check if error = email already in use
                        if (superLoginClientError.checkForError(super_login_client_error_1.SuperLoginClientError.AUTH_ERR_1)) {
                            falseCallback();
                        }
                    });
                }
                /**
                 * This method renews the current session token.
                 */
                extendSessionToken() {
                    this.httpRequestor.postJsonData("http://localhost:3000/auth/refresh/", this.getSessionToken(), {}).subscribe((data) => {
                        // all done successfully
                        logger_1.Logger.log("Session successfully extended.");
                    }, (errorObject) => {
                        let superLoginClientError = new super_login_client_error_1.SuperLoginClientError(errorObject);
                        // Log the Error
                        logger_1.Logger.log("Failed to extend session.");
                        logger_1.Logger.error(superLoginClientError.getErrorMessage());
                    });
                }
            };
            SuperLoginClient = SuperLoginClient_1 = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [superlogin_http_requestor_1.SuperloginHttpRequestor, super_login_client_database_initializer_1.SuperLoginClientDatabaseInitializer, router_1.Router, String])
            ], SuperLoginClient);
            exports_1("SuperLoginClient", SuperLoginClient);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC91dGlscy9zdXBlcl9sb2dpbl9jbGllbnQvc3VwZXJfbG9naW5fY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBVUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQXdCRztZQUVIOztnQkFzQkEsbUdBQW1HO2dCQUUvRjs7Ozs7OzttQkFPRztnQkFDSCxZQUFZLGFBQXNDLEVBQUUsbUJBQXdELEVBQUUsTUFBYyxFQUFFLGNBQXNCO29CQUNoSixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztvQkFDbkMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO29CQUMvQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztvQkFDckIsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7b0JBRXJDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO2dCQUMvQixDQUFDO2dCQXJDTCxrR0FBa0c7Z0JBRTlGLFdBQW1CLHdCQUF3QixLQUFZLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQSxDQUFDOztnQkFxQ25GLG1HQUFtRztnQkFFL0Y7Ozs7bUJBSUc7Z0JBQ0ksV0FBVztvQkFDZCxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUVaLDZDQUE2QztvQkFDN0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7d0JBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBR2hCLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0wsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLDhCQUE4QixFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFDaEQsTUFBTSxDQUFDLGVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRO2dDQUM5QixJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFLElB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RSxDQUFDO29CQUNuQixDQUFDLEVBQ0QsQ0FBQyxXQUFXO3dCQUNSLElBQUkscUJBQXFCLEdBQTBCLElBQUksZ0RBQXFCLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBRTFGLGdCQUFnQjt3QkFDaEIsZUFBTSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO3dCQUV0RCx3Q0FBd0M7d0JBQ3hDLEVBQUUsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxnREFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3hFLGFBQWEsRUFBRSxDQUFDO3dCQUNwQixDQUFDO29CQUNMLENBQUMsQ0FDTCxDQUFDO2dCQUNMLENBQUM7Z0JBRUQ7O21CQUVHO2dCQUNLLGtCQUFrQjtvQkFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMscUNBQXFDLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FDeEcsQ0FBQyxJQUFTO3dCQUNOLHdCQUF3Qjt3QkFDeEIsZUFBTSxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO29CQUNqRCxDQUFDLEVBQ0QsQ0FBQyxXQUFXO3dCQUNSLElBQUkscUJBQXFCLEdBQTBCLElBQUksZ0RBQXFCLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBRTFGLGdCQUFnQjt3QkFDaEIsZUFBTSxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO3dCQUN4QyxlQUFNLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7b0JBQzFELENBQUMsQ0FDSixDQUFDO2dCQUNOLENBQUM7WUFDTCxDQUFDO1lBdFlEO2dCQUFDLGlCQUFVLEVBQUU7O2dDQUFBO1lBQ2IsK0NBcVlDLENBQUEiLCJmaWxlIjoic2hhcmVkL3V0aWxzL3N1cGVyX2xvZ2luX2NsaWVudC9zdXBlcl9sb2dpbl9jbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NhbkFjdGl2YXRlLCBSb3V0ZXJ9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge1N1cGVybG9naW5IdHRwUmVxdWVzdG9yfSBmcm9tIFwiLi9zdXBlcmxvZ2luX2h0dHBfcmVxdWVzdG9yXCI7XHJcbmltcG9ydCB7U3VwZXJMb2dpbkNsaWVudEVycm9yfSBmcm9tIFwiLi9zdXBlcl9sb2dpbl9jbGllbnRfZXJyb3JcIjtcclxuaW1wb3J0IHtTdXBlckxvZ2luQ2xpZW50RG9uZVJlc3BvbnNlfSBmcm9tIFwiLi9zdXBlcl9sb2dpbl9jbGllbnRfZG9uZV9yZXBvbnNlXCI7XHJcbmltcG9ydCB7U3VwZXJMb2dpbkNsaWVudEVycm9yUmVzcG9uc2V9IGZyb20gXCIuL3N1cGVyX2xvZ2luX2NsaWVudF9lcnJvcl9yZXBvbnNlXCI7XHJcbmltcG9ydCB7TG9nZ2VyfSBmcm9tIFwiLi4vbG9nZ2VyXCI7XHJcbmltcG9ydCB7U3VwZXJMb2dpbkNsaWVudERhdGFiYXNlSW5pdGlhbGl6ZXJ9IGZyb20gXCIuL3N1cGVyX2xvZ2luX2NsaWVudF9kYXRhYmFzZV9pbml0aWFsaXplclwiO1xyXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzL1J4XCI7XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpcyBhIHNlcnZpY2Ugd2hpY2ggaW1wbGVtZW50cyBUeXBlU2NyaXB0IG1ldGhvZHMgdG8gY29tbXVuaWNhdGVcclxuICogd2l0aCB0aGUgU2VydmVyTG9naW4gQVBJIHJ1bm5pbmcgb24gdGhlIHNlcnZlci5cclxuICpcclxuICogVGhlIHB1cnBvc2VzIG9mIHRoZSBjbGFzcyBhcmU6XHJcbiAqICAxKSByZWdpc3RlciB1c2Vyc1xyXG4gKiAgMikgbG9naW4gdXNlcnMgLS0+IGluaXRpYWxpemVzIHRoZSBhbGwgZGF0YWJhc2VzIHVzZWQgYnkgdGhlIGFwcCBieSBjYWxsaW5nIGEgaW5pdGlhbGl6ZSBmdW5jdGlvblxyXG4gKiAgMykgbG9nb3V0IHVzZXJzXHJcbiAqICA0KSBjaGVjayBpZiB1c2VyIGlzIGxvZ2dlZCBpblxyXG4gKiAgNSkgcmVuZXcgY29ubmVjdGlvbiB0aGF0IHRoYXQgc2Vzc2lvbiBkb2VzIG5vdCBlbmQgYmVmb3JlIHVzZXIgaXMgZG9uZVxyXG4gKiAgNikgY2hhbmdlIHBhc3N3b3JkIG9yIGVtYWlsXHJcbiAqXHJcbiAqXHJcbiAqICBIb3cgdGhlIGNsYXNzIGhhbmRsZXMgYXV0aGVudGljYXRpb246XHJcbiAqICAgICAgMSkgdXNlciBsb2dzIGluIHdpdGggaGlzIGNyZWRlbnRpYWxzIHdoaWNoIHRoaXMgY2xhc3Mgc2VuZHMgdG8gdGhlIHNlcnZlciB0byB2ZXJpZnkgdGhlIGNyZWRlbnRpYWxzXHJcbiAqICAgICAgMikgc2VydmVyIHJldHVybnMgYSBzZXNzaW9uIHRva2VuIHdoaWNoIGNhbiBiZSB1c2VkIGZyb20ga25vdyBvbiB0aGUgYXV0aGVudGljYXRlIHRoZSB1c2VyXHJcbiAqICAgICAgMykgdGhlIHNlc3Npb24gdG9rZW4gZ2V0cyBzdG9yZWQgaW4uLi5cclxuICogICAgICAgICAgYSkgdGhlIHNlc3Npb24gc3RvcmFnZSBpbiBjYXNlIHRoZSB1c2VyIGRvZXMgbm90IHdhbnQgdGhlIGFwcCB0byByZW1lbWJlciB0aGUgbG9naW5cclxuICogICAgICAgICAgYikgdGhlIGxvY2FsIHN0b3JhZ2UgaW4gY2FzZSB0aGUgdXNlciB3YW50cyB0aGUgYXBwIHRvIHJlbWVtYmVyIHRoZSBsb2dpblxyXG4gKiAgICAgIDQpIHVzZXIgbGVhdmVzIHRoZSBwYWdlL2FwcFxyXG4gKiAgICAgICAgICBhKSB0aGUgdXNlciB3aWxsIGJlIGxvZ2dlZCBvdXQgKHNlc3Npb24gdG9rZW4gYmVjb21lcyBpbnZhbGlkKVxyXG4gKiAgICAgICAgICBiKSBpZiB0aGUgdXNlciB3YW50cyB0aGUgYXBwIHRvIHJlbWVtYmVyIHRoZSBsb2dpbiwgdGhlIHVzZXIgZG9lcyBub3QgZ2V0IGxvZ2dlZCBvdXRcclxuICpcclxuICogVGhlIFNlcnZpY2UgY2FuIG9ubHkgaGFuZGxlIG9uZSBsb2dpbiBhdCBhIHRpbWUhXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTdXBlckxvZ2luQ2xpZW50IGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9Db25zdGFudHMvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXQgU0VTU0lPTl9UT0tFTl9TVE9SQUdFX0lEKCk6IHN0cmluZyB7cmV0dXJuICdzZXNzaW9uX3Rva2VuJzt9O1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9Qcm9wZXJ0aWVzLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvKiogcHJvdmlkZXMgZnVuY3Rpb25zIHRvIGVhc2lseSBwZXJmb3JtIGh0dHAgcmVxdWVzdHMgKi9cclxuICAgIHByaXZhdGUgaHR0cFJlcXVlc3RvcjogU3VwZXJsb2dpbkh0dHBSZXF1ZXN0b3I7XHJcblxyXG4gICAgLyoqIHRoZSByb3V0ZXIgd2hpY2ggYWxsb3dzIHJvdXRpbmcgKi9cclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXI7XHJcbiAgICAvKiogdGhlIHJvdXRlIGluIHRoZSBhcHBsaWNhdGlvbiB0byB0aGUgbG9naW4gcGFnZSAqL1xyXG4gICAgcHJpdmF0ZSBsb2dpblBhZ2VSb3V0ZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKiBkZWZpbmVzIGEgZnVuY3Rpb24gd2hpY2ggZ2V0cyBjYWxsZWQgdG8gICovXHJcbiAgICBwcml2YXRlIGRhdGFiYXNlSW5pdGlhbGl6ZXI6IFN1cGVyTG9naW5DbGllbnREYXRhYmFzZUluaXRpYWxpemVyO1xyXG5cclxuICAgIC8qKiBpbmRpY2F0ZXMgaWYgdGhlIHVzZXIgaXMgY3VycmVudGx5IGF1dGhlbnRpY2F0ZWQgKi9cclxuICAgIHByaXZhdGUgYXV0aGVudGljYXRlZDogYm9vbGVhbjtcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vQ29uc3RydWN0b3IvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0b3Igb2YgdGhlIGNsYXNzIFN1cGVyTG9naW5DbGllbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGh0dHBSZXF1ZXN0b3JcclxuICAgICAqIEBwYXJhbSBkYXRhYmFzZUluaXRpYWxpemVyXHJcbiAgICAgKiBAcGFyYW0gcm91dGVyXHJcbiAgICAgKiBAcGFyYW0gbG9naW5QYWdlUm91dGUgdGhlIHJvdXQgd2hpY2ggcG9pbnRzIGF0IHRoZSBsb2dpbiBwYWdlIC0gdGhhdCBpcyB3aGVyZSBub3QgeWV0IGF1dGhlbnRpY2F0ZWQgdXNlcnMgZ2V0IGRpcmVjdGVkIHRvXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGh0dHBSZXF1ZXN0b3I6IFN1cGVybG9naW5IdHRwUmVxdWVzdG9yLCBkYXRhYmFzZUluaXRpYWxpemVyOiBTdXBlckxvZ2luQ2xpZW50RGF0YWJhc2VJbml0aWFsaXplciwgcm91dGVyOiBSb3V0ZXIsIGxvZ2luUGFnZVJvdXRlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmh0dHBSZXF1ZXN0b3IgPSBodHRwUmVxdWVzdG9yO1xyXG4gICAgICAgIHRoaXMuZGF0YWJhc2VJbml0aWFsaXplciA9IGRhdGFiYXNlSW5pdGlhbGl6ZXI7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XHJcbiAgICAgICAgdGhpcy5sb2dpblBhZ2VSb3V0ZSA9IGxvZ2luUGFnZVJvdXRlO1xyXG5cclxuICAgICAgICB0aGlzLmF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9Jbmhlcml0ZWQgTWV0aG9kcy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogIFRoaXMgbWV0aG9kIGNoZWNrcyBpZiB0aGUgdXNlciBpcyBhbHJlYWR5IGF1dGhlbnRpY2F0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMgdHJ1ZSBvciBmYWxzZSBkZXBlbmRpbmcgb24gaWYgdGhlIHVzZXIgaXMgYWxyZWFkeSBhdXRoZW50aWNhdGVkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjYW5BY3RpdmF0ZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHwgYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSB1c2VyIGlzIGFscmVhZHkgYXV0aGVudGljYXRlZFxyXG4gICAgICAgIGlmICh0aGlzLmF1dGhlbnRpY2F0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZSB1c2VyIGlzIG5vdCB5ZXQgYXV0aGVudGljYXRlZCB0cnkgdG8gYXV0aGVudGljYXRlIGhpbSBieSB1c2luZyB0aGUgc2Vzc2lvbi9sb2NhbCBzdG9yYWdlIGRhdGFcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgIGlmICh0aGlzLmlzU2Vzc2lvblRva2VuU3RvcmVkUGVyc2lzdGVudCgpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpbldpdGhTZXNzaW9uVG9rZW4odGhpcy5nZXRTZXNzaW9uVG9rZW4oKSwgdGhpcy5pc1Nlc3Npb25Ub2tlblN0b3JlZFBlcnNpc3RlbnQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVuZCB0aGUgb2JzZXJ2YWJsZSBhbmQgcmV0dXJuIHRoZSByZXN1bHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgIChlcnJvcjogU3VwZXJMb2dpbkNsaWVudEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgaW52YWxpZCBzZXNzaW9uIHRva2VuIHN0b3JlZCBpbiB0aGUgc2Vzc2lvbi9sb2NhbCBzdG9yYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlU2Vzc2lvblRva2VuKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlbmQgdGhlIG9ic2VydmFibGUgYW5kIHJldHVybiB0aGUgcmVzdWx0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcm91dGUgdGhlIHVzZXIgdG8gdGhlIGxvZ2luIHBhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMubG9naW5QYWdlUm91dGVdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAvLyByb3V0ZSB0aGUgdXNlciB0byB0aGUgbG9naW4gcGFnZVxyXG4gICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5sb2dpblBhZ2VSb3V0ZV0pO1xyXG5cclxuICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9NZXRob2RzLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gTUVUSE9EUyBUTyBTVE9SRSBTRVNTSU9OIFRPS0VOIElOIFRIRSBMT0NBTCBPUiBTRVNTSU9OIFNUT1JBR0VcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbWV0aG9kIHNhdmVzIGEgc2Vzc2lvbiB0b2tlbiBpbiBlaXRoZXIgdGhlIGxvY2FsIG9yIHNlc3Npb24gc3RvcmFnZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGVyc2lzdGVudCBpbmRpY2F0ZWQgaWYgdGhlIGRhdGEgc2hvdWxkIGJlIHN0b3JlZCBzbyB0aGF0IGl0IGFsc28gZXhpc3RzIGFmdGVyIHRoZSBicm93c2VyIHNlc3Npb24gKGFmdGVyIGFuIGJyb3dzZXIgcmVzdGFydClcclxuICAgICAqIEBwYXJhbSBzZXNzaW9uVG9rZW4gdGhlIHRva2VuIHRoYXQgc2hvdWxkIGdldCBzdG9yZWRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzYXZlU2Vzc2lvblRva2VuKHBlcnNpc3RlbnQ6IGJvb2xlYW4sIHNlc3Npb25Ub2tlbjogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8gcmVtb3ZlIGFsbCBjdXJyZW50IHNhdmluZ3NcclxuICAgICAgICB0aGlzLmRlbGV0ZVNlc3Npb25Ub2tlbigpO1xyXG5cclxuICAgICAgICAvLyBzYXZlIHRoZSBzZXNzaW9uIHRva2VuXHJcbiAgICAgICAgaWYgKHBlcnNpc3RlbnQpIHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFN1cGVyTG9naW5DbGllbnQuU0VTU0lPTl9UT0tFTl9TVE9SQUdFX0lELCBzZXNzaW9uVG9rZW4pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFN1cGVyTG9naW5DbGllbnQuU0VTU0lPTl9UT0tFTl9TVE9SQUdFX0lELCBzZXNzaW9uVG9rZW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIHJlbW92ZXMgYWxsIHNlc3Npb24gdG9rZW4gZGF0YSBvdXQgb2YgdGhlIHNlc3Npb24gYW5kIGxvY2FsIHN0b3JhZ2UuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGVsZXRlU2Vzc2lvblRva2VuKCkge1xyXG4gICAgICAgIC8vIGRlbGV0ZSBzZXNzaW9uIHRva2VuIGZyb20gdGhlIHNlc3Npb24gc3RvcmFnZVxyXG4gICAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFN1cGVyTG9naW5DbGllbnQuU0VTU0lPTl9UT0tFTl9TVE9SQUdFX0lEKTtcclxuXHJcbiAgICAgICAgLy8gZGVsZXRlIHNlc3Npb24gdG9rZW4gZnJvbSB0aGUgbG9jYWwgc3RvcmFnZVxyXG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShTdXBlckxvZ2luQ2xpZW50LlNFU1NJT05fVE9LRU5fU1RPUkFHRV9JRCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBjaGVja3MgaWYgdGhlIHNlc3Npb24gdG9rZW4gZ2V0cyBzdG9yZWQgcGVyc2lzdGVudCBpbiB0aGUgbG9jYWwgc3RvcmFnZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB0cnVlID0gbG9jYWwgc3RvcmFnZSwgZmFsc2UgPSBzZXNzaW9uIHN0b3JhZ2UsIG51bGwgPSBubyBzZXNzaW9uIHRva2VuIGdldHMgc3RvcmVkIGF0IGFsbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzU2Vzc2lvblRva2VuU3RvcmVkUGVyc2lzdGVudCgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFN1cGVyTG9naW5DbGllbnQuU0VTU0lPTl9UT0tFTl9TVE9SQUdFX0lEKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFN1cGVyTG9naW5DbGllbnQuU0VTU0lPTl9UT0tFTl9TVE9SQUdFX0lEKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBzZXNzaW9uIHRva2VuIG91dCBvZiB0aGUgc2Vzc2lvbiBvciBsb2NhbCBzdG9yYWdlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgY3VycmVudCBzZXNzaW9uIHRva2VuIG9yIG51bGwgaW4gY2FzZSBubyBzZXNzaW9uIHRva2VuIGlzIHN0b3JlZCBpbiB0aGUgc3RvcmFnZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFNlc3Npb25Ub2tlbigpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBpc1Nlc3Npb25Ub2tlblN0b3JlZFBlcnNpc3RlbnQgPSB0aGlzLmlzU2Vzc2lvblRva2VuU3RvcmVkUGVyc2lzdGVudCgpO1xyXG5cclxuICAgICAgICAvLyBjaGVjayBpZiBhIHNlc3Npb24gdG9rZW4gZ290IHN0b3JlZCBhbnl3aGVyZVxyXG4gICAgICAgIGlmIChpc1Nlc3Npb25Ub2tlblN0b3JlZFBlcnNpc3RlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAvLyBpZiB0aGUgc2Vzc2lvbiB0b2tlbiBnZXRzIHN0b3JlZCBwZXJzaXN0ZW50IHJldHVybiB0aGUgdmFsdWUgb2YgdGhlIGxvY2FsIHN0b3JhZ2VcclxuICAgICAgICAgICAgaWYgKGlzU2Vzc2lvblRva2VuU3RvcmVkUGVyc2lzdGVudCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShTdXBlckxvZ2luQ2xpZW50LlNFU1NJT05fVE9LRU5fU1RPUkFHRV9JRCk7XHJcblxyXG4gICAgICAgICAgICAvLyBpZiB0aGUgc2Vzc2lvbiB0b2tlbiBnZXRzIG5vdCBzdG9yZWQgcGVyc2lzdGVudCByZXR1cm4gdGhlIHZhbHVlIG9mIHRoZSBzZXNzaW9uIHN0b3JhZ2VcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShTdXBlckxvZ2luQ2xpZW50LlNFU1NJT05fVE9LRU5fU1RPUkFHRV9JRCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaWYgbm8gc2Vzc2lvbiB0b2tlbiBnb3Qgc3RvcmVkIGF0IGFsbFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gTUVUSE9EUyBUTyBMT0dJTiBUSEUgVVNFUlxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBmdW5jdGlvbiB1c2VzIHN1cGVybG9naW4tY2xpZW50IHRvIGxvZ2luIHRoZSB1c2VyIHdpdGhlIHRoZSBnaXZlbiBjcmVkZW50aWFscy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZW1haWwgb2YgdGhlIHVzZXJcclxuICAgICAqIEBwYXJhbSBwYXNzd29yZCBvZiB0aGUgdXNlclxyXG4gICAgICogQHBhcmFtIHN0YXlBdXRoZW50aWNhdGVkIHNldCB0cnVlLCBpZiB0aGUgc2Vzc2lvbiB0b2tlbiBzaG91bGQgZ2V0IHN0b3JlZCBpbiBhIGNvb2tpZSwgc28gdGhhdCB0aGUgc2Vzc2lvbiB0b2tlbiBjYW4gYmUgcmV1c2VkIGZvciB0aGUgbmV4dCBsb2dpblxyXG4gICAgICogQHBhcmFtIGRvbmUgY2FsbGJhY2sgZnVuY3Rpb24gb25jZSB0aGUgcmVxdWVzdCB3YXMgc3VjY2Vzc2Z1bFxyXG4gICAgICogQHBhcmFtIGVycm9yIGNhbGxiYWNrIGZ1bmN0aW9uIGluIGNhc2UgYW4gZXJyb3Igb2NjdXJyZWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvZ2luV2l0aENyZWRlbnRpYWxzKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcsIHN0YXlBdXRoZW50aWNhdGVkOiBib29sZWFuLCBkb25lOiBTdXBlckxvZ2luQ2xpZW50RG9uZVJlc3BvbnNlLCBlcnJvcjogU3VwZXJMb2dpbkNsaWVudEVycm9yUmVzcG9uc2UpICB7XHJcbiAgICAgICAgLy8gbG9nIHRoZSB1c2VyIGluXHJcbiAgICAgICAgdGhpcy5odHRwUmVxdWVzdG9yLnBvc3RKc29uRGF0YShcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hdXRoL2xvZ2luXCIsIG51bGwsIHtcclxuICAgICAgICAgICAgLy8gc2luY2UgdGhlIHVzZXJuYW1lIGlzIG5vdCBhbGxvd2VkIHRvIGluY2x1ZGUgQ2FwaXRhbCBsZXR0ZXJzIHdlIGhhdmUgdG8gbWFrZSBzdXJlIHRoYXQgaXQgZG9lcyBub3RcclxuICAgICAgICAgICAgdXNlcm5hbWU6IGVtYWlsLnRvTG9jYWxlTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxyXG4gICAgICAgIH0pLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gZmluaXNoIHRoZSBhdXRoZW50aWNhdGlvblxyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5pc2hBdXRoZW50aWNhdGlvbihkYXRhLnRva2VuICsgXCI6XCIgKyBkYXRhLnBhc3N3b3JkLCBzdGF5QXV0aGVudGljYXRlZCwgZG9uZSwgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIkF1dGhlbnRpY2F0ZWQuXCIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoZXJyb3JPYmplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBlcnJvciBvYmplY3QgdG8gZXZhbHVhdGUgdGhlIGVycm9yXHJcbiAgICAgICAgICAgICAgICBsZXQgc3VwZXJMb2dpbkNsaWVudEVycm9yOiBTdXBlckxvZ2luQ2xpZW50RXJyb3IgPSBuZXcgU3VwZXJMb2dpbkNsaWVudEVycm9yKGVycm9yT2JqZWN0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBMb2cgdGhlIEVycm9yXHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3Ioc3VwZXJMb2dpbkNsaWVudEVycm9yLmdldEVycm9yTWVzc2FnZSgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjYWxsIHRoZSBlcnJvciBjYWxsYmFjayBmdW5jdGlvblxyXG4gICAgICAgICAgICAgICAgZXJyb3Ioc3VwZXJMb2dpbkNsaWVudEVycm9yKTtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJBdXRoZW50aWNhdGlvbiBmYWlsZWQuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kcyB0cmllcyB0byBhdXRoZW50aWNhdGUgdGhlIHVzZXIgd2l0aCBhIGdpdmVuIHNlc3Npb24gdG9rZW4gYnkgY2hlY2tpbmdcclxuICAgICAqIGlmIHRoZSBnaXZlbiBzZXNzaW9uIHRva2VuIGlzIHN0aWxsIHZhbGlkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBzZXNzaW9uVG9rZW4gdGhlIHNlc3Npb24gdG9rZW4gd2hpY2ggc2hvdWxkIGJlIHVzZWQgZm9yIGF1dGhlbnRpY2F0aW9uXHJcbiAgICAgKiBAcGFyYW0gc3RheUF1dGhlbnRpY2F0ZWQgc2V0IHRydWUsIGlmIHRoZSBzZXNzaW9uIHRva2VuIHNob3VsZCBnZXQgc3RvcmVkIGluIGEgY29va2llLCBzbyB0aGF0IHRoZSBzZXNzaW9uIHRva2VuIGNhbiBiZSByZXVzZWQgZm9yIHRoZSBuZXh0IGxvZ2luXHJcbiAgICAgKiBAcGFyYW0gZG9uZSBjYWxsYmFjayBmdW5jdGlvbiBvbmNlIHRoZSByZXF1ZXN0IHdhcyBzdWNjZXNzZnVsXHJcbiAgICAgKiBAcGFyYW0gZXJyb3IgY2FsbGJhY2sgZnVuY3Rpb24gaW4gY2FzZSBhbiBlcnJvciBvY2N1cnJlZFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGJvb2xlYW4+fSByZXR1cm5zIHRydWUgb3IgZmFsc2UgZGVwZW5kaW5nIG9uIGlmIGEgdmFsaWQgc2Vzc2lvbiB0b2tlbiBjb3VsZCBiZSBsb2FkZWRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsb2dpbldpdGhTZXNzaW9uVG9rZW4oc2Vzc2lvblRva2VuOiBzdHJpbmcsIHN0YXlBdXRoZW50aWNhdGVkOiBib29sZWFuLCBkb25lOiBTdXBlckxvZ2luQ2xpZW50RG9uZVJlc3BvbnNlLCBlcnJvcjogU3VwZXJMb2dpbkNsaWVudEVycm9yUmVzcG9uc2UpIHtcclxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgZ2l2ZW4gc2Vzc2lvbiB0b2tlbiBpcyB2YWxpZFxyXG4gICAgICAgIHRoaXMuaHR0cFJlcXVlc3Rvci5nZXRKc29uRGF0YShcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hdXRoL3Nlc3Npb25cIiwgc2Vzc2lvblRva2VuKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIC8vIGlmIHNlc3Npb24gdG9rZW4gaXMgc3RpbGwgdmFsaWRcclxuICAgICAgICAgICAgKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gZmluaXNoIHRoZSBhdXRoZW50aWNhdGlvblxyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5pc2hBdXRoZW50aWNhdGlvbihzZXNzaW9uVG9rZW4sIHN0YXlBdXRoZW50aWNhdGVkLCBkb25lLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwiQXV0aGVudGljYXRlZC5cIik7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAvLyBpZiBzZXNzaW9uIHRva2VuIGlzIG5vdCB2YWxpZCBhbnltb3JlXHJcbiAgICAgICAgICAgIChlcnJvck9iamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY2FsbCB0aGUgZXJyb3IgY2FsbGJhY2sgZnVuY3Rpb25cclxuICAgICAgICAgICAgICAgIGVycm9yKG5ldyBTdXBlckxvZ2luQ2xpZW50RXJyb3IoZXJyb3JPYmplY3QpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBzaG91bGQgZ2V0IGNhbGxlZCBvbmNlIHRoZSB1c2VyIGdvdCBzdWNjZXNzZnVsbHkgYXV0aGVudGljYXRlZC5cclxuICAgICAqIFRoZSBmdW5jdGlvbiBtYWtlcyBzdXJlIHRoYXQgdGhlIGFwcCBnZXRzIHByb3ZpZGVkIHdpdGggYWxsIHRoZSBpbmZvcm1hdGlvbiBpdCBuZWVkcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gc2Vzc2lvblRva2VuIHRoZSB2YWxpZCBzZXNzaW9uIHRva2VuIGZvciB0aGUgdXNlcnMgY3VycmVudCBzZXNzaW9uXHJcbiAgICAgKiBAcGFyYW0gc3RheUF1dGhlbnRpY2F0ZWQgc2V0IHRydWUsIGlmIHRoZSBzZXNzaW9uIHRva2VuIHNob3VsZCBnZXQgc3RvcmVkIGluIGEgY29va2llLCBzbyB0aGF0IHRoZSBzZXNzaW9uIHRva2VuIGNhbiBiZSByZXVzZWQgZm9yIHRoZSBuZXh0IGxvZ2luXHJcbiAgICAgKiBAcGFyYW0gZG9uZSBjYWxsYmFjayBmdW5jdGlvbiBvbmNlIHRoZSByZXF1ZXN0IHdhcyBzdWNjZXNzZnVsXHJcbiAgICAgKiBAcGFyYW0gZXJyb3IgY2FsbGJhY2sgZnVuY3Rpb24gaW4gY2FzZSBhbiBlcnJvciBvY2N1cnJlZFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGZpbmlzaEF1dGhlbnRpY2F0aW9uKHNlc3Npb25Ub2tlbjogc3RyaW5nLCBzdGF5QXV0aGVudGljYXRlZDogYm9vbGVhbiwgZG9uZTogU3VwZXJMb2dpbkNsaWVudERvbmVSZXNwb25zZSwgZXJyb3I6IFN1cGVyTG9naW5DbGllbnRFcnJvclJlc3BvbnNlKSB7XHJcbiAgICAgICAgLy8gc2V0IGF1dGhlbnRpY2F0ZWQgdG8gdHJ1ZVxyXG4gICAgICAgIHRoaXMuYXV0aGVudGljYXRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIHN0b3JlIHRoZSBjdXJyZW50IHNlc3Npb24gdG9rZW5cclxuICAgICAgICB0aGlzLnNhdmVTZXNzaW9uVG9rZW4oc3RheUF1dGhlbnRpY2F0ZWQsIHNlc3Npb25Ub2tlbik7XHJcblxyXG4gICAgICAgIC8vIGV4dGVuZCB0aGUgc2Vzc2lvbiB0b2tlblxyXG4gICAgICAgIHRoaXMuZXh0ZW5kU2Vzc2lvblRva2VuKCk7XHJcblxyXG4gICAgICAgIC8vIHByb3ZpZGluZyB0aGUgYXBwIHdpdGggdGhlIFVSTHMgdG8gdGhlIHVzZXIgZGF0YWJhc2VzXHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplVXNlckRhdGFiYXNlcyhkb25lLCBlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBsb2FkcyBhbGwgdGhlIGRhdGFiYXNlIG5hbWVzIG9mIHRoZSB1c2VycyBkYXRhYmFzZXMgYW5kIHBhc3NlcyB0aG9zZSB0byB0aGUgRGF0YWJhc2VJbml0aWFsaXplci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZG9uZSBjYWxsYmFjayBmdW5jdGlvbiBvbmNlIHRoZSByZXF1ZXN0IHdhcyBzdWNjZXNzZnVsXHJcbiAgICAgKiBAcGFyYW0gZXJyb3IgY2FsbGJhY2sgZnVuY3Rpb24gaW4gY2FzZSBhbiBlcnJvciBvY2N1cnJlZFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVVc2VyRGF0YWJhc2VzKGRvbmU6IFN1cGVyTG9naW5DbGllbnREb25lUmVzcG9uc2UsIGVycm9yOiBTdXBlckxvZ2luQ2xpZW50RXJyb3JSZXNwb25zZSk6IHZvaWQge1xyXG4gICAgICAgIC8vIGxvYWQgdGhlIGRhdGFiYXNlIG5hbWVzXHJcbiAgICAgICAgdGhpcy5odHRwUmVxdWVzdG9yLmdldEpzb25EYXRhKFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2F1dGgvdXNlci1kYi9cIiwgdGhpcy5nZXRTZXNzaW9uVG9rZW4oKSkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAvLyBpZiB0aGUgZGF0YWJhc2UgbmFtZXMgZ290IGxvYWRlZCBzdWNjZXNzZnVsbHlcclxuICAgICAgICAgICAgKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gZ2l2ZSB0aGUgZGF0YWJhc2UgbmFtZXMgdG8gdGhlIGRhdGFiYXNlIGluaXRpYWxpemVyXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlSW5pdGlhbGl6ZXIuaW5pdGlhbGl6ZURhdGFiYXNlcyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIGRvbmUoKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8vIGluIGNhc2Ugb2YgYW4gZXJyb3JcclxuICAgICAgICAgICAgKGVycm9yT2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3VwZXJMb2dpbkNsaWVudEVycm9yOiBTdXBlckxvZ2luQ2xpZW50RXJyb3IgPSBuZXcgU3VwZXJMb2dpbkNsaWVudEVycm9yKGVycm9yT2JqZWN0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjYWxsIHRoZSBlcnJvciBjYWxsYmFjayBmdW5jdGlvblxyXG4gICAgICAgICAgICAgICAgZXJyb3IobmV3IFN1cGVyTG9naW5DbGllbnRFcnJvcihlcnJvck9iamVjdCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIE9USEVSIE1FVEhPRFMgRk9SIENPTU1VTklDQVRJTkcgV0lUSCBTVVBFUkxPR0lOXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGZ1bmN0aW9uIHVzZXMgc3VwZXJsb2dpbi1jbGllbnQgdG8gcmVnaXN0ZXIgdGhlIHVzZXIgd2l0aCB0aGUgZ2l2ZW4gaW5mb3JtYXRpb24uIFRoZSB1c2VyIHdpbGwgbm90XHJcbiAgICAgKiBiZSBsb2dnZWQgaW4gYWZ0ZXJ3YXJkcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZmlyc3ROYW1lIG9mIHRoZSB1c2VyXHJcbiAgICAgKiBAcGFyYW0gZW1haWwgb2YgdGhlIHVzZXJcclxuICAgICAqIEBwYXJhbSBwYXNzd29yZCBvZiB0aGUgdXNlclxyXG4gICAgICogQHBhcmFtIGRvbmUgY2FsbGJhY2sgZnVuY3Rpb24gb25jZSB0aGUgcmVxdWVzdCB3YXMgc3VjY2Vzc2Z1bFxyXG4gICAgICogQHBhcmFtIGVycm9yIGNhbGxiYWNrIGZ1bmN0aW9uIGluIGNhc2UgYW4gZXJyb3Igb2NjdXJyZWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlZ2lzdGVyKGZpcnN0TmFtZTogc3RyaW5nLCBlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nLCBkb25lOiBTdXBlckxvZ2luQ2xpZW50RG9uZVJlc3BvbnNlLCBlcnJvcjogU3VwZXJMb2dpbkNsaWVudEVycm9yUmVzcG9uc2UpIHtcclxuICAgICAgICB0aGlzLmh0dHBSZXF1ZXN0b3IucG9zdEpzb25EYXRhKFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2F1dGgvcmVnaXN0ZXJcIiwgbnVsbCwge1xyXG4gICAgICAgICAgICBmaXJzdE5hbWU6IGZpcnN0TmFtZSxcclxuICAgICAgICAgICAgLy8gc2luY2UgdGhlIHVzZXJuYW1lIGlzIG5vdCBhbGxvd2VkIHRvIGluY2x1ZGUgQ2FwaXRhbCBsZXR0ZXJzIHdlIGhhdmUgdG8gbWFrZSBzdXJlIHRoYXQgaXQgZG9lcyBub3RcclxuICAgICAgICAgICAgZW1haWw6IGVtYWlsLnRvTG9jYWxlTG93ZXJDYXNlKCksXHJcbiAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcclxuICAgICAgICAgICAgY29uZmlybVBhc3N3b3JkOiBwYXNzd29yZFxyXG4gICAgICAgIH0pLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZG9uZSgpO1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIk5ldyBhY2NvdW50IGNyZWF0ZWQuXCIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoZXJyb3JPYmplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBzdXBlckxvZ2luQ2xpZW50RXJyb3I6IFN1cGVyTG9naW5DbGllbnRFcnJvciA9IG5ldyBTdXBlckxvZ2luQ2xpZW50RXJyb3IoZXJyb3JPYmplY3QpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIExvZyB0aGUgRXJyb3JcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihzdXBlckxvZ2luQ2xpZW50RXJyb3IuZ2V0RXJyb3JNZXNzYWdlKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNhbGwgdGhlIGVycm9yIGNhbGxiYWNrIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgICAgICBlcnJvcihzdXBlckxvZ2luQ2xpZW50RXJyb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJDb3VsZCBub3QgY3JlYXRlIG5ldyBhY2NvdW50LlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbWV0aG9kIGxvZ3Mgb3V0IHRoZSB1c2VyLiBUaGUgY3VycmVudCBzZXNzaW9uIHRva2VuIGdldHMgaW52YWxpZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZG9uZSBjYWxsYmFjayBmdW5jdGlvbiBvbmNlIHRoZSByZXF1ZXN0IHdhcyBzdWNjZXNzZnVsXHJcbiAgICAgKiBAcGFyYW0gZXJyb3IgY2FsbGJhY2sgZnVuY3Rpb24gaW4gY2FzZSBhbiBlcnJvciBvY2N1cnJlZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9nb3V0KGRvbmU6IFN1cGVyTG9naW5DbGllbnREb25lUmVzcG9uc2UsIGVycm9yOiBTdXBlckxvZ2luQ2xpZW50RXJyb3JSZXNwb25zZSkgIHtcclxuICAgICAgICB0aGlzLmh0dHBSZXF1ZXN0b3IucG9zdEpzb25EYXRhKFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2F1dGgvbG9nb3V0XCIsIHRoaXMuZ2V0U2Vzc2lvblRva2VuKCksIHt9KS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGRvbmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0aGVudGljYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoZXJyb3JPYmplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBzdXBlckxvZ2luQ2xpZW50RXJyb3I6IFN1cGVyTG9naW5DbGllbnRFcnJvciA9IG5ldyBTdXBlckxvZ2luQ2xpZW50RXJyb3IoZXJyb3JPYmplY3QpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIExvZyB0aGUgRXJyb3JcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihzdXBlckxvZ2luQ2xpZW50RXJyb3IuZ2V0RXJyb3JNZXNzYWdlKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNhbGwgdGhlIGVycm9yIGNhbGxiYWNrIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgICAgICBlcnJvcihzdXBlckxvZ2luQ2xpZW50RXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNoZWNrcyBpZiBhIGVtYWlsIGlzIGFscmVhZHkgaW4gdXNlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlbWFpbFxyXG4gICAgICogQHBhcmFtIHRydWVDYWxsYmFjayBnZXRzIGNhbGxlZCBpZiB0aGUgZW1haWwgaXMgYWxyZWFkeSBpbiB1c2VcclxuICAgICAqIEBwYXJhbSBmYWxzZUNhbGxiYWNrIGdldHMgY2FsbGVkIGlmIHRoZSBlbWFpbCBpcyBub3QgeWV0IGluIHVzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNFbWFpbEluVXNlKGVtYWlsOiBzdHJpbmcsIHRydWVDYWxsYmFjazogU3VwZXJMb2dpbkNsaWVudERvbmVSZXNwb25zZSwgZmFsc2VDYWxsYmFjazogU3VwZXJMb2dpbkNsaWVudERvbmVSZXNwb25zZSkge1xyXG4gICAgICAgIHRoaXMuaHR0cFJlcXVlc3Rvci5nZXRKc29uRGF0YShcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hdXRoL3ZhbGlkYXRlRW1haWxVc2VybmFtZS9cIiArIGVtYWlsLCBudWxsKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRydWVDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoZXJyb3JPYmplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBzdXBlckxvZ2luQ2xpZW50RXJyb3I6IFN1cGVyTG9naW5DbGllbnRFcnJvciA9IG5ldyBTdXBlckxvZ2luQ2xpZW50RXJyb3IoZXJyb3JPYmplY3QpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIExvZyB0aGUgRXJyb3JcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihzdXBlckxvZ2luQ2xpZW50RXJyb3IuZ2V0RXJyb3JNZXNzYWdlKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIGVycm9yID0gZW1haWwgYWxyZWFkeSBpbiB1c2VcclxuICAgICAgICAgICAgICAgIGlmIChzdXBlckxvZ2luQ2xpZW50RXJyb3IuY2hlY2tGb3JFcnJvcihTdXBlckxvZ2luQ2xpZW50RXJyb3IuQVVUSF9FUlJfMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBmYWxzZUNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCByZW5ld3MgdGhlIGN1cnJlbnQgc2Vzc2lvbiB0b2tlbi5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBleHRlbmRTZXNzaW9uVG9rZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5odHRwUmVxdWVzdG9yLnBvc3RKc29uRGF0YShcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hdXRoL3JlZnJlc2gvXCIsIHRoaXMuZ2V0U2Vzc2lvblRva2VuKCksIHt9KS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGFsbCBkb25lIHN1Y2Nlc3NmdWxseVxyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIlNlc3Npb24gc3VjY2Vzc2Z1bGx5IGV4dGVuZGVkLlwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKGVycm9yT2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3VwZXJMb2dpbkNsaWVudEVycm9yOiBTdXBlckxvZ2luQ2xpZW50RXJyb3IgPSBuZXcgU3VwZXJMb2dpbkNsaWVudEVycm9yKGVycm9yT2JqZWN0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBMb2cgdGhlIEVycm9yXHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwiRmFpbGVkIHRvIGV4dGVuZCBzZXNzaW9uLlwiKTtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihzdXBlckxvZ2luQ2xpZW50RXJyb3IuZ2V0RXJyb3JNZXNzYWdlKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
