import {PouchDbDocument} from "../../utils/pouch_db/pouch_db_document";
import {Logger} from "../../utils/logger";
import {PouchDbDatabase} from "../../utils/pouch_db/pouch_db_database";

/**
 * This class represents the structure of an board document in the database.
 * Once created, it automatically syncs with its database in real-time.
 */
export class BoardDocument extends PouchDbDocument<BoardDocument> {

////////////////////////////////////////////Properties////////////////////////////////////////////

    /** the name of the board */
    private _name: string;

    /** the background color of the board */
    private _backgroundColor: string;

////////////////////////////////////////////Constructor////////////////////////////////////////////

    /**
     * The constructor of the class "BoardDocument".
     *
     * @param database the database where this document gets stored in, so it can upload itself in the database in the case of an change
     * @param _id  the id of the CouchDB document which this object is representing
     */
    public constructor(database: PouchDbDatabase, _id?: string) {
        if (_id !== null) {
            super(_id, database);
        } else {
            super("test", database);
        }



        // set the default values of the fields
        this._name = "";
        this._backgroundColor = "#000099";

        // update the fields if the JSON Object includes specific values for them
        this.updateObjectFieldsWithDatabaseDocumentVersion(database.getDocument(_id));
    }

/////////////////////////////////////////Getter and Setter/////////////////////////////////////////

    /**
     *  This function returns the name of the board.
     *
     * @return {string} the name of the board
     */
    public get name():string {
        return this._name;
    }

    /**
     *  This function sets the the name of the board.
     *
     * @param name the name of the board
     */
    public set name(name: string) {
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
    public get backgroundColor():string {
        return this._backgroundColor;
    }

    /**
     * This function sets the background color of the board
     *
     * @param backgroundColor the background color of the board
     */
    public set backgroundColor(backgroundColor: string) {
        // check if the value is really a new value to avoid unnecessary updates
        if (backgroundColor !== this.backgroundColor) {
            this._backgroundColor = backgroundColor;
            this.uploadToDatabase();
        }
    }

////////////////////////////////////////Inherited Methods//////////////////////////////////////////

    protected serializeToJsonObject(): any {
        let json = super.serializeToJsonObject();

        // add the fields of this class
        json.name = this.name;
        json.backgroundColor = this.backgroundColor;

        return json;
    }

    protected deserializeJsonObject(json: any): void {
        // if a value is provided from the json object use this value
        if (json.name !== null) this.name = json.name;
        if (json.backgroundColor !== null) this.backgroundColor = json.backgroundColor;
    }
}