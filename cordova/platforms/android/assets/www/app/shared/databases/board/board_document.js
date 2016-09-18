System.register(["../../utils/pouch_db/pouch_db_document"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var pouch_db_document_1;
    var BoardDocument;
    return {
        setters:[
            function (pouch_db_document_1_1) {
                pouch_db_document_1 = pouch_db_document_1_1;
            }],
        execute: function() {
            /**
             * This class represents the structure of an board document in the database.
             * Once created, it automatically syncs with its database in real-time.
             */
            class BoardDocument extends pouch_db_document_1.PouchDbDocument {
                ////////////////////////////////////////////Constructor////////////////////////////////////////////
                /**
                 * The constructor of the class "BoardDocument".
                 *
                 * @param json  A JSON object which MUST include the properties:
                 *                  - "_id" (the id of the CouchDB document which this object is representing)
                 *                  - "_rev" (the revision code of the CouchDB document which this object is representing)
                 *
                 *              It CAN also include the property:
                 *                  - "_deleted" (indicates whether or not the document got deleted (optional, defaults to "false"))
                 *
                 *              Furthermore, it CAN include the properties:
                 *                  - "name" (the name of the board)
                 *                  - "backgroundColor" (the background color of the board)
                 *
                 *
                 *              If the JSON object does not include one of the optional properties listed above, a default value will be set.
                 *              If the JSON object includes properties which are not listed above, those values get ignored.
                 *              (The way this function deals with unknown attributes from the JSON object is for the purpose of changing
                 *              the document structure dynamically and making sure that all the documents which still have the old
                 *              structure will get updated eventually.)
                 *
                 * @param database the database where this document gets stored in, so it can upload itself in the database in the case of an change
                 * @param changeListener a change listener which will get called by the database when ever this document changes,
                 *                       so that it updates the values with the once from the database
                 */
                constructor(json, database, changeListener) {
                    super(json, database, changeListener);
                    // set the default values of the fields
                    this._name = "";
                    this._backgroundColor = "#000099";
                    // update the fields if the JSON Object includes specific values for them
                    this.updateObjectFieldsWithDatabaseDocumentVersion(json);
                }
                /////////////////////////////////////////Getter and Setter/////////////////////////////////////////
                /**
                 *  This function returns the name of the board.
                 *
                 * @return {string} the name of the board
                 */
                get name() {
                    return this._name;
                }
                /**
                 *  This function sets the the name of the board.
                 *
                 * @param name the name of the board
                 */
                set name(name) {
                    // check if the value is really a new value to avoid unnecessary updates
                    if (name !== this.name) {
                        this._name = name;
                        this.uploadToDatabase();
                    }
                }
                /**
                 *  This function returns the the background color of the board.
                 *
                 * @return {string} the background color of the board
                 */
                get backgroundColor() {
                    return this._backgroundColor;
                }
                /**
                 * This function sets the background color of the board
                 *
                 * @param backgroundColor the background color of the board
                 */
                set backgroundColor(backgroundColor) {
                    // check if the value is really a new value to avoid unnecessary updates
                    if (backgroundColor !== this.backgroundColor) {
                        this._backgroundColor = backgroundColor;
                        this.uploadToDatabase();
                    }
                }
                ////////////////////////////////////////Inherited Methods//////////////////////////////////////////
                serializeToJsonObject() {
                    let json = super.serializeToJsonObject();
                    // add the fields of this class
                    json.name = this.name;
                    json.backgroundColor = this.backgroundColor;
                    return json;
                }
                deserializeJsonObject(json) {
                    // if a value is provided from the json object use this value
                    if (json.name !== null)
                        this.name = json.name;
                    if (json.backgroundColor !== null)
                        this.backgroundColor = json.backgroundColor;
                }
            }
            exports_1("BoardDocument", BoardDocument);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9kYXRhYmFzZXMvYm9hcmQvYm9hcmRfZG9jdW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7WUFJQTs7O2VBR0c7WUFDSCw0QkFBbUMsbUNBQWU7Z0JBVWxELG1HQUFtRztnQkFFL0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkF3Qkc7Z0JBQ0gsWUFBbUIsSUFBUyxFQUFFLFFBQXVCLEVBQUUsY0FBOEM7b0JBQ2pHLE1BQU0sSUFBSSxFQUFFLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FBQztvQkFFdEMsdUNBQXVDO29CQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztvQkFFbEMseUVBQXlFO29CQUN6RSxJQUFJLENBQUMsNkNBQTZDLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdELENBQUM7Z0JBRUwsbUdBQW1HO2dCQUUvRjs7OzttQkFJRztnQkFDSCxJQUFXLElBQUk7b0JBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRUQ7Ozs7bUJBSUc7Z0JBQ0gsSUFBVyxJQUFJLENBQUMsSUFBWTtvQkFDeEIsd0VBQXdFO29CQUN4RSxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO3dCQUNsQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDNUIsQ0FBQztnQkFDTCxDQUFDO2dCQUVEOzs7O21CQUlHO2dCQUNILElBQVcsZUFBZTtvQkFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDakMsQ0FBQztnQkFFRDs7OzttQkFJRztnQkFDSCxJQUFXLGVBQWUsQ0FBQyxlQUF1QjtvQkFDOUMsd0VBQXdFO29CQUN4RSxFQUFFLENBQUMsQ0FBQyxlQUFlLEtBQUssSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7d0JBQzNDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxlQUFlLENBQUM7d0JBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUM1QixDQUFDO2dCQUNMLENBQUM7Z0JBRUwsbUdBQW1HO2dCQUVyRixxQkFBcUI7b0JBQzNCLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO29CQUV6QywrQkFBK0I7b0JBQy9CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO29CQUU1QyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDO2dCQUVTLHFCQUFxQixDQUFDLElBQVM7b0JBQ3JDLDZEQUE2RDtvQkFDN0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUM7d0JBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUM5QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxLQUFLLElBQUksQ0FBQzt3QkFBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7Z0JBQ25GLENBQUM7WUFDTCxDQUFDO1lBL0dELHlDQStHQyxDQUFBIiwiZmlsZSI6InNoYXJlZC9kYXRhYmFzZXMvYm9hcmQvYm9hcmRfZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BvdWNoRGJEb2N1bWVudH0gZnJvbSBcIi4uLy4uL3V0aWxzL3BvdWNoX2RiL3BvdWNoX2RiX2RvY3VtZW50XCI7XHJcbmltcG9ydCB7Qm9hcmREYXRhYmFzZX0gZnJvbSBcIi4vYm9hcmRfZGF0YWJhc2VcIjtcclxuaW1wb3J0IHtMb2dnZXJ9IGZyb20gXCIuLi8uLi91dGlscy9sb2dnZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgdGhlIHN0cnVjdHVyZSBvZiBhbiBib2FyZCBkb2N1bWVudCBpbiB0aGUgZGF0YWJhc2UuXHJcbiAqIE9uY2UgY3JlYXRlZCwgaXQgYXV0b21hdGljYWxseSBzeW5jcyB3aXRoIGl0cyBkYXRhYmFzZSBpbiByZWFsLXRpbWUuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQm9hcmREb2N1bWVudCBleHRlbmRzIFBvdWNoRGJEb2N1bWVudDxCb2FyZERvY3VtZW50PiB7XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1Byb3BlcnRpZXMvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIC8qKiB0aGUgbmFtZSBvZiB0aGUgYm9hcmQgKi9cclxuICAgIHByaXZhdGUgX25hbWU6IHN0cmluZztcclxuXHJcbiAgICAvKiogdGhlIGJhY2tncm91bmQgY29sb3Igb2YgdGhlIGJvYXJkICovXHJcbiAgICBwcml2YXRlIF9iYWNrZ3JvdW5kQ29sb3I6IHN0cmluZztcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vQ29uc3RydWN0b3IvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIG9mIHRoZSBjbGFzcyBcIkJvYXJkRG9jdW1lbnRcIi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ganNvbiAgQSBKU09OIG9iamVjdCB3aGljaCBNVVNUIGluY2x1ZGUgdGhlIHByb3BlcnRpZXM6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIC0gXCJfaWRcIiAodGhlIGlkIG9mIHRoZSBDb3VjaERCIGRvY3VtZW50IHdoaWNoIHRoaXMgb2JqZWN0IGlzIHJlcHJlc2VudGluZylcclxuICAgICAqICAgICAgICAgICAgICAgICAgLSBcIl9yZXZcIiAodGhlIHJldmlzaW9uIGNvZGUgb2YgdGhlIENvdWNoREIgZG9jdW1lbnQgd2hpY2ggdGhpcyBvYmplY3QgaXMgcmVwcmVzZW50aW5nKVxyXG4gICAgICpcclxuICAgICAqICAgICAgICAgICAgICBJdCBDQU4gYWxzbyBpbmNsdWRlIHRoZSBwcm9wZXJ0eTpcclxuICAgICAqICAgICAgICAgICAgICAgICAgLSBcIl9kZWxldGVkXCIgKGluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCB0aGUgZG9jdW1lbnQgZ290IGRlbGV0ZWQgKG9wdGlvbmFsLCBkZWZhdWx0cyB0byBcImZhbHNlXCIpKVxyXG4gICAgICpcclxuICAgICAqICAgICAgICAgICAgICBGdXJ0aGVybW9yZSwgaXQgQ0FOIGluY2x1ZGUgdGhlIHByb3BlcnRpZXM6XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgIC0gXCJuYW1lXCIgKHRoZSBuYW1lIG9mIHRoZSBib2FyZClcclxuICAgICAqICAgICAgICAgICAgICAgICAgLSBcImJhY2tncm91bmRDb2xvclwiICh0aGUgYmFja2dyb3VuZCBjb2xvciBvZiB0aGUgYm9hcmQpXHJcbiAgICAgKlxyXG4gICAgICpcclxuICAgICAqICAgICAgICAgICAgICBJZiB0aGUgSlNPTiBvYmplY3QgZG9lcyBub3QgaW5jbHVkZSBvbmUgb2YgdGhlIG9wdGlvbmFsIHByb3BlcnRpZXMgbGlzdGVkIGFib3ZlLCBhIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSBzZXQuXHJcbiAgICAgKiAgICAgICAgICAgICAgSWYgdGhlIEpTT04gb2JqZWN0IGluY2x1ZGVzIHByb3BlcnRpZXMgd2hpY2ggYXJlIG5vdCBsaXN0ZWQgYWJvdmUsIHRob3NlIHZhbHVlcyBnZXQgaWdub3JlZC5cclxuICAgICAqICAgICAgICAgICAgICAoVGhlIHdheSB0aGlzIGZ1bmN0aW9uIGRlYWxzIHdpdGggdW5rbm93biBhdHRyaWJ1dGVzIGZyb20gdGhlIEpTT04gb2JqZWN0IGlzIGZvciB0aGUgcHVycG9zZSBvZiBjaGFuZ2luZ1xyXG4gICAgICogICAgICAgICAgICAgIHRoZSBkb2N1bWVudCBzdHJ1Y3R1cmUgZHluYW1pY2FsbHkgYW5kIG1ha2luZyBzdXJlIHRoYXQgYWxsIHRoZSBkb2N1bWVudHMgd2hpY2ggc3RpbGwgaGF2ZSB0aGUgb2xkXHJcbiAgICAgKiAgICAgICAgICAgICAgc3RydWN0dXJlIHdpbGwgZ2V0IHVwZGF0ZWQgZXZlbnR1YWxseS4pXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGRhdGFiYXNlIHRoZSBkYXRhYmFzZSB3aGVyZSB0aGlzIGRvY3VtZW50IGdldHMgc3RvcmVkIGluLCBzbyBpdCBjYW4gdXBsb2FkIGl0c2VsZiBpbiB0aGUgZGF0YWJhc2UgaW4gdGhlIGNhc2Ugb2YgYW4gY2hhbmdlXHJcbiAgICAgKiBAcGFyYW0gY2hhbmdlTGlzdGVuZXIgYSBjaGFuZ2UgbGlzdGVuZXIgd2hpY2ggd2lsbCBnZXQgY2FsbGVkIGJ5IHRoZSBkYXRhYmFzZSB3aGVuIGV2ZXIgdGhpcyBkb2N1bWVudCBjaGFuZ2VzLFxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgIHNvIHRoYXQgaXQgdXBkYXRlcyB0aGUgdmFsdWVzIHdpdGggdGhlIG9uY2UgZnJvbSB0aGUgZGF0YWJhc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGpzb246IGFueSwgZGF0YWJhc2U6IEJvYXJkRGF0YWJhc2UsIGNoYW5nZUxpc3RlbmVyOiBQb3VjaERiRG9jdW1lbnQuQ2hhbmdlTGlzdGVuZXIpIHtcclxuICAgICAgICBzdXBlcihqc29uLCBkYXRhYmFzZSwgY2hhbmdlTGlzdGVuZXIpO1xyXG5cclxuICAgICAgICAvLyBzZXQgdGhlIGRlZmF1bHQgdmFsdWVzIG9mIHRoZSBmaWVsZHNcclxuICAgICAgICB0aGlzLl9uYW1lID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9iYWNrZ3JvdW5kQ29sb3IgPSBcIiMwMDAwOTlcIjtcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBmaWVsZHMgaWYgdGhlIEpTT04gT2JqZWN0IGluY2x1ZGVzIHNwZWNpZmljIHZhbHVlcyBmb3IgdGhlbVxyXG4gICAgICAgIHRoaXMudXBkYXRlT2JqZWN0RmllbGRzV2l0aERhdGFiYXNlRG9jdW1lbnRWZXJzaW9uKGpzb24pO1xyXG4gICAgfVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9HZXR0ZXIgYW5kIFNldHRlci8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSBib2FyZC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBuYW1lIG9mIHRoZSBib2FyZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTpzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIFRoaXMgZnVuY3Rpb24gc2V0cyB0aGUgdGhlIG5hbWUgb2YgdGhlIGJvYXJkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBuYW1lIHRoZSBuYW1lIG9mIHRoZSBib2FyZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IG5hbWUobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHZhbHVlIGlzIHJlYWxseSBhIG5ldyB2YWx1ZSB0byBhdm9pZCB1bm5lY2Vzc2FyeSB1cGRhdGVzXHJcbiAgICAgICAgaWYgKG5hbWUgIT09IHRoaXMubmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuICAgICAgICAgICAgdGhpcy51cGxvYWRUb0RhdGFiYXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIFRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgdGhlIGJhY2tncm91bmQgY29sb3Igb2YgdGhlIGJvYXJkLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gdGhlIGJhY2tncm91bmQgY29sb3Igb2YgdGhlIGJvYXJkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgYmFja2dyb3VuZENvbG9yKCk6c3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYmFja2dyb3VuZENvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBzZXRzIHRoZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBib2FyZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBiYWNrZ3JvdW5kQ29sb3IgdGhlIGJhY2tncm91bmQgY29sb3Igb2YgdGhlIGJvYXJkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgYmFja2dyb3VuZENvbG9yKGJhY2tncm91bmRDb2xvcjogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHZhbHVlIGlzIHJlYWxseSBhIG5ldyB2YWx1ZSB0byBhdm9pZCB1bm5lY2Vzc2FyeSB1cGRhdGVzXHJcbiAgICAgICAgaWYgKGJhY2tncm91bmRDb2xvciAhPT0gdGhpcy5iYWNrZ3JvdW5kQ29sb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5fYmFja2dyb3VuZENvbG9yID0gYmFja2dyb3VuZENvbG9yO1xyXG4gICAgICAgICAgICB0aGlzLnVwbG9hZFRvRGF0YWJhc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vSW5oZXJpdGVkIE1ldGhvZHMvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICBwcm90ZWN0ZWQgc2VyaWFsaXplVG9Kc29uT2JqZWN0KCk6IGFueSB7XHJcbiAgICAgICAgbGV0IGpzb24gPSBzdXBlci5zZXJpYWxpemVUb0pzb25PYmplY3QoKTtcclxuXHJcbiAgICAgICAgLy8gYWRkIHRoZSBmaWVsZHMgb2YgdGhpcyBjbGFzc1xyXG4gICAgICAgIGpzb24ubmFtZSA9IHRoaXMubmFtZTtcclxuICAgICAgICBqc29uLmJhY2tncm91bmRDb2xvciA9IHRoaXMuYmFja2dyb3VuZENvbG9yO1xyXG5cclxuICAgICAgICByZXR1cm4ganNvbjtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZGVzZXJpYWxpemVKc29uT2JqZWN0KGpzb246IGFueSk6IHZvaWQge1xyXG4gICAgICAgIC8vIGlmIGEgdmFsdWUgaXMgcHJvdmlkZWQgZnJvbSB0aGUganNvbiBvYmplY3QgdXNlIHRoaXMgdmFsdWVcclxuICAgICAgICBpZiAoanNvbi5uYW1lICE9PSBudWxsKSB0aGlzLm5hbWUgPSBqc29uLm5hbWU7XHJcbiAgICAgICAgaWYgKGpzb24uYmFja2dyb3VuZENvbG9yICE9PSBudWxsKSB0aGlzLmJhY2tncm91bmRDb2xvciA9IGpzb24uYmFja2dyb3VuZENvbG9yO1xyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
