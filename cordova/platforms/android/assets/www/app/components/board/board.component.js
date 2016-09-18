System.register(["@angular/core", "../../shared/databases/board/board_document_loader"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, board_document_loader_1;
    var BoardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (board_document_loader_1_1) {
                board_document_loader_1 = board_document_loader_1_1;
            }],
        execute: function() {
            let BoardComponent = class BoardComponent {
                ////////////////////////////////////////////Constructor////////////////////////////////////////////
                constructor(boardDocumentLoader) {
                    this.items1 = [1, 2, 3, 4, 5];
                    this.items2 = [21, 22, 23, 24, 25];
                    this.sortablejsOptions = {
                        animation: 150,
                        group: "test",
                        scroll: true,
                        scrollSensitivity: 40,
                        scrollSpeed: 5,
                        ghostClass: "sortable-ghost",
                        onMove: function (/**Event*/ evt) {
                            // Example: http://jsbin.com/tuyafe/1/edit?js,output
                            evt.dragged; // dragged HTMLElement
                            evt.draggedRect; // TextRectangle {left, top, right и bottom}
                            evt.related; // HTMLElement on which have guided
                            evt.relatedRect; // TextRectangle
                            // return false; — for cancel
                            // Logger.log(evt);
                            return true;
                        },
                        onStart: (/**Event*/ evt) => {
                            evt.oldIndex; // element index within parent
                            // Logger.log(evt);
                        }
                    };
                    this.boardDocumentLoader = boardDocumentLoader;
                }
            };
            BoardComponent = __decorate([
                core_1.Component({
                    selector: 'board-component',
                    templateUrl: 'app/components/board/board.component.html',
                    styleUrls: ['app/components/board/board.component.css'],
                }), 
                __metadata('design:paramtypes', [board_document_loader_1.BoardDocumentLoader])
            ], BoardComponent);
            exports_1("BoardComponent", BoardComponent);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYm9hcmQvYm9hcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBWUE7Z0JBOEJBLG1HQUFtRztnQkFFL0YsWUFBWSxtQkFBd0M7b0JBM0I1QyxXQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3pCLFdBQU0sR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDOUIsc0JBQWlCLEdBQXNCO3dCQUMzQyxTQUFTLEVBQUUsR0FBRzt3QkFDZCxLQUFLLEVBQUUsTUFBTTt3QkFDYixNQUFNLEVBQUUsSUFBSTt3QkFDWixpQkFBaUIsRUFBRSxFQUFFO3dCQUNyQixXQUFXLEVBQUUsQ0FBQzt3QkFDZCxVQUFVLEVBQUUsZ0JBQWdCO3dCQUM1QixNQUFNLEVBQUUsVUFBVSxVQUFVLENBQUEsR0FBRzs0QkFDM0Isb0RBQW9EOzRCQUNwRCxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsc0JBQXNCOzRCQUNuQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsNENBQTRDOzRCQUM3RCxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsbUNBQW1DOzRCQUNoRCxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsZ0JBQWdCOzRCQUNqQyw2QkFBNkI7NEJBQzdCLG1CQUFtQjs0QkFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQzt3QkFDaEIsQ0FBQzt3QkFDRCxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUEsR0FBRzs0QkFDbkIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFFLDhCQUE4Qjs0QkFDN0MsbUJBQW1CO3dCQUN2QixDQUFDO3FCQUNKLENBQUM7b0JBS0UsSUFBSSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO2dCQUNuRCxDQUFDO1lBSUwsQ0FBQztZQTNDRDtnQkFBQyxnQkFBUyxDQUFDO29CQUNQLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFdBQVcsRUFBRSwyQ0FBMkM7b0JBQ3hELFNBQVMsRUFBRSxDQUFDLDBDQUEwQyxDQUFDO2lCQUMxRCxDQUFDOzs4QkFBQTtZQUNGLDJDQXNDQyxDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvYm9hcmQvYm9hcmQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7TURMfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3V0aWxzL21kbC9NYXRlcmlhbERlc2lnbkxpdGVVcGdyYWRlRWxlbWVudFwiO1xyXG5pbXBvcnQge1NPUlRBQkxFSlNfRElSRUNUSVZFUywgU29ydGFibGVqc09wdGlvbnN9IGZyb20gXCJhbmd1bGFyLXNvcnRhYmxlanNcIjtcclxuaW1wb3J0IHtMb2dnZXJ9IGZyb20gXCIuLi8uLi9zaGFyZWQvdXRpbHMvbG9nZ2VyXCI7XHJcbmltcG9ydCB7Qm9hcmREb2N1bWVudExvYWRlcn0gZnJvbSBcIi4uLy4uL3NoYXJlZC9kYXRhYmFzZXMvYm9hcmQvYm9hcmRfZG9jdW1lbnRfbG9hZGVyXCI7XHJcbmltcG9ydCB7Qm9hcmREb2N1bWVudH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9kYXRhYmFzZXMvYm9hcmQvYm9hcmRfZG9jdW1lbnRcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdib2FyZC1jb21wb25lbnQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9ib2FyZC9ib2FyZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnYXBwL2NvbXBvbmVudHMvYm9hcmQvYm9hcmQuY29tcG9uZW50LmNzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQm9hcmRDb21wb25lbnQge1xyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1Byb3BlcnRpZXMvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIHByaXZhdGUgYm9hcmREb2N1bWVudExvYWRlcjogQm9hcmREb2N1bWVudExvYWRlcjtcclxuXHJcbiAgICBwcml2YXRlIGl0ZW1zMSA9IFsxLCAyLCAzLCA0LCA1XTtcclxuICAgIHByaXZhdGUgaXRlbXMyID0gWzIxLCAyMiwgMjMsIDI0LCAyNV07XHJcbiAgICBwcml2YXRlIHNvcnRhYmxlanNPcHRpb25zOiBTb3J0YWJsZWpzT3B0aW9ucyA9IHtcclxuICAgICAgICBhbmltYXRpb246IDE1MCxcclxuICAgICAgICBncm91cDogXCJ0ZXN0XCIsXHJcbiAgICAgICAgc2Nyb2xsOiB0cnVlLCAvLyBvciBIVE1MRWxlbWVudFxyXG4gICAgICAgIHNjcm9sbFNlbnNpdGl2aXR5OiA0MCwgLy8gcHgsIGhvdyBuZWFyIHRoZSBtb3VzZSBtdXN0IGJlIHRvIGFuIGVkZ2UgdG8gc3RhcnQgc2Nyb2xsaW5nLlxyXG4gICAgICAgIHNjcm9sbFNwZWVkOiA1LCAvLyBweFxyXG4gICAgICAgIGdob3N0Q2xhc3M6IFwic29ydGFibGUtZ2hvc3RcIiwgIC8vIENsYXNzIG5hbWUgZm9yIHRoZSBkcm9wIHBsYWNlaG9sZGVyXHJcbiAgICAgICAgb25Nb3ZlOiBmdW5jdGlvbiAoLyoqRXZlbnQqL2V2dCkge1xyXG4gICAgICAgICAgICAvLyBFeGFtcGxlOiBodHRwOi8vanNiaW4uY29tL3R1eWFmZS8xL2VkaXQ/anMsb3V0cHV0XHJcbiAgICAgICAgICAgIGV2dC5kcmFnZ2VkOyAvLyBkcmFnZ2VkIEhUTUxFbGVtZW50XHJcbiAgICAgICAgICAgIGV2dC5kcmFnZ2VkUmVjdDsgLy8gVGV4dFJlY3RhbmdsZSB7bGVmdCwgdG9wLCByaWdodCDQuCBib3R0b219XHJcbiAgICAgICAgICAgIGV2dC5yZWxhdGVkOyAvLyBIVE1MRWxlbWVudCBvbiB3aGljaCBoYXZlIGd1aWRlZFxyXG4gICAgICAgICAgICBldnQucmVsYXRlZFJlY3Q7IC8vIFRleHRSZWN0YW5nbGVcclxuICAgICAgICAgICAgLy8gcmV0dXJuIGZhbHNlOyDigJQgZm9yIGNhbmNlbFxyXG4gICAgICAgICAgICAvLyBMb2dnZXIubG9nKGV2dCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25TdGFydDogKC8qKkV2ZW50Ki9ldnQpID0+IHtcclxuICAgICAgICAgICAgZXZ0Lm9sZEluZGV4OyAgLy8gZWxlbWVudCBpbmRleCB3aXRoaW4gcGFyZW50XHJcbiAgICAgICAgICAgIC8vIExvZ2dlci5sb2coZXZ0KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9Db25zdHJ1Y3Rvci8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgY29uc3RydWN0b3IoYm9hcmREb2N1bWVudExvYWRlcjogQm9hcmREb2N1bWVudExvYWRlcikge1xyXG4gICAgICAgIHRoaXMuYm9hcmREb2N1bWVudExvYWRlciA9IGJvYXJkRG9jdW1lbnRMb2FkZXI7XHJcbiAgICB9XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9NZXRob2RzLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
