import { RouterConfig }          from '@angular/router';
import {BoardComponent} from "./components/board/board.component";
import {LoginComponent} from "./components/login/login.component";
import {SuperLoginClient} from "./shared/utils/super_login_client/super_login_client";


/**
 * This class provides all routes as static constants.
 */
export class AppRoutes {

////////////////////////////////////////////Properties////////////////////////////////////////////

    public static get LOGIN_ROUTE(): string {return 'login';};
    public static get BOARD_ROUTE(): string {return '';};

}



/**
 * This is the configuration of all routes inside the app.
 */
export const AppRoutesConfig: RouterConfig = [
    { path: AppRoutes.BOARD_ROUTE, component: BoardComponent, canActivate: [SuperLoginClient]},
    { path: AppRoutes.LOGIN_ROUTE, component: LoginComponent}
];

