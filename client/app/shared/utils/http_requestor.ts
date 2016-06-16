import {Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {Http, Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Rx";
import postParam from 'jquery-param';
import {Logger} from "./logger";

/**
 * The class is a service which provides basic methods for making HTTP requests.
 */
@Injectable()
export class HttpRequestor {

////////////////////////////////////////////Properties////////////////////////////////////////////

    private http: Http;

////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor(http: Http) {
        this.http = http;
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    /**
     * This method extracts JSON data out of an HTTP response.
     *
     * @param res the response object
     * @returns {any|{}}
     */
    private extractJsonData(res: Response) {
        // parse response body to JSON
        let data = res.json();

        // retun the JSON data
        return data || { };
    }

    /**
     * This method sends a get requests which requests JSON data.
     * The method returns a observable which will provide the response data as a JSON object.
     *
     * Example:
     * getJsonData("http://jsonplaceholder.typicode.com/posts").subscribe(
     *    (data: any) =>this.test = data[2].title + "---------" + JSON.stringify(data),
     *    error=>alert(error.message),
     *    ()=>console.log('Finished Get')
     * );
     *
     *
     *
     * @param url
     * @returns {Observable<R>}
     */
    public getJsonData(url: string) {
        return this.http.get(url)
            // transform response so that it gets a JSON object
            .map(this.extractJsonData)
    }

    /**
     * This method sends a post request which requests JSON data.
     * The POST parameters are given to this method by passing a JSON object.
     * The method returns a observable which will provide the response data as a JSON object.
     *
     *
     * Example:
     * postJsonData("http://localhost:3000/auth/register", {
     *       name: "Joe Smith",
     *       username: "hekim2",
     *       email: "hekim.wenzel2@web.de",
     *       password: "bigsecret",
     *       confirmPassword: "bigsecret"
     * }).subscribe(
     *         (data: any) => this.test = data[0].userid,
     *         (error) => alert(error.message),
     *         ()=>console.log('Finished Get')
     * );
     *
     *
     *
     * @param url
     * @param parametersAsJson
     * @returns {Observable<R>}
     */
    public postJsonData(url:string, parametersAsJson: any) {
        // generate request header
        let headers = new Headers();
        // config post parameter content type in header
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        // make post request but first convert the JSON object into a POST parameters string
        return this.http.post(url, postParam(parametersAsJson), {
            headers: headers
        // transform response so that it gets a JSON object
        }).map(this.extractJsonData);
    }
}