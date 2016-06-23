import {Http, Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import {HttpRequestor} from "../http_requestor";
import {Config} from "../../../config";
import {SuperLoginClientError} from "./super_login_client_error";
import {error} from "util";

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
    private httpRequestor: HttpRequestor;

    /** temporary token of the logged in user provided by superlogin for the current session */
    private token: string;

    /**temporary password of the logged in user provided by superlogin current session */
    private password: string;

////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor(httpRequestor: HttpRequestor) {
        this.httpRequestor = httpRequestor;
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    /**
     * The function uses superlogin-client to register the user with the given information.
     *
     * @param name of the user
     * @param email of the user
     * @param password of the user
     */
    public register(name: string, email: string, password: string) {
        // POST Request
        // TODO: die wichtigsten Funktionen von Superlogin in dieser Klasse abbilden
        // TODO: username = email einstellen
        // TODO: die Fehlermeldungen abfangen und behandlen
        // TODO: getting started with POUCHDB (https://pouchdb.com/guides/)
        this.httpRequestor.postJsonData("http://localhost:3000/auth/register", {
            // name: name,
            email: email,
            password: password,
            confirmPassword: password
        }).subscribe(
            (data: any) => console.dir(data),
            (error) => {
                alert("error");
                console.dir(error);
                throw new SuperLoginClientError(error);
            }
        );
    }

    /**
     * The function uses superlogin-client to login the user withe the given credentials.
     *
     * @param username of the user
     * @param password of the user
     */
    public login(username: string, password: string)  {
        // POST Request
        // TODO: die wichtigsten Funktionen von Superlogin in dieser Klasse abbilden
        // TODO: username = email einstellen
        // TODO: die Fehlermeldungen abfangen und behandlen
        // TODO: getting started with POUCHDB (https://pouchdb.com/guides/)
        this.httpRequestor.postJsonData("http://localhost:3000/auth/login", {
            username: username,
            password: password,
        }).subscribe(
            (data: any) => console.dir(data),
            (error) => {throw new SuperLoginClientError(error);}
        );
    }

    public logout()  {
    }


}

