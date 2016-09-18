System.register(['@angular/core', '@angular/router', "../../shared/utils/super_login_client/super_login_client", "../../shared/utils/super_login_client/super_login_client_error", "../../app_routes"], function(exports_1, context_1) {
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
    var core_1, router_1, super_login_client_1, super_login_client_error_1, app_routes_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (super_login_client_1_1) {
                super_login_client_1 = super_login_client_1_1;
            },
            function (super_login_client_error_1_1) {
                super_login_client_error_1 = super_login_client_error_1_1;
            },
            function (app_routes_1_1) {
                app_routes_1 = app_routes_1_1;
            }],
        execute: function() {
            let LoginComponent = class LoginComponent {
                ////////////////////////////////////////////Constructor////////////////////////////////////////////
                constructor(superLoginClient, router) {
                    this.superLoginClient = superLoginClient;
                    this.router = router;
                }
                /////////////////////////////////////////////Methods///////////////////////////////////////////////
                register(name, email, password) {
                    this.superLoginClient.register(name, email, password, () => {
                        // successfully registred
                        this.router.navigate([app_routes_1.AppRoutes.BOARD_ROUTE]);
                        // log user in
                        this.login(email, password, false);
                    }, (error) => {
                        // error
                        if (error.checkForError(super_login_client_error_1.SuperLoginClientError.AUTH_ERR_1)) {
                            alert(super_login_client_error_1.SuperLoginClientError.AUTH_ERR_1);
                        }
                        if (error.checkForError(super_login_client_error_1.SuperLoginClientError.AUTH_ERR_2)) {
                            alert(super_login_client_error_1.SuperLoginClientError.AUTH_ERR_2);
                        }
                        if (error.checkForError(super_login_client_error_1.SuperLoginClientError.AUTH_ERR_3)) {
                            alert(super_login_client_error_1.SuperLoginClientError.AUTH_ERR_3);
                        }
                        if (error.checkForError(super_login_client_error_1.SuperLoginClientError.AUTH_ERR_4)) {
                            alert(super_login_client_error_1.SuperLoginClientError.AUTH_ERR_4);
                        }
                        if (error.checkForError(super_login_client_error_1.SuperLoginClientError.AUTH_ERR_5)) {
                            alert(super_login_client_error_1.SuperLoginClientError.AUTH_ERR_5);
                        }
                        if (error.checkForError(super_login_client_error_1.SuperLoginClientError.AUTH_ERR_6)) {
                            alert(super_login_client_error_1.SuperLoginClientError.AUTH_ERR_6);
                        }
                    });
                }
                login(email, password, rememberLogin) {
                    this.router.navigate([app_routes_1.AppRoutes.BOARD_ROUTE]);
                    // this.superLoginClient.loginWithCredentials(email, password, rememberLogin, () => {
                    //     // successfully loged-in
                    //
                    // }, (error: SuperLoginClientError) => {
                    //     // error
                    //     if (error.checkForError(SuperLoginClientError.LOGIN_ERR_1)) {
                    //         alert(SuperLoginClientError.LOGIN_ERR_1);
                    //     }
                    //     if (error.checkForError(SuperLoginClientError.LOGIN_ERR_2)) {
                    //         alert(SuperLoginClientError.LOGIN_ERR_2);
                    //     }
                    // });
                }
                validateEmail(email) {
                    this.superLoginClient.isEmailInUse(email, () => {
                        alert("email NOT in use");
                    }, () => {
                        alert("email in use");
                    });
                }
            };
            LoginComponent = __decorate([
                core_1.Component({
                    selector: 'login-component',
                    templateUrl: 'app/components/login/login.component.html',
                    styleUrls: ['app/components/login/login.component.css'],
                }), 
                __metadata('design:paramtypes', [super_login_client_1.SuperLoginClient, router_1.Router])
            ], LoginComponent);
            exports_1("LoginComponent", LoginComponent);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbG9naW4vbG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBY0E7Z0JBT0EsbUdBQW1HO2dCQUUvRixZQUFZLGdCQUFrQyxFQUFFLE1BQWM7b0JBQzFELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztvQkFDekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0JBQ3pCLENBQUM7Z0JBRUwsbUdBQW1HO2dCQUV2RixRQUFRLENBQUMsSUFBWSxFQUFFLEtBQWEsRUFBRSxRQUFnQjtvQkFDMUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTt3QkFDbEQseUJBQXlCO3dCQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLHNCQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzt3QkFFOUMsY0FBYzt3QkFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ3ZDLENBQUMsRUFBRSxDQUFDLEtBQTRCO3dCQUM1QixRQUFRO3dCQUNSLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsZ0RBQXFCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN4RCxLQUFLLENBQUMsZ0RBQXFCLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQzVDLENBQUM7d0JBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxnREFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3hELEtBQUssQ0FBQyxnREFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDNUMsQ0FBQzt3QkFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLGdEQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDeEQsS0FBSyxDQUFDLGdEQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUM1QyxDQUFDO3dCQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsZ0RBQXFCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN4RCxLQUFLLENBQUMsZ0RBQXFCLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQzVDLENBQUM7d0JBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxnREFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3hELEtBQUssQ0FBQyxnREFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDNUMsQ0FBQzt3QkFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLGdEQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDeEQsS0FBSyxDQUFDLGdEQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUM1QyxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBRU8sS0FBSyxDQUFDLEtBQWEsRUFBRSxRQUFnQixFQUFFLGFBQXNCO29CQUNqRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLHNCQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDOUMscUZBQXFGO29CQUNyRiwrQkFBK0I7b0JBQy9CLEVBQUU7b0JBQ0YseUNBQXlDO29CQUN6QyxlQUFlO29CQUNmLG9FQUFvRTtvQkFDcEUsb0RBQW9EO29CQUNwRCxRQUFRO29CQUNSLG9FQUFvRTtvQkFDcEUsb0RBQW9EO29CQUNwRCxRQUFRO29CQUNSLE1BQU07Z0JBQ1YsQ0FBQztnQkFFTyxhQUFhLENBQUMsS0FBYTtvQkFDL0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUU7d0JBQ3RDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO29CQUM5QixDQUFDLEVBQUU7d0JBQ0MsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUMxQixDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO1lBQ0wsQ0FBQztZQTFFRDtnQkFBQyxnQkFBUyxDQUFDO29CQUNQLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFdBQVcsRUFBRSwyQ0FBMkM7b0JBQ3hELFNBQVMsRUFBRSxDQUFDLDBDQUEwQyxDQUFDO2lCQUMxRCxDQUFDOzs4QkFBQTtZQUNGLDJDQXFFQyxDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvbG9naW4vbG9naW4uY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Um91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQge1N1cGVyTG9naW5DbGllbnR9IGZyb20gXCIuLi8uLi9zaGFyZWQvdXRpbHMvc3VwZXJfbG9naW5fY2xpZW50L3N1cGVyX2xvZ2luX2NsaWVudFwiO1xyXG5pbXBvcnQge1N1cGVyTG9naW5DbGllbnRFcnJvcn0gZnJvbSBcIi4uLy4uL3NoYXJlZC91dGlscy9zdXBlcl9sb2dpbl9jbGllbnQvc3VwZXJfbG9naW5fY2xpZW50X2Vycm9yXCI7XHJcbmltcG9ydCB7Qm9hcmREYXRhYmFzZX0gZnJvbSBcIi4uLy4uL3NoYXJlZC9kYXRhYmFzZXMvYm9hcmQvYm9hcmRfZGF0YWJhc2VcIjtcclxuaW1wb3J0IHtBcHBSb3V0ZXN9IGZyb20gXCIuLi8uLi9hcHBfcm91dGVzXCI7XHJcbmltcG9ydCB7TURMfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3V0aWxzL21kbC9NYXRlcmlhbERlc2lnbkxpdGVVcGdyYWRlRWxlbWVudFwiO1xyXG5pbXBvcnQge0xvZ2dlcn0gZnJvbSBcIi4uLy4uL3NoYXJlZC91dGlscy9sb2dnZXJcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdsb2dpbi1jb21wb25lbnQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICdhcHAvY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnYXBwL2NvbXBvbmVudHMvbG9naW4vbG9naW4uY29tcG9uZW50LmNzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQge1xyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1Byb3BlcnRpZXMvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIHByaXZhdGUgc3VwZXJMb2dpbkNsaWVudDogU3VwZXJMb2dpbkNsaWVudDtcclxuXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyO1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9Db25zdHJ1Y3Rvci8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3VwZXJMb2dpbkNsaWVudDogU3VwZXJMb2dpbkNsaWVudCwgcm91dGVyOiBSb3V0ZXIpIHtcclxuICAgICAgICB0aGlzLnN1cGVyTG9naW5DbGllbnQgPSBzdXBlckxvZ2luQ2xpZW50O1xyXG4gICAgICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xyXG4gICAgfVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vTWV0aG9kcy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgcHJpdmF0ZSByZWdpc3RlcihuYW1lOiBzdHJpbmcsIGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnN1cGVyTG9naW5DbGllbnQucmVnaXN0ZXIobmFtZSwgZW1haWwsIHBhc3N3b3JkLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIHN1Y2Nlc3NmdWxseSByZWdpc3RyZWRcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW0FwcFJvdXRlcy5CT0FSRF9ST1VURV0pO1xyXG5cclxuICAgICAgICAgICAgLy8gbG9nIHVzZXIgaW5cclxuICAgICAgICAgICAgdGhpcy5sb2dpbihlbWFpbCwgcGFzc3dvcmQsIGZhbHNlKTtcclxuICAgICAgICB9LCAoZXJyb3I6IFN1cGVyTG9naW5DbGllbnRFcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAvLyBlcnJvclxyXG4gICAgICAgICAgICBpZiAoZXJyb3IuY2hlY2tGb3JFcnJvcihTdXBlckxvZ2luQ2xpZW50RXJyb3IuQVVUSF9FUlJfMSkpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFN1cGVyTG9naW5DbGllbnRFcnJvci5BVVRIX0VSUl8xKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXJyb3IuY2hlY2tGb3JFcnJvcihTdXBlckxvZ2luQ2xpZW50RXJyb3IuQVVUSF9FUlJfMikpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFN1cGVyTG9naW5DbGllbnRFcnJvci5BVVRIX0VSUl8yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXJyb3IuY2hlY2tGb3JFcnJvcihTdXBlckxvZ2luQ2xpZW50RXJyb3IuQVVUSF9FUlJfMykpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFN1cGVyTG9naW5DbGllbnRFcnJvci5BVVRIX0VSUl8zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXJyb3IuY2hlY2tGb3JFcnJvcihTdXBlckxvZ2luQ2xpZW50RXJyb3IuQVVUSF9FUlJfNCkpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFN1cGVyTG9naW5DbGllbnRFcnJvci5BVVRIX0VSUl80KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXJyb3IuY2hlY2tGb3JFcnJvcihTdXBlckxvZ2luQ2xpZW50RXJyb3IuQVVUSF9FUlJfNSkpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFN1cGVyTG9naW5DbGllbnRFcnJvci5BVVRIX0VSUl81KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXJyb3IuY2hlY2tGb3JFcnJvcihTdXBlckxvZ2luQ2xpZW50RXJyb3IuQVVUSF9FUlJfNikpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFN1cGVyTG9naW5DbGllbnRFcnJvci5BVVRIX0VSUl82KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9naW4oZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZywgcmVtZW1iZXJMb2dpbjogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtBcHBSb3V0ZXMuQk9BUkRfUk9VVEVdKTtcclxuICAgICAgICAvLyB0aGlzLnN1cGVyTG9naW5DbGllbnQubG9naW5XaXRoQ3JlZGVudGlhbHMoZW1haWwsIHBhc3N3b3JkLCByZW1lbWJlckxvZ2luLCAoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIC8vIHN1Y2Nlc3NmdWxseSBsb2dlZC1pblxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gfSwgKGVycm9yOiBTdXBlckxvZ2luQ2xpZW50RXJyb3IpID0+IHtcclxuICAgICAgICAvLyAgICAgLy8gZXJyb3JcclxuICAgICAgICAvLyAgICAgaWYgKGVycm9yLmNoZWNrRm9yRXJyb3IoU3VwZXJMb2dpbkNsaWVudEVycm9yLkxPR0lOX0VSUl8xKSkge1xyXG4gICAgICAgIC8vICAgICAgICAgYWxlcnQoU3VwZXJMb2dpbkNsaWVudEVycm9yLkxPR0lOX0VSUl8xKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBpZiAoZXJyb3IuY2hlY2tGb3JFcnJvcihTdXBlckxvZ2luQ2xpZW50RXJyb3IuTE9HSU5fRVJSXzIpKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBhbGVydChTdXBlckxvZ2luQ2xpZW50RXJyb3IuTE9HSU5fRVJSXzIpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZUVtYWlsKGVtYWlsOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnN1cGVyTG9naW5DbGllbnQuaXNFbWFpbEluVXNlKGVtYWlsLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiZW1haWwgTk9UIGluIHVzZVwiKTtcclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiZW1haWwgaW4gdXNlXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
