System.register(["@angular/http", "rxjs/add/operator/map", "@angular/core", "jquery-param"], function(exports_1, context_1) {
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
    var http_1, core_1, jquery_param_1;
    var SuperloginHttpRequestor;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (jquery_param_1_1) {
                jquery_param_1 = jquery_param_1_1;
            }],
        execute: function() {
            /**
             * The class is a service which provides basic methods for making HTTP requests.
             * The methods are specifically optimized for SuperLogin.
             */
            let SuperloginHttpRequestor = class SuperloginHttpRequestor {
                ////////////////////////////////////////////Constructor////////////////////////////////////////////
                constructor(http) {
                    this.http = http;
                }
                /////////////////////////////////////////////Methods///////////////////////////////////////////////
                /**
                 * This method extracts JSON data out of an HTTP response.
                 *
                 * @param res the response object
                 * @returns {any|{}}
                 */
                extractJsonData(res) {
                    // parse response body to JSON
                    let data = res.json();
                    // retun the JSON data
                    return data || {};
                }
                /**
                 * This method sends a get requests which requests JSON data.
                 * The method returns a observable which will provide the response data as a JSON object.
                 *
                 * Example:
                 * getJsonData("http://jsonplaceholder.typicode.com/posts").subscribe(
                 *    (data: any) =>this.test = data[2].title + "---------" + JSON.stringify(data),
                 *    error=>alert(error.message),
                 *    ()=>console.log('Finished Get')
                 * );
                 *
                 *
                 *
                 * @param url
                 * @param authorizationBearer sessionID oder null
                 *
                 * @returns {Observable<R>}
                 */
                getJsonData(url, authorizationBearer) {
                    // generate request header
                    let headers = new http_1.Headers();
                    if (authorizationBearer != null) {
                        headers.append('Authorization', 'Bearer ' + authorizationBearer);
                    }
                    // make GET request
                    return this.http.get(url, {
                        headers: headers
                    })
                        .map(this.extractJsonData);
                }
                /**
                 * This method sends a post request which requests JSON data.
                 * The POST parameters are given to this method by passing a JSON object.
                 * The method returns a observable which will provide the response data as a JSON object.
                 *
                 *
                 * Example:
                 * postJsonData("http://localhost:3000/auth/register", {
                 *       name: "Joe Smith",
                 *       username: "hekim2",
                 *       email: "hekim.wenzel2@web.de",
                 *       password: "bigsecret",
                 *       confirmPassword: "bigsecret"
                 * }).subscribe(
                 *         (data: any) => this.test = data[0].userid,
                 *         (error) => alert(error.message),
                 *         ()=>console.log('Finished Get')
                 * );
                 *
                 *
                 *
                 * @param url
                 * @param authorizationBearer sessionID oder null
                 * @param bodyParametersAsJson
                 *
                 * @returns {Observable<R>}
                 */
                postJsonData(url, authorizationBearer, bodyParametersAsJson) {
                    // generate request header
                    let headers = new http_1.Headers();
                    // config post parameter content type in header
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    if (authorizationBearer != null) {
                        headers.append('Authorization', 'Bearer ' + authorizationBearer);
                    }
                    // make post request but first convert the JSON object into a POST parameters string
                    return this.http.post(url, jquery_param_1.default(bodyParametersAsJson), {
                        headers: headers
                    }).map(this.extractJsonData);
                }
            };
            SuperloginHttpRequestor = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [http_1.Http])
            ], SuperloginHttpRequestor);
            exports_1("SuperloginHttpRequestor", SuperloginHttpRequestor);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC91dGlscy9zdXBlcl9sb2dpbl9jbGllbnQvc3VwZXJsb2dpbl9odHRwX3JlcXVlc3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFNQTs7O2VBR0c7WUFFSDtnQkFNQSxtR0FBbUc7Z0JBRS9GLFlBQVksSUFBVTtvQkFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLENBQUM7Z0JBRUwsbUdBQW1HO2dCQUUvRjs7Ozs7bUJBS0c7Z0JBQ0ssZUFBZSxDQUFDLEdBQWE7b0JBQ2pDLDhCQUE4QjtvQkFDOUIsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUV0QixzQkFBc0I7b0JBQ3RCLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRyxDQUFDO2dCQUN2QixDQUFDO2dCQUVEOzs7Ozs7Ozs7Ozs7Ozs7OzttQkFpQkc7Z0JBQ0ksV0FBVyxDQUFDLEdBQVcsRUFBRSxtQkFBMkI7b0JBQ3ZELDBCQUEwQjtvQkFDMUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztvQkFFNUIsRUFBRSxDQUFDLENBQUMsbUJBQW1CLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDOUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLG1CQUFtQixDQUFDLENBQUM7b0JBQ3JFLENBQUM7b0JBRUQsbUJBQW1CO29CQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO3dCQUN0QixPQUFPLEVBQUUsT0FBTztxQkFDbkIsQ0FBQzt5QkFFRCxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFBO2dCQUM5QixDQUFDO2dCQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkEwQkc7Z0JBQ0ksWUFBWSxDQUFDLEdBQVUsRUFBRSxtQkFBMkIsRUFBRSxvQkFBeUI7b0JBQ2xGLDBCQUEwQjtvQkFDMUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztvQkFDNUIsK0NBQStDO29CQUMvQyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxtQ0FBbUMsQ0FBQyxDQUFDO29CQUVwRSxFQUFFLENBQUMsQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUM5QixPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxTQUFTLEdBQUcsbUJBQW1CLENBQUMsQ0FBQztvQkFDckUsQ0FBQztvQkFFRCxvRkFBb0Y7b0JBQ3BGLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsc0JBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO3dCQUN4RCxPQUFPLEVBQUUsT0FBTztxQkFFbkIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ2pDLENBQUM7WUFDTCxDQUFDO1lBMUdEO2dCQUFDLGlCQUFVLEVBQUU7O3VDQUFBO1lBQ2IsNkRBeUdDLENBQUEiLCJmaWxlIjoic2hhcmVkL3V0aWxzL3N1cGVyX2xvZ2luX2NsaWVudC9zdXBlcmxvZ2luX2h0dHBfcmVxdWVzdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZXNwb25zZSwgSHR0cCwgSGVhZGVyc30gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHBvc3RQYXJhbSBmcm9tIFwianF1ZXJ5LXBhcmFtXCI7XHJcbmltcG9ydCB7TG9nZ2VyfSBmcm9tIFwiLi4vbG9nZ2VyXCI7XHJcblxyXG4vKipcclxuICogVGhlIGNsYXNzIGlzIGEgc2VydmljZSB3aGljaCBwcm92aWRlcyBiYXNpYyBtZXRob2RzIGZvciBtYWtpbmcgSFRUUCByZXF1ZXN0cy5cclxuICogVGhlIG1ldGhvZHMgYXJlIHNwZWNpZmljYWxseSBvcHRpbWl6ZWQgZm9yIFN1cGVyTG9naW4uXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTdXBlcmxvZ2luSHR0cFJlcXVlc3RvciB7XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1Byb3BlcnRpZXMvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIHByaXZhdGUgaHR0cDogSHR0cDtcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vQ29uc3RydWN0b3IvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGh0dHA6IEh0dHApIHtcclxuICAgICAgICB0aGlzLmh0dHAgPSBodHRwO1xyXG4gICAgfVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vTWV0aG9kcy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBleHRyYWN0cyBKU09OIGRhdGEgb3V0IG9mIGFuIEhUVFAgcmVzcG9uc2UuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHJlcyB0aGUgcmVzcG9uc2Ugb2JqZWN0XHJcbiAgICAgKiBAcmV0dXJucyB7YW55fHt9fVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGV4dHJhY3RKc29uRGF0YShyZXM6IFJlc3BvbnNlKSB7XHJcbiAgICAgICAgLy8gcGFyc2UgcmVzcG9uc2UgYm9keSB0byBKU09OXHJcbiAgICAgICAgbGV0IGRhdGEgPSByZXMuanNvbigpO1xyXG5cclxuICAgICAgICAvLyByZXR1biB0aGUgSlNPTiBkYXRhXHJcbiAgICAgICAgcmV0dXJuIGRhdGEgfHwgeyB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2Qgc2VuZHMgYSBnZXQgcmVxdWVzdHMgd2hpY2ggcmVxdWVzdHMgSlNPTiBkYXRhLlxyXG4gICAgICogVGhlIG1ldGhvZCByZXR1cm5zIGEgb2JzZXJ2YWJsZSB3aGljaCB3aWxsIHByb3ZpZGUgdGhlIHJlc3BvbnNlIGRhdGEgYXMgYSBKU09OIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBFeGFtcGxlOlxyXG4gICAgICogZ2V0SnNvbkRhdGEoXCJodHRwOi8vanNvbnBsYWNlaG9sZGVyLnR5cGljb2RlLmNvbS9wb3N0c1wiKS5zdWJzY3JpYmUoXHJcbiAgICAgKiAgICAoZGF0YTogYW55KSA9PnRoaXMudGVzdCA9IGRhdGFbMl0udGl0bGUgKyBcIi0tLS0tLS0tLVwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YSksXHJcbiAgICAgKiAgICBlcnJvcj0+YWxlcnQoZXJyb3IubWVzc2FnZSksXHJcbiAgICAgKiAgICAoKT0+Y29uc29sZS5sb2coJ0ZpbmlzaGVkIEdldCcpXHJcbiAgICAgKiApO1xyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHVybFxyXG4gICAgICogQHBhcmFtIGF1dGhvcml6YXRpb25CZWFyZXIgc2Vzc2lvbklEIG9kZXIgbnVsbFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFI+fVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvbkRhdGEodXJsOiBzdHJpbmcsIGF1dGhvcml6YXRpb25CZWFyZXI6IHN0cmluZykge1xyXG4gICAgICAgIC8vIGdlbmVyYXRlIHJlcXVlc3QgaGVhZGVyXHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG5cclxuICAgICAgICBpZiAoYXV0aG9yaXphdGlvbkJlYXJlciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgYXV0aG9yaXphdGlvbkJlYXJlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBtYWtlIEdFVCByZXF1ZXN0XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIHRyYW5zZm9ybSByZXNwb25zZSBzbyB0aGF0IGl0IGdldHMgYSBKU09OIG9iamVjdFxyXG4gICAgICAgIC5tYXAodGhpcy5leHRyYWN0SnNvbkRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBzZW5kcyBhIHBvc3QgcmVxdWVzdCB3aGljaCByZXF1ZXN0cyBKU09OIGRhdGEuXHJcbiAgICAgKiBUaGUgUE9TVCBwYXJhbWV0ZXJzIGFyZSBnaXZlbiB0byB0aGlzIG1ldGhvZCBieSBwYXNzaW5nIGEgSlNPTiBvYmplY3QuXHJcbiAgICAgKiBUaGUgbWV0aG9kIHJldHVybnMgYSBvYnNlcnZhYmxlIHdoaWNoIHdpbGwgcHJvdmlkZSB0aGUgcmVzcG9uc2UgZGF0YSBhcyBhIEpTT04gb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKiBFeGFtcGxlOlxyXG4gICAgICogcG9zdEpzb25EYXRhKFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL2F1dGgvcmVnaXN0ZXJcIiwge1xyXG4gICAgICogICAgICAgbmFtZTogXCJKb2UgU21pdGhcIixcclxuICAgICAqICAgICAgIHVzZXJuYW1lOiBcImhla2ltMlwiLFxyXG4gICAgICogICAgICAgZW1haWw6IFwiaGVraW0ud2VuemVsMkB3ZWIuZGVcIixcclxuICAgICAqICAgICAgIHBhc3N3b3JkOiBcImJpZ3NlY3JldFwiLFxyXG4gICAgICogICAgICAgY29uZmlybVBhc3N3b3JkOiBcImJpZ3NlY3JldFwiXHJcbiAgICAgKiB9KS5zdWJzY3JpYmUoXHJcbiAgICAgKiAgICAgICAgIChkYXRhOiBhbnkpID0+IHRoaXMudGVzdCA9IGRhdGFbMF0udXNlcmlkLFxyXG4gICAgICogICAgICAgICAoZXJyb3IpID0+IGFsZXJ0KGVycm9yLm1lc3NhZ2UpLFxyXG4gICAgICogICAgICAgICAoKT0+Y29uc29sZS5sb2coJ0ZpbmlzaGVkIEdldCcpXHJcbiAgICAgKiApO1xyXG4gICAgICpcclxuICAgICAqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHVybFxyXG4gICAgICogQHBhcmFtIGF1dGhvcml6YXRpb25CZWFyZXIgc2Vzc2lvbklEIG9kZXIgbnVsbFxyXG4gICAgICogQHBhcmFtIGJvZHlQYXJhbWV0ZXJzQXNKc29uXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFI+fVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcG9zdEpzb25EYXRhKHVybDpzdHJpbmcsIGF1dGhvcml6YXRpb25CZWFyZXI6IHN0cmluZywgYm9keVBhcmFtZXRlcnNBc0pzb246IGFueSkge1xyXG4gICAgICAgIC8vIGdlbmVyYXRlIHJlcXVlc3QgaGVhZGVyXHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xyXG4gICAgICAgIC8vIGNvbmZpZyBwb3N0IHBhcmFtZXRlciBjb250ZW50IHR5cGUgaW4gaGVhZGVyXHJcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcclxuXHJcbiAgICAgICAgaWYgKGF1dGhvcml6YXRpb25CZWFyZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBoZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIGF1dGhvcml6YXRpb25CZWFyZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbWFrZSBwb3N0IHJlcXVlc3QgYnV0IGZpcnN0IGNvbnZlcnQgdGhlIEpTT04gb2JqZWN0IGludG8gYSBQT1NUIHBhcmFtZXRlcnMgc3RyaW5nXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgcG9zdFBhcmFtKGJvZHlQYXJhbWV0ZXJzQXNKc29uKSwge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXHJcbiAgICAgICAgLy8gdHJhbnNmb3JtIHJlc3BvbnNlIHNvIHRoYXQgaXQgZ2V0cyBhIEpTT04gb2JqZWN0XHJcbiAgICAgICAgfSkubWFwKHRoaXMuZXh0cmFjdEpzb25EYXRhKTtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
