import {PouchDbDocument} from "../../utils/pouch_db/pouch_db_document";
import {PouchDbDocumentView} from "../../utils/pouch_db/pouch_db_document_view";
import {PouchDbDatabase} from "../../utils/pouch_db/pouch_db_database";
import {Logger} from "../logger";

/**
 * This class represents a {@link PouchDbDocumentView} over a {@link PouchDbDatabase}.
 * The view lists all {@link PouchDbDocument} from a {@link PouchDbDatabase}.
 */
export class PouchDbAllDocumentsView<DocumentType extends PouchDbDocument<DocumentType>> extends PouchDbDocumentView<DocumentType> {

////////////////////////////////////////////Properties////////////////////////////////////////////


////////////////////////////////////////////Constructor////////////////////////////////////////////

    /**
     * The constructor of the class "PouchDbDocument".
     *
     * @param allDocumentsFromDatabase an array of {@link PouchDbDocument} which includes all documents from a {@link PouchDbDatabase}
     *                                 this array gets used for fetching all the wanted {@link PouchDbDocument} out of the {@link PouchDbDatabase}
     * @param database the database where this document gets stored in, so it can upload itself in the database in the case of an change
     */
    public constructor(allDocumentsFromDatabase: DocumentType[], database: PouchDbDatabase<DocumentType>) {
        super(allDocumentsFromDatabase, database);

        // load the initial documents
        for (let document of allDocumentsFromDatabase) {
            this.update(document);
        }
    }

/////////////////////////////////////////Getter and Setter/////////////////////////////////////////


////////////////////////////////////////Inherited Methods//////////////////////////////////////////

    protected update(changedDocument: DocumentType) {
        // check if the document meets the condition to be present in this view
        // --> all documents from the database which are not deleted should be in this view

        // check if the document is not yet in this view present and has to be included
        if (!this.isDocumentIncluded(changedDocument._id)) {
            this.documents[changedDocument._id] = changedDocument;
        } else {
            // close the document since it is not needed
            changedDocument.close();
        }
    }
}