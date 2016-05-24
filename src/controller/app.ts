import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {TestComponent} from "./test";

@Component({
    selector: 'my-app',
    templateUrl: 'src/view/app.html',
    directives: [ROUTER_DIRECTIVES],
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

}