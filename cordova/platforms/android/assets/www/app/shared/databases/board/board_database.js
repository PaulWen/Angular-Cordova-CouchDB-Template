System.register(["../../utils/pouch_db/pouch_db_database", "./board_document"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var pouch_db_database_1, board_document_1;
    var BoardDatabase;
    return {
        setters:[
            function (pouch_db_database_1_1) {
                pouch_db_database_1 = pouch_db_database_1_1;
            },
            function (board_document_1_1) {
                board_document_1 = board_document_1_1;
            }],
        execute: function() {
            /**
             * This class extends from "PouchDbDatabase". It gets only used for managing a CouchDB database
             * which stores board documents. The BoardDatabase implements the {@link BoardDocumentLoader}.
             */
            class BoardDatabase extends pouch_db_database_1.PouchDbDatabase {
                ////////////////////////////////////////////Properties////////////////////////////////////////////
                ////////////////////////////////////////////Constructor////////////////////////////////////////////
                constructor() {
                    super(board_document_1.BoardDocument);
                }
            }
            exports_1("BoardDatabase", BoardDatabase);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9kYXRhYmFzZXMvYm9hcmQvYm9hcmRfZGF0YWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7WUFJQTs7O2VBR0c7WUFDSCw0QkFBbUMsbUNBQWU7Z0JBRWxELGtHQUFrRztnQkFJbEcsbUdBQW1HO2dCQUUvRjtvQkFDSSxNQUFNLDhCQUFhLENBQUMsQ0FBQztnQkFFekIsQ0FBQztZQU9MLENBQUM7WUFsQkQseUNBa0JDLENBQUEiLCJmaWxlIjoic2hhcmVkL2RhdGFiYXNlcy9ib2FyZC9ib2FyZF9kYXRhYmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UG91Y2hEYkRhdGFiYXNlfSBmcm9tIFwiLi4vLi4vdXRpbHMvcG91Y2hfZGIvcG91Y2hfZGJfZGF0YWJhc2VcIjtcclxuaW1wb3J0IHtCb2FyZERvY3VtZW50fSBmcm9tIFwiLi9ib2FyZF9kb2N1bWVudFwiO1xyXG5pbXBvcnQge0JvYXJkRG9jdW1lbnRMb2FkZXJ9IGZyb20gXCIuL2JvYXJkX2RvY3VtZW50X2xvYWRlclwiO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgZXh0ZW5kcyBmcm9tIFwiUG91Y2hEYkRhdGFiYXNlXCIuIEl0IGdldHMgb25seSB1c2VkIGZvciBtYW5hZ2luZyBhIENvdWNoREIgZGF0YWJhc2VcclxuICogd2hpY2ggc3RvcmVzIGJvYXJkIGRvY3VtZW50cy4gVGhlIEJvYXJkRGF0YWJhc2UgaW1wbGVtZW50cyB0aGUge0BsaW5rIEJvYXJkRG9jdW1lbnRMb2FkZXJ9LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJvYXJkRGF0YWJhc2UgZXh0ZW5kcyBQb3VjaERiRGF0YWJhc2U8Qm9hcmREb2N1bWVudD4gaW1wbGVtZW50cyBCb2FyZERvY3VtZW50TG9hZGVyIHtcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vUHJvcGVydGllcy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5cclxuICAgIFxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL0NvbnN0cnVjdG9yLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihCb2FyZERvY3VtZW50KTtcclxuXHJcbiAgICB9XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vSW5oZXJpdGVkIE1ldGhvZHMvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9NZXRob2RzLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
