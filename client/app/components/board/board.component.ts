import {Component} from "@angular/core";
import {MDL} from "../../shared/utils/mdl/MaterialDesignLiteUpgradeElement";
import {SORTABLEJS_DIRECTIVES, SortablejsOptions} from "angular-sortablejs";
import {Logger} from "../../shared/utils/logger";
import {BoardDocumentLoader} from "../../shared/databases/board/board_document_loader";
import {BoardDocument} from "../../shared/databases/board/board_document";

@Component({
    selector: 'board-component',
    templateUrl: 'app/components/board/board.component.html',
    styleUrls: ['app/components/board/board.component.css'],
})
export class BoardComponent {
////////////////////////////////////////////Properties////////////////////////////////////////////

    private boardDocumentLoader: BoardDocumentLoader;

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

    constructor(boardDocumentLoader: BoardDocumentLoader) {
        this.boardDocumentLoader = boardDocumentLoader;
        //
        // this.boardDocumentLoader.getAllDocuments().then((data)=>{
        //     Logger.debug(data);
        // });

        // this.boardDocumentLoader.newDocument().then((data)=>{
        //     Logger.debug(data);
        //
        //     this.boardDocumentLoader.getDocument(data._id).then((data2)=>{
        //         Logger.debug(data2);
        //         data2._deleted = true;
        //     });
        // });



        // this.boardDatabase.newDocument().then((data)=>{
        //     Logger.debug(data);
        // });

        //
        this.boardDocumentLoader.getDocument("13DC70F6-9939-DB6F-8B3C-13F7E7F73A6F").then((data:any)=>{
            Logger.debug(data);
        });

        // this.boardDocumentLoader.getAllDocuments().then((data)=>{Logger.debug(data);});
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

}