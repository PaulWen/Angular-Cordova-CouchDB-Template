import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {TestComponent} from "../test/test";
import {MDL} from "../../directives/MaterialDesignLiteUpgradeElement";
import {SuperLoginClient} from "../../shared/utils/superlogin_client";
import {HttpRequestor} from "../../shared/utils/http_requestor";

@Component({
    selector: 'my-app',
    templateUrl: 'app/components/app/app.html',
    directives: [ROUTER_DIRECTIVES, MDL],
    providers: [ROUTER_PROVIDERS, HttpRequestor]
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
    private httpRequestor: HttpRequestor;

    private test: string;

////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor(httpRequestor: HttpRequestor) {
        // this.superLoginClient = new SuperLoginClient();
        this.httpRequestor = httpRequestor;
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    public register(name: string, email:string, password: string) {
        // this.superLoginClient.register(name, email, password);

        // GET Request Funktioniert
        // this.httpRequestor.getJsonData("http://jsonplaceholder.typicode.com/posts").subscribe(
        //     (data: any) =>this.test = data[2].title + "---------" + JSON.stringify(data),
        //     error=>alert(error.message),
        //     ()=>console.log('Finished Get')
        // );



        // POST Request
        // TODO: die wichtigsten Funktionen von Superlogin in dieser Klasse abbilden
        // TODO: username = email einstellen
        // TODO: die Fehlermeldungen abfangen und behandlen
        // TODO: getting started with POUCHDB (https://pouchdb.com/guides/)
        this.httpRequestor.postJsonData("http://localhost:3000/auth/register", {
            name: "Joe Smith",
            username: "hekim7",
            email: "hekim.wenzel7@web.de",
            password: "bigsecret",
            confirmPassword: "bigsecret"
        }).subscribe(
            (data: any) => this.test = JSON.stringify(data),
            (error) => alert(error.message),
            ()=>console.log('Finished Get')
        );
    }

}