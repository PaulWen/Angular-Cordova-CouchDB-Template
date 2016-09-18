/**
 * This directive gets used declare that in an HTML element MDL Elements
 * are used. By adding this directive the MDL component handler
 * gets called automatically as soon as the page got loaded/updated
 * and renders all the MDL elements.
 */
System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var MDL;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            let MDL = class MDL {
                ngAfterViewInit() {
                    componentHandler.upgradeDom();
                }
            };
            MDL = __decorate([
                core_1.Directive({
                    selector: '[mdl]'
                }), 
                __metadata('design:paramtypes', [])
            ], MDL);
            exports_1("MDL", MDL);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC91dGlscy9tZGwvTWF0ZXJpYWxEZXNpZ25MaXRlVXBncmFkZUVsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQVNIO2dCQUNJLGVBQWU7b0JBQ1gsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ2xDLENBQUM7WUFDTCxDQUFDO1lBUEQ7Z0JBQUMsZ0JBQVMsQ0FBQztvQkFDUCxRQUFRLEVBQUUsT0FBTztpQkFDcEIsQ0FBQzs7bUJBQUE7WUFDRixxQkFJQyxDQUFBIiwiZmlsZSI6InNoYXJlZC91dGlscy9tZGwvTWF0ZXJpYWxEZXNpZ25MaXRlVXBncmFkZUVsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogVGhpcyBkaXJlY3RpdmUgZ2V0cyB1c2VkIGRlY2xhcmUgdGhhdCBpbiBhbiBIVE1MIGVsZW1lbnQgTURMIEVsZW1lbnRzXHJcbiAqIGFyZSB1c2VkLiBCeSBhZGRpbmcgdGhpcyBkaXJlY3RpdmUgdGhlIE1ETCBjb21wb25lbnQgaGFuZGxlclxyXG4gKiBnZXRzIGNhbGxlZCBhdXRvbWF0aWNhbGx5IGFzIHNvb24gYXMgdGhlIHBhZ2UgZ290IGxvYWRlZC91cGRhdGVkXHJcbiAqIGFuZCByZW5kZXJzIGFsbCB0aGUgTURMIGVsZW1lbnRzLlxyXG4gKi9cclxuXHJcblxyXG5pbXBvcnQge0RpcmVjdGl2ZSwgQWZ0ZXJWaWV3SW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmRlY2xhcmUgdmFyIGNvbXBvbmVudEhhbmRsZXI6IGFueTtcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbbWRsXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIE1ETCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIGNvbXBvbmVudEhhbmRsZXIudXBncmFkZURvbSgpO1xyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
