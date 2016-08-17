import {List} from "../list/list";
import {PouchDbDocument} from "../../utils/pouch_db/pouch_db_document";

/**
 * This class represents the structure of an board document in the database.
 */
export class BoardDocument extends PouchDbDocument<BoardDocument> {

////////////////////////////////////////////Properties////////////////////////////////////////////

    /** the name of the board */
    private name: string;

    /** the background-color of the board */
    private backgroundColor: string;

////////////////////////////////////////////Constructor////////////////////////////////////////////

    /**
     * The constructor of the class "BoardDocument".
     *
     * @param _id the id of the CouchDB document which this object is representing
     * @param _rev the revision code of the CouchDB document which this object is representing
     * @param _deleted indicates whether or not the document got deleted
     * @param name the name of the board
     * @param backgroundColor the background-color of the board
     */
    constructor(_id: string, _rev: string, _deleted:boolean, name: string = "", backgroundColor: string = "#000099") {
        super(_id, _rev, _deleted);

        this.name= name;
        this.backgroundColor = backgroundColor;
    }

/////////////////////////////////////////Getter and Setter/////////////////////////////////////////

    /**
     *  This function returns the name of the board.
     *
     * @return {string} the name of the board
     */
    public get name():string {
        return this.name;
    }

    /**
     *  This function sets the the name of the board.
     *
     * @param value the name of the board
     */
    public set name(name:string) {
        this.name = name;
    }

    /**
     *  This function returns the the background-color of the board.
     *
     * @return {string} the background-color of the board
     */
    public get backgroundColor():string {
        return this.backgroundColor;
    }

    /**
     * This function sets the background-color of the board
     *
     * @param value the background-color of the board
     */
    public set backgroundColor(backgroundColor: string) {
        this.backgroundColor = backgroundColor;
    }

////////////////////////////////////////Inherited Methods//////////////////////////////////////////

    public serializeToJsonObject(): any {
        return  {
                    _id: this._id,
                    _rev: this._rev,
                    _deleted: this._deleted,
                    name: this.name,
                    backgroundColor: this.backgroundColor
                };
    }

    public deserializeJsonObject(json: any): BoardDocument {
        return new BoardDocument(
            json._id,
            json._rev,
            (json._deleted) ? json._deleted : undefined,
            (json.name) ? json.name : undefined,
            (json.backgroundColor) ? json.backgroundColor : undefined
        )
    }
}