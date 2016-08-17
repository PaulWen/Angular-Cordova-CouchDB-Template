/**
 * This abstract class is based on PouchDB and represents one document stored in a CouchDB database.
 * It has to be implemented by a class which  represents a specific document.
 *
 * The class defines all the necessary functions for a Document-Class to serialize and deserialize it.
 * Using this class makes it possible that objects of the Document-Class get synced easily with
 * the CouchDB database in real-time.
 *
 * All classes who implement this class should not provide a public constructor. Instead the deserialize
 * function should be the only way an Object of this class can be created.
 */
export abstract class PouchDbDocument<DocumentType> {

////////////////////////////////////////////Properties////////////////////////////////////////////

    /** the id of the CouchDB document which this object is representing */
    private _id: string;

    /** the revision code of the CouchDB document which this object is representing */
    private _rev: string;

    /** indicates whether or not the document got deleted */
    private _deleted: boolean;

////////////////////////////////////////////Constructor////////////////////////////////////////////

    /**
     * The constructor of the class "PouchDbDocument".
     *
     * @param _id the id of the CouchDB document which this object is representing
     * @param _rev the revision code of the CouchDB document which this object is representing
     * @param _deleted indicates whether or not the document got deleted (optional, defaults to "false")
     */
    constructor(_id: string, _rev: string, _deleted: boolean = false) {
        this._id = _id;
        this._rev = _rev;
        this._deleted = _deleted;
    }

/////////////////////////////////////////Getter and Setter/////////////////////////////////////////

    /**
     * This function returns the id of the CouchDB document which this object is representing.
     *
     * @return {string} the  of the CouchDB document which this object is representing
     */
    public get _id(): string {
        return this._id;
    }

    /**
     * This function returns the revision code of the CouchDB document which this object is representing.
     *
     * @return {string} the revision code of the CouchDB document which this object is representing
     */
    public get _rev(): string {
        return this._rev;
    }

    /**
     * This function returns whether or not the document got deleted.
     *
     * @return {boolean} whether or not the document got deleted
     */
    public get _deleted(): boolean {
        return this._deleted;
    }


    /**
     * This function sets hether or not the document got deleted.
     *
     * @param deleted true if the document should get marked as deleted, false if not
     */
    public set _deleted(deleted: boolean) {
        this._deleted = deleted;
        
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    /**
     * This function provides all the values of the fields of the current object represented in
     * JSON.
     *
     * The JSON object can be converted back into an object using the "deserializeJsonObject" function.
     *
     * @return a string representing the JSON document which includes all the current values of the fields of this object.
     */
    public abstract serializeToJsonObject(): any;

    /**
     * This function is supposed to be used to create an object of this class. The JSON input string
     * should contain the values of the object. The JSON object must contain at least a valid "_id" and "_rev".
     * For all the other values there are default configured in case they do net get provided by the JSON object.
     * If the JSON object includes values which are no fields of this class, those values get ignored.
     *
     * (The way this function deals with unknown attributes from the JSON object is for the purpose of changing
     * the document structure dynamically and making sure that all the documents which still have the old
     * structure will get updated eventually.)
     *
     * The document object can be converted back into an JSON object using the "serializeToJsonObject" function.
     *
     *
     * @param json a JSON object which includes the values of the object
     *
     * @return an new object of this class with the values included in the JSON object
     */
    public abstract deserializeJsonObject(json: any): DocumentType;

}