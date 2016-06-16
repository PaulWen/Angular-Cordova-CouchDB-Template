/**
 * This class defines constants which can be used to configure the application.
 */
export class Config {

////////////////////////////////////////////Properties////////////////////////////////////////////
    
    public static get DEVELOPMENT(): boolean {return true;};
    public static get WEB_SERVER_DOMAIN(): string {return "http://localhost:3000";};
    public static get DATABASE_DOMAIN(): string {return "http://localhost:8080";};

}