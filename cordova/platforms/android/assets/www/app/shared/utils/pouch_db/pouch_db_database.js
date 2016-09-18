System.register(["../logger", "pouchdb", "./pouch_db_document"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments)).next());
        });
    };
    var logger_1, pouchdb_1, pouch_db_document_1;
    var PouchDbDatabase;
    return {
        setters:[
            function (logger_1_1) {
                logger_1 = logger_1_1;
            },
            function (pouchdb_1_1) {
                pouchdb_1 = pouchdb_1_1;
            },
            function (pouch_db_document_1_1) {
                pouch_db_document_1 = pouch_db_document_1_1;
            }],
        execute: function() {
            /**
             * This abstract class is based on PouchDB and represents one CouchDB database.
             * It can be customized using generics so that it returns different types of document objects according to the database it
             * is managing.
             * This class already implements all the basic functions every database has to provide.
             *
             * This class is based on "async/await" instead of promises. Doing so makes it possible for the class to already handel any errors or merge conflicts.
             * Furthermore, the class already provides the result documents in the correct data type.
             *
             *
             *
             * HOW TO EXTEND FROM THIS CLASS:
             *
             * Classes that implement this class should represent databases for a specific {@link PouchDbDocument}.
             * They should implement a specific {@link PouchDbDocumentLoaderInterface} which describes, what functions
             * the class that, implements this class, should provide.
             *
             * THEY ARE ONLY ALLOWED to provide functions for the purpose of GETTING documents out of the database and
             * provide them in the form of a specific {@link PouchDbDocument}.
             *
             * THEY ARE NOT ALLOWED to functions for adding new documents
             * or uploading documents to the database!! For those purposes the already implemented functions which this class
             * provides should get used!!
             */
            class PouchDbDatabase {
                ////////////////////////////////////////////Constructor////////////////////////////////////////////
                /**
                 * Constructor of the class "PouchDbDatabase"
                 *
                 * @param documentCreator the class of the <DocumentType> in order to be able to create objects of this class
                 * @param url to the original database
                 */
                constructor(documentCreator, url) {
                    this.documentCreator = documentCreator;
                    if (url) {
                        this.initializeDatabase(url);
                    }
                    else {
                        this.remoteDatabase = null;
                        this.database = null;
                    }
                }
                ////////////////////////////////////////Inherited Methods//////////////////////////////////////////
                getDocument(id) {
                    return __awaiter(this, void 0, Promise, function* () {
                        try {
                            // load the wanted document from the database and save it in the right DocumentType
                            return this.createNewDocumentInstance(yield this.database.get(id));
                        }
                        catch (error) {
                            logger_1.Logger.error(error);
                            return null;
                        }
                    });
                }
                getAllDocuments() {
                    return __awaiter(this, void 0, Promise, function* () {
                        try {
                            let documentList = [];
                            // load all the documents from the database
                            let databaseResponse = yield this.database.allDocs({
                                include_docs: true,
                                attachments: false
                            });
                            // put all the documents in a typed array
                            for (let i = 0; i < databaseResponse.rows.length; i++) {
                                documentList[i] = this.createNewDocumentInstance(databaseResponse.rows[i].doc);
                            }
                            // return all the documents in an array
                            return documentList;
                        }
                        catch (error) {
                            logger_1.Logger.error(error);
                            return null;
                        }
                    });
                }
                newDocument() {
                    return __awaiter(this, void 0, Promise, function* () {
                        try {
                            // upload the updated user data
                            let newDocument = yield this.database.post({});
                            // convert the new created document to the right object type
                            return yield this.createNewDocumentInstance({
                                _id: newDocument.id,
                                _rev: newDocument.rev
                            });
                        }
                        catch (error) {
                            logger_1.Logger.error(error);
                            return null;
                        }
                    });
                }
                /////////////////////////////////////////////Methods///////////////////////////////////////////////
                /**
                 * This function initializes the PouchDB database objects needed to build up a
                 * connection to the CouchDB database. The local and the remote database get synced
                 * in real-time.
                 *
                 * This function can also be used to change the URL of the database if necessary.
                 *
                 * @param url to the CouchDB database
                 */
                initializeDatabase(url) {
                    // create PouchDB database objects
                    this.remoteDatabase = new pouchdb_1.default(url);
                    this.database = new pouchdb_1.default('local');
                    // sync the local and the remote database
                    this.database.sync(this.remoteDatabase, {
                        // sync in real-time
                        live: true
                    }).on('change', function (change) {
                    }).on('error', function (error) {
                        logger_1.Logger.error(error);
                    });
                }
                /**
                 * This method loads a document in the database.
                 *
                 * @param json the document, which should get loaded in the database,  as an json object
                 *
                 * @return true if the operation was successfully or false in the case of an error
                 */
                putDocument(json) {
                    return __awaiter(this, void 0, Promise, function* () {
                        try {
                            // upload the document
                            yield this.database.put(json);
                            return true;
                        }
                        catch (error) {
                            logger_1.Logger.error(error);
                            return false;
                        }
                    });
                }
                /**
                 * This function creates an new instance of {@link DocumentType} by taking a json object,
                 * which represents the data of the object, as the input.
                 *
                 * @param json the data of the {@link DocumentType} that should get created
                 * @return {DocumentType} the new document instance
                 */
                createNewDocumentInstance(json) {
                    // create a new change listener for the new object
                    let changeListener = new pouch_db_document_1.PouchDbDocument.ChangeListener();
                    // register a change listener at the database
                    this.database.changes({
                        live: true,
                        since: "now",
                        include_docs: true,
                        doc_ids: [json._id]
                    }).on('change', function (change) {
                        changeListener.onChange(change.doc);
                    }).on('error', function (error) {
                        logger_1.Logger.error(error);
                        return null;
                    });
                    // load the wanted document from the database and save it in the right DocumentType
                    return new this.documentCreator(json, this, changeListener);
                }
            }
            exports_1("PouchDbDatabase", PouchDbDatabase);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC91dGlscy9wb3VjaF9kYi9wb3VjaF9kYl9kYXRhYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBS0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBdUJHO1lBQ0g7Z0JBY0EsbUdBQW1HO2dCQUUvRjs7Ozs7bUJBS0c7Z0JBQ0gsWUFBWSxlQUEwSSxFQUFFLEdBQVc7b0JBQy9KLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO29CQUV2QyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDakMsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQzt3QkFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7b0JBQ3pCLENBQUM7Z0JBQ0wsQ0FBQztnQkFDTCxtR0FBbUc7Z0JBRWxGLFdBQVcsQ0FBQyxFQUFVOzt3QkFDL0IsSUFBSSxDQUFDOzRCQUNELG1GQUFtRjs0QkFDbkYsTUFBTSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZFLENBQUU7d0JBQUEsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs0QkFDYixlQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDO3dCQUNoQixDQUFDO29CQUNMLENBQUM7aUJBQUE7Z0JBRVksZUFBZTs7d0JBQ3hCLElBQUksQ0FBQzs0QkFDRCxJQUFJLFlBQVksR0FBbUIsRUFBRSxDQUFDOzRCQUV0QywyQ0FBMkM7NEJBQzNDLElBQUksZ0JBQWdCLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLE9B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QUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQzt3QkFDbEIsSUFBSSxFQUFFLElBQUk7d0JBQ1YsS0FBSyxFQUFFLEtBQUs7d0JBQ1osWUFBWSxFQUFFLElBQUk7d0JBQ2xCLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7cUJBQ3RCLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVMsTUFBTTt3QkFDM0IsY0FBYyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3hDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxLQUFLO3dCQUMxQixlQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNoQixDQUFDLENBQUMsQ0FBQztvQkFFSCxtRkFBbUY7b0JBQ25GLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFDaEUsQ0FBQztZQUNMLENBQUM7WUExSkQsNkNBMEpDLENBQUEiLCJmaWxlIjoic2hhcmVkL3V0aWxzL3BvdWNoX2RiL3BvdWNoX2RiX2RhdGFiYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtMb2dnZXJ9IGZyb20gXCIuLi9sb2dnZXJcIjtcclxuaW1wb3J0IFBvdWNoREIgZnJvbSBcInBvdWNoZGJcIjtcclxuaW1wb3J0IHtQb3VjaERiRG9jdW1lbnR9IGZyb20gXCIuL3BvdWNoX2RiX2RvY3VtZW50XCI7XHJcbmltcG9ydCB7UG91Y2hEYkRvY3VtZW50TG9hZGVySW50ZXJmYWNlfSBmcm9tIFwiLi9wb3VjaF9kYl9kb2N1bWVudF9sb2FkZXJfaW50ZXJmYWNlXCI7XHJcblxyXG4vKipcclxuICogVGhpcyBhYnN0cmFjdCBjbGFzcyBpcyBiYXNlZCBvbiBQb3VjaERCIGFuZCByZXByZXNlbnRzIG9uZSBDb3VjaERCIGRhdGFiYXNlLlxyXG4gKiBJdCBjYW4gYmUgY3VzdG9taXplZCB1c2luZyBnZW5lcmljcyBzbyB0aGF0IGl0IHJldHVybnMgZGlmZmVyZW50IHR5cGVzIG9mIGRvY3VtZW50IG9iamVjdHMgYWNjb3JkaW5nIHRvIHRoZSBkYXRhYmFzZSBpdFxyXG4gKiBpcyBtYW5hZ2luZy5cclxuICogVGhpcyBjbGFzcyBhbHJlYWR5IGltcGxlbWVudHMgYWxsIHRoZSBiYXNpYyBmdW5jdGlvbnMgZXZlcnkgZGF0YWJhc2UgaGFzIHRvIHByb3ZpZGUuXHJcbiAqXHJcbiAqIFRoaXMgY2xhc3MgaXMgYmFzZWQgb24gXCJhc3luYy9hd2FpdFwiIGluc3RlYWQgb2YgcHJvbWlzZXMuIERvaW5nIHNvIG1ha2VzIGl0IHBvc3NpYmxlIGZvciB0aGUgY2xhc3MgdG8gYWxyZWFkeSBoYW5kZWwgYW55IGVycm9ycyBvciBtZXJnZSBjb25mbGljdHMuXHJcbiAqIEZ1cnRoZXJtb3JlLCB0aGUgY2xhc3MgYWxyZWFkeSBwcm92aWRlcyB0aGUgcmVzdWx0IGRvY3VtZW50cyBpbiB0aGUgY29ycmVjdCBkYXRhIHR5cGUuXHJcbiAqXHJcbiAqXHJcbiAqXHJcbiAqIEhPVyBUTyBFWFRFTkQgRlJPTSBUSElTIENMQVNTOlxyXG4gKlxyXG4gKiBDbGFzc2VzIHRoYXQgaW1wbGVtZW50IHRoaXMgY2xhc3Mgc2hvdWxkIHJlcHJlc2VudCBkYXRhYmFzZXMgZm9yIGEgc3BlY2lmaWMge0BsaW5rIFBvdWNoRGJEb2N1bWVudH0uXHJcbiAqIFRoZXkgc2hvdWxkIGltcGxlbWVudCBhIHNwZWNpZmljIHtAbGluayBQb3VjaERiRG9jdW1lbnRMb2FkZXJJbnRlcmZhY2V9IHdoaWNoIGRlc2NyaWJlcywgd2hhdCBmdW5jdGlvbnNcclxuICogdGhlIGNsYXNzIHRoYXQsIGltcGxlbWVudHMgdGhpcyBjbGFzcywgc2hvdWxkIHByb3ZpZGUuXHJcbiAqXHJcbiAqIFRIRVkgQVJFIE9OTFkgQUxMT1dFRCB0byBwcm92aWRlIGZ1bmN0aW9ucyBmb3IgdGhlIHB1cnBvc2Ugb2YgR0VUVElORyBkb2N1bWVudHMgb3V0IG9mIHRoZSBkYXRhYmFzZSBhbmRcclxuICogcHJvdmlkZSB0aGVtIGluIHRoZSBmb3JtIG9mIGEgc3BlY2lmaWMge0BsaW5rIFBvdWNoRGJEb2N1bWVudH0uXHJcbiAqXHJcbiAqIFRIRVkgQVJFIE5PVCBBTExPV0VEIHRvIGZ1bmN0aW9ucyBmb3IgYWRkaW5nIG5ldyBkb2N1bWVudHNcclxuICogb3IgdXBsb2FkaW5nIGRvY3VtZW50cyB0byB0aGUgZGF0YWJhc2UhISBGb3IgdGhvc2UgcHVycG9zZXMgdGhlIGFscmVhZHkgaW1wbGVtZW50ZWQgZnVuY3Rpb25zIHdoaWNoIHRoaXMgY2xhc3NcclxuICogcHJvdmlkZXMgc2hvdWxkIGdldCB1c2VkISFcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQb3VjaERiRGF0YWJhc2U8RG9jdW1lbnRUeXBlIGV4dGVuZHMgUG91Y2hEYkRvY3VtZW50PERvY3VtZW50VHlwZT4+IGltcGxlbWVudHMgUG91Y2hEYkRvY3VtZW50TG9hZGVySW50ZXJmYWNlPERvY3VtZW50VHlwZT4ge1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9Qcm9wZXJ0aWVzLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvKiogdGhlIGNsYXNzIG9mIHRoZSA8RG9jdW1lbnRUeXBlPiBpbiBvcmRlciB0byBiZSBhYmxlIHRvIGNyZWF0ZSBvYmplY3RzIG9mIHRoaXMgY2xhc3MgKi9cclxuICAgIHByaXZhdGUgZG9jdW1lbnRDcmVhdG9yOiB7bmV3IChqc29uOiBhbnksIGRhdGFiYXNlOiBQb3VjaERiRGF0YWJhc2U8RG9jdW1lbnRUeXBlPiwgY2hhbmdlTGlzdGVuZXI6IFBvdWNoRGJEb2N1bWVudC5DaGFuZ2VMaXN0ZW5lcik6IERvY3VtZW50VHlwZTt9O1xyXG5cclxuICAgIC8vIFBvdWNoREIgb2JqZWN0cyByZXByZXNlbnRpbmcgdGhlIGRhdGFiYXNlXHJcbiAgICAvKiogb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgb3JpZ2luYWwgZGF0YWJhc2Ugb24gdGhlIHNlcnZlciAqL1xyXG4gICAgcHJpdmF0ZSByZW1vdGVEYXRhYmFzZTogYW55O1xyXG4gICAgLyoqIE9iamVjdCByZXByZXNlbnRpbmcgdGhlIGRhdGFiYXNlIG9uIHRoZSBjbGllbnQgc2lkZS4gVGhpcyBkYXRhYnNlIGluc3RhbmNlIGlzXHJcbiAgICAgKiBhbiByZXBsaWNhdGlvbiBvZiB0aGUgZGF0YWJhc2Ugb24gdGhlIHNlcnZlciBhbmQgZ2V0cyBzeW5jZWQgd2l0aCB0aGF0IGluIHJlYWwtdGltZS4gKi9cclxuICAgIHByb3RlY3RlZCBkYXRhYmFzZTogYW55O1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9Db25zdHJ1Y3Rvci8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zdHJ1Y3RvciBvZiB0aGUgY2xhc3MgXCJQb3VjaERiRGF0YWJhc2VcIlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBkb2N1bWVudENyZWF0b3IgdGhlIGNsYXNzIG9mIHRoZSA8RG9jdW1lbnRUeXBlPiBpbiBvcmRlciB0byBiZSBhYmxlIHRvIGNyZWF0ZSBvYmplY3RzIG9mIHRoaXMgY2xhc3NcclxuICAgICAqIEBwYXJhbSB1cmwgdG8gdGhlIG9yaWdpbmFsIGRhdGFiYXNlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50Q3JlYXRvcjoge25ldyAoanNvbjogYW55LCBkYXRhYmFzZTogUG91Y2hEYkRhdGFiYXNlPERvY3VtZW50VHlwZT4sIGNoYW5nZUxpc3RlbmVyOiBQb3VjaERiRG9jdW1lbnQuQ2hhbmdlTGlzdGVuZXIpOiBEb2N1bWVudFR5cGU7fSwgdXJsPzpzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmRvY3VtZW50Q3JlYXRvciA9IGRvY3VtZW50Q3JlYXRvcjtcclxuXHJcbiAgICAgICAgaWYgKHVybCkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVEYXRhYmFzZSh1cmwpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3RlRGF0YWJhc2UgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9Jbmhlcml0ZWQgTWV0aG9kcy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIHB1YmxpYyBhc3luYyBnZXREb2N1bWVudChpZDogc3RyaW5nKTogUHJvbWlzZTxEb2N1bWVudFR5cGU+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBsb2FkIHRoZSB3YW50ZWQgZG9jdW1lbnQgZnJvbSB0aGUgZGF0YWJhc2UgYW5kIHNhdmUgaXQgaW4gdGhlIHJpZ2h0IERvY3VtZW50VHlwZVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVOZXdEb2N1bWVudEluc3RhbmNlKGF3YWl0IHRoaXMuZGF0YWJhc2UuZ2V0KGlkKSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBnZXRBbGxEb2N1bWVudHMoKTogUHJvbWlzZTxEb2N1bWVudFR5cGVbXT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBkb2N1bWVudExpc3Q6IERvY3VtZW50VHlwZVtdID0gW107XHJcblxyXG4gICAgICAgICAgICAvLyBsb2FkIGFsbCB0aGUgZG9jdW1lbnRzIGZyb20gdGhlIGRhdGFiYXNlXHJcbiAgICAgICAgICAgIGxldCBkYXRhYmFzZVJlc3BvbnNlID0gYXdhaXQgdGhpcy5kYXRhYmFzZS5hbGxEb2NzKHtcclxuICAgICAgICAgICAgICAgIGluY2x1ZGVfZG9jczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGF0dGFjaG1lbnRzOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHB1dCBhbGwgdGhlIGRvY3VtZW50cyBpbiBhIHR5cGVkIGFycmF5XHJcbiAgICAgICAgICAgIGZvcihsZXQgaTogbnVtYmVyID0gMDsgaSA8IGRhdGFiYXNlUmVzcG9uc2Uucm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnRMaXN0W2ldID0gdGhpcy5jcmVhdGVOZXdEb2N1bWVudEluc3RhbmNlKGRhdGFiYXNlUmVzcG9uc2Uucm93c1tpXS5kb2MpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyByZXR1cm4gYWxsIHRoZSBkb2N1bWVudHMgaW4gYW4gYXJyYXlcclxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50TGlzdDtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIG5ld0RvY3VtZW50KCk6IFByb21pc2U8RG9jdW1lbnRUeXBlPiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gdXBsb2FkIHRoZSB1cGRhdGVkIHVzZXIgZGF0YVxyXG4gICAgICAgICAgICBsZXQgbmV3RG9jdW1lbnQgPSBhd2FpdCB0aGlzLmRhdGFiYXNlLnBvc3Qoe30pO1xyXG5cclxuICAgICAgICAgICAgLy8gY29udmVydCB0aGUgbmV3IGNyZWF0ZWQgZG9jdW1lbnQgdG8gdGhlIHJpZ2h0IG9iamVjdCB0eXBlXHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNyZWF0ZU5ld0RvY3VtZW50SW5zdGFuY2Uoe1xyXG4gICAgICAgICAgICAgICAgX2lkOiBuZXdEb2N1bWVudC5pZCxcclxuICAgICAgICAgICAgICAgIF9yZXY6IG5ld0RvY3VtZW50LnJldlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9NZXRob2RzLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gaW5pdGlhbGl6ZXMgdGhlIFBvdWNoREIgZGF0YWJhc2Ugb2JqZWN0cyBuZWVkZWQgdG8gYnVpbGQgdXAgYVxyXG4gICAgICogY29ubmVjdGlvbiB0byB0aGUgQ291Y2hEQiBkYXRhYmFzZS4gVGhlIGxvY2FsIGFuZCB0aGUgcmVtb3RlIGRhdGFiYXNlIGdldCBzeW5jZWRcclxuICAgICAqIGluIHJlYWwtdGltZS5cclxuICAgICAqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNhbiBhbHNvIGJlIHVzZWQgdG8gY2hhbmdlIHRoZSBVUkwgb2YgdGhlIGRhdGFiYXNlIGlmIG5lY2Vzc2FyeS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdXJsIHRvIHRoZSBDb3VjaERCIGRhdGFiYXNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbml0aWFsaXplRGF0YWJhc2UodXJsOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICAvLyBjcmVhdGUgUG91Y2hEQiBkYXRhYmFzZSBvYmplY3RzXHJcbiAgICAgICAgdGhpcy5yZW1vdGVEYXRhYmFzZSA9IG5ldyBQb3VjaERCKHVybCk7XHJcbiAgICAgICAgdGhpcy5kYXRhYmFzZSA9IG5ldyBQb3VjaERCKCdsb2NhbCcpO1xyXG5cclxuICAgICAgICAvLyBzeW5jIHRoZSBsb2NhbCBhbmQgdGhlIHJlbW90ZSBkYXRhYmFzZVxyXG4gICAgICAgIHRoaXMuZGF0YWJhc2Uuc3luYyh0aGlzLnJlbW90ZURhdGFiYXNlLCB7XHJcbiAgICAgICAgICAgIC8vIHN5bmMgaW4gcmVhbC10aW1lXHJcbiAgICAgICAgICAgIGxpdmU6IHRydWVcclxuICAgICAgICB9KS5vbignY2hhbmdlJywgZnVuY3Rpb24gKGNoYW5nZSkge1xyXG4gICAgICAgIH0pLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgbG9hZHMgYSBkb2N1bWVudCBpbiB0aGUgZGF0YWJhc2UuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGpzb24gdGhlIGRvY3VtZW50LCB3aGljaCBzaG91bGQgZ2V0IGxvYWRlZCBpbiB0aGUgZGF0YWJhc2UsICBhcyBhbiBqc29uIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4gdHJ1ZSBpZiB0aGUgb3BlcmF0aW9uIHdhcyBzdWNjZXNzZnVsbHkgb3IgZmFsc2UgaW4gdGhlIGNhc2Ugb2YgYW4gZXJyb3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIHB1dERvY3VtZW50KGpzb246IGFueSk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIHVwbG9hZCB0aGUgZG9jdW1lbnRcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5kYXRhYmFzZS5wdXQoanNvbik7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNyZWF0ZXMgYW4gbmV3IGluc3RhbmNlIG9mIHtAbGluayBEb2N1bWVudFR5cGV9IGJ5IHRha2luZyBhIGpzb24gb2JqZWN0LFxyXG4gICAgICogd2hpY2ggcmVwcmVzZW50cyB0aGUgZGF0YSBvZiB0aGUgb2JqZWN0LCBhcyB0aGUgaW5wdXQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGpzb24gdGhlIGRhdGEgb2YgdGhlIHtAbGluayBEb2N1bWVudFR5cGV9IHRoYXQgc2hvdWxkIGdldCBjcmVhdGVkXHJcbiAgICAgKiBAcmV0dXJuIHtEb2N1bWVudFR5cGV9IHRoZSBuZXcgZG9jdW1lbnQgaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVOZXdEb2N1bWVudEluc3RhbmNlKGpzb246IGFueSk6IERvY3VtZW50VHlwZSB7XHJcbiAgICAgICAgLy8gY3JlYXRlIGEgbmV3IGNoYW5nZSBsaXN0ZW5lciBmb3IgdGhlIG5ldyBvYmplY3RcclxuICAgICAgICBsZXQgY2hhbmdlTGlzdGVuZXI6IFBvdWNoRGJEb2N1bWVudC5DaGFuZ2VMaXN0ZW5lciA9IG5ldyBQb3VjaERiRG9jdW1lbnQuQ2hhbmdlTGlzdGVuZXIoKTtcclxuXHJcbiAgICAgICAgLy8gcmVnaXN0ZXIgYSBjaGFuZ2UgbGlzdGVuZXIgYXQgdGhlIGRhdGFiYXNlXHJcbiAgICAgICAgdGhpcy5kYXRhYmFzZS5jaGFuZ2VzKHtcclxuICAgICAgICAgICAgbGl2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2luY2U6IFwibm93XCIsXHJcbiAgICAgICAgICAgIGluY2x1ZGVfZG9jczogdHJ1ZSxcclxuICAgICAgICAgICAgZG9jX2lkczogW2pzb24uX2lkXVxyXG4gICAgICAgIH0pLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihjaGFuZ2UpIHtcclxuICAgICAgICAgICAgY2hhbmdlTGlzdGVuZXIub25DaGFuZ2UoY2hhbmdlLmRvYyk7XHJcbiAgICAgICAgfSkub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBsb2FkIHRoZSB3YW50ZWQgZG9jdW1lbnQgZnJvbSB0aGUgZGF0YWJhc2UgYW5kIHNhdmUgaXQgaW4gdGhlIHJpZ2h0IERvY3VtZW50VHlwZVxyXG4gICAgICAgIHJldHVybiBuZXcgdGhpcy5kb2N1bWVudENyZWF0b3IoanNvbiwgdGhpcywgY2hhbmdlTGlzdGVuZXIpO1xyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
