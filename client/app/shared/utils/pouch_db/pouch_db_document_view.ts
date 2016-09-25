import {PouchDbDatabase} from "./pouch_db_database";
import {Logger} from "../logger";
import {PouchDbDocument} from "./pouch_db_document";

/**
 * This abstract class is based on PouchDB and represents a view over multiple {@link PouchDbDocument} from one
 * {@link PouchDbDatabase} which have something in common.
 * For example a view can represent all {@link PouchDbDocument} objects out of a {@link PouchDbDatabase} where the
 * field "age" is > 18.
 *
 * COUTION: This view does only present documents from the database which are not yet deleted (_deleted == true)
 *
 * When ever an object of this class is not needed anymore it should be closed to free resources by calling
 * {@link PouchDbDocument#close}.
 *
 *
 * HOT TO EXTEND FROM THIS CLASS:
 *
 * 1) The classes which implement this class MUST implement a public constructor...
 *      a) ...which has the two parameters "allDocumentsFromDatabase: DocumentType[]" and "database:<TypeOfDocumentDatabase>"!
 *         Inside the constructor the classes call the super constructor and passe them the parameters.
 *      b) ...which takes care of calling the {@link PouchDbDocumentView#update}-function in order to load
 *            the initial set a documents (given to the constructor as a parameter) into this object.
 * 2) The classes have to implement the {@link PouchDbDocumentView#update}-function which decides which documents should be included
 *    and which should be not included in this view. This function does not have to check if the document got already deleted!
 *    Deleted documents will be automatically removed from the view and never passed to the {@link PouchDbDocumentView#update}-function.
 *    If a {@link PouchDbDocument} gets passed to this function which does not get included into this view, and so the object is not needed
 *    anymore, in the function this object of {@link PouchDbDocument} should be closed to free resources!
 */
export abstract class PouchDbDocumentView<DocumentType extends PouchDbDocument<DocumentType>> implements PouchDbDatabase.ChangeListener {

////////////////////////////////////////////Properties////////////////////////////////////////////

    /** the database where this document gets stored in, so it can upload itself in the database in the case of an change */
    private database: PouchDbDatabase<DocumentType>;

    /** dictionary which lists all documents currently present in this view */
    protected documents: { [id: string] : DocumentType; };

////////////////////////////////////////////Constructor////////////////////////////////////////////

    /**
     * The constructor of the class "PouchDbDocument".
     *
     * @param allDocumentsFromDatabase an array of {@link PouchDbDocument} which includes all documents from a {@link PouchDbDatabase}
     *                                 this array gets used for fetching all the wanted {@link PouchDbDocument} out of the {@link PouchDbDatabase}
     * @param database the database where this document gets stored in, so it can upload itself in the database in the case of an change
     */
    constructor(allDocumentsFromDatabase: DocumentType[], database: PouchDbDatabase<DocumentType>) {
        this.documents = {};
        this.database = database;

        // register a change listener at the database for this document
        database.registerAllDocumentsChangeListener(this);
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

        for (let key in this.documents) {
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

////////////////////////////////////////Inherited Methods//////////////////////////////////////////

    public onChange(json: any) {
        // if the document has been deleted make sure it is not anymore included in the dictionary
        if (json._deleted == true) {
            // check if the document is present in this view and has to be removed
            if (this.isDocumentIncluded(json._id)) {
                // close the saved document
                this.documents[json._id].close();

                // remove the document from the dictionary
                delete this.documents[json._id];
            }

        // if the document has not been deleted pass it over to the update function
        } else {
            this.database.getDocument(json._id).then((document: DocumentType) => {
                this.update(document);
            });
        }
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    /**
     * This function takes a {@link DocumentType} object which changed and determines if it
     * is NEW or CHANGED and has to be included in or excluded from this view.
     *
     * NOTE: this function only gets passed documents which are not yet deleted
     * this means that "_deleted" is false
     *
     * @param changedDocument the {@link DocumentType} object which changed in the database
     */
    protected abstract update(changedDocument: DocumentType);

    /**
     * This function should be called whenever this object is not needed anymore to free resources.
     * It will stop this object listening to its database.
     */
    public close() {
        // unregister this view
        this.database.unregisterChangeListener(this);

        // close all the documents inside this view
        for (let key in this.documents) {
            (this.documents[key]).close();
        }
    }

}