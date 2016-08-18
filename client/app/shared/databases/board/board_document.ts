import {PouchDbDocument} from "../../utils/pouch_db/pouch_db_document";

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
     */
    public constructor(json: any) {
        super(json);

        // set the default values of the fields
        this.name = "";
        this.backgroundColor = "#000099";

        // update the fields if the JSON Object includes specific values for them
        this.deserializeJsonObject(json);
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
        this._name = name;
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
        this._backgroundColor = backgroundColor;
    }

////////////////////////////////////////Inherited Methods//////////////////////////////////////////

    public serializeToJsonObject(): any {
        let json = super.serializeToJsonObject();

        // add the fields of this class
        json.name = this.name;
        json.backgroundColor = this.backgroundColor;

        return json;
    }

    public deserializeJsonObject(json: any): void {
        super.deserializeJsonObject(json);

        if (json.name) this.name = json.name;
        if (json.backgroundColor) this.backgroundColor = json.backgroundColor;
    }
}