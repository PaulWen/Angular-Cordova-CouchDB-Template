export interface SuperLoginClientInitializeModel {

/////////////////////////////////////////////Methods///////////////////////////////////////////////

    /**
     * This function gets called by the SuperLoginClient when ever the user logs in successfully.
     *
     * @param user_databases array of all user databases and the URL's to those
     */
    initializeModel(user_databases: string[]): void

}