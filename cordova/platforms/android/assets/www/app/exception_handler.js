System.register(["@angular/core", '@angular/router', "./shared/utils/logger", "./app_routes"], function(exports_1, context_1) {
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
    var core_1, router_1, logger_1, app_routes_1;
    var AppExceptionHandler;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (logger_1_1) {
                logger_1 = logger_1_1;
            },
            function (app_routes_1_1) {
                app_routes_1 = app_routes_1_1;
            }],
        execute: function() {
            /**
             * This class handels all the exceptions which get thrown and not caught by the application.
             */
            let AppExceptionHandler = class AppExceptionHandler extends core_1.ExceptionHandler {
                ////////////////////////////////////////////Constructor////////////////////////////////////////////
                constructor(injector) {
                    super(null, null);
                    this.injector = injector;
                    this.router = null;
                }
                ////////////////////////////////////////Inherited Methods//////////////////////////////////////////
                call(exception, stackTrace, reason) {
                    // Unfortunately, the router has to be injected in this method and cannot
                    // get injected in the constructor, since the Router does require the exception handler and the
                    // ExceptionHandler would require the Router, so that there is a cyclic dependency which cannot
                    // be resolved.
                    if (!this.router)
                        this.router = this.injector.get(router_1.Router);
                    // print out the error message
                    logger_1.Logger.error("Exception: " + exception + "\n\nReason: " + reason + "\n\nStackTrace: " + stackTrace);
                    // navigate user to the error page
                    this.router.navigate([app_routes_1.AppRoutes.ERROR_ROUTE]);
                }
            };
            AppExceptionHandler = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [core_1.Injector])
            ], AppExceptionHandler);
            exports_1("AppExceptionHandler", AppExceptionHandler);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4Y2VwdGlvbl9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBS0E7O2VBRUc7WUFFSCw0REFBeUMsdUJBQWdCO2dCQVV6RCxtR0FBbUc7Z0JBRS9GLFlBQVksUUFBa0I7b0JBQzFCLE1BQU0sSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztvQkFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLENBQUM7Z0JBRUwsbUdBQW1HO2dCQUUvRixJQUFJLENBQUMsU0FBYSxFQUFFLFVBQWUsRUFBRSxNQUFjO29CQUMvQyx5RUFBeUU7b0JBQ3pFLCtGQUErRjtvQkFDL0YsK0ZBQStGO29CQUMvRixlQUFlO29CQUNmLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzt3QkFBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQU0sQ0FBQyxDQUFDO29CQUUxRCw4QkFBOEI7b0JBQzlCLGVBQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLFNBQVMsR0FBRyxjQUFjLEdBQUcsTUFBTSxHQUFHLGtCQUFrQixHQUFHLFVBQVUsQ0FBQyxDQUFDO29CQUVwRyxrQ0FBa0M7b0JBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsc0JBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxDQUFDO1lBTUwsQ0FBQztZQXZDRDtnQkFBQyxpQkFBVSxFQUFFOzttQ0FBQTtZQUNiLHFEQXNDQyxDQUFBIiwiZmlsZSI6ImV4Y2VwdGlvbl9oYW5kbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RvciwgSW5qZWN0YWJsZSwgRXhjZXB0aW9uSGFuZGxlcn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7TG9nZ2VyfSBmcm9tIFwiLi9zaGFyZWQvdXRpbHMvbG9nZ2VyXCI7XHJcbmltcG9ydCB7QXBwUm91dGVzfSBmcm9tIFwiLi9hcHBfcm91dGVzXCI7XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBoYW5kZWxzIGFsbCB0aGUgZXhjZXB0aW9ucyB3aGljaCBnZXQgdGhyb3duIGFuZCBub3QgY2F1Z2h0IGJ5IHRoZSBhcHBsaWNhdGlvbi5cclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEFwcEV4Y2VwdGlvbkhhbmRsZXIgZXh0ZW5kcyBFeGNlcHRpb25IYW5kbGVyIHtcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vUHJvcGVydGllcy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgLyoqIEluamVjdG9yLCB0byBiZSBhYmxlIHRvIGluamVjdCB0aGUgUm91dGVyIGxhdGVyIG9uLiAqL1xyXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3I7XHJcblxyXG4gICAgLyoqIHRoZSByb3V0ZXIgd2hpY2ggYWxsb3dzIHJvdXRpbmcgKi9cclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXI7XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL0NvbnN0cnVjdG9yLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IpIHtcclxuICAgICAgICBzdXBlcihudWxsLCBudWxsKTtcclxuICAgICAgICB0aGlzLmluamVjdG9yID0gaW5qZWN0b3I7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL0luaGVyaXRlZCBNZXRob2RzLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgY2FsbChleGNlcHRpb246YW55LCBzdGFja1RyYWNlPzphbnksIHJlYXNvbj86c3RyaW5nKTp2b2lkIHtcclxuICAgICAgICAvLyBVbmZvcnR1bmF0ZWx5LCB0aGUgcm91dGVyIGhhcyB0byBiZSBpbmplY3RlZCBpbiB0aGlzIG1ldGhvZCBhbmQgY2Fubm90XHJcbiAgICAgICAgLy8gZ2V0IGluamVjdGVkIGluIHRoZSBjb25zdHJ1Y3Rvciwgc2luY2UgdGhlIFJvdXRlciBkb2VzIHJlcXVpcmUgdGhlIGV4Y2VwdGlvbiBoYW5kbGVyIGFuZCB0aGVcclxuICAgICAgICAvLyBFeGNlcHRpb25IYW5kbGVyIHdvdWxkIHJlcXVpcmUgdGhlIFJvdXRlciwgc28gdGhhdCB0aGVyZSBpcyBhIGN5Y2xpYyBkZXBlbmRlbmN5IHdoaWNoIGNhbm5vdFxyXG4gICAgICAgIC8vIGJlIHJlc29sdmVkLlxyXG4gICAgICAgIGlmICghdGhpcy5yb3V0ZXIpIHRoaXMucm91dGVyID0gdGhpcy5pbmplY3Rvci5nZXQoUm91dGVyKTtcclxuXHJcbiAgICAgICAgLy8gcHJpbnQgb3V0IHRoZSBlcnJvciBtZXNzYWdlXHJcbiAgICAgICAgTG9nZ2VyLmVycm9yKFwiRXhjZXB0aW9uOiBcIiArIGV4Y2VwdGlvbiArIFwiXFxuXFxuUmVhc29uOiBcIiArIHJlYXNvbiArIFwiXFxuXFxuU3RhY2tUcmFjZTogXCIgKyBzdGFja1RyYWNlKTtcclxuXHJcbiAgICAgICAgLy8gbmF2aWdhdGUgdXNlciB0byB0aGUgZXJyb3IgcGFnZVxyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtBcHBSb3V0ZXMuRVJST1JfUk9VVEVdKTtcclxuICAgIH1cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL01ldGhvZHMvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHJcblxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
