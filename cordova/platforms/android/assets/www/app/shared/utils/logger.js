System.register(["../../config", "pouchdb"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var config_1, pouchdb_1;
    var Logger;
    return {
        setters:[
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (pouchdb_1_1) {
                pouchdb_1 = pouchdb_1_1;
            }],
        execute: function() {
            /**
             * This class provides static methods for logging.
             * The class defines how to log messages.
             */
            class Logger {
                ////////////////////////////////////////////Properties////////////////////////////////////////////
                /////////////////////////////////////////////Methods///////////////////////////////////////////////
                static log(msg) {
                    if (config_1.Config.DEVELOPMENT) {
                        console.log(msg);
                        // PouchDB.debug.enable('*');
                        pouchdb_1.default.debug.disable();
                    }
                    else {
                        pouchdb_1.default.debug.disable();
                    }
                }
                static error(msg) {
                    console.error(msg);
                }
                static warn(msg) {
                    console.warn(msg);
                }
                static debug(msg) {
                    console.debug(msg);
                }
            }
            exports_1("Logger", Logger);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC91dGlscy9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7WUFHQTs7O2VBR0c7WUFDSDtnQkFFQSxrR0FBa0c7Z0JBR2xHLG1HQUFtRztnQkFFL0YsT0FBYyxHQUFHLENBQUMsR0FBTztvQkFDckIsRUFBRSxDQUFDLENBQUMsZUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7d0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ2pCLDZCQUE2Qjt3QkFDN0IsaUJBQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzVCLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osaUJBQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzVCLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRCxPQUFjLEtBQUssQ0FBQyxHQUFPO29CQUN2QixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QixDQUFDO2dCQUVELE9BQWMsSUFBSSxDQUFDLEdBQU87b0JBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLENBQUM7Z0JBRUQsT0FBYyxLQUFLLENBQUMsR0FBTztvQkFDdkIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdkIsQ0FBQztZQUVMLENBQUM7WUE3QkQsMkJBNkJDLENBQUEiLCJmaWxlIjoic2hhcmVkL3V0aWxzL2xvZ2dlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29uZmlnfSBmcm9tIFwiLi4vLi4vY29uZmlnXCI7XHJcbmltcG9ydCBQb3VjaERCIGZyb20gXCJwb3VjaGRiXCI7XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBwcm92aWRlcyBzdGF0aWMgbWV0aG9kcyBmb3IgbG9nZ2luZy5cclxuICogVGhlIGNsYXNzIGRlZmluZXMgaG93IHRvIGxvZyBtZXNzYWdlcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBMb2dnZXIge1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9Qcm9wZXJ0aWVzLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9NZXRob2RzLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvZyhtc2c6YW55KSB7XHJcbiAgICAgICAgaWYgKENvbmZpZy5ERVZFTE9QTUVOVCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xyXG4gICAgICAgICAgICAvLyBQb3VjaERCLmRlYnVnLmVuYWJsZSgnKicpO1xyXG4gICAgICAgICAgICBQb3VjaERCLmRlYnVnLmRpc2FibGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBQb3VjaERCLmRlYnVnLmRpc2FibGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBlcnJvcihtc2c6YW55KSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgd2Fybihtc2c6YW55KSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKG1zZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkZWJ1Zyhtc2c6YW55KSB7XHJcbiAgICAgICAgY29uc29sZS5kZWJ1Zyhtc2cpO1xyXG4gICAgfVxyXG5cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
