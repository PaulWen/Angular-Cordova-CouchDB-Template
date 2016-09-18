System.register(['@angular/router', "./components/board/board.component", "./components/login/login.component", "./shared/utils/super_login_client/super_login_client", "./components/page_not_found/page_not_found.component", "./components/error/error.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, board_component_1, login_component_1, super_login_client_1, page_not_found_component_1, error_component_1;
    var AppRoutes, appRoutesConfig, routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (board_component_1_1) {
                board_component_1 = board_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (super_login_client_1_1) {
                super_login_client_1 = super_login_client_1_1;
            },
            function (page_not_found_component_1_1) {
                page_not_found_component_1 = page_not_found_component_1_1;
            },
            function (error_component_1_1) {
                error_component_1 = error_component_1_1;
            }],
        execute: function() {
            /**
             * This class provides all routes as static constants.
             */
            class AppRoutes {
                ////////////////////////////////////////////Properties////////////////////////////////////////////
                static get LOGIN_ROUTE() { return 'login'; }
                ;
                static get BOARD_ROUTE() { return 'board'; }
                ;
                static get PAGE_NOT_FOUND_ROUTE() { return '404'; }
                ;
                static get ERROR_ROUTE() { return 'error'; }
                ;
            }
            exports_1("AppRoutes", AppRoutes);
            /**
             * This is the configuration of all routes inside the app.
             */
            appRoutesConfig = [
                { path: AppRoutes.BOARD_ROUTE, component: board_component_1.BoardComponent, canActivate: [super_login_client_1.SuperLoginClient] },
                { path: AppRoutes.LOGIN_ROUTE, component: login_component_1.LoginComponent },
                { path: AppRoutes.PAGE_NOT_FOUND_ROUTE, component: page_not_found_component_1.PageNotFoundComponent },
                { path: AppRoutes.ERROR_ROUTE, component: error_component_1.ErrorComponent },
                // standard route if the root web page gets called
                { path: '', pathMatch: 'full', redirectTo: AppRoutes.BOARD_ROUTE },
                // standard route if the route is not defined
                { path: '**', redirectTo: AppRoutes.PAGE_NOT_FOUND_ROUTE }
            ];
            /**
             * Create a Module which include all the routes of the application and can get imported by a module.
             */
            exports_1("routing", routing = router_1.RouterModule.forRoot(appRoutesConfig));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcF9yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzttQkEyQk0sZUFBZSxFQWNSLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFqQ3BCOztlQUVHO1lBQ0g7Z0JBRUEsa0dBQWtHO2dCQUU5RixXQUFrQixXQUFXLEtBQVksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUM7O2dCQUN6RCxXQUFrQixXQUFXLEtBQVksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUM7O2dCQUN6RCxXQUFrQixvQkFBb0IsS0FBWSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQzs7Z0JBQ2hFLFdBQWtCLFdBQVcsS0FBWSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUEsQ0FBQzs7WUFFN0QsQ0FBQztZQVRELGlDQVNDLENBQUE7WUFJRDs7ZUFFRztZQUNHLGVBQWUsR0FBaUI7Z0JBQ2xDLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLGdDQUFjLEVBQUUsV0FBVyxFQUFFLENBQUMscUNBQWdCLENBQUMsRUFBQztnQkFDMUYsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsZ0NBQWMsRUFBQztnQkFDekQsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxnREFBcUIsRUFBQztnQkFDekUsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsZ0NBQWMsRUFBQztnQkFDekQsa0RBQWtEO2dCQUNsRCxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLFdBQVcsRUFBQztnQkFDaEUsNkNBQTZDO2dCQUM3QyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxvQkFBb0IsRUFBQzthQUM1RCxDQUFDO1lBRUY7O2VBRUc7WUFDVSxxQkFBQSxPQUFPLEdBQUcscUJBQVksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUEsQ0FBQyIsImZpbGUiOiJhcHBfcm91dGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSb3V0ZXJDb25maWcsIFJvdXRlck1vZHVsZX0gICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHtCb2FyZENvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9ib2FyZC9ib2FyZC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtMb2dpbkNvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtTdXBlckxvZ2luQ2xpZW50fSBmcm9tIFwiLi9zaGFyZWQvdXRpbHMvc3VwZXJfbG9naW5fY2xpZW50L3N1cGVyX2xvZ2luX2NsaWVudFwiO1xyXG5pbXBvcnQge1BhZ2VOb3RGb3VuZENvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9wYWdlX25vdF9mb3VuZC9wYWdlX25vdF9mb3VuZC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtFcnJvckNvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9lcnJvci9lcnJvci5jb21wb25lbnRcIjtcclxuXHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBwcm92aWRlcyBhbGwgcm91dGVzIGFzIHN0YXRpYyBjb25zdGFudHMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQXBwUm91dGVzIHtcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vUHJvcGVydGllcy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgTE9HSU5fUk9VVEUoKTogc3RyaW5nIHtyZXR1cm4gJ2xvZ2luJzt9O1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgQk9BUkRfUk9VVEUoKTogc3RyaW5nIHtyZXR1cm4gJ2JvYXJkJzt9O1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgUEFHRV9OT1RfRk9VTkRfUk9VVEUoKTogc3RyaW5nIHtyZXR1cm4gJzQwNCc7fTtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEVSUk9SX1JPVVRFKCk6IHN0cmluZyB7cmV0dXJuICdlcnJvcic7fTtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgdGhlIGNvbmZpZ3VyYXRpb24gb2YgYWxsIHJvdXRlcyBpbnNpZGUgdGhlIGFwcC5cclxuICovXHJcbmNvbnN0IGFwcFJvdXRlc0NvbmZpZzogUm91dGVyQ29uZmlnID0gW1xyXG4gICAgeyBwYXRoOiBBcHBSb3V0ZXMuQk9BUkRfUk9VVEUsIGNvbXBvbmVudDogQm9hcmRDb21wb25lbnQsIGNhbkFjdGl2YXRlOiBbU3VwZXJMb2dpbkNsaWVudF19LFxyXG4gICAgeyBwYXRoOiBBcHBSb3V0ZXMuTE9HSU5fUk9VVEUsIGNvbXBvbmVudDogTG9naW5Db21wb25lbnR9LFxyXG4gICAgeyBwYXRoOiBBcHBSb3V0ZXMuUEFHRV9OT1RfRk9VTkRfUk9VVEUsIGNvbXBvbmVudDogUGFnZU5vdEZvdW5kQ29tcG9uZW50fSxcclxuICAgIHsgcGF0aDogQXBwUm91dGVzLkVSUk9SX1JPVVRFLCBjb21wb25lbnQ6IEVycm9yQ29tcG9uZW50fSxcclxuICAgIC8vIHN0YW5kYXJkIHJvdXRlIGlmIHRoZSByb290IHdlYiBwYWdlIGdldHMgY2FsbGVkXHJcbiAgICB7IHBhdGg6ICcnLCBwYXRoTWF0Y2g6J2Z1bGwnLCByZWRpcmVjdFRvOiBBcHBSb3V0ZXMuQk9BUkRfUk9VVEV9LFxyXG4gICAgLy8gc3RhbmRhcmQgcm91dGUgaWYgdGhlIHJvdXRlIGlzIG5vdCBkZWZpbmVkXHJcbiAgICB7IHBhdGg6ICcqKicsIHJlZGlyZWN0VG86IEFwcFJvdXRlcy5QQUdFX05PVF9GT1VORF9ST1VURX1cclxuXTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBNb2R1bGUgd2hpY2ggaW5jbHVkZSBhbGwgdGhlIHJvdXRlcyBvZiB0aGUgYXBwbGljYXRpb24gYW5kIGNhbiBnZXQgaW1wb3J0ZWQgYnkgYSBtb2R1bGUuXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgcm91dGluZyA9IFJvdXRlck1vZHVsZS5mb3JSb290KGFwcFJvdXRlc0NvbmZpZyk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
