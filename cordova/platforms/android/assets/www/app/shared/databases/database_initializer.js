System.register(["../utils/super_login_client/super_login_client_database_initializer"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var super_login_client_database_initializer_1;
    var DatabaseInitializer;
    return {
        setters:[
            function (super_login_client_database_initializer_1_1) {
                super_login_client_database_initializer_1 = super_login_client_database_initializer_1_1;
            }],
        execute: function() {
            /**
             * This class describes how the URLs of the databases of the app are getting updated in case
             * they change.
             */
            class DatabaseInitializer extends super_login_client_database_initializer_1.SuperLoginClientDatabaseInitializer {
                ////////////////////////////////////////////Constructor////////////////////////////////////////////
                constructor(boardDatabase) {
                    super();
                    this.boardDatabase = boardDatabase;
                }
                ////////////////////////////////////////Inherited Methods//////////////////////////////////////////
                initializeDatabases(user_databases) {
                    this.boardDatabase.initializeDatabase(user_databases.boards);
                }
            }
            exports_1("DatabaseInitializer", DatabaseInitializer);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlZC9kYXRhYmFzZXMvZGF0YWJhc2VfaW5pdGlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7WUFHQTs7O2VBR0c7WUFDSCxrQ0FBeUMsNkVBQW1DO2dCQU01RSxtR0FBbUc7Z0JBRS9GLFlBQVksYUFBNEI7b0JBQ3BDLE9BQU8sQ0FBQztvQkFDUixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztnQkFDdkMsQ0FBQztnQkFFTCxtR0FBbUc7Z0JBRXpGLG1CQUFtQixDQUFDLGNBQW1CO29CQUMxQyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDakUsQ0FBQztZQU1KLENBQUM7WUF2QkQscURBdUJDLENBQUEiLCJmaWxlIjoic2hhcmVkL2RhdGFiYXNlcy9kYXRhYmFzZV9pbml0aWFsaXplci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3VwZXJMb2dpbkNsaWVudERhdGFiYXNlSW5pdGlhbGl6ZXJ9IGZyb20gXCIuLi91dGlscy9zdXBlcl9sb2dpbl9jbGllbnQvc3VwZXJfbG9naW5fY2xpZW50X2RhdGFiYXNlX2luaXRpYWxpemVyXCI7XHJcbmltcG9ydCB7Qm9hcmREYXRhYmFzZX0gZnJvbSBcIi4vYm9hcmQvYm9hcmRfZGF0YWJhc2VcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGRlc2NyaWJlcyBob3cgdGhlIFVSTHMgb2YgdGhlIGRhdGFiYXNlcyBvZiB0aGUgYXBwIGFyZSBnZXR0aW5nIHVwZGF0ZWQgaW4gY2FzZVxyXG4gKiB0aGV5IGNoYW5nZS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBEYXRhYmFzZUluaXRpYWxpemVyIGV4dGVuZHMgU3VwZXJMb2dpbkNsaWVudERhdGFiYXNlSW5pdGlhbGl6ZXIge1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9Qcm9wZXJ0aWVzLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICBwcml2YXRlIGJvYXJkRGF0YWJhc2U6IEJvYXJkRGF0YWJhc2U7XHJcbiAgICBcclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9Db25zdHJ1Y3Rvci8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgY29uc3RydWN0b3IoYm9hcmREYXRhYmFzZTogQm9hcmREYXRhYmFzZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5ib2FyZERhdGFiYXNlID0gYm9hcmREYXRhYmFzZTtcclxuICAgIH1cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9Jbmhlcml0ZWQgTWV0aG9kcy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgcHVibGljIGluaXRpYWxpemVEYXRhYmFzZXModXNlcl9kYXRhYmFzZXM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgdGhpcy5ib2FyZERhdGFiYXNlLmluaXRpYWxpemVEYXRhYmFzZSh1c2VyX2RhdGFiYXNlcy5ib2FyZHMpO1xyXG4gICB9XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9NZXRob2RzLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICBcclxuICAgIFxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
