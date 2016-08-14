import { Component } from '@angular/core';
import {SuperLoginClient} from "../../shared/utils/super_login_client/super_login_client";
import {SuperLoginClientError} from "../../shared/utils/super_login_client/super_login_client_error";
import {BoardDatabase} from "../../shared/databases/board/board_database";
import {MDL} from "../../shared/utils/mdl/MaterialDesignLiteUpgradeElement";
import {SORTABLEJS_DIRECTIVES, SortablejsOptions} from 'angular-sortablejs';
import {Logger} from "../../shared/utils/logger";
import {DocumentList} from "pouchdb";

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
    private sortablejsOptions: SortablejsOptions = {
        animation: 150,
        group: "test",
        scroll: true, // or HTMLElement
        scrollSensitivity: 40, // px, how near the mouse must be to an edge to start scrolling.
        scrollSpeed: 5, // px
        ghostClass: "sortable-ghost",  // Class name for the drop placeholder
        onMove: function (/**Event*/evt) {
            // Example: http://jsbin.com/tuyafe/1/edit?js,output
            evt.dragged; // dragged HTMLElement
            evt.draggedRect; // TextRectangle {left, top, right и bottom}
            evt.related; // HTMLElement on which have guided
            evt.relatedRect; // TextRectangle
            // return false; — for cancel
            Logger.log(evt);
            return true;
        },
        onStart: (/**Event*/evt) => {
            evt.oldIndex;  // element index within parent
            Logger.log(evt);
        }
    };

////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor(boardDatabase: BoardDatabase) {
        this.boardDatabase = boardDatabase;

        Logger.debug("1");
        this.boardDatabase.testAsync().then((data) => {
            Logger.debug(data);
        });
        Logger.debug("2");

        // this.boardDatabase.getAllDocumentIDs().then(function (result: DocumentList) {
        //     for (var i in result.rows) {
        //         Logger.debug(result.rows[i].id);
        //
        //
        //         // if request was successful try to update the first name
        //         boardDatabase.getDocument(result.rows[i].id).then((doc)=>{
        //             Logger.debug(doc);
        //         })
        //         //if there was an error, return the error code
        //         .catch(function(error) {
        //             Logger.error(error);
        //         });
        //
        //     }
        // }).catch(function (error) {
        //     Logger.error(error);
        // });
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

}