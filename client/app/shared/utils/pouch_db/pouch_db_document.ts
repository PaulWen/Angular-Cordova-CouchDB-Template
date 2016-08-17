/**
 * This abstract class is based on PouchDB and represents one document stored in a CouchDB database.
 * It has to be implemented by a class which  represents a specific document.
 *
 * The class defines all the necessary functions for a Document-Class to serialize and deserialize it.
 * Using this class makes it possible that objects of the Document-Class get synced easily with
 * the CouchDB database in real-time.
 *
 * HOT TO USE THE CLASS:
 * The classes which implement this class MUST have a public constructor with the single parameter "json: any"!
 * In addition to that, the classes should override the functions "serializeToJsonObject" and "deserializeJsonObject"
 * in order to add also there custom class fields.
 */
export abstract class PouchDbDocument<DocumentType> {

////////////////////////////////////////////Properties////////////////////////////////////////////

    /** the id of the CouchDB document which this object is representing */
    private __id: string;

    /** the revision code of the CouchDB document which this object is representing */
    private __rev: string;

    /** indicates whether or not the document got deleted */
    private __deleted: boolean;

////////////////////////////////////////////Constructor////////////////////////////////////////////

    /**
     * The constructor of the class "PouchDbDocument".
     *
     * @param json  A JSON object which MUST include the properties:
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
    constructor(json: any) {
        this.__id = json._id;
        this.__rev = json._rev;
        this._deleted = (json._deleted) ? json._deleted : false;
    }

/////////////////////////////////////////Getter and Setter/////////////////////////////////////////

    /**
     * This function returns the id of the CouchDB document which this object is representing.
     *
     * @return {string} the  of the CouchDB document which this object is representing
     */
    public get _id(): string {
        return this.__id;
    }

    /**
     * This function returns the revision code of the CouchDB document which this object is representing.
     *
     * @return {string} the revision code of the CouchDB document which this object is representing
     */
    public get _rev(): string {
        return this.__rev;
    }

    /**
     * This function returns whether or not the document got deleted.
     *
     * @return {boolean} whether or not the document got deleted
     */
    public get _deleted(): boolean {
        return this.__deleted;
    }


    /**
     * This function sets whether or not the document got deleted.
     *
     * @param deleted true if the document should get marked as deleted, false if not
     */
    public set _deleted(deleted: boolean) {
        this.__deleted = deleted;
        
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

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
    public serializeToJsonObject(): any {
        return {
            _id: this._id,
            _rev: this._rev,
            _deleted: this._deleted
        }
    }

    /**
     * This function sets all the individual fields of a specific object by taking the values from the JSON input object.
     * If there is no property defined in the JSON object for a specific field of the class, the class field will be kept unchanged.
     *
     * CAUTION: This function does not change the values of the object fields "_id" or "_rev" or "_deleted"!
     *          The function only updates the custom fields of the class that is implementing this function.
     *
     *
     * See also: The document object can be converted into an JSON object using the "serializeToJsonObject" function.
     *
     * @param json a JSON object which includes the values of the object
     */
    public deserializeJsonObject(json: any): void {

    }

}