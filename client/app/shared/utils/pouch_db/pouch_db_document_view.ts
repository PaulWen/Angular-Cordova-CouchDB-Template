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

        // load the initial documents
        this.onChange(allDocumentsFromDatabase);

        // register a change listener at the database for this document
        database.registerAllChangeListener(this.onChange.bind(this));
    }

/////////////////////////////////////////Getter and Setter/////////////////////////////////////////

    public getCurrentStateOfDocumentViewAsArray(): DocumentType[] {
        return null;
    }


    public isDocumentIncluded(document: DocumentType) : boolean {
        return typeof this.documents[document._id] !== null;
    }


/////////////////////////////////////////////Methods///////////////////////////////////////////////

    protected abstract onChange(changedDocuments: DocumentType[]);

}