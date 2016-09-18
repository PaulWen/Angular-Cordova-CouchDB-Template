System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Config;
    return {
        setters:[],
        execute: function() {
            /**
             * This class defines constants which can be used to configure the application.
             */
            class Config {
                ////////////////////////////////////////////Properties////////////////////////////////////////////
                static get DEVELOPMENT() { return true; }
                ;
                static get WEB_SERVER_DOMAIN() { return "http://localhost:3000"; }
                ;
                static get DATABASE_DOMAIN() { return "http://localhost:8080"; }
                ;
            }
            exports_1("Config", Config);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1lBQUE7O2VBRUc7WUFDSDtnQkFFQSxrR0FBa0c7Z0JBRTlGLFdBQWtCLFdBQVcsS0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQzs7Z0JBQ3ZELFdBQWtCLGlCQUFpQixLQUFZLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBLENBQUM7O2dCQUMvRSxXQUFrQixlQUFlLEtBQVksTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUEsQ0FBQzs7WUFFakYsQ0FBQztZQVJELDJCQVFDLENBQUEiLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFRoaXMgY2xhc3MgZGVmaW5lcyBjb25zdGFudHMgd2hpY2ggY2FuIGJlIHVzZWQgdG8gY29uZmlndXJlIHRoZSBhcHBsaWNhdGlvbi5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb25maWcge1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9Qcm9wZXJ0aWVzLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgREVWRUxPUE1FTlQoKTogYm9vbGVhbiB7cmV0dXJuIHRydWU7fTtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IFdFQl9TRVJWRVJfRE9NQUlOKCk6IHN0cmluZyB7cmV0dXJuIFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7fTtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IERBVEFCQVNFX0RPTUFJTigpOiBzdHJpbmcge3JldHVybiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MFwiO307XHJcblxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
