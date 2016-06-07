import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {TestComponent} from "../test/test";
import {MDL} from "../../directives/MaterialDesignLiteUpgradeElement";

@Component({
    selector: 'my-app',
    templateUrl: './components/app/app.html',
    directives: [ROUTER_DIRECTIVES, MDL],
    providers: [ROUTER_PROVIDERS]
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

    private test: string = 'Hallo Paul :D!';

////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor() {

    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    public testM(test: string) {
        this.test = test;
    }

}