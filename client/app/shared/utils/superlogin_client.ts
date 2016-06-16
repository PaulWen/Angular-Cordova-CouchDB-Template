import {Http, Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import {HttpRequestor} from "./http_requestor";
import {Config} from "../../config";

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
    private http: HttpRequestor;

    /** temporary token of the logged in user provided by superlogin for the current session */
    private token: string;

    /**temporary password of the logged in user provided by superlogin current session */
    private password: string;


    
    private message: string;

////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor(http: HttpRequestor) {
        this.http = http;
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
        // var headers = new Headers();
        // headers.append('Content-Type', 'application/x-www-form-urlencoded');
        //
        // console.log('Authentication: ' + JSON.stringify(cred));
        //
        // this.http.post(Config.WEB_SERVER_DOMAIN + '/auth/register', JSON.stringify(cred), {
        //     headers: headers
        // })
        //     .map(res => res.json())
        //     .subscribe(
        //         () => console.log('Authentication Complete')
        //     );
    }

    /**
     * The function uses superlogin-client to login the user withe the given credentials.
     *
     * @param username of the user
     * @param password of the user
     */
    public login(username: string, password: string)  {
    }

    public logout()  {
    }

    public getMessage(): string {
        return this.message;
    }

}

