import {Config} from "../../config";
import PouchDB from "pouchdb";

/**
 * This class provides static methods for logging.
 * The class defines how to log messages.
 */
export class Logger {

////////////////////////////////////////////Properties////////////////////////////////////////////


/////////////////////////////////////////////Methods///////////////////////////////////////////////

    public static log(msg:any) {
        if (Config.DEVELOPMENT) {
            console.log(msg);
            // PouchDB.debug.enable('*');
            PouchDB.debug.disable();
        } else {
            PouchDB.debug.disable();
        }
    }

    public static error(msg:any) {
        console.error(msg);
    }

    public static warn(msg:any) {
        console.warn(msg);
    }

    public static debug(msg:any) {
        console.debug(msg);
    }

}