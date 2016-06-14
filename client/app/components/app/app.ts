import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {TestComponent} from "../test/test";
import {MDL} from "../../directives/MaterialDesignLiteUpgradeElement";
import {SuperLoginClient} from "../../shared/superlogin/SuperLoginClient";

@Component({
    selector: 'my-app',
    templateUrl: 'app/components/app/app.html',
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

    private superLoginClient: SuperLoginClient;

////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor() {
        this.superLoginClient = new SuperLoginClient();
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    public register(name: string, email:string, password: string) {
        this.superLoginClient.register(name, email, password);
        
    }

}