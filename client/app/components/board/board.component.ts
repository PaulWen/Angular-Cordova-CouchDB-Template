import { Component } from '@angular/core';
import {SuperLoginClient} from "../../shared/utils/super_login_client/super_login_client";
import {SuperLoginClientError} from "../../shared/utils/super_login_client/super_login_client_error";
import {BoardDatabase} from "../../shared/databases/board/board_database";
import {MDL} from "../../shared/utils/mdl/MaterialDesignLiteUpgradeElement";
import {SORTABLEJS_DIRECTIVES, SortablejsOptions} from 'angular-sortablejs';

@Component({
    selector: 'board-component',
    templateUrl: 'app/components/board/board.component.html',
    styleUrls: ['app/components/board/board.component.css'],
    directives: [MDL, SORTABLEJS_DIRECTIVES]
})
export class BoardComponent {
////////////////////////////////////////////Properties////////////////////////////////////////////

    private boardDatabase: BoardDatabase;

    private items1 = [1, 2, 3, 4, 5];
    private items2 = [21, 22, 23, 24, 25];
    private sortablejsOptions1: SortablejsOptions = {
        animation: 150,
        group: "test",
        scroll: true, // or HTMLElement
        scrollSensitivity: 550, // px, how near the mouse must be to an edge to start scrolling.
        scrollSpeed: 1 // px
    };

    // how to configurer sortablejs https://www.npmjs.com/package/sortablejs
    private sortablejsOptions2: SortablejsOptions = {
        animation: 150,
        group: "test",
        scroll: true, // or HTMLElement
        scrollSensitivity: 150, // px, how near the mouse must be to an edge to start scrolling.
        scrollSpeed: 1 // px
    };

////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor(boardDatabase: BoardDatabase) {
        this.boardDatabase = boardDatabase;
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

}