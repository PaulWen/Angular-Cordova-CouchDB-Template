import {PouchDbDocument} from "./pouch_db_document";

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
 * This interface defines the basic functions, which a {@link PouchDbLoaderInterface} should provide a controller with.
 *
 * A {@link PouchDbLoaderInterface} enables a controller to get Document-Objects from a database. For each database there should be a
 * specific interface implemented which extends this interface by database specific document loader functions. Those interfaces only implement
 * functions for getting, deleting or creating new documents. (e.g. a function for retrieving all documents with the property dueDate=today)
 *
 * Those interfaces should get implemented by the databases. The controller should only access the databases using the functions
 * of the interfaces. Doing so prevents a controller form setting the URL of a database or uploading documents to the database. Uploading documents
 * to the database is not necessary since the Document-Objects retrieved from a database do automatically sync in both directions with the database.
 */
export abstract class PouchDbLoaderInterface<DocumentType extends PouchDbDocument<DocumentType>> {

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    /**
     * This method returns an document with a specific id.
     *
     * @param id the id of the wanted document
     *
     * @return the wanted document or null if an error occurred
     */
    public abstract async getDocument(id:string):Promise<DocumentType>;

    /**
     * This function returns all the documents included in the database listed in an array.
     *
     * @return all the documents included in the database listed in an array or null if an error occurred
     */
    public abstract async getAllDocuments():Promise<DocumentType[]>;

    /**
     * This function creates an new document from the type <DocumentType> in the database.
     *
     * @return the new created document or null if an error occurred
     */
    public abstract async newDocument():Promise<DocumentType>;
}