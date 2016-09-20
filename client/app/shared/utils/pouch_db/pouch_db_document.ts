import {PouchDbDatabase} from "./pouch_db_database";
import {Logger} from "../logger";

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
 *         "json: any" and "database:<TypeOfDocumentDatabase>"!
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
export abstract class PouchDbDocument<DocumentType extends PouchDbDocument<DocumentType>> {

////////////////////////////////////////////Properties////////////////////////////////////////////

    /** the database where this document gets stored in, so it can upload itself in the database in the case of an change */
    private database: PouchDbDatabase<DocumentType>;

    /** If this variable gets set to true, a call of the function {@link PouchDbDocument#uploadToDatabase}
     * has any effect. This is useful if the document object gets updated with the current values retrieved
     * from the database, so that for those changes the document does not get uploaded again. */
    private disableUpload: boolean;


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
     * @param json  A JSON object FROM THE DATABASE which MUST include the property "_id"
     *              (the id of the CouchDB document which this object is representing)
     * @param database the database where this document gets stored in, so it can upload itself in the database in the case of an change
     */
    constructor(json: any, database: PouchDbDatabase<DocumentType>) {
        this.database = database;

        // register a change listener at the database for this document
        database.registerIdChangeListener(json._id, this.updateObjectFieldsWithDatabaseDocumentVersion.bind(this));

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
    protected uploadToDatabase() {
        // only if the upload is not currently disabled, upload the document
        if (!this.disableUpload) {
            this.database.putDocument(this.serializeToJsonObject()).then((status: boolean) => {
                if (!status) {
                    Logger.log("Document could not get uploaded!");
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
    protected updateObjectFieldsWithDatabaseDocumentVersion(json: any) {
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
    protected serializeToJsonObject(): any {
        return {
            _id: this._id,
            _rev: this._rev,
            _deleted: this._deleted
        }
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
    private deserializeJsonObjectSuperImplementation(json: any): void {
        // update the revision id
        this.__rev = json._rev;

        // if a value is provided from the json object use this value
        if (json._deleted !== undefined) this._deleted = json._deleted;
    }

    /**
     * This function sets the variables of the individual subclass implementing {@link PouchDbDocument}, by taking the values from the JSON input object.
     * If no property is defined in the json object for a specific variable, the variable should stay unchanged.
     *
     * THIS FUNCTION SHOULD NOT GET CALLED FROM ANYBODY! IT JUST HAS TO GET IMPLEMENTED BY THE CLASS THAT EXTENDS THIS CLASS!
     * THIS SUPER CLASS TAKES CARE OF CALLING THIS FUNCTION!
     *
     * See also: The document object can be converted into an JSON object using the {@link PouchDbDocument#serializeToJsonObject} function.
     *           This function should only be called indirectly by calling {@link PouchDbDocument#updateObjectFieldsWithDatabaseDocumentVersion}.
     *
     * @param json a JSON object which includes the values of the object
     */
    protected abstract deserializeJsonObject(json: any): void;

}