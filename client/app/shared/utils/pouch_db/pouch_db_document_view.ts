import {PouchDbDatabase} from "./pouch_db_database";
import {Logger} from "../logger";
import {PouchDbDocument} from "./pouch_db_document";

/**
 * This abstract class is based on PouchDB and represents a view over multiple {@link PouchDbDocument} from one
 * {@link PouchDbDatabase} which have something in common.
 * For example a view can represent all {@link PouchDbDocument} objects out of a {@link PouchDbDatabase} where the
 * field "age" is > 18.
 */
export abstract class PouchDbDocumentView<DocumentType extends PouchDbDocument<DocumentType>> {

////////////////////////////////////////////Properties////////////////////////////////////////////

    /** the database where this document gets stored in, so it can upload itself in the database in the case of an change */
    private database: PouchDbDatabase<DocumentType>;

    /** dictionary which lists all documents currently present in this view */
    protected documents: { [id: string] : DocumentType; } = {};

////////////////////////////////////////////Constructor////////////////////////////////////////////

    /**
     * The constructor of the class "PouchDbDocument".
     *
     * @param allDocumentsFromDatabase an array of {@link PouchDbDocument} which includes all documents from a {@link PouchDbDatabase}
     *                                 this array gets used for fetching all the wanted {@link PouchDbDocument} out of the {@link PouchDbDatabase}
     * @param database the database where this document gets stored in, so it can upload itself in the database in the case of an change
     */
    constructor(allDocumentsFromDatabase: DocumentType[], database: PouchDbDatabase<DocumentType>) {
        this.database = database;

        // register a change listener at the database for this document
        database.registerAllDocumentsChangeListener(this.onChange.bind(this));
    }

/////////////////////////////////////////Getter and Setter/////////////////////////////////////////

    /**
     * This function returns an array including all the {@link DocumentType} objects
     * that are currently present in this view.
     *
     * @return {DocumentType[]} array of all {@link DocumentType} objects that are currently present in this view
     */
    public getCurrentStateOfDocumentViewAsArray(): DocumentType[] {
        let documents = new Array<DocumentType>();

        for (var key in this.documents) {
            documents.push(this.documents[key]);
        }

        return documents;
    }


    /**
     * This function tells if a specific document is currently present in this view
     * based on the document id.
     *
     * @param _id the id of the document
     * @return {boolean} true if the document is present, false if not
     */
    public isDocumentIncluded(_id: string) : boolean {
        return this.documents[_id] !== undefined;
    }


/////////////////////////////////////////////Methods///////////////////////////////////////////////

    /**
     * This function takes a {@link DocumentType} object which changed and determines if it
     * has to be included in or excluded from this view.
     *
     * @param changedDocument the {@link DocumentType} object which changed in the database
     */
    protected abstract onChange(changedDocument: DocumentType);

}