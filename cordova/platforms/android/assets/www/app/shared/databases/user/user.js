System.register(["../../utils/super_login_client/super_login_client", "@angular/core"], function(exports_1, context_1) {
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
    var super_login_client_1, core_1;
    var User;
    return {
        setters:[
            function (super_login_client_1_1) {
                super_login_client_1 = super_login_client_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            let User = class User {
                ////////////////////////////////////////////Constructor////////////////////////////////////////////
                constructor(superLoginClient) {
                    this.superLoginClient = superLoginClient;
                }
            };
            User = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [super_login_client_1.SuperLoginClient])
            ], User);
            exports_1("User", User);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9kYXRhYmFzZXMvdXNlci91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBS0E7Z0JBUUEsbUdBQW1HO2dCQUUvRixZQUFZLGdCQUFrQztvQkFDMUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO2dCQUM3QyxDQUFDO1lBSUwsQ0FBQztZQWpCRDtnQkFBQyxpQkFBVSxFQUFFOztvQkFBQTtZQUNiLHVCQWdCQyxDQUFBIiwiZmlsZSI6InNoYXJlZC9kYXRhYmFzZXMvdXNlci91c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdXBlckxvZ2luQ2xpZW50fSBmcm9tIFwiLi4vLi4vdXRpbHMvc3VwZXJfbG9naW5fY2xpZW50L3N1cGVyX2xvZ2luX2NsaWVudFwiO1xyXG5pbXBvcnQge0JvYXJkRG9jdW1lbnR9IGZyb20gXCIuLi9ib2FyZC9ib2FyZF9kb2N1bWVudFwiO1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBVc2VyIHtcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vUHJvcGVydGllcy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgcHJpdmF0ZSBzdXBlckxvZ2luQ2xpZW50OiBTdXBlckxvZ2luQ2xpZW50O1xyXG5cclxuICAgIHByaXZhdGUgYm9hcmRzOiBCb2FyZERvY3VtZW50W107XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL0NvbnN0cnVjdG9yLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzdXBlckxvZ2luQ2xpZW50OiBTdXBlckxvZ2luQ2xpZW50KSB7XHJcbiAgICAgICAgdGhpcy5zdXBlckxvZ2luQ2xpZW50ID0gc3VwZXJMb2dpbkNsaWVudDtcclxuICAgIH1cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL01ldGhvZHMvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
