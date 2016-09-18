System.register(["../../utils/pouch_db/pouch_db_document_loader_interface"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var pouch_db_document_loader_interface_1;
    var BoardDocumentLoader;
    return {
        setters:[
            function (pouch_db_document_loader_interface_1_1) {
                pouch_db_document_loader_interface_1 = pouch_db_document_loader_interface_1_1;
            }],
        execute: function() {
            /**
             * COUTION: This abstract class is supposed to be an interface! It will eventually get implemented
             * by a class that implements the abstract {@link PouchDbDatabase} class. I could not use the type
             * interface for this file, since I want to use it as a token for dependency injection later on.
             * Since interfaces are not available under JavaScript, interfaces can not be used as tokens for dependency
             * injection. Any implementation done in this file, will NOT be available for the class that implements it,
             * since this class does not extend but implement this file! This being said means, that this file should
             * ONLY define abstract classes as if it would be an interface.
             *
             *
             * This interface is the BoardDocumentLoader and defines the functions which will be provided for the controllers to get Board-Document-Objects.
             *
             * A Document-Loader enables a controller to get Document-Objects from a database. A Document-Loader only implements
             * functions for getting, deleting or creating new documents. (e.g. a function for retrieving all documents with the property dueDate=today)
             *
             * This interface calls gets implemented by the {@link BoardDatabase}. The controllers should only access the {@link BoardDatabase} by using the functions
             * of this interface. Doing so prevents a controller form setting the URL of a database or uploading documents to the database. Uploading documents
             * to the database is not necessary since the Document-Objects retrieved from a database do automatically sync in both directions with the database.
             */
            class BoardDocumentLoader extends pouch_db_document_loader_interface_1.PouchDbDocumentLoaderInterface {
            }
            exports_1("BoardDocumentLoader", BoardDocumentLoader);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9kYXRhYmFzZXMvYm9hcmQvYm9hcmRfZG9jdW1lbnRfbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O1lBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQWtCRztZQUNILGtDQUFrRCxtRUFBOEI7WUFLaEYsQ0FBQztZQUxELHFEQUtDLENBQUEiLCJmaWxlIjoic2hhcmVkL2RhdGFiYXNlcy9ib2FyZC9ib2FyZF9kb2N1bWVudF9sb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BvdWNoRGJEb2N1bWVudH0gZnJvbSBcIi4uLy4uL3V0aWxzL3BvdWNoX2RiL3BvdWNoX2RiX2RvY3VtZW50XCI7XHJcbmltcG9ydCB7UG91Y2hEYkRvY3VtZW50TG9hZGVySW50ZXJmYWNlfSBmcm9tIFwiLi4vLi4vdXRpbHMvcG91Y2hfZGIvcG91Y2hfZGJfZG9jdW1lbnRfbG9hZGVyX2ludGVyZmFjZVwiO1xyXG5pbXBvcnQge0JvYXJkRG9jdW1lbnR9IGZyb20gXCIuL2JvYXJkX2RvY3VtZW50XCI7XHJcblxyXG4vKipcclxuICogQ09VVElPTjogVGhpcyBhYnN0cmFjdCBjbGFzcyBpcyBzdXBwb3NlZCB0byBiZSBhbiBpbnRlcmZhY2UhIEl0IHdpbGwgZXZlbnR1YWxseSBnZXQgaW1wbGVtZW50ZWRcclxuICogYnkgYSBjbGFzcyB0aGF0IGltcGxlbWVudHMgdGhlIGFic3RyYWN0IHtAbGluayBQb3VjaERiRGF0YWJhc2V9IGNsYXNzLiBJIGNvdWxkIG5vdCB1c2UgdGhlIHR5cGVcclxuICogaW50ZXJmYWNlIGZvciB0aGlzIGZpbGUsIHNpbmNlIEkgd2FudCB0byB1c2UgaXQgYXMgYSB0b2tlbiBmb3IgZGVwZW5kZW5jeSBpbmplY3Rpb24gbGF0ZXIgb24uXHJcbiAqIFNpbmNlIGludGVyZmFjZXMgYXJlIG5vdCBhdmFpbGFibGUgdW5kZXIgSmF2YVNjcmlwdCwgaW50ZXJmYWNlcyBjYW4gbm90IGJlIHVzZWQgYXMgdG9rZW5zIGZvciBkZXBlbmRlbmN5XHJcbiAqIGluamVjdGlvbi4gQW55IGltcGxlbWVudGF0aW9uIGRvbmUgaW4gdGhpcyBmaWxlLCB3aWxsIE5PVCBiZSBhdmFpbGFibGUgZm9yIHRoZSBjbGFzcyB0aGF0IGltcGxlbWVudHMgaXQsXHJcbiAqIHNpbmNlIHRoaXMgY2xhc3MgZG9lcyBub3QgZXh0ZW5kIGJ1dCBpbXBsZW1lbnQgdGhpcyBmaWxlISBUaGlzIGJlaW5nIHNhaWQgbWVhbnMsIHRoYXQgdGhpcyBmaWxlIHNob3VsZFxyXG4gKiBPTkxZIGRlZmluZSBhYnN0cmFjdCBjbGFzc2VzIGFzIGlmIGl0IHdvdWxkIGJlIGFuIGludGVyZmFjZS5cclxuICpcclxuICpcclxuICogVGhpcyBpbnRlcmZhY2UgaXMgdGhlIEJvYXJkRG9jdW1lbnRMb2FkZXIgYW5kIGRlZmluZXMgdGhlIGZ1bmN0aW9ucyB3aGljaCB3aWxsIGJlIHByb3ZpZGVkIGZvciB0aGUgY29udHJvbGxlcnMgdG8gZ2V0IEJvYXJkLURvY3VtZW50LU9iamVjdHMuXHJcbiAqXHJcbiAqIEEgRG9jdW1lbnQtTG9hZGVyIGVuYWJsZXMgYSBjb250cm9sbGVyIHRvIGdldCBEb2N1bWVudC1PYmplY3RzIGZyb20gYSBkYXRhYmFzZS4gQSBEb2N1bWVudC1Mb2FkZXIgb25seSBpbXBsZW1lbnRzXHJcbiAqIGZ1bmN0aW9ucyBmb3IgZ2V0dGluZywgZGVsZXRpbmcgb3IgY3JlYXRpbmcgbmV3IGRvY3VtZW50cy4gKGUuZy4gYSBmdW5jdGlvbiBmb3IgcmV0cmlldmluZyBhbGwgZG9jdW1lbnRzIHdpdGggdGhlIHByb3BlcnR5IGR1ZURhdGU9dG9kYXkpXHJcbiAqXHJcbiAqIFRoaXMgaW50ZXJmYWNlIGNhbGxzIGdldHMgaW1wbGVtZW50ZWQgYnkgdGhlIHtAbGluayBCb2FyZERhdGFiYXNlfS4gVGhlIGNvbnRyb2xsZXJzIHNob3VsZCBvbmx5IGFjY2VzcyB0aGUge0BsaW5rIEJvYXJkRGF0YWJhc2V9IGJ5IHVzaW5nIHRoZSBmdW5jdGlvbnNcclxuICogb2YgdGhpcyBpbnRlcmZhY2UuIERvaW5nIHNvIHByZXZlbnRzIGEgY29udHJvbGxlciBmb3JtIHNldHRpbmcgdGhlIFVSTCBvZiBhIGRhdGFiYXNlIG9yIHVwbG9hZGluZyBkb2N1bWVudHMgdG8gdGhlIGRhdGFiYXNlLiBVcGxvYWRpbmcgZG9jdW1lbnRzXHJcbiAqIHRvIHRoZSBkYXRhYmFzZSBpcyBub3QgbmVjZXNzYXJ5IHNpbmNlIHRoZSBEb2N1bWVudC1PYmplY3RzIHJldHJpZXZlZCBmcm9tIGEgZGF0YWJhc2UgZG8gYXV0b21hdGljYWxseSBzeW5jIGluIGJvdGggZGlyZWN0aW9ucyB3aXRoIHRoZSBkYXRhYmFzZS5cclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCb2FyZERvY3VtZW50TG9hZGVyIGV4dGVuZHMgUG91Y2hEYkRvY3VtZW50TG9hZGVySW50ZXJmYWNlPEJvYXJkRG9jdW1lbnQ+IHtcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL01ldGhvZHMvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
