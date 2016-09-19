import {Component, Inject} from "@angular/core";
import {MDL} from "../../shared/utils/mdl/MaterialDesignLiteUpgradeElement";
import {SortablejsOptions} from "angular-sortablejs";
import {Logger} from "../../shared/utils/logger";
import {BoardDocument} from "../../shared/databases/board/board_document";
import {PouchDbDatabase} from "../../shared/utils/pouch_db/pouch_db_database";
import {AppModule} from "../../app.module";

@Component({
    selector: 'board-component',
    templateUrl: 'app/components/board/board.component.html',
    styleUrls: ['app/components/board/board.component.css'],
})
export class BoardComponent {
////////////////////////////////////////////Properties////////////////////////////////////////////

    private boardDatabase: PouchDbDatabase;

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
            // Logger.log(evt);
            return true;
        },
        onStart: (/**Event*/evt) => {
            evt.oldIndex;  // element index within parent
            // Logger.log(evt);
        }
    };

////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor(@Inject(AppModule.BOARD_DATABASE)boardDatabase:PouchDbDatabase) {
        this.boardDatabase = boardDatabase;
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

}