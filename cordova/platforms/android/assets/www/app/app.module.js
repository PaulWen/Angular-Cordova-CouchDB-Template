System.register(["@angular/core", "@angular/platform-browser", "./app.component", "./shared/databases/board/board_database", "./shared/databases/board/board_document_loader", "./exception_handler", "./shared/utils/super_login_client/super_login_client", "./shared/utils/super_login_client/superlogin_http_requestor", "@angular/router", "@angular/http", "./app_routes", "./shared/databases/database_initializer", "./components/board/board.component", "./shared/utils/mdl/MaterialDesignLiteUpgradeElement", "angular-sortablejs/index", "./components/error/error.component", "./components/login/login.component", "./components/page_not_found/page_not_found.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, platform_browser_1, app_component_1, board_database_1, board_document_loader_1, exception_handler_1, super_login_client_1, superlogin_http_requestor_1, router_1, http_1, app_routes_1, database_initializer_1, board_component_1, MaterialDesignLiteUpgradeElement_1, index_1, error_component_1, login_component_1, page_not_found_component_1;
    var AppModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (board_database_1_1) {
                board_database_1 = board_database_1_1;
            },
            function (board_document_loader_1_1) {
                board_document_loader_1 = board_document_loader_1_1;
            },
            function (exception_handler_1_1) {
                exception_handler_1 = exception_handler_1_1;
            },
            function (super_login_client_1_1) {
                super_login_client_1 = super_login_client_1_1;
            },
            function (superlogin_http_requestor_1_1) {
                superlogin_http_requestor_1 = superlogin_http_requestor_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (app_routes_1_1) {
                app_routes_1 = app_routes_1_1;
            },
            function (database_initializer_1_1) {
                database_initializer_1 = database_initializer_1_1;
            },
            function (board_component_1_1) {
                board_component_1 = board_component_1_1;
            },
            function (MaterialDesignLiteUpgradeElement_1_1) {
                MaterialDesignLiteUpgradeElement_1 = MaterialDesignLiteUpgradeElement_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (error_component_1_1) {
                error_component_1 = error_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (page_not_found_component_1_1) {
                page_not_found_component_1 = page_not_found_component_1_1;
            }],
        execute: function() {
            let AppModule_1;
            let AppModule = AppModule_1 = class AppModule {
            };
            ////////////////////////////////////////////Properties////////////////////////////////////////////
            // the following properties should not be available in the complete application but are needed
            // needed multiple times in providers for providing all needed objects
            /** This object is the only object of the {@link BoardDatabase} that gets used
             * in this application. */
            AppModule.boardDatabase = new board_database_1.BoardDatabase();
            ////////////////////////////////////////////Providers/////////////////////////////////////////////
            /**
             * This provider provides a {@link BoardDocumentLoader}.
             */
            AppModule.boardDocumentLoaderProvider = {
                provide: board_document_loader_1.BoardDocumentLoader,
                useValue: AppModule.boardDatabase
            };
            /**
             * This provider provides a {@link SuperLoginClient}.
             */
            AppModule.superLoginClientProvider = {
                provide: super_login_client_1.SuperLoginClient,
                useFactory: (httpRequestor, router) => {
                    return new super_login_client_1.SuperLoginClient(httpRequestor, new database_initializer_1.DatabaseInitializer(AppModule.boardDatabase), router, app_routes_1.AppRoutes.LOGIN_ROUTE);
                },
                deps: [superlogin_http_requestor_1.SuperloginHttpRequestor, router_1.Router]
            };
            /**
             * This provider provides a {@link ExceptionHandler}.
             */
            AppModule.exceptionHandlerProvider = {
                provide: core_1.ExceptionHandler,
                useClass: exception_handler_1.AppExceptionHandler
            };
            AppModule = AppModule_1 = __decorate([
                core_1.NgModule({
                    imports: [platform_browser_1.BrowserModule, http_1.HttpModule, app_routes_1.routing],
                    declarations: [
                        app_component_1.AppComponent,
                        board_component_1.BoardComponent,
                        login_component_1.LoginComponent,
                        error_component_1.ErrorComponent,
                        page_not_found_component_1.PageNotFoundComponent,
                        MaterialDesignLiteUpgradeElement_1.MDL,
                        index_1.SORTABLEJS_DIRECTIVES
                    ],
                    bootstrap: [app_component_1.AppComponent],
                    providers: [
                        AppModule.exceptionHandlerProvider,
                        superlogin_http_requestor_1.SuperloginHttpRequestor,
                        AppModule.boardDocumentLoaderProvider,
                        AppModule.superLoginClientProvider
                    ]
                }), 
                __metadata('design:paramtypes', [])
            ], AppModule);
            exports_1("AppModule", AppModule);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFzQ0E7O1lBdUNBLENBQUM7WUFyQ0Qsa0dBQWtHO1lBRTlGLDhGQUE4RjtZQUM5RixzRUFBc0U7WUFFdEU7c0NBQzBCO1lBQ1gsdUJBQWEsR0FBRyxJQUFJLDhCQUFhLEVBQUUsQ0FBQztZQUV2RCxrR0FBa0c7WUFFOUY7O2VBRUc7WUFDWSxxQ0FBMkIsR0FBRztnQkFDekMsT0FBTyxFQUFFLDJDQUFtQjtnQkFDNUIsUUFBUSxFQUFFLFNBQVMsQ0FBQyxhQUFhO2FBQ3BDLENBQUM7WUFFRjs7ZUFFRztZQUNZLGtDQUF3QixHQUFHO2dCQUN0QyxPQUFPLEVBQUUscUNBQWdCO2dCQUN6QixVQUFVLEVBQUUsQ0FBQyxhQUFhLEVBQUUsTUFBTTtvQkFDOUIsTUFBTSxDQUFDLElBQUkscUNBQWdCLENBQUMsYUFBYSxFQUFFLElBQUksMENBQW1CLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxzQkFBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNoSSxDQUFDO2dCQUNELElBQUksRUFBRSxDQUFDLG1EQUF1QixFQUFFLGVBQU0sQ0FBQzthQUMxQyxDQUFDO1lBRUY7O2VBRUc7WUFDWSxrQ0FBd0IsR0FBRztnQkFDdEMsT0FBTyxFQUFDLHVCQUFnQjtnQkFDeEIsUUFBUSxFQUFFLHVDQUFtQjthQUNoQyxDQUFBO1lBekRMO2dCQUFDLGVBQVEsQ0FBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxnQ0FBYSxFQUFFLGlCQUFVLEVBQUUsb0JBQU8sQ0FBQztvQkFDN0MsWUFBWSxFQUFFO3dCQUNWLDRCQUFZO3dCQUNaLGdDQUFjO3dCQUNkLGdDQUFjO3dCQUNkLGdDQUFjO3dCQUNkLGdEQUFxQjt3QkFDckIsc0NBQUc7d0JBQ0gsNkJBQXFCO3FCQUN4QjtvQkFDRCxTQUFTLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO29CQUN6QixTQUFTLEVBQUU7d0JBQ1AsU0FBUyxDQUFDLHdCQUF3Qjt3QkFDbEMsbURBQXVCO3dCQUN2QixTQUFTLENBQUMsMkJBQTJCO3dCQUNyQyxTQUFTLENBQUMsd0JBQXdCO3FCQUNyQztpQkFDSixDQUFDOzt5QkFBQTtZQUNGLGlDQXVDQyxDQUFBIiwiZmlsZSI6ImFwcC5tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLCBFeGNlcHRpb25IYW5kbGVyfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge0Jyb3dzZXJNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCI7XHJcbmltcG9ydCB7QXBwQ29tcG9uZW50fSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7Qm9hcmREYXRhYmFzZX0gZnJvbSBcIi4vc2hhcmVkL2RhdGFiYXNlcy9ib2FyZC9ib2FyZF9kYXRhYmFzZVwiO1xyXG5pbXBvcnQge0JvYXJkRG9jdW1lbnRMb2FkZXJ9IGZyb20gXCIuL3NoYXJlZC9kYXRhYmFzZXMvYm9hcmQvYm9hcmRfZG9jdW1lbnRfbG9hZGVyXCI7XHJcbmltcG9ydCB7QXBwRXhjZXB0aW9uSGFuZGxlcn0gZnJvbSBcIi4vZXhjZXB0aW9uX2hhbmRsZXJcIjtcclxuaW1wb3J0IHtTdXBlckxvZ2luQ2xpZW50fSBmcm9tIFwiLi9zaGFyZWQvdXRpbHMvc3VwZXJfbG9naW5fY2xpZW50L3N1cGVyX2xvZ2luX2NsaWVudFwiO1xyXG5pbXBvcnQge1N1cGVybG9naW5IdHRwUmVxdWVzdG9yfSBmcm9tIFwiLi9zaGFyZWQvdXRpbHMvc3VwZXJfbG9naW5fY2xpZW50L3N1cGVybG9naW5faHR0cF9yZXF1ZXN0b3JcIjtcclxuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHtIdHRwTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQge0FwcFJvdXRlcywgcm91dGluZ30gZnJvbSBcIi4vYXBwX3JvdXRlc1wiO1xyXG5pbXBvcnQge0RhdGFiYXNlSW5pdGlhbGl6ZXJ9IGZyb20gXCIuL3NoYXJlZC9kYXRhYmFzZXMvZGF0YWJhc2VfaW5pdGlhbGl6ZXJcIjtcclxuaW1wb3J0IHtCb2FyZENvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9ib2FyZC9ib2FyZC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtNREx9IGZyb20gXCIuL3NoYXJlZC91dGlscy9tZGwvTWF0ZXJpYWxEZXNpZ25MaXRlVXBncmFkZUVsZW1lbnRcIjtcclxuaW1wb3J0IHtTT1JUQUJMRUpTX0RJUkVDVElWRVN9IGZyb20gXCJhbmd1bGFyLXNvcnRhYmxlanMvaW5kZXhcIjtcclxuaW1wb3J0IHtFcnJvckNvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9lcnJvci9lcnJvci5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtMb2dpbkNvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtQYWdlTm90Rm91bmRDb21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudHMvcGFnZV9ub3RfZm91bmQvcGFnZV9ub3RfZm91bmQuY29tcG9uZW50XCI7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0Jyb3dzZXJNb2R1bGUsIEh0dHBNb2R1bGUsIHJvdXRpbmddLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgQXBwQ29tcG9uZW50LFxyXG4gICAgICAgIEJvYXJkQ29tcG9uZW50LFxyXG4gICAgICAgIExvZ2luQ29tcG9uZW50LFxyXG4gICAgICAgIEVycm9yQ29tcG9uZW50LFxyXG4gICAgICAgIFBhZ2VOb3RGb3VuZENvbXBvbmVudCxcclxuICAgICAgICBNREwsXHJcbiAgICAgICAgU09SVEFCTEVKU19ESVJFQ1RJVkVTXHJcbiAgICBdLFxyXG4gICAgYm9vdHN0cmFwOiBbQXBwQ29tcG9uZW50XSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIEFwcE1vZHVsZS5leGNlcHRpb25IYW5kbGVyUHJvdmlkZXIsXHJcbiAgICAgICAgU3VwZXJsb2dpbkh0dHBSZXF1ZXN0b3IsXHJcbiAgICAgICAgQXBwTW9kdWxlLmJvYXJkRG9jdW1lbnRMb2FkZXJQcm92aWRlcixcclxuICAgICAgICBBcHBNb2R1bGUuc3VwZXJMb2dpbkNsaWVudFByb3ZpZGVyXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUge1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9Qcm9wZXJ0aWVzLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvLyB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXMgc2hvdWxkIG5vdCBiZSBhdmFpbGFibGUgaW4gdGhlIGNvbXBsZXRlIGFwcGxpY2F0aW9uIGJ1dCBhcmUgbmVlZGVkXHJcbiAgICAvLyBuZWVkZWQgbXVsdGlwbGUgdGltZXMgaW4gcHJvdmlkZXJzIGZvciBwcm92aWRpbmcgYWxsIG5lZWRlZCBvYmplY3RzXHJcblxyXG4gICAgLyoqIFRoaXMgb2JqZWN0IGlzIHRoZSBvbmx5IG9iamVjdCBvZiB0aGUge0BsaW5rIEJvYXJkRGF0YWJhc2V9IHRoYXQgZ2V0cyB1c2VkXHJcbiAgICAgKiBpbiB0aGlzIGFwcGxpY2F0aW9uLiAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgYm9hcmREYXRhYmFzZSA9IG5ldyBCb2FyZERhdGFiYXNlKCk7XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1Byb3ZpZGVycy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBwcm92aWRlciBwcm92aWRlcyBhIHtAbGluayBCb2FyZERvY3VtZW50TG9hZGVyfS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgYm9hcmREb2N1bWVudExvYWRlclByb3ZpZGVyID0ge1xyXG4gICAgICAgIHByb3ZpZGU6IEJvYXJkRG9jdW1lbnRMb2FkZXIsXHJcbiAgICAgICAgdXNlVmFsdWU6IEFwcE1vZHVsZS5ib2FyZERhdGFiYXNlXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBwcm92aWRlciBwcm92aWRlcyBhIHtAbGluayBTdXBlckxvZ2luQ2xpZW50fS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc3VwZXJMb2dpbkNsaWVudFByb3ZpZGVyID0ge1xyXG4gICAgICAgIHByb3ZpZGU6IFN1cGVyTG9naW5DbGllbnQsXHJcbiAgICAgICAgdXNlRmFjdG9yeTogKGh0dHBSZXF1ZXN0b3IsIHJvdXRlcikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFN1cGVyTG9naW5DbGllbnQoaHR0cFJlcXVlc3RvciwgbmV3IERhdGFiYXNlSW5pdGlhbGl6ZXIoQXBwTW9kdWxlLmJvYXJkRGF0YWJhc2UpLCByb3V0ZXIsIEFwcFJvdXRlcy5MT0dJTl9ST1VURSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXBzOiBbU3VwZXJsb2dpbkh0dHBSZXF1ZXN0b3IsIFJvdXRlcl1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIHByb3ZpZGVyIHByb3ZpZGVzIGEge0BsaW5rIEV4Y2VwdGlvbkhhbmRsZXJ9LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBleGNlcHRpb25IYW5kbGVyUHJvdmlkZXIgPSB7XHJcbiAgICAgICAgcHJvdmlkZTpFeGNlcHRpb25IYW5kbGVyLFxyXG4gICAgICAgIHVzZUNsYXNzOiBBcHBFeGNlcHRpb25IYW5kbGVyXHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
