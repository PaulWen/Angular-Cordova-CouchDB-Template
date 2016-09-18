System.register(["../logger"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var logger_1;
    var PouchDbDocument;
    return {
        setters:[
            function (logger_1_1) {
                logger_1 = logger_1_1;
            }],
        execute: function() {
            /**
             * This abstract class is based on PouchDB and represents one document stored in a CouchDB database.
             * It has to be implemented by a class which  represents a specific document.
             *
             * The class defines all the necessary functions for a Document-Class to serialize and deserialize it.
             * Using this class makes it possible that objects of the Document-Class get synced easily with
             * the CouchDB database in real-time.
             *
             *
             *
             * HOT TO EXTEND FROM THIS CLASS:
             *
             * 1) The classes which implement this class MUST
             *      a) have a public constructor with the three parameters
             *         "json: any", "database:<TypeOfDocumentDatabase>" and "changeListener: {@link PouchDbDocument#ChangeListener}"!
             *         Inside the constructor the classes ONLY calls the super constructor and passes them the parameters.
             *      b) initialize ALL its custom variables with default values
             *      c) to take care that the {@link PouchDbDocument#updateObjectFieldsWithDatabaseDocumentVersion}-function
             *         gets called in order to load the values of the json object (given to the constructor as a parameter) into this object.
             * 2) The classes should make their variables only available through getter and setter functions
             *      a) Each setter function should call "this.uploadToDatabase();" as the last statement in order to upload a change to the database
             *      b) The setter has always to check if the setter call really changes the value.
             *         "this.uploadToDatabase();" should only be performed in case the call of the setter really changed the value.
             *         If that does not get done on this way, and endless loop will be the result since the database always calls the documents onChange function
             *         if the document got uploaded (this will cause all setters being called), and the document would always upload the document which would start the cycle again.
             * 3) The classes has to overwrite the functions "serializeToJsonObject" and "deserializeJsonObject"
             * in order to add also there custom class fields.
             *      a) In the function {@link PouchDbDocument#deserializeJsonObject} the classes should always check if a specific property is included in the json object,
             *         if that is the case, it has to set the variable to the value from the json object using the right setter function (to take advantage of input value checks
             *         that might be implemented in the setter function).
             *         If the json object does not provide any value, the variable has to stay unchanged.
             *      b) In the function {@link PouchDbDocument#serializeToJsonObject} the classes should first call the super implementation of
             *         this function and afterwards extends the returned json object with the custom properties of the document.
             */
            class PouchDbDocument {
                ////////////////////////////////////////////Constructor////////////////////////////////////////////
                /**
                 * The constructor of the class "PouchDbDocument".
                 *
                 * @param json  A JSON object FROM THE DATABASE which MUST include the property "_id"
                 *              (the id of the CouchDB document which this object is representing)
                 * @param database the database where this document gets stored in, so it can upload itself in the database in the case of an change
                 * @param changeListener a change listener which will get called by the database when ever this document changes,
                 *                       so that it updates the values with the once from the database
                 *
                 */
                constructor(json, database, changeListener) {
                    /** indicates whether or not the document got deleted */
                    this.__deleted = false;
                    this.database = database;
                    // register the onChange function by the changeListener
                    changeListener.setOnChangeFunction(this.updateObjectFieldsWithDatabaseDocumentVersion.bind(this));
                    // since the id cannot change, we do only have to set it here and not in the
                    // function "deserializeJsonObject"
                    this.__id = json._id;
                    // set default values for the other fields
                    this.__rev = "";
                    this.__deleted = false;
                }
                /////////////////////////////////////////Getter and Setter/////////////////////////////////////////
                /**
                 * This function returns the id of the CouchDB document which this object is representing.
                 *
                 * @return {string} the  of the CouchDB document which this object is representing
                 */
                get _id() {
                    return this.__id;
                }
                /**
                 * This function returns the revision code of the CouchDB document which this object is representing.
                 *
                 * @return {string} the revision code of the CouchDB document which this object is representing
                 */
                get _rev() {
                    return this.__rev;
                }
                /**
                 * This function returns whether or not the document got deleted.
                 *
                 * @return {boolean} whether or not the document got deleted
                 */
                get _deleted() {
                    return this.__deleted;
                }
                /**
                 * This function sets whether or not the document got deleted.
                 *
                 * @param deleted true if the document should get marked as deleted, false if not
                 */
                set _deleted(deleted) {
                    // check if the value is really a new value to avoid unnecessary updates
                    if (deleted !== this._deleted) {
                        this.__deleted = deleted;
                        this.uploadToDatabase();
                    }
                }
                /////////////////////////////////////////////Methods///////////////////////////////////////////////
                /**
                 * This function uploads this document into its database, so that the database has the current version.
                 */
                uploadToDatabase() {
                    // only if the upload is not currently disabled, upload the document
                    if (!this.disableUpload) {
                        this.database.putDocument(this.serializeToJsonObject()).then((status) => {
                            if (!status) {
                                logger_1.Logger.log("Document could not get uploaded!");
                            }
                        });
                    }
                }
                /**
                 * This function takes a JSON object FROM THE DATABASE and updates the fields of this object to the
                 * values provided bz the JSON object.
                 *
                 * COUTION: Since it gets assumed that the JSON object passed to this function is directly from the database,
                 *          all changes which the JSON object causes in this object, will not cause an upload of this object/document to the database.
                 *
                 * @param json  A JSON object FROM THE DATABASE which MUST include the properties:
                 *                  - "_id" (the id of the CouchDB document which this object is representing)
                 *                  - "_rev" (the revision code of the CouchDB document which this object is representing)
                 *
                 *              It CAN also include the property:
                 *                  - "_deleted" (indicates whether or not the document got deleted (optional, defaults to "false"))
                 *
                 *              If the JSON object does not include one of the optional properties listed above, a default value will be set.
                 *              If the JSON object includes properties which are not listed above, those values get ignored.
                 *              (The way this function deals with unknown attributes from the JSON object is for the purpose of changing
                 *              the document structure dynamically and making sure that all the documents which still have the old
                 *              structure will get updated eventually.)
                 */
                updateObjectFieldsWithDatabaseDocumentVersion(json) {
                    // since JSON object should be the database document version, there is
                    // no need for uploading those values to the database again
                    this.disableUpload = true;
                    // set all the values of the fields of this object to the values provided in the json object
                    this.deserializeJsonObjectSuperImplementation(json);
                    this.deserializeJsonObject(json);
                    // enable upload again
                    this.disableUpload = false;
                }
                /**
                 * This function provides all the values of the fields of the current object represented in a
                 * JSON object.
                 *
                 *
                 * See also: The JSON object can be converted back into an object creating a new object of this class. In addition to that
                 * it is possible to set the field of this object by using the "deserializeJsonObject" function and passing a JSON object
                 * to that function which includes the new values for the field of this object.
                 *
                 * @return a string representing the JSON document which includes all the current values of the fields of this object.
                 */
                serializeToJsonObject() {
                    return {
                        _id: this._id,
                        _rev: this._rev,
                        _deleted: this._deleted
                    };
                }
                /**
                 * This function sets the following two variables of the specific object by taking the values from the JSON input object.
                 *   - (HAST TO BE INCLUDED IN THE JSON OBJECT) "_id" (the id of the CouchDB document which this object is representing)
                 *   - (OPTIONAL) "_rev" (the revision code of the CouchDB document which this object is representing)
                 *
                 * If there is no property defined in the JSON object for a specific field of the class, the class field will be kept unchanged.
                 *
                 * CAUTION: This function does not change the values of the object field "_id"!
                 *
                 * See also: The document object can be converted into an JSON object using the {@link PouchDbDocument#serializeToJsonObject} function.
                 *           This function should only be called indirectly by calling {@link PouchDbDocument#updateObjectFieldsWithDatabaseDocumentVersion}.
                 *
                 * @param json a JSON object which includes the values of the object
                 */
                deserializeJsonObjectSuperImplementation(json) {
                    // update the revision id
                    this.__rev = json._rev;
                    // if a value is provided from the json object use this value
                    if (json._deleted !== null)
                        this._deleted = json._deleted;
                }
            }
            exports_1("PouchDbDocument", PouchDbDocument);
            //////////////////////////////////////////Inner Classes////////////////////////////////////////////
            (function (PouchDbDocument) {
                /**
                 * This class is a container for a change listener function.
                 * It gets only used for setting a change listener for objects of {@link PouchDbDocument}.
                 * It is used for setting a change listener function in an anonymous way that that only objects of this
                 * class and the class that is notifying, in case of an change, knows about this function.
                 */
                class ChangeListener {
                    //////////////////////////////////////////Constructor//////////////////////////////////////////
                    /**
                     * Constructor of the inner class {@link PouchDbDocument#ChangeListener}
                     */
                    constructor() {
                    }
                    ///////////////////////////////////////////Methods/////////////////////////////////////////////
                    /**
                     * This setter sets the function that should get called in case the function
                     * {@link PouchDbDocument#ChangeListener#change} gets called.
                     *
                     * @param onChangeFunction
                     */
                    setOnChangeFunction(onChangeFunction) {
                        this.onChangeFunction = onChangeFunction;
                    }
                    /**
                     * This function should get called if a change occurred. The function
                     * calls then calls the right function of the listener to notify him about
                     * the change.
                     *
                     * @param json the new version of the json object that changed
                     */
                    onChange(json) {
                        // Unfortunately, WebStorm throws an error even though there is no mistake.
                        // With the following statement/comment we suppress the error message:
                        //noinspection TypeScriptValidateTypes
                        this.onChangeFunction(json);
                    }
                }
                PouchDbDocument.ChangeListener = ChangeListener;
            })(PouchDbDocument = PouchDbDocument || (PouchDbDocument = {}));
            exports_1("PouchDbDocument", PouchDbDocument);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC91dGlscy9wb3VjaF9kYi9wb3VjaF9kYl9kb2N1bWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztZQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFpQ0c7WUFDSDtnQkFzQkEsbUdBQW1HO2dCQUUvRjs7Ozs7Ozs7O21CQVNHO2dCQUNILFlBQVksSUFBUyxFQUFFLFFBQXVDLEVBQUUsY0FBOEM7b0JBZjlHLHdEQUF3RDtvQkFDaEQsY0FBUyxHQUFZLEtBQUssQ0FBQztvQkFlL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7b0JBRXpCLHVEQUF1RDtvQkFDdkQsY0FBYyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyw2Q0FBNkMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFFbEcsNEVBQTRFO29CQUM1RSxtQ0FBbUM7b0JBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFFckIsMENBQTBDO29CQUMxQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRSxLQUFLLENBQUM7Z0JBQzFCLENBQUM7Z0JBRUwsbUdBQW1HO2dCQUUvRjs7OzttQkFJRztnQkFDSCxJQUFXLEdBQUc7b0JBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3JCLENBQUM7Z0JBRUQ7Ozs7bUJBSUc7Z0JBQ0gsSUFBVyxJQUFJO29CQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUN0QixDQUFDO2dCQUdEOzs7O21CQUlHO2dCQUNILElBQVcsUUFBUTtvQkFDZixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDMUIsQ0FBQztnQkFHRDs7OzttQkFJRztnQkFDSCxJQUFXLFFBQVEsQ0FBQyxPQUFnQjtvQkFDaEMsd0VBQXdFO29CQUN4RSxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7d0JBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO3dCQUN6QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDNUIsQ0FBQztnQkFDTCxDQUFDO2dCQUVMLG1HQUFtRztnQkFFL0Y7O21CQUVHO2dCQUNPLGdCQUFnQjtvQkFDdEIsb0VBQW9FO29CQUNwRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO3dCQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQWU7NEJBQ3pFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQ0FDVixlQUFNLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7NEJBQ25ELENBQUM7d0JBQ0wsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsQ0FBQztnQkFDTCxDQUFDO2dCQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQW1CRztnQkFDTyw2Q0FBNkMsQ0FBQyxJQUFTO29CQUM3RCxzRUFBc0U7b0JBQ3RFLDJEQUEyRDtvQkFDM0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7b0JBRTFCLDRGQUE0RjtvQkFDNUYsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNwRCxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBRWpDLHNCQUFzQjtvQkFDdEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7Z0JBQy9CLENBQUM7Z0JBRUQ7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ08scUJBQXFCO29CQUMzQixNQUFNLENBQUM7d0JBQ0gsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO3dCQUNiLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTt3QkFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7cUJBQzFCLENBQUE7Z0JBQ0wsQ0FBQztnQkFFRDs7Ozs7Ozs7Ozs7OzttQkFhRztnQkFDSyx3Q0FBd0MsQ0FBQyxJQUFTO29CQUN0RCx5QkFBeUI7b0JBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFFdkIsNkRBQTZEO29CQUM3RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQzt3QkFBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQzlELENBQUM7WUFnQkwsQ0FBQztZQXJNRCw2Q0FxTUMsQ0FBQTtZQUVELG1HQUFtRztZQUVuRyxXQUFjLGVBQWUsRUFBQyxDQUFDO2dCQVUzQjs7Ozs7bUJBS0c7Z0JBQ0g7b0JBU0ksK0ZBQStGO29CQUUvRjs7dUJBRUc7b0JBQ0g7b0JBRUEsQ0FBQztvQkFFRCwrRkFBK0Y7b0JBRS9GOzs7Ozt1QkFLRztvQkFDSSxtQkFBbUIsQ0FBQyxnQkFBaUQ7d0JBQ3hFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztvQkFDN0MsQ0FBQztvQkFFRDs7Ozs7O3VCQU1HO29CQUNJLFFBQVEsQ0FBQyxJQUFRO3dCQUNwQiwyRUFBMkU7d0JBQzNFLHNFQUFzRTt3QkFDdEUsc0NBQXNDO3dCQUN0QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2hDLENBQUM7Z0JBQ0wsQ0FBQztnQkEzQ1ksOEJBQWMsaUJBMkMxQixDQUFBO1lBQ0wsQ0FBQyxFQTVEYSxlQUFlLEdBQWYsZUFBZSxLQUFmLGVBQWUsUUE0RDVCOzBEQUFBIiwiZmlsZSI6InNoYXJlZC91dGlscy9wb3VjaF9kYi9wb3VjaF9kYl9kb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UG91Y2hEYkRhdGFiYXNlfSBmcm9tIFwiLi9wb3VjaF9kYl9kYXRhYmFzZVwiO1xyXG5pbXBvcnQge0xvZ2dlcn0gZnJvbSBcIi4uL2xvZ2dlclwiO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgYWJzdHJhY3QgY2xhc3MgaXMgYmFzZWQgb24gUG91Y2hEQiBhbmQgcmVwcmVzZW50cyBvbmUgZG9jdW1lbnQgc3RvcmVkIGluIGEgQ291Y2hEQiBkYXRhYmFzZS5cclxuICogSXQgaGFzIHRvIGJlIGltcGxlbWVudGVkIGJ5IGEgY2xhc3Mgd2hpY2ggIHJlcHJlc2VudHMgYSBzcGVjaWZpYyBkb2N1bWVudC5cclxuICpcclxuICogVGhlIGNsYXNzIGRlZmluZXMgYWxsIHRoZSBuZWNlc3NhcnkgZnVuY3Rpb25zIGZvciBhIERvY3VtZW50LUNsYXNzIHRvIHNlcmlhbGl6ZSBhbmQgZGVzZXJpYWxpemUgaXQuXHJcbiAqIFVzaW5nIHRoaXMgY2xhc3MgbWFrZXMgaXQgcG9zc2libGUgdGhhdCBvYmplY3RzIG9mIHRoZSBEb2N1bWVudC1DbGFzcyBnZXQgc3luY2VkIGVhc2lseSB3aXRoXHJcbiAqIHRoZSBDb3VjaERCIGRhdGFiYXNlIGluIHJlYWwtdGltZS5cclxuICpcclxuICpcclxuICpcclxuICogSE9UIFRPIEVYVEVORCBGUk9NIFRISVMgQ0xBU1M6XHJcbiAqXHJcbiAqIDEpIFRoZSBjbGFzc2VzIHdoaWNoIGltcGxlbWVudCB0aGlzIGNsYXNzIE1VU1RcclxuICogICAgICBhKSBoYXZlIGEgcHVibGljIGNvbnN0cnVjdG9yIHdpdGggdGhlIHRocmVlIHBhcmFtZXRlcnNcclxuICogICAgICAgICBcImpzb246IGFueVwiLCBcImRhdGFiYXNlOjxUeXBlT2ZEb2N1bWVudERhdGFiYXNlPlwiIGFuZCBcImNoYW5nZUxpc3RlbmVyOiB7QGxpbmsgUG91Y2hEYkRvY3VtZW50I0NoYW5nZUxpc3RlbmVyfVwiIVxyXG4gKiAgICAgICAgIEluc2lkZSB0aGUgY29uc3RydWN0b3IgdGhlIGNsYXNzZXMgT05MWSBjYWxscyB0aGUgc3VwZXIgY29uc3RydWN0b3IgYW5kIHBhc3NlcyB0aGVtIHRoZSBwYXJhbWV0ZXJzLlxyXG4gKiAgICAgIGIpIGluaXRpYWxpemUgQUxMIGl0cyBjdXN0b20gdmFyaWFibGVzIHdpdGggZGVmYXVsdCB2YWx1ZXNcclxuICogICAgICBjKSB0byB0YWtlIGNhcmUgdGhhdCB0aGUge0BsaW5rIFBvdWNoRGJEb2N1bWVudCN1cGRhdGVPYmplY3RGaWVsZHNXaXRoRGF0YWJhc2VEb2N1bWVudFZlcnNpb259LWZ1bmN0aW9uXHJcbiAqICAgICAgICAgZ2V0cyBjYWxsZWQgaW4gb3JkZXIgdG8gbG9hZCB0aGUgdmFsdWVzIG9mIHRoZSBqc29uIG9iamVjdCAoZ2l2ZW4gdG8gdGhlIGNvbnN0cnVjdG9yIGFzIGEgcGFyYW1ldGVyKSBpbnRvIHRoaXMgb2JqZWN0LlxyXG4gKiAyKSBUaGUgY2xhc3NlcyBzaG91bGQgbWFrZSB0aGVpciB2YXJpYWJsZXMgb25seSBhdmFpbGFibGUgdGhyb3VnaCBnZXR0ZXIgYW5kIHNldHRlciBmdW5jdGlvbnNcclxuICogICAgICBhKSBFYWNoIHNldHRlciBmdW5jdGlvbiBzaG91bGQgY2FsbCBcInRoaXMudXBsb2FkVG9EYXRhYmFzZSgpO1wiIGFzIHRoZSBsYXN0IHN0YXRlbWVudCBpbiBvcmRlciB0byB1cGxvYWQgYSBjaGFuZ2UgdG8gdGhlIGRhdGFiYXNlXHJcbiAqICAgICAgYikgVGhlIHNldHRlciBoYXMgYWx3YXlzIHRvIGNoZWNrIGlmIHRoZSBzZXR0ZXIgY2FsbCByZWFsbHkgY2hhbmdlcyB0aGUgdmFsdWUuXHJcbiAqICAgICAgICAgXCJ0aGlzLnVwbG9hZFRvRGF0YWJhc2UoKTtcIiBzaG91bGQgb25seSBiZSBwZXJmb3JtZWQgaW4gY2FzZSB0aGUgY2FsbCBvZiB0aGUgc2V0dGVyIHJlYWxseSBjaGFuZ2VkIHRoZSB2YWx1ZS5cclxuICogICAgICAgICBJZiB0aGF0IGRvZXMgbm90IGdldCBkb25lIG9uIHRoaXMgd2F5LCBhbmQgZW5kbGVzcyBsb29wIHdpbGwgYmUgdGhlIHJlc3VsdCBzaW5jZSB0aGUgZGF0YWJhc2UgYWx3YXlzIGNhbGxzIHRoZSBkb2N1bWVudHMgb25DaGFuZ2UgZnVuY3Rpb25cclxuICogICAgICAgICBpZiB0aGUgZG9jdW1lbnQgZ290IHVwbG9hZGVkICh0aGlzIHdpbGwgY2F1c2UgYWxsIHNldHRlcnMgYmVpbmcgY2FsbGVkKSwgYW5kIHRoZSBkb2N1bWVudCB3b3VsZCBhbHdheXMgdXBsb2FkIHRoZSBkb2N1bWVudCB3aGljaCB3b3VsZCBzdGFydCB0aGUgY3ljbGUgYWdhaW4uXHJcbiAqIDMpIFRoZSBjbGFzc2VzIGhhcyB0byBvdmVyd3JpdGUgdGhlIGZ1bmN0aW9ucyBcInNlcmlhbGl6ZVRvSnNvbk9iamVjdFwiIGFuZCBcImRlc2VyaWFsaXplSnNvbk9iamVjdFwiXHJcbiAqIGluIG9yZGVyIHRvIGFkZCBhbHNvIHRoZXJlIGN1c3RvbSBjbGFzcyBmaWVsZHMuXHJcbiAqICAgICAgYSkgSW4gdGhlIGZ1bmN0aW9uIHtAbGluayBQb3VjaERiRG9jdW1lbnQjZGVzZXJpYWxpemVKc29uT2JqZWN0fSB0aGUgY2xhc3NlcyBzaG91bGQgYWx3YXlzIGNoZWNrIGlmIGEgc3BlY2lmaWMgcHJvcGVydHkgaXMgaW5jbHVkZWQgaW4gdGhlIGpzb24gb2JqZWN0LFxyXG4gKiAgICAgICAgIGlmIHRoYXQgaXMgdGhlIGNhc2UsIGl0IGhhcyB0byBzZXQgdGhlIHZhcmlhYmxlIHRvIHRoZSB2YWx1ZSBmcm9tIHRoZSBqc29uIG9iamVjdCB1c2luZyB0aGUgcmlnaHQgc2V0dGVyIGZ1bmN0aW9uICh0byB0YWtlIGFkdmFudGFnZSBvZiBpbnB1dCB2YWx1ZSBjaGVja3NcclxuICogICAgICAgICB0aGF0IG1pZ2h0IGJlIGltcGxlbWVudGVkIGluIHRoZSBzZXR0ZXIgZnVuY3Rpb24pLlxyXG4gKiAgICAgICAgIElmIHRoZSBqc29uIG9iamVjdCBkb2VzIG5vdCBwcm92aWRlIGFueSB2YWx1ZSwgdGhlIHZhcmlhYmxlIGhhcyB0byBzdGF5IHVuY2hhbmdlZC5cclxuICogICAgICBiKSBJbiB0aGUgZnVuY3Rpb24ge0BsaW5rIFBvdWNoRGJEb2N1bWVudCNzZXJpYWxpemVUb0pzb25PYmplY3R9IHRoZSBjbGFzc2VzIHNob3VsZCBmaXJzdCBjYWxsIHRoZSBzdXBlciBpbXBsZW1lbnRhdGlvbiBvZlxyXG4gKiAgICAgICAgIHRoaXMgZnVuY3Rpb24gYW5kIGFmdGVyd2FyZHMgZXh0ZW5kcyB0aGUgcmV0dXJuZWQganNvbiBvYmplY3Qgd2l0aCB0aGUgY3VzdG9tIHByb3BlcnRpZXMgb2YgdGhlIGRvY3VtZW50LlxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBvdWNoRGJEb2N1bWVudDxEb2N1bWVudFR5cGUgZXh0ZW5kcyBQb3VjaERiRG9jdW1lbnQ8RG9jdW1lbnRUeXBlPj4ge1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9Qcm9wZXJ0aWVzLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvKiogdGhlIGRhdGFiYXNlIHdoZXJlIHRoaXMgZG9jdW1lbnQgZ2V0cyBzdG9yZWQgaW4sIHNvIGl0IGNhbiB1cGxvYWQgaXRzZWxmIGluIHRoZSBkYXRhYmFzZSBpbiB0aGUgY2FzZSBvZiBhbiBjaGFuZ2UgKi9cclxuICAgIHByaXZhdGUgZGF0YWJhc2U6IFBvdWNoRGJEYXRhYmFzZTxEb2N1bWVudFR5cGU+O1xyXG5cclxuICAgIC8qKiBJZiB0aGlzIHZhcmlhYmxlIGdldHMgc2V0IHRvIHRydWUsIGEgY2FsbCBvZiB0aGUgZnVuY3Rpb24ge0BsaW5rIFBvdWNoRGJEb2N1bWVudCN1cGxvYWRUb0RhdGFiYXNlfVxyXG4gICAgICogaGFzIGFueSBlZmZlY3QuIFRoaXMgaXMgdXNlZnVsIGlmIHRoZSBkb2N1bWVudCBvYmplY3QgZ2V0cyB1cGRhdGVkIHdpdGggdGhlIGN1cnJlbnQgdmFsdWVzIHJldHJpZXZlZFxyXG4gICAgICogZnJvbSB0aGUgZGF0YWJhc2UsIHNvIHRoYXQgZm9yIHRob3NlIGNoYW5nZXMgdGhlIGRvY3VtZW50IGRvZXMgbm90IGdldCB1cGxvYWRlZCBhZ2Fpbi4gKi9cclxuICAgIHByaXZhdGUgZGlzYWJsZVVwbG9hZDogYm9vbGVhbjtcclxuXHJcblxyXG4gICAgLyoqIHRoZSBpZCBvZiB0aGUgQ291Y2hEQiBkb2N1bWVudCB3aGljaCB0aGlzIG9iamVjdCBpcyByZXByZXNlbnRpbmcgKi9cclxuICAgIHByaXZhdGUgX19pZDogc3RyaW5nO1xyXG5cclxuICAgIC8qKiB0aGUgcmV2aXNpb24gY29kZSBvZiB0aGUgQ291Y2hEQiBkb2N1bWVudCB3aGljaCB0aGlzIG9iamVjdCBpcyByZXByZXNlbnRpbmcgKi9cclxuICAgIHByaXZhdGUgX19yZXY6IHN0cmluZztcclxuXHJcbiAgICAvKiogaW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IHRoZSBkb2N1bWVudCBnb3QgZGVsZXRlZCAqL1xyXG4gICAgcHJpdmF0ZSBfX2RlbGV0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vQ29uc3RydWN0b3IvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIG9mIHRoZSBjbGFzcyBcIlBvdWNoRGJEb2N1bWVudFwiLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBqc29uICBBIEpTT04gb2JqZWN0IEZST00gVEhFIERBVEFCQVNFIHdoaWNoIE1VU1QgaW5jbHVkZSB0aGUgcHJvcGVydHkgXCJfaWRcIlxyXG4gICAgICogICAgICAgICAgICAgICh0aGUgaWQgb2YgdGhlIENvdWNoREIgZG9jdW1lbnQgd2hpY2ggdGhpcyBvYmplY3QgaXMgcmVwcmVzZW50aW5nKVxyXG4gICAgICogQHBhcmFtIGRhdGFiYXNlIHRoZSBkYXRhYmFzZSB3aGVyZSB0aGlzIGRvY3VtZW50IGdldHMgc3RvcmVkIGluLCBzbyBpdCBjYW4gdXBsb2FkIGl0c2VsZiBpbiB0aGUgZGF0YWJhc2UgaW4gdGhlIGNhc2Ugb2YgYW4gY2hhbmdlXHJcbiAgICAgKiBAcGFyYW0gY2hhbmdlTGlzdGVuZXIgYSBjaGFuZ2UgbGlzdGVuZXIgd2hpY2ggd2lsbCBnZXQgY2FsbGVkIGJ5IHRoZSBkYXRhYmFzZSB3aGVuIGV2ZXIgdGhpcyBkb2N1bWVudCBjaGFuZ2VzLFxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgIHNvIHRoYXQgaXQgdXBkYXRlcyB0aGUgdmFsdWVzIHdpdGggdGhlIG9uY2UgZnJvbSB0aGUgZGF0YWJhc2VcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGpzb246IGFueSwgZGF0YWJhc2U6IFBvdWNoRGJEYXRhYmFzZTxEb2N1bWVudFR5cGU+LCBjaGFuZ2VMaXN0ZW5lcjogUG91Y2hEYkRvY3VtZW50LkNoYW5nZUxpc3RlbmVyKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhYmFzZSA9IGRhdGFiYXNlO1xyXG5cclxuICAgICAgICAvLyByZWdpc3RlciB0aGUgb25DaGFuZ2UgZnVuY3Rpb24gYnkgdGhlIGNoYW5nZUxpc3RlbmVyXHJcbiAgICAgICAgY2hhbmdlTGlzdGVuZXIuc2V0T25DaGFuZ2VGdW5jdGlvbih0aGlzLnVwZGF0ZU9iamVjdEZpZWxkc1dpdGhEYXRhYmFzZURvY3VtZW50VmVyc2lvbi5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgLy8gc2luY2UgdGhlIGlkIGNhbm5vdCBjaGFuZ2UsIHdlIGRvIG9ubHkgaGF2ZSB0byBzZXQgaXQgaGVyZSBhbmQgbm90IGluIHRoZVxyXG4gICAgICAgIC8vIGZ1bmN0aW9uIFwiZGVzZXJpYWxpemVKc29uT2JqZWN0XCJcclxuICAgICAgICB0aGlzLl9faWQgPSBqc29uLl9pZDtcclxuXHJcbiAgICAgICAgLy8gc2V0IGRlZmF1bHQgdmFsdWVzIGZvciB0aGUgb3RoZXIgZmllbGRzXHJcbiAgICAgICAgdGhpcy5fX3JldiA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5fX2RlbGV0ZWQ9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9HZXR0ZXIgYW5kIFNldHRlci8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIGlkIG9mIHRoZSBDb3VjaERCIGRvY3VtZW50IHdoaWNoIHRoaXMgb2JqZWN0IGlzIHJlcHJlc2VudGluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSAgb2YgdGhlIENvdWNoREIgZG9jdW1lbnQgd2hpY2ggdGhpcyBvYmplY3QgaXMgcmVwcmVzZW50aW5nXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgX2lkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX19pZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmV2aXNpb24gY29kZSBvZiB0aGUgQ291Y2hEQiBkb2N1bWVudCB3aGljaCB0aGlzIG9iamVjdCBpcyByZXByZXNlbnRpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7c3RyaW5nfSB0aGUgcmV2aXNpb24gY29kZSBvZiB0aGUgQ291Y2hEQiBkb2N1bWVudCB3aGljaCB0aGlzIG9iamVjdCBpcyByZXByZXNlbnRpbmdcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBfcmV2KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX19yZXY7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBkb2N1bWVudCBnb3QgZGVsZXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB3aGV0aGVyIG9yIG5vdCB0aGUgZG9jdW1lbnQgZ290IGRlbGV0ZWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBfZGVsZXRlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fX2RlbGV0ZWQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBzZXRzIHdoZXRoZXIgb3Igbm90IHRoZSBkb2N1bWVudCBnb3QgZGVsZXRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZGVsZXRlZCB0cnVlIGlmIHRoZSBkb2N1bWVudCBzaG91bGQgZ2V0IG1hcmtlZCBhcyBkZWxldGVkLCBmYWxzZSBpZiBub3RcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBfZGVsZXRlZChkZWxldGVkOiBib29sZWFuKSB7XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHZhbHVlIGlzIHJlYWxseSBhIG5ldyB2YWx1ZSB0byBhdm9pZCB1bm5lY2Vzc2FyeSB1cGRhdGVzXHJcbiAgICAgICAgaWYgKGRlbGV0ZWQgIT09IHRoaXMuX2RlbGV0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fX2RlbGV0ZWQgPSBkZWxldGVkO1xyXG4gICAgICAgICAgICB0aGlzLnVwbG9hZFRvRGF0YWJhc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9NZXRob2RzLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdXBsb2FkcyB0aGlzIGRvY3VtZW50IGludG8gaXRzIGRhdGFiYXNlLCBzbyB0aGF0IHRoZSBkYXRhYmFzZSBoYXMgdGhlIGN1cnJlbnQgdmVyc2lvbi5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHVwbG9hZFRvRGF0YWJhc2UoKSB7XHJcbiAgICAgICAgLy8gb25seSBpZiB0aGUgdXBsb2FkIGlzIG5vdCBjdXJyZW50bHkgZGlzYWJsZWQsIHVwbG9hZCB0aGUgZG9jdW1lbnRcclxuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZVVwbG9hZCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlLnB1dERvY3VtZW50KHRoaXMuc2VyaWFsaXplVG9Kc29uT2JqZWN0KCkpLnRoZW4oKHN0YXR1czogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwiRG9jdW1lbnQgY291bGQgbm90IGdldCB1cGxvYWRlZCFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdGFrZXMgYSBKU09OIG9iamVjdCBGUk9NIFRIRSBEQVRBQkFTRSBhbmQgdXBkYXRlcyB0aGUgZmllbGRzIG9mIHRoaXMgb2JqZWN0IHRvIHRoZVxyXG4gICAgICogdmFsdWVzIHByb3ZpZGVkIGJ6IHRoZSBKU09OIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBDT1VUSU9OOiBTaW5jZSBpdCBnZXRzIGFzc3VtZWQgdGhhdCB0aGUgSlNPTiBvYmplY3QgcGFzc2VkIHRvIHRoaXMgZnVuY3Rpb24gaXMgZGlyZWN0bHkgZnJvbSB0aGUgZGF0YWJhc2UsXHJcbiAgICAgKiAgICAgICAgICBhbGwgY2hhbmdlcyB3aGljaCB0aGUgSlNPTiBvYmplY3QgY2F1c2VzIGluIHRoaXMgb2JqZWN0LCB3aWxsIG5vdCBjYXVzZSBhbiB1cGxvYWQgb2YgdGhpcyBvYmplY3QvZG9jdW1lbnQgdG8gdGhlIGRhdGFiYXNlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBqc29uICBBIEpTT04gb2JqZWN0IEZST00gVEhFIERBVEFCQVNFIHdoaWNoIE1VU1QgaW5jbHVkZSB0aGUgcHJvcGVydGllczpcclxuICAgICAqICAgICAgICAgICAgICAgICAgLSBcIl9pZFwiICh0aGUgaWQgb2YgdGhlIENvdWNoREIgZG9jdW1lbnQgd2hpY2ggdGhpcyBvYmplY3QgaXMgcmVwcmVzZW50aW5nKVxyXG4gICAgICogICAgICAgICAgICAgICAgICAtIFwiX3JldlwiICh0aGUgcmV2aXNpb24gY29kZSBvZiB0aGUgQ291Y2hEQiBkb2N1bWVudCB3aGljaCB0aGlzIG9iamVjdCBpcyByZXByZXNlbnRpbmcpXHJcbiAgICAgKlxyXG4gICAgICogICAgICAgICAgICAgIEl0IENBTiBhbHNvIGluY2x1ZGUgdGhlIHByb3BlcnR5OlxyXG4gICAgICogICAgICAgICAgICAgICAgICAtIFwiX2RlbGV0ZWRcIiAoaW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IHRoZSBkb2N1bWVudCBnb3QgZGVsZXRlZCAob3B0aW9uYWwsIGRlZmF1bHRzIHRvIFwiZmFsc2VcIikpXHJcbiAgICAgKlxyXG4gICAgICogICAgICAgICAgICAgIElmIHRoZSBKU09OIG9iamVjdCBkb2VzIG5vdCBpbmNsdWRlIG9uZSBvZiB0aGUgb3B0aW9uYWwgcHJvcGVydGllcyBsaXN0ZWQgYWJvdmUsIGEgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHNldC5cclxuICAgICAqICAgICAgICAgICAgICBJZiB0aGUgSlNPTiBvYmplY3QgaW5jbHVkZXMgcHJvcGVydGllcyB3aGljaCBhcmUgbm90IGxpc3RlZCBhYm92ZSwgdGhvc2UgdmFsdWVzIGdldCBpZ25vcmVkLlxyXG4gICAgICogICAgICAgICAgICAgIChUaGUgd2F5IHRoaXMgZnVuY3Rpb24gZGVhbHMgd2l0aCB1bmtub3duIGF0dHJpYnV0ZXMgZnJvbSB0aGUgSlNPTiBvYmplY3QgaXMgZm9yIHRoZSBwdXJwb3NlIG9mIGNoYW5naW5nXHJcbiAgICAgKiAgICAgICAgICAgICAgdGhlIGRvY3VtZW50IHN0cnVjdHVyZSBkeW5hbWljYWxseSBhbmQgbWFraW5nIHN1cmUgdGhhdCBhbGwgdGhlIGRvY3VtZW50cyB3aGljaCBzdGlsbCBoYXZlIHRoZSBvbGRcclxuICAgICAqICAgICAgICAgICAgICBzdHJ1Y3R1cmUgd2lsbCBnZXQgdXBkYXRlZCBldmVudHVhbGx5LilcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZU9iamVjdEZpZWxkc1dpdGhEYXRhYmFzZURvY3VtZW50VmVyc2lvbihqc29uOiBhbnkpIHtcclxuICAgICAgICAvLyBzaW5jZSBKU09OIG9iamVjdCBzaG91bGQgYmUgdGhlIGRhdGFiYXNlIGRvY3VtZW50IHZlcnNpb24sIHRoZXJlIGlzXHJcbiAgICAgICAgLy8gbm8gbmVlZCBmb3IgdXBsb2FkaW5nIHRob3NlIHZhbHVlcyB0byB0aGUgZGF0YWJhc2UgYWdhaW5cclxuICAgICAgICB0aGlzLmRpc2FibGVVcGxvYWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyBzZXQgYWxsIHRoZSB2YWx1ZXMgb2YgdGhlIGZpZWxkcyBvZiB0aGlzIG9iamVjdCB0byB0aGUgdmFsdWVzIHByb3ZpZGVkIGluIHRoZSBqc29uIG9iamVjdFxyXG4gICAgICAgIHRoaXMuZGVzZXJpYWxpemVKc29uT2JqZWN0U3VwZXJJbXBsZW1lbnRhdGlvbihqc29uKTtcclxuICAgICAgICB0aGlzLmRlc2VyaWFsaXplSnNvbk9iamVjdChqc29uKTtcclxuXHJcbiAgICAgICAgLy8gZW5hYmxlIHVwbG9hZCBhZ2FpblxyXG4gICAgICAgIHRoaXMuZGlzYWJsZVVwbG9hZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBwcm92aWRlcyBhbGwgdGhlIHZhbHVlcyBvZiB0aGUgZmllbGRzIG9mIHRoZSBjdXJyZW50IG9iamVjdCByZXByZXNlbnRlZCBpbiBhXHJcbiAgICAgKiBKU09OIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogU2VlIGFsc286IFRoZSBKU09OIG9iamVjdCBjYW4gYmUgY29udmVydGVkIGJhY2sgaW50byBhbiBvYmplY3QgY3JlYXRpbmcgYSBuZXcgb2JqZWN0IG9mIHRoaXMgY2xhc3MuIEluIGFkZGl0aW9uIHRvIHRoYXRcclxuICAgICAqIGl0IGlzIHBvc3NpYmxlIHRvIHNldCB0aGUgZmllbGQgb2YgdGhpcyBvYmplY3QgYnkgdXNpbmcgdGhlIFwiZGVzZXJpYWxpemVKc29uT2JqZWN0XCIgZnVuY3Rpb24gYW5kIHBhc3NpbmcgYSBKU09OIG9iamVjdFxyXG4gICAgICogdG8gdGhhdCBmdW5jdGlvbiB3aGljaCBpbmNsdWRlcyB0aGUgbmV3IHZhbHVlcyBmb3IgdGhlIGZpZWxkIG9mIHRoaXMgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBKU09OIGRvY3VtZW50IHdoaWNoIGluY2x1ZGVzIGFsbCB0aGUgY3VycmVudCB2YWx1ZXMgb2YgdGhlIGZpZWxkcyBvZiB0aGlzIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHNlcmlhbGl6ZVRvSnNvbk9iamVjdCgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIF9pZDogdGhpcy5faWQsXHJcbiAgICAgICAgICAgIF9yZXY6IHRoaXMuX3JldixcclxuICAgICAgICAgICAgX2RlbGV0ZWQ6IHRoaXMuX2RlbGV0ZWRcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHNldHMgdGhlIGZvbGxvd2luZyB0d28gdmFyaWFibGVzIG9mIHRoZSBzcGVjaWZpYyBvYmplY3QgYnkgdGFraW5nIHRoZSB2YWx1ZXMgZnJvbSB0aGUgSlNPTiBpbnB1dCBvYmplY3QuXHJcbiAgICAgKiAgIC0gKEhBU1QgVE8gQkUgSU5DTFVERUQgSU4gVEhFIEpTT04gT0JKRUNUKSBcIl9pZFwiICh0aGUgaWQgb2YgdGhlIENvdWNoREIgZG9jdW1lbnQgd2hpY2ggdGhpcyBvYmplY3QgaXMgcmVwcmVzZW50aW5nKVxyXG4gICAgICogICAtIChPUFRJT05BTCkgXCJfcmV2XCIgKHRoZSByZXZpc2lvbiBjb2RlIG9mIHRoZSBDb3VjaERCIGRvY3VtZW50IHdoaWNoIHRoaXMgb2JqZWN0IGlzIHJlcHJlc2VudGluZylcclxuICAgICAqXHJcbiAgICAgKiBJZiB0aGVyZSBpcyBubyBwcm9wZXJ0eSBkZWZpbmVkIGluIHRoZSBKU09OIG9iamVjdCBmb3IgYSBzcGVjaWZpYyBmaWVsZCBvZiB0aGUgY2xhc3MsIHRoZSBjbGFzcyBmaWVsZCB3aWxsIGJlIGtlcHQgdW5jaGFuZ2VkLlxyXG4gICAgICpcclxuICAgICAqIENBVVRJT046IFRoaXMgZnVuY3Rpb24gZG9lcyBub3QgY2hhbmdlIHRoZSB2YWx1ZXMgb2YgdGhlIG9iamVjdCBmaWVsZCBcIl9pZFwiIVxyXG4gICAgICpcclxuICAgICAqIFNlZSBhbHNvOiBUaGUgZG9jdW1lbnQgb2JqZWN0IGNhbiBiZSBjb252ZXJ0ZWQgaW50byBhbiBKU09OIG9iamVjdCB1c2luZyB0aGUge0BsaW5rIFBvdWNoRGJEb2N1bWVudCNzZXJpYWxpemVUb0pzb25PYmplY3R9IGZ1bmN0aW9uLlxyXG4gICAgICogICAgICAgICAgIFRoaXMgZnVuY3Rpb24gc2hvdWxkIG9ubHkgYmUgY2FsbGVkIGluZGlyZWN0bHkgYnkgY2FsbGluZyB7QGxpbmsgUG91Y2hEYkRvY3VtZW50I3VwZGF0ZU9iamVjdEZpZWxkc1dpdGhEYXRhYmFzZURvY3VtZW50VmVyc2lvbn0uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGpzb24gYSBKU09OIG9iamVjdCB3aGljaCBpbmNsdWRlcyB0aGUgdmFsdWVzIG9mIHRoZSBvYmplY3RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkZXNlcmlhbGl6ZUpzb25PYmplY3RTdXBlckltcGxlbWVudGF0aW9uKGpzb246IGFueSk6IHZvaWQge1xyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgcmV2aXNpb24gaWRcclxuICAgICAgICB0aGlzLl9fcmV2ID0ganNvbi5fcmV2O1xyXG5cclxuICAgICAgICAvLyBpZiBhIHZhbHVlIGlzIHByb3ZpZGVkIGZyb20gdGhlIGpzb24gb2JqZWN0IHVzZSB0aGlzIHZhbHVlXHJcbiAgICAgICAgaWYgKGpzb24uX2RlbGV0ZWQgIT09IG51bGwpIHRoaXMuX2RlbGV0ZWQgPSBqc29uLl9kZWxldGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBzZXRzIHRoZSB2YXJpYWJsZXMgb2YgdGhlIGluZGl2aWR1YWwgc3ViY2xhc3MgaW1wbGVtZW50aW5nIHtAbGluayBQb3VjaERiRG9jdW1lbnR9LCBieSB0YWtpbmcgdGhlIHZhbHVlcyBmcm9tIHRoZSBKU09OIGlucHV0IG9iamVjdC5cclxuICAgICAqIElmIG5vIHByb3BlcnR5IGlzIGRlZmluZWQgaW4gdGhlIGpzb24gb2JqZWN0IGZvciBhIHNwZWNpZmljIHZhcmlhYmxlLCB0aGUgdmFyaWFibGUgc2hvdWxkIHN0YXkgdW5jaGFuZ2VkLlxyXG4gICAgICpcclxuICAgICAqIFRISVMgRlVOQ1RJT04gU0hPVUxEIE5PVCBHRVQgQ0FMTEVEIEZST00gQU5ZQk9EWSEgSVQgSlVTVCBIQVMgVE8gR0VUIElNUExFTUVOVEVEIEJZIFRIRSBDTEFTUyBUSEFUIEVYVEVORFMgVEhJUyBDTEFTUyFcclxuICAgICAqIFRISVMgU1VQRVIgQ0xBU1MgVEFLRVMgQ0FSRSBPRiBDQUxMSU5HIFRISVMgRlVOQ1RJT04hXHJcbiAgICAgKlxyXG4gICAgICogU2VlIGFsc286IFRoZSBkb2N1bWVudCBvYmplY3QgY2FuIGJlIGNvbnZlcnRlZCBpbnRvIGFuIEpTT04gb2JqZWN0IHVzaW5nIHRoZSB7QGxpbmsgUG91Y2hEYkRvY3VtZW50I3NlcmlhbGl6ZVRvSnNvbk9iamVjdH0gZnVuY3Rpb24uXHJcbiAgICAgKiAgICAgICAgICAgVGhpcyBmdW5jdGlvbiBzaG91bGQgb25seSBiZSBjYWxsZWQgaW5kaXJlY3RseSBieSBjYWxsaW5nIHtAbGluayBQb3VjaERiRG9jdW1lbnQjdXBkYXRlT2JqZWN0RmllbGRzV2l0aERhdGFiYXNlRG9jdW1lbnRWZXJzaW9ufS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ganNvbiBhIEpTT04gb2JqZWN0IHdoaWNoIGluY2x1ZGVzIHRoZSB2YWx1ZXMgb2YgdGhlIG9iamVjdFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgZGVzZXJpYWxpemVKc29uT2JqZWN0KGpzb246IGFueSk6IHZvaWQ7XHJcblxyXG59XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9Jbm5lciBDbGFzc2VzLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbmV4cG9ydCBtb2R1bGUgUG91Y2hEYkRvY3VtZW50IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgaW50ZXJmYWNlIGRlc2NyaWJlcyB0ZSBmdW5jdGlvbiB0aGF0IHNob3VsZCBnZXQgY2FsbGVkIGlmIGEgZG9jdW1lbnQgaW4gYSBkYXRhYmFzZSBjaGFuZ2VkXHJcbiAgICAgKiBhbmQgdGhlIHtAbGluayBQb3VjaERiRG9jdW1lbnR9IGhhcyB0byBiZSBub3RpZmllZC5cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBPbkNoYW5nZUZ1bmN0aW9uIHtcclxuICAgICAgIChqc29uOmFueSk6IHZvaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGNsYXNzIGlzIGEgY29udGFpbmVyIGZvciBhIGNoYW5nZSBsaXN0ZW5lciBmdW5jdGlvbi5cclxuICAgICAqIEl0IGdldHMgb25seSB1c2VkIGZvciBzZXR0aW5nIGEgY2hhbmdlIGxpc3RlbmVyIGZvciBvYmplY3RzIG9mIHtAbGluayBQb3VjaERiRG9jdW1lbnR9LlxyXG4gICAgICogSXQgaXMgdXNlZCBmb3Igc2V0dGluZyBhIGNoYW5nZSBsaXN0ZW5lciBmdW5jdGlvbiBpbiBhbiBhbm9ueW1vdXMgd2F5IHRoYXQgdGhhdCBvbmx5IG9iamVjdHMgb2YgdGhpc1xyXG4gICAgICogY2xhc3MgYW5kIHRoZSBjbGFzcyB0aGF0IGlzIG5vdGlmeWluZywgaW4gY2FzZSBvZiBhbiBjaGFuZ2UsIGtub3dzIGFib3V0IHRoaXMgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBDaGFuZ2VMaXN0ZW5lciB7XHJcblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9Qcm9wZXJ0aWVzLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgICAgIC8qKiBUaGlzIHZhcmlhYmxlIHN0b3JlcyB0aGUgb25DaGFuZ2UgZnVuY3Rpb24gd2hpY2ggZ2V0cyBzZXQgYnkgYW4ge0BsaW5rIFBvdWNoRGJEb2N1bWVudH1cclxuICAgICAgICAgKiBhbmQgc2hvdWxkIGdldCBjYWxsZWQgaW4gdGhlIGNhc2Ugb2YgYW4gY2hhbmdlLiBUaGlzIHZhcmlhYmxlIGhhcyB0byBiZSBzZXQgYnkgY2FsbGluZ1xyXG4gICAgICAgICAqIHtAbGluayBQb3VjaERiRG9jdW1lbnQjQ2hhbmdlTGlzdGVuZXIjc2V0T25DaGFuZ2VGdW5jdGlvbn0qL1xyXG4gICAgICAgIHByaXZhdGUgb25DaGFuZ2VGdW5jdGlvbjogUG91Y2hEYkRvY3VtZW50Lk9uQ2hhbmdlRnVuY3Rpb247XHJcblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL0NvbnN0cnVjdG9yLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbnN0cnVjdG9yIG9mIHRoZSBpbm5lciBjbGFzcyB7QGxpbmsgUG91Y2hEYkRvY3VtZW50I0NoYW5nZUxpc3RlbmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9NZXRob2RzLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoaXMgc2V0dGVyIHNldHMgdGhlIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGdldCBjYWxsZWQgaW4gY2FzZSB0aGUgZnVuY3Rpb25cclxuICAgICAgICAgKiB7QGxpbmsgUG91Y2hEYkRvY3VtZW50I0NoYW5nZUxpc3RlbmVyI2NoYW5nZX0gZ2V0cyBjYWxsZWQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0gb25DaGFuZ2VGdW5jdGlvblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzZXRPbkNoYW5nZUZ1bmN0aW9uKG9uQ2hhbmdlRnVuY3Rpb246UG91Y2hEYkRvY3VtZW50Lk9uQ2hhbmdlRnVuY3Rpb24pOnZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlRnVuY3Rpb24gPSBvbkNoYW5nZUZ1bmN0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhpcyBmdW5jdGlvbiBzaG91bGQgZ2V0IGNhbGxlZCBpZiBhIGNoYW5nZSBvY2N1cnJlZC4gVGhlIGZ1bmN0aW9uXHJcbiAgICAgICAgICogY2FsbHMgdGhlbiBjYWxscyB0aGUgcmlnaHQgZnVuY3Rpb24gb2YgdGhlIGxpc3RlbmVyIHRvIG5vdGlmeSBoaW0gYWJvdXRcclxuICAgICAgICAgKiB0aGUgY2hhbmdlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIGpzb24gdGhlIG5ldyB2ZXJzaW9uIG9mIHRoZSBqc29uIG9iamVjdCB0aGF0IGNoYW5nZWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgb25DaGFuZ2UoanNvbjphbnkpOnZvaWQge1xyXG4gICAgICAgICAgICAvLyBVbmZvcnR1bmF0ZWx5LCBXZWJTdG9ybSB0aHJvd3MgYW4gZXJyb3IgZXZlbiB0aG91Z2ggdGhlcmUgaXMgbm8gbWlzdGFrZS5cclxuICAgICAgICAgICAgLy8gV2l0aCB0aGUgZm9sbG93aW5nIHN0YXRlbWVudC9jb21tZW50IHdlIHN1cHByZXNzIHRoZSBlcnJvciBtZXNzYWdlOlxyXG4gICAgICAgICAgICAvL25vaW5zcGVjdGlvbiBUeXBlU2NyaXB0VmFsaWRhdGVUeXBlc1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlRnVuY3Rpb24oanNvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
