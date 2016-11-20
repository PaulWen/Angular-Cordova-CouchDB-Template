import {Injector, Injectable, ErrorHandler} from "@angular/core";
import {Router} from '@angular/router';
import {Logger} from "./shared/utils/logger";
import {AppRoutes} from "./app_routes";

/**
 * This class handles all the exceptions/errors which get thrown and not caught by the application.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {

////////////////////////////////////////////Properties////////////////////////////////////////////

    /** Injector, to be able to inject the Router later on. */
    private injector: Injector;

    /** the router which allows routing */
    private router: Router;

////////////////////////////////////////////Constructor////////////////////////////////////////////

    constructor(injector: Injector) {
        super(false);
        this.injector = injector;
        this.router = null;
    }

////////////////////////////////////////Inherited Methods//////////////////////////////////////////

    handleError(exception:any, stackTrace?:any, reason?:string):void {
        // Unfortunately, the router has to be injected in this method and cannot
        // get injected in the constructor, since the Router does require the exception handler and the
        // ExceptionHandler would require the Router, so that there is a cyclic dependency which cannot
        // be resolved.
        if (!this.router) this.router = this.injector.get(Router);

        // navigate user to the error page
        this.router.navigate([AppRoutes.ERROR_ROUTE]);

        // print out the error message
        Logger.error("Exception: " + exception + "\n\nReason: " + reason + "\n\nStackTrace: " + stackTrace);
    }

/////////////////////////////////////////////Methods///////////////////////////////////////////////



}