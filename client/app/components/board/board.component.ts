import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {TestComponent} from "../test/test";
import {MDL} from "../../directives/MaterialDesignLiteUpgradeElement";
import {SuperLoginClient} from "../../shared/utils/super_login_client/super_login_client";
import {SuperLoginClientError} from "../../shared/utils/super_login_client/super_login_client_error";
import {BoardDatabase} from "../../shared/databases/board/board_database";

@Component({
    selector: 'board-view',
    templateUrl: 'app/components/board/board.component.html',
    directives: [MDL]
})
export class BoardComponent {
////////////////////////////////////////////Properties////////////////////////////////////////////

    private boardDatabase: BoardDatabase;

////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor(boardDatabase: BoardDatabase) {
        this.boardDatabase = boardDatabase;
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

}