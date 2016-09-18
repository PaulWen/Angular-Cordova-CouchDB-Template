System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SuperLoginClientError;
    return {
        setters:[],
        execute: function() {
            /**
             * The class describes the error(s) of an SuperLogin request.
             */
            class SuperLoginClientError {
                ////////////////////////////////////////////Constructor////////////////////////////////////////////
                /**
                 * The constructor of SuperLoginClientError.
                 *
                 * @param error JSON-object which represents the error from the SuperLogin server
                 */
                constructor(error) {
                    Error.apply(this, arguments);
                    this.errorMessage = error._body;
                }
                /////////////////////////////////////////////Constants/////////////////////////////////////////////
                static get UNAUTHORIZED() { return "Unauthorized"; }
                ;
                static get AUTH_ERR_1() { return "Email already in use"; }
                ;
                static get AUTH_ERR_2() { return "Password must be at least 6 characters"; }
                ;
                static get AUTH_ERR_3() { return "Email can't be blank"; }
                ;
                static get AUTH_ERR_4() { return "Password can't be blank"; }
                ;
                static get AUTH_ERR_5() { return "Name can't be blank"; }
                ;
                static get AUTH_ERR_6() { return "Email invalid email"; }
                ;
                static get LOGIN_ERR_1() { return "Invalid username or password"; }
                ;
                static get LOGIN_ERR_2() { return "Missing credentials"; }
                ;
                /////////////////////////////////////////Getter & Setter///////////////////////////////////////////
                /**
                 * Returns the error message of the SuperLogin server.
                 *
                 * @returns {string}
                 */
                getErrorMessage() {
                    return this.errorMessage;
                }
                /////////////////////////////////////////////Methods///////////////////////////////////////////////
                /**
                 * The function checks if this error lists a specific error.
                 *
                 * @param error
                 * @returns {boolean}
                 */
                checkForError(error) {
                    return (this.errorMessage).indexOf(error) > -1;
                }
            }
            exports_1("SuperLoginClientError", SuperLoginClientError);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC91dGlscy9zdXBlcl9sb2dpbl9jbGllbnQvc3VwZXJfbG9naW5fY2xpZW50X2Vycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7WUFBQTs7ZUFFRztZQUNIO2dCQXFCQSxtR0FBbUc7Z0JBRS9GOzs7O21CQUlHO2dCQUNILFlBQVksS0FBVTtvQkFDbEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztnQkFDcEMsQ0FBQztnQkE3QkwsbUdBQW1HO2dCQUUvRixXQUFrQixZQUFZLEtBQVksTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFBLENBQUM7O2dCQUVqRSxXQUFrQixVQUFVLEtBQVksTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUEsQ0FBQzs7Z0JBQ3ZFLFdBQWtCLFVBQVUsS0FBWSxNQUFNLENBQUMsd0NBQXdDLENBQUMsQ0FBQSxDQUFDOztnQkFDekYsV0FBa0IsVUFBVSxLQUFZLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBLENBQUM7O2dCQUN2RSxXQUFrQixVQUFVLEtBQVksTUFBTSxDQUFDLHlCQUF5QixDQUFDLENBQUEsQ0FBQzs7Z0JBQzFFLFdBQWtCLFVBQVUsS0FBWSxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQSxDQUFDOztnQkFDdEUsV0FBa0IsVUFBVSxLQUFZLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBLENBQUM7O2dCQUV0RSxXQUFrQixXQUFXLEtBQVksTUFBTSxDQUFDLDhCQUE4QixDQUFDLENBQUEsQ0FBQzs7Z0JBQ2hGLFdBQWtCLFdBQVcsS0FBWSxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQSxDQUFDOztnQkFtQjNFLG1HQUFtRztnQkFFL0Y7Ozs7bUJBSUc7Z0JBQ0ksZUFBZTtvQkFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQzdCLENBQUM7Z0JBRUwsbUdBQW1HO2dCQUUvRjs7Ozs7bUJBS0c7Z0JBQ0ksYUFBYSxDQUFDLEtBQWE7b0JBQzlCLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELENBQUM7WUFDTCxDQUFDO1lBdkRELHlEQXVEQyxDQUFBIiwiZmlsZSI6InNoYXJlZC91dGlscy9zdXBlcl9sb2dpbl9jbGllbnQvc3VwZXJfbG9naW5fY2xpZW50X2Vycm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFRoZSBjbGFzcyBkZXNjcmliZXMgdGhlIGVycm9yKHMpIG9mIGFuIFN1cGVyTG9naW4gcmVxdWVzdC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTdXBlckxvZ2luQ2xpZW50RXJyb3Ige1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vQ29uc3RhbnRzLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgVU5BVVRIT1JJWkVEKCk6IHN0cmluZyB7cmV0dXJuIFwiVW5hdXRob3JpemVkXCI7fTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBBVVRIX0VSUl8xKCk6IHN0cmluZyB7cmV0dXJuIFwiRW1haWwgYWxyZWFkeSBpbiB1c2VcIjt9O1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgQVVUSF9FUlJfMigpOiBzdHJpbmcge3JldHVybiBcIlBhc3N3b3JkIG11c3QgYmUgYXQgbGVhc3QgNiBjaGFyYWN0ZXJzXCI7fTtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEFVVEhfRVJSXzMoKTogc3RyaW5nIHtyZXR1cm4gXCJFbWFpbCBjYW4ndCBiZSBibGFua1wiO307XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBBVVRIX0VSUl80KCk6IHN0cmluZyB7cmV0dXJuIFwiUGFzc3dvcmQgY2FuJ3QgYmUgYmxhbmtcIjt9O1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgQVVUSF9FUlJfNSgpOiBzdHJpbmcge3JldHVybiBcIk5hbWUgY2FuJ3QgYmUgYmxhbmtcIjt9O1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgQVVUSF9FUlJfNigpOiBzdHJpbmcge3JldHVybiBcIkVtYWlsIGludmFsaWQgZW1haWxcIjt9O1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IExPR0lOX0VSUl8xKCk6IHN0cmluZyB7cmV0dXJuIFwiSW52YWxpZCB1c2VybmFtZSBvciBwYXNzd29yZFwiO307XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBMT0dJTl9FUlJfMigpOiBzdHJpbmcge3JldHVybiBcIk1pc3NpbmcgY3JlZGVudGlhbHNcIjt9O1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9Qcm9wZXJ0aWVzLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvKiogdGhpcyBwcm9wZXJ0eSBjb250YWlucyB0aGUgY29tcGxldGUgZXJyb3IgbWVzc2FnZSBmcm9tIHRoZSBTdXBlckxvZ2luIHNlcnZlciAqL1xyXG4gICAgcHJpdmF0ZSBlcnJvck1lc3NhZ2U6IHN0cmluZztcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vQ29uc3RydWN0b3IvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0cnVjdG9yIG9mIFN1cGVyTG9naW5DbGllbnRFcnJvci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZXJyb3IgSlNPTi1vYmplY3Qgd2hpY2ggcmVwcmVzZW50cyB0aGUgZXJyb3IgZnJvbSB0aGUgU3VwZXJMb2dpbiBzZXJ2ZXJcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZXJyb3I6IGFueSkge1xyXG4gICAgICAgIEVycm9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBlcnJvci5fYm9keTtcclxuICAgIH1cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vR2V0dGVyICYgU2V0dGVyLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZXJyb3IgbWVzc2FnZSBvZiB0aGUgU3VwZXJMb2dpbiBzZXJ2ZXIuXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRFcnJvck1lc3NhZ2UoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lcnJvck1lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9NZXRob2RzLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBmdW5jdGlvbiBjaGVja3MgaWYgdGhpcyBlcnJvciBsaXN0cyBhIHNwZWNpZmljIGVycm9yLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBlcnJvclxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjaGVja0ZvckVycm9yKGVycm9yOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuZXJyb3JNZXNzYWdlKS5pbmRleE9mKGVycm9yKSA+IC0xO1xyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
