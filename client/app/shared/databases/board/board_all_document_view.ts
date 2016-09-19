import {PouchDbDocument} from "../../utils/pouch_db/pouch_db_document";
import {PouchDbDocumentView} from "../../utils/pouch_db/pouch_db_document_view";
import {BoardDocument} from "./board_document";
import {PouchDbDatabase} from "../../utils/pouch_db/pouch_db_database";

/**
 * This class represents a {@link PouchDbDocumentView} over a {@link BoardDatabase}.
 * The view lists all {@link BoardDocument} from a {@link BoardDatabase}.
 */
export class BoardAllDocumentView extends PouchDbDocumentView<BoardDocument> {

////////////////////////////////////////////Properties////////////////////////////////////////////


////////////////////////////////////////////Constructor////////////////////////////////////////////

    /**
     * The constructor of the class "PouchDbDocument".
     *
     * @param allDocumentsFromDatabase an array of {@link PouchDbDocument} which includes all documents from a {@link PouchDbDatabase}
     *                                 this array gets used for fetching all the wanted {@link PouchDbDocument} out of the {@link PouchDbDatabase}
     * @param database the database where this document gets stored in, so it can upload itself in the database in the case of an change
     */
    public constructor(allDocumentsFromDatabase: BoardDocument[], database: PouchDbDatabase<BoardDocument>) {
        super(allDocumentsFromDatabase, database);

        // load the initial documents
        this.onChange(allDocumentsFromDatabase);
    }

/////////////////////////////////////////Getter and Setter/////////////////////////////////////////


////////////////////////////////////////Inherited Methods//////////////////////////////////////////

    protected onChange(changedDocuments: BoardDocument[]) {
        for (let document of changedDocuments) {
            // check if the document meets the condition to be present in this view
            // --> all documents from the database which are not deleted should be in this view
            if (document._deleted == false) {
                // check if the document is not yet in this view present and has to be included
                if (!this.isDocumentIncluded(document)) {
                    this.documents[document._id] = document;
                }
            } else {
                // check if the document is present in this view and has to be removed
                if (this.isDocumentIncluded(document)) {
                    this.documents[document._id] = document;
                    delete this.documents["document._id"];
                }
            }
        }

    }
}