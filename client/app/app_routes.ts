import { RouterConfig }          from '@angular/router';
import {BoardComponent} from "./components/board/board.component";
import {LoginComponent} from "./components/login/login.component";
import {SuperLoginClient} from "./shared/utils/super_login_client/super_login_client";
import {PageNotFoundComponent} from "./components/page_not_found/page_not_found.component";


/**
 * This class provides all routes as static constants.
 */
export class AppRoutes {

////////////////////////////////////////////Properties////////////////////////////////////////////

    public static get LOGIN_ROUTE(): string {return 'login';};
    public static get BOARD_ROUTE(): string {return 'board';};
    public static get PAGE_NOT_FOUND_ROUTE(): string {return '404';};

}



/**
 * This is the configuration of all routes inside the app.
 */
export const AppRoutesConfig: RouterConfig = [
    { path: AppRoutes.BOARD_ROUTE, component: BoardComponent, canActivate: [SuperLoginClient]},
    { path: AppRoutes.LOGIN_ROUTE, component: LoginComponent},
    { path: AppRoutes.PAGE_NOT_FOUND_ROUTE, component: PageNotFoundComponent},
    // standard route if the root web page gets called
    { path: '', pathMatch:'full', redirectTo: AppRoutes.BOARD_ROUTE},
    // standard route if the route is not defined
    { path: '**', redirectTo: AppRoutes.PAGE_NOT_FOUND_ROUTE}
];

