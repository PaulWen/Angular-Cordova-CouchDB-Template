import {PouchDbDocument} from "../../utils/pouch_db/pouch_db_document";
import {PouchDbLoaderInterface} from "../../utils/pouch_db/pouch_db_loader_interface";
import {BoardDocument} from "./board_document";

/**
 * COUTION: This abstract class is supposed to be an interface! It will eventually get implemented
 * by a class that implements the abstract {@link PouchDbDatabase} class. I could not use the type
 * interface for this file, since I want to use it as a token for dependency injection later on.
 * Since interfaces are not available under JavaScript, interfaces can not be used as tokens for dependency
 * injection. Any implementation done in this file, will NOT be available for the class that implements it,
 * since this class does not extend but implement this file! This being said means, that this file should
 * ONLY define abstract classes as if it would be an interface.
 *
 *
 * This interface is the {@link BoardDatabaseLoader} and defines the functions which will be provided for the controllers to get Board-Document-Objects.
 *
 * A {@link PouchDbLoaderInterface} enables a controller to get Document-Objects from a database. A {@link PouchDbLoaderInterface} only implements
 * functions for getting, deleting or creating new documents. (e.g. a function for retrieving all documents with the property dueDate=today)
 *
 * This interface calls gets implemented by the {@link BoardDatabase}. The controllers should only access the {@link BoardDatabase} by using the functions
 * of this interface. Doing so prevents a controller form setting the URL of a database or uploading documents to the database. Uploading documents
 * to the database is not necessary since the Document-Objects retrieved from a database do automatically sync in both directions with the database.
 */
export abstract class BoardDatabaseLoader extends PouchDbLoaderInterface<BoardDocument> {

/////////////////////////////////////////////Methods///////////////////////////////////////////////


}