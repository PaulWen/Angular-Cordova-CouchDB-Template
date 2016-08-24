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
 * 1) The classes which implement this class MUST have a public constructor with the two parameters
 * "json: any" and "database:<TypeOfDocumentDatabase>"! Inside the constructor the classes ONLY call the super constructor and pass them the parameters.
 * The super-constructor takes care that the "deserializeJsonObject"-function gets called in order to load the values of the json object
 * (given to the constructor as a parameter) into this object.
 * 2) The classes have to provide default values for all of there variables which represent a document value! This default value
 * has to get defined during the declaration!
 * 3) The classes has to overwrite the functions "serializeToJsonObject" and "deserializeJsonObject"
 * in order to add also there custom class fields. When overriding the methods the classes to also have to call the super implementation
 * of those functions first!
 *      a) In the function {@link PouchDbDocument#deserializeJsonObject} the classes should always check if a specific property is included in the json object,
 *         if that is the cas use the value from the json object. if the json object does not provide any value, the variable has to stay unchanged.
 *         In addition to that the classes should call the super implementation of this function.
 *      b) In the function {@link PouchDbDocument#serializeToJsonObject} the classes should first call the super implementation of
 *         this function and afterwards extends the returned json object with the custom properties of the document.
 * 4) The classes should make their variables only available through getter and setter functions
 * 5) Each setter function should call "this.uploadToDatabase();" as the last statement in order to upload a change to the database
 * ("this.uploadToDatabase();" should only be performed in case the call of the setter really changed the value)
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
    private __deleted: boolean = false;

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
     * @param database the database where this document gets stored in, so it can upload itself in the database in the case of an change
     * @param changeListener a change listener which will get called by the database when ever this document changes,
     *                       so that it updates the values with the once from the database
     *
     */
    constructor(json: any, database: PouchDbDatabase<DocumentType>, changeListener: PouchDbDocument.ChangeListener) {
        this.database = database;

        // register the onChange function by the changeListener
        changeListener.setOnChangeFunction(this.onChange);

        // since @link{PouchDbDocument} should only get provided via @link{PouchDbDocumentLoaderInterface}
        // the json object passed to this constructor should always be right from the database so there is
        // no need for uploading those values to the database again
        this.disableUpload = true;

        // since the id cannot change, we do only have to set it here and not in the
        // function "deserializeJsonObject"
        this.__id = json._id;

        // set all the values of the fields of this object to the values provided in the json object
        this.deserializeJsonObject(json);

        // enable upload again
        this.disableUpload = false;
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
        if (deleted != this._deleted) {
            this.__deleted = deleted;
            this.uploadToDatabase();
        }
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    /**
     * This function should get called by the change listener, whenever there are new changes for this
     * document in the database. The function updates the values of this object with the new values of
     * the database.
     *
     * @param json the new version of the json object that changed
     */
    private onChange(json: any): void {
        // since this function should get only called by the database, if there are changes for the document
        // in the database, we do not have to update the database
        this.disableUpload = true;

        // update all the values of the fields of this object to the values provided in the json object
        this.deserializeJsonObject(json);

        // enable upload again
        this.disableUpload = false;
    }

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
    protected deserializeJsonObject(json: any): void {
        // update the revision id
        this.__rev = json._rev;

        // if a value is provided from the json object use this value
        if (json._deleted != null) this._deleted = json._deleted;
    }

}

//////////////////////////////////////////Inner Classes////////////////////////////////////////////

export module PouchDbDocument {

    /**
     * This class is a container for a change listener function.
     * It gets only used for setting a change listener for objects of {@link PouchDbDocument}.
     * It is used for setting a change listener function in an anonymous way that that only objects of this
     * class and the class that is notifying, in case of an change, knows about this function.
     */
    export class ChangeListener {

        ///////////////////////////////////////////Properties//////////////////////////////////////////

        /** This variable stores the onChange function which gets set by an {@link PouchDbDocument}
         * and should get called in the case of an change. This variable has to be set by calling
         * {@link PouchDbDocument#ChangeListener#setOnChangeFunction}*/
        private onChange:(json:any) => void;

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
         * @param onChange
         */
        public setOnChangeFunction(onChange:(json:any) => void):void {
            this.onChange = onChange;
        }

        /**
         * This function should get called if a change occurred. The function
         * calls then calls the right function of the listener to notify him about
         * the change.
         *
         * @param json the new version of the json object that changed
         */
        public change(json:any):void {
            this.onChange(json);
        }
    }
}
