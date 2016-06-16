import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {TestComponent} from "../test/test";
import {MDL} from "../../directives/MaterialDesignLiteUpgradeElement";
import {SuperLoginClient} from "../../shared/model/superlogin/superlogin_client";
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
        // ACHTUNG: couchDB CORS Problem!!!!!!!
        this.httpRequestor.postJsonData("http://localhost:3000/auth/register", {
            name: "Joe Smith",
            username: "hekim2",
            email: "hekim.wenzel2@web.de",
            password: "bigsecret",
            confirmPassword: "bigsecret"
        }).subscribe(
            (data: any) => this.test = data.userid,
            (error) => alert(error.message),
            ()=>console.log('Finished Get')
        );
    }

}