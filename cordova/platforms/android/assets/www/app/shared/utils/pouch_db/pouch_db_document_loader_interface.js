System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var PouchDbDocumentLoaderInterface;
    return {
        setters:[],
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
             * This interface defines the basic functions, which a Document-Loader should provide a controller with.
             *
             * A Document-Loader enables a controller to get Document-Objects from a database. For each database there should be a
             * specific interface implemented which extends this interface by database specific document loader functions. Those interfaces only implement
             * functions for getting, deleting or creating new documents. (e.g. a function for retrieving all documents with the property dueDate=today)
             *
             * Those interfaces should get implemented by the databases. The controller should only access the databases using the functions
             * of the interfaces. Doing so prevents a controller form setting the URL of a database or uploading documents to the database. Uploading documents
             * to the database is not necessary since the Document-Objects retrieved from a database do automatically sync in both directions with the database.
             */
            class PouchDbDocumentLoaderInterface {
            }
            exports_1("PouchDbDocumentLoaderInterface", PouchDbDocumentLoaderInterface);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC91dGlscy9wb3VjaF9kYi9wb3VjaF9kYl9kb2N1bWVudF9sb2FkZXJfaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7WUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQW1CRztZQUNIO1lBMEJBLENBQUM7WUExQkQsMkVBMEJDLENBQUEiLCJmaWxlIjoic2hhcmVkL3V0aWxzL3BvdWNoX2RiL3BvdWNoX2RiX2RvY3VtZW50X2xvYWRlcl9pbnRlcmZhY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BvdWNoRGJEb2N1bWVudH0gZnJvbSBcIi4vcG91Y2hfZGJfZG9jdW1lbnRcIjtcclxuXHJcbi8qKlxyXG4gKiBDT1VUSU9OOiBUaGlzIGFic3RyYWN0IGNsYXNzIGlzIHN1cHBvc2VkIHRvIGJlIGFuIGludGVyZmFjZSEgSXQgd2lsbCBldmVudHVhbGx5IGdldCBpbXBsZW1lbnRlZFxyXG4gKiBieSBhIGNsYXNzIHRoYXQgaW1wbGVtZW50cyB0aGUgYWJzdHJhY3Qge0BsaW5rIFBvdWNoRGJEYXRhYmFzZX0gY2xhc3MuIEkgY291bGQgbm90IHVzZSB0aGUgdHlwZVxyXG4gKiBpbnRlcmZhY2UgZm9yIHRoaXMgZmlsZSwgc2luY2UgSSB3YW50IHRvIHVzZSBpdCBhcyBhIHRva2VuIGZvciBkZXBlbmRlbmN5IGluamVjdGlvbiBsYXRlciBvbi5cclxuICogU2luY2UgaW50ZXJmYWNlcyBhcmUgbm90IGF2YWlsYWJsZSB1bmRlciBKYXZhU2NyaXB0LCBpbnRlcmZhY2VzIGNhbiBub3QgYmUgdXNlZCBhcyB0b2tlbnMgZm9yIGRlcGVuZGVuY3lcclxuICogaW5qZWN0aW9uLiBBbnkgaW1wbGVtZW50YXRpb24gZG9uZSBpbiB0aGlzIGZpbGUsIHdpbGwgTk9UIGJlIGF2YWlsYWJsZSBmb3IgdGhlIGNsYXNzIHRoYXQgaW1wbGVtZW50cyBpdCxcclxuICogc2luY2UgdGhpcyBjbGFzcyBkb2VzIG5vdCBleHRlbmQgYnV0IGltcGxlbWVudCB0aGlzIGZpbGUhIFRoaXMgYmVpbmcgc2FpZCBtZWFucywgdGhhdCB0aGlzIGZpbGUgc2hvdWxkXHJcbiAqIE9OTFkgZGVmaW5lIGFic3RyYWN0IGNsYXNzZXMgYXMgaWYgaXQgd291bGQgYmUgYW4gaW50ZXJmYWNlLlxyXG4gKlxyXG4gKlxyXG4gKiBUaGlzIGludGVyZmFjZSBkZWZpbmVzIHRoZSBiYXNpYyBmdW5jdGlvbnMsIHdoaWNoIGEgRG9jdW1lbnQtTG9hZGVyIHNob3VsZCBwcm92aWRlIGEgY29udHJvbGxlciB3aXRoLlxyXG4gKlxyXG4gKiBBIERvY3VtZW50LUxvYWRlciBlbmFibGVzIGEgY29udHJvbGxlciB0byBnZXQgRG9jdW1lbnQtT2JqZWN0cyBmcm9tIGEgZGF0YWJhc2UuIEZvciBlYWNoIGRhdGFiYXNlIHRoZXJlIHNob3VsZCBiZSBhXHJcbiAqIHNwZWNpZmljIGludGVyZmFjZSBpbXBsZW1lbnRlZCB3aGljaCBleHRlbmRzIHRoaXMgaW50ZXJmYWNlIGJ5IGRhdGFiYXNlIHNwZWNpZmljIGRvY3VtZW50IGxvYWRlciBmdW5jdGlvbnMuIFRob3NlIGludGVyZmFjZXMgb25seSBpbXBsZW1lbnRcclxuICogZnVuY3Rpb25zIGZvciBnZXR0aW5nLCBkZWxldGluZyBvciBjcmVhdGluZyBuZXcgZG9jdW1lbnRzLiAoZS5nLiBhIGZ1bmN0aW9uIGZvciByZXRyaWV2aW5nIGFsbCBkb2N1bWVudHMgd2l0aCB0aGUgcHJvcGVydHkgZHVlRGF0ZT10b2RheSlcclxuICpcclxuICogVGhvc2UgaW50ZXJmYWNlcyBzaG91bGQgZ2V0IGltcGxlbWVudGVkIGJ5IHRoZSBkYXRhYmFzZXMuIFRoZSBjb250cm9sbGVyIHNob3VsZCBvbmx5IGFjY2VzcyB0aGUgZGF0YWJhc2VzIHVzaW5nIHRoZSBmdW5jdGlvbnNcclxuICogb2YgdGhlIGludGVyZmFjZXMuIERvaW5nIHNvIHByZXZlbnRzIGEgY29udHJvbGxlciBmb3JtIHNldHRpbmcgdGhlIFVSTCBvZiBhIGRhdGFiYXNlIG9yIHVwbG9hZGluZyBkb2N1bWVudHMgdG8gdGhlIGRhdGFiYXNlLiBVcGxvYWRpbmcgZG9jdW1lbnRzXHJcbiAqIHRvIHRoZSBkYXRhYmFzZSBpcyBub3QgbmVjZXNzYXJ5IHNpbmNlIHRoZSBEb2N1bWVudC1PYmplY3RzIHJldHJpZXZlZCBmcm9tIGEgZGF0YWJhc2UgZG8gYXV0b21hdGljYWxseSBzeW5jIGluIGJvdGggZGlyZWN0aW9ucyB3aXRoIHRoZSBkYXRhYmFzZS5cclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQb3VjaERiRG9jdW1lbnRMb2FkZXJJbnRlcmZhY2U8RG9jdW1lbnRUeXBlIGV4dGVuZHMgUG91Y2hEYkRvY3VtZW50PERvY3VtZW50VHlwZT4+IHtcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL01ldGhvZHMvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBkb2N1bWVudCB3aXRoIGEgc3BlY2lmaWMgaWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGlkIHRoZSBpZCBvZiB0aGUgd2FudGVkIGRvY3VtZW50XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB0aGUgd2FudGVkIGRvY3VtZW50IG9yIG51bGwgaWYgYW4gZXJyb3Igb2NjdXJyZWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IGdldERvY3VtZW50KGlkOnN0cmluZyk6UHJvbWlzZTxEb2N1bWVudFR5cGU+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGFsbCB0aGUgZG9jdW1lbnRzIGluY2x1ZGVkIGluIHRoZSBkYXRhYmFzZSBsaXN0ZWQgaW4gYW4gYXJyYXkuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiBhbGwgdGhlIGRvY3VtZW50cyBpbmNsdWRlZCBpbiB0aGUgZGF0YWJhc2UgbGlzdGVkIGluIGFuIGFycmF5IG9yIG51bGwgaWYgYW4gZXJyb3Igb2NjdXJyZWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IGdldEFsbERvY3VtZW50cygpOlByb21pc2U8RG9jdW1lbnRUeXBlW10+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBjcmVhdGVzIGFuIG5ldyBkb2N1bWVudCBmcm9tIHRoZSB0eXBlIDxEb2N1bWVudFR5cGU+IGluIHRoZSBkYXRhYmFzZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHRoZSBuZXcgY3JlYXRlZCBkb2N1bWVudCBvciBudWxsIGlmIGFuIGVycm9yIG9jY3VycmVkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBuZXdEb2N1bWVudCgpOlByb21pc2U8RG9jdW1lbnRUeXBlPjtcclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
