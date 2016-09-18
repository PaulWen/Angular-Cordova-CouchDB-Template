"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var SuperLogin = require("superlogin");
// SuperLogin Configuration
// (https://github.com/colinskow/superlogin/blob/master/config.example.js)
var config = {
    security: {
        // Default roles given to a new user
        defaultRoles: ['user'],
        // Disables the ability to link additional providers to an account when set to true
        disableLinkAccounts: true,
        // Maximum number of failed logins before the account is locked
        maxFailedLogins: 3,
        // The amount of time the account will be locked for (in seconds) after the maximum failed logins is exceeded
        lockoutTime: 10 * 60,
        // The amount of time (in seconds) a new session is valid for
        sessionLife: 14 * 24 * 60 * 60,
        // The amount of time (in seconds) a password reset token is valid for
        tokenLife: 24 * 60 * 60,
        // The maximum number of entries in the activity log in each user doc. Zero to disable completely
        userActivityLogSize: 10,
        // If set to true, the user will be logged in automatically after registering
        loginOnRegistration: false,
        // If set to true, the user will be logged in automatically after resetting the password
        loginOnPasswordReset: false
    },
    local: {
        // Set this to true to disable usernames and use emails instead
        emailUsername: true,
    },
    dbServer: {
        // The CouchDB compatible server where all your databases are stored on
        protocol: 'http://',
        host: 'localhost:5984',
        user: '',
        password: '',
        // Set this to true if you are using Cloudant
        cloudant: false,
        // The name for the database that stores all your user information. This is distinct from CouchDB's _user database.
        // Alternatively you can pass in a PouchDB object to the SuperLogin constructor and leave this blank
        userDB: 'user_register',
        // CouchDB's _users database. Each session generates the user a unique login and password. This is not used with Cloudant.
        couchAuthDB: '_users'
    },
    userDBs: {
        defaultDBs: {
            private: ['settings', 'boards', 'cards', 'lists']
        },
        defaultSecurityRoles: {
            admins: ['admin'],
            members: []
        }
    },
    userModel: {
        // For example, this will require each new user to specify a valid age on the sign-up form or registration will fail
        whitelist: ['firstName'],
        validate: {
            firstName: {
                presence: true
            }
        }
    }
};
// select port
var port = process.env.PORT || 3000;
// get Express-App instance
var app = express();
// initialize SuperLogin
var superlogin = new SuperLogin(config);
// enable CORS for the Express Web Server
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
// output request details
// app.use(function(req, res, next) {
//     console.log("REQUEST URL: " + req.url );
//     next(); // Passing the request to the next handler in the stack.
// });
// use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Custom SuperLogin routes to enhance the functionality of SuperLogin
{
    // get user databases of authenticated user
    app.get('/auth/user-db', superlogin.requireAuth, function (req, res) {
        // get the user data of the current user
        superlogin.getUser(req.user._id)
            .then(function (data) {
            // represent the user databases nicely in a JSON object
            var userDBs = {};
            for (var i = 0; i < Object.keys(data.personalDBs).length; i++) {
                // Representation--> <database-name>=<URL to access database, already including the session token>
                userDBs[(data.personalDBs)[(Object.keys(data.personalDBs))[i]].name] = superlogin.config.getItem("dbServer").protocol + req.headers.authorization.replace("Bearer ", "") + "@" + superlogin.config.getItem("dbServer").host + "/" + (Object.keys(data.personalDBs))[i];
            }
            // send the formatted user database JSON object
            res.send(userDBs);
        })
            .catch(function (error) {
            res.sendStatus(error.status);
        });
    });
    // get the first name of the user
    app.get('/auth/first-name', superlogin.requireAuth, function (req, res) {
        // get the current user data of the current user
        superlogin.getUser(req.user._id)
            .then(function (data) {
            res.send(data.firstName);
        })
            .catch(function (error) {
            res.sendStatus(error.status);
        });
    });
    // set the first name of the user
    // (the new first name is expected to get received via the post variable "firstName")
    app.post('/auth/first-name', superlogin.requireAuth, function (req, res) {
        // get the user data of the current user
        superlogin.userDB.get(req.user._id)
            .then(function (data) {
            // update the user data with the new first name
            data.firstName = req.body.firstName;
            // upload the updated user data
            superlogin.userDB.put(data)
                .then(function (response) {
                if (response.ok == true) {
                    res.sendStatus(200);
                }
            })
                .catch(function (error) {
                res.sendStatus(500);
            });
        })
            .catch(function (error) {
            res.sendStatus(error.status);
        });
    });
}
// Mount SuperLogin's routes to the app
app.use('/auth', superlogin.router);
// define the static routes where just the files should get loaded from
app.use('/app', express.static(__dirname + '/app'));
// all requests that could not be handled until this point get answered by returning the index.html
app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
// start the server
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('This express app is listening on port:' + port);
});

//# sourceMappingURL=data:application/json;base64,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aWxlIjoic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0ICogYXMgYm9keVBhcnNlciBmcm9tIFwiYm9keS1wYXJzZXJcIjtcbmxldCBTdXBlckxvZ2luID0gcmVxdWlyZShcInN1cGVybG9naW5cIik7XG5cblxuLy8gU3VwZXJMb2dpbiBDb25maWd1cmF0aW9uXG4vLyAoaHR0cHM6Ly9naXRodWIuY29tL2NvbGluc2tvdy9zdXBlcmxvZ2luL2Jsb2IvbWFzdGVyL2NvbmZpZy5leGFtcGxlLmpzKVxubGV0IGNvbmZpZyA9IHtcbiAgICBzZWN1cml0eToge1xuICAgICAgICAvLyBEZWZhdWx0IHJvbGVzIGdpdmVuIHRvIGEgbmV3IHVzZXJcbiAgICAgICAgZGVmYXVsdFJvbGVzOiBbJ3VzZXInXSxcbiAgICAgICAgLy8gRGlzYWJsZXMgdGhlIGFiaWxpdHkgdG8gbGluayBhZGRpdGlvbmFsIHByb3ZpZGVycyB0byBhbiBhY2NvdW50IHdoZW4gc2V0IHRvIHRydWVcbiAgICAgICAgZGlzYWJsZUxpbmtBY2NvdW50czogdHJ1ZSxcbiAgICAgICAgLy8gTWF4aW11bSBudW1iZXIgb2YgZmFpbGVkIGxvZ2lucyBiZWZvcmUgdGhlIGFjY291bnQgaXMgbG9ja2VkXG4gICAgICAgIG1heEZhaWxlZExvZ2luczogMyxcbiAgICAgICAgLy8gVGhlIGFtb3VudCBvZiB0aW1lIHRoZSBhY2NvdW50IHdpbGwgYmUgbG9ja2VkIGZvciAoaW4gc2Vjb25kcykgYWZ0ZXIgdGhlIG1heGltdW0gZmFpbGVkIGxvZ2lucyBpcyBleGNlZWRlZFxuICAgICAgICBsb2Nrb3V0VGltZTogMTAqNjAsXG4gICAgICAgIC8vIFRoZSBhbW91bnQgb2YgdGltZSAoaW4gc2Vjb25kcykgYSBuZXcgc2Vzc2lvbiBpcyB2YWxpZCBmb3JcbiAgICAgICAgc2Vzc2lvbkxpZmU6IDE0KjI0KjYwKjYwLFxuICAgICAgICAvLyBUaGUgYW1vdW50IG9mIHRpbWUgKGluIHNlY29uZHMpIGEgcGFzc3dvcmQgcmVzZXQgdG9rZW4gaXMgdmFsaWQgZm9yXG4gICAgICAgIHRva2VuTGlmZTogMjQqNjAqNjAsXG4gICAgICAgIC8vIFRoZSBtYXhpbXVtIG51bWJlciBvZiBlbnRyaWVzIGluIHRoZSBhY3Rpdml0eSBsb2cgaW4gZWFjaCB1c2VyIGRvYy4gWmVybyB0byBkaXNhYmxlIGNvbXBsZXRlbHlcbiAgICAgICAgdXNlckFjdGl2aXR5TG9nU2l6ZTogMTAsXG4gICAgICAgIC8vIElmIHNldCB0byB0cnVlLCB0aGUgdXNlciB3aWxsIGJlIGxvZ2dlZCBpbiBhdXRvbWF0aWNhbGx5IGFmdGVyIHJlZ2lzdGVyaW5nXG4gICAgICAgIGxvZ2luT25SZWdpc3RyYXRpb246IGZhbHNlLFxuICAgICAgICAvLyBJZiBzZXQgdG8gdHJ1ZSwgdGhlIHVzZXIgd2lsbCBiZSBsb2dnZWQgaW4gYXV0b21hdGljYWxseSBhZnRlciByZXNldHRpbmcgdGhlIHBhc3N3b3JkXG4gICAgICAgIGxvZ2luT25QYXNzd29yZFJlc2V0OiBmYWxzZVxuICAgIH0sXG4gICAgbG9jYWw6IHtcbiAgICAgICAgLy8gU2V0IHRoaXMgdG8gdHJ1ZSB0byBkaXNhYmxlIHVzZXJuYW1lcyBhbmQgdXNlIGVtYWlscyBpbnN0ZWFkXG4gICAgICAgIGVtYWlsVXNlcm5hbWU6IHRydWUsXG4gICAgfSxcbiAgICBkYlNlcnZlcjoge1xuICAgICAgICAvLyBUaGUgQ291Y2hEQiBjb21wYXRpYmxlIHNlcnZlciB3aGVyZSBhbGwgeW91ciBkYXRhYmFzZXMgYXJlIHN0b3JlZCBvblxuICAgICAgICBwcm90b2NvbDogJ2h0dHA6Ly8nLFxuICAgICAgICBob3N0OiAnbG9jYWxob3N0OjU5ODQnLFxuICAgICAgICB1c2VyOiAnJyxcbiAgICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgICAgICAvLyBTZXQgdGhpcyB0byB0cnVlIGlmIHlvdSBhcmUgdXNpbmcgQ2xvdWRhbnRcbiAgICAgICAgY2xvdWRhbnQ6IGZhbHNlLFxuICAgICAgICAvLyBUaGUgbmFtZSBmb3IgdGhlIGRhdGFiYXNlIHRoYXQgc3RvcmVzIGFsbCB5b3VyIHVzZXIgaW5mb3JtYXRpb24uIFRoaXMgaXMgZGlzdGluY3QgZnJvbSBDb3VjaERCJ3MgX3VzZXIgZGF0YWJhc2UuXG4gICAgICAgIC8vIEFsdGVybmF0aXZlbHkgeW91IGNhbiBwYXNzIGluIGEgUG91Y2hEQiBvYmplY3QgdG8gdGhlIFN1cGVyTG9naW4gY29uc3RydWN0b3IgYW5kIGxlYXZlIHRoaXMgYmxhbmtcbiAgICAgICAgdXNlckRCOiAndXNlcl9yZWdpc3RlcicsXG4gICAgICAgIC8vIENvdWNoREIncyBfdXNlcnMgZGF0YWJhc2UuIEVhY2ggc2Vzc2lvbiBnZW5lcmF0ZXMgdGhlIHVzZXIgYSB1bmlxdWUgbG9naW4gYW5kIHBhc3N3b3JkLiBUaGlzIGlzIG5vdCB1c2VkIHdpdGggQ2xvdWRhbnQuXG4gICAgICAgIGNvdWNoQXV0aERCOiAnX3VzZXJzJ1xuICAgIH0sXG4gICAgdXNlckRCczoge1xuICAgICAgICBkZWZhdWx0REJzOiB7XG4gICAgICAgICAgICBwcml2YXRlOiBbJ3NldHRpbmdzJywgJ2JvYXJkcycsICdjYXJkcycsICdsaXN0cyddXG4gICAgICAgIH0sXG4gICAgICAgIGRlZmF1bHRTZWN1cml0eVJvbGVzOiB7XG4gICAgICAgICAgICBhZG1pbnM6IFsnYWRtaW4nXSxcbiAgICAgICAgICAgIG1lbWJlcnM6IFtdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHVzZXJNb2RlbDoge1xuICAgICAgICAvLyBGb3IgZXhhbXBsZSwgdGhpcyB3aWxsIHJlcXVpcmUgZWFjaCBuZXcgdXNlciB0byBzcGVjaWZ5IGEgdmFsaWQgYWdlIG9uIHRoZSBzaWduLXVwIGZvcm0gb3IgcmVnaXN0cmF0aW9uIHdpbGwgZmFpbFxuICAgICAgICB3aGl0ZWxpc3Q6IFsnZmlyc3ROYW1lJ10sXG4gICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICBmaXJzdE5hbWU6IHtcbiAgICAgICAgICAgICAgICBwcmVzZW5jZTogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxuLy8gc2VsZWN0IHBvcnRcbmxldCBwb3J0OiBudW1iZXIgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDA7XG4vLyBnZXQgRXhwcmVzcy1BcHAgaW5zdGFuY2VcbmxldCBhcHAgPSBleHByZXNzKCk7XG5cbi8vIGluaXRpYWxpemUgU3VwZXJMb2dpblxubGV0IHN1cGVybG9naW4gPSBuZXcgU3VwZXJMb2dpbihjb25maWcpO1xuXG4vLyBlbmFibGUgQ09SUyBmb3IgdGhlIEV4cHJlc3MgV2ViIFNlcnZlclxuYXBwLnVzZShmdW5jdGlvbihyZXEsIHJlcywgbmV4dCkge1xuICAgIHJlcy5oZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiwgXCIqXCIpO1xuICAgIHJlcy5oZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCIsIFwiT3JpZ2luLCBYLVJlcXVlc3RlZC1XaXRoLCBDb250ZW50LVR5cGUsIEFjY2VwdCwgQXV0aG9yaXphdGlvblwiKTtcbiAgICBuZXh0KClcbn0pO1xuXG4vLyBvdXRwdXQgcmVxdWVzdCBkZXRhaWxzXG4vLyBhcHAudXNlKGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KSB7XG4vLyAgICAgY29uc29sZS5sb2coXCJSRVFVRVNUIFVSTDogXCIgKyByZXEudXJsICk7XG4vLyAgICAgbmV4dCgpOyAvLyBQYXNzaW5nIHRoZSByZXF1ZXN0IHRvIHRoZSBuZXh0IGhhbmRsZXIgaW4gdGhlIHN0YWNrLlxuLy8gfSk7XG5cbi8vIHVzZSBib2R5IHBhcnNlclxuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KSk7XG5cblxuLy9DdXN0b20gU3VwZXJMb2dpbiByb3V0ZXMgdG8gZW5oYW5jZSB0aGUgZnVuY3Rpb25hbGl0eSBvZiBTdXBlckxvZ2luXG57XG4gICAgLy8gZ2V0IHVzZXIgZGF0YWJhc2VzIG9mIGF1dGhlbnRpY2F0ZWQgdXNlclxuICAgIGFwcC5nZXQoJy9hdXRoL3VzZXItZGInLCBzdXBlcmxvZ2luLnJlcXVpcmVBdXRoLCAocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSkgPT4ge1xuICAgICAgICAvLyBnZXQgdGhlIHVzZXIgZGF0YSBvZiB0aGUgY3VycmVudCB1c2VyXG4gICAgICAgIHN1cGVybG9naW4uZ2V0VXNlcihyZXEudXNlci5faWQpXG4gICAgICAgICAgICAvLyBpZiByZXF1ZXN0IHdhcyBzdWNjZXNzZnVsIHJldHVybiB0aGUgbmFtZXMgb2YgdGhlIGRhdGFiYXNlc1xuICAgICAgICAgICAgLnRoZW4oKGRhdGEpPT57XG4gICAgICAgICAgICAgICAgLy8gcmVwcmVzZW50IHRoZSB1c2VyIGRhdGFiYXNlcyBuaWNlbHkgaW4gYSBKU09OIG9iamVjdFxuICAgICAgICAgICAgICAgIGxldCB1c2VyREJzID0ge307XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBPYmplY3Qua2V5cyhkYXRhLnBlcnNvbmFsREJzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZXByZXNlbnRhdGlvbi0tPiA8ZGF0YWJhc2UtbmFtZT49PFVSTCB0byBhY2Nlc3MgZGF0YWJhc2UsIGFscmVhZHkgaW5jbHVkaW5nIHRoZSBzZXNzaW9uIHRva2VuPlxuICAgICAgICAgICAgICAgICAgICB1c2VyREJzWyhkYXRhLnBlcnNvbmFsREJzKVsoT2JqZWN0LmtleXMoZGF0YS5wZXJzb25hbERCcykpW2ldXS5uYW1lXSA9IHN1cGVybG9naW4uY29uZmlnLmdldEl0ZW0oXCJkYlNlcnZlclwiKS5wcm90b2NvbCArICg8YW55PnJlcS5oZWFkZXJzKS5hdXRob3JpemF0aW9uLnJlcGxhY2UoXCJCZWFyZXIgXCIsIFwiXCIpICsgXCJAXCIgKyBzdXBlcmxvZ2luLmNvbmZpZy5nZXRJdGVtKFwiZGJTZXJ2ZXJcIikuaG9zdCArIFwiL1wiICsgKE9iamVjdC5rZXlzKGRhdGEucGVyc29uYWxEQnMpKVtpXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBzZW5kIHRoZSBmb3JtYXR0ZWQgdXNlciBkYXRhYmFzZSBKU09OIG9iamVjdFxuICAgICAgICAgICAgICAgIHJlcy5zZW5kKHVzZXJEQnMpO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgLy9pZiB0aGVyZSB3YXMgYW4gZXJyb3IsIHJldHVybiB0aGUgZXJyb3IgY29kZVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICByZXMuc2VuZFN0YXR1cyhlcnJvci5zdGF0dXMpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGdldCB0aGUgZmlyc3QgbmFtZSBvZiB0aGUgdXNlclxuICAgIGFwcC5nZXQoJy9hdXRoL2ZpcnN0LW5hbWUnLCBzdXBlcmxvZ2luLnJlcXVpcmVBdXRoLCAocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSkgPT4ge1xuICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnQgdXNlciBkYXRhIG9mIHRoZSBjdXJyZW50IHVzZXJcbiAgICAgICAgc3VwZXJsb2dpbi5nZXRVc2VyKHJlcS51c2VyLl9pZClcbiAgICAgICAgICAgIC8vIGlmIHJlcXVlc3Qgd2FzIHN1Y2Nlc3NmdWwgcmV0dXJuIHRoZSBmaXJzdCBuYW1lIG9mIHRoZSB1c2VyXG4gICAgICAgICAgICAudGhlbigoZGF0YSk9PntcbiAgICAgICAgICAgICAgICByZXMuc2VuZChkYXRhLmZpcnN0TmFtZSk7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAvL2lmIHRoZXJlIHdhcyBhbiBlcnJvciwgcmV0dXJuIHRoZSBlcnJvciBjb2RlXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXMuc2VuZFN0YXR1cyhlcnJvci5zdGF0dXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBzZXQgdGhlIGZpcnN0IG5hbWUgb2YgdGhlIHVzZXJcbiAgICAvLyAodGhlIG5ldyBmaXJzdCBuYW1lIGlzIGV4cGVjdGVkIHRvIGdldCByZWNlaXZlZCB2aWEgdGhlIHBvc3QgdmFyaWFibGUgXCJmaXJzdE5hbWVcIilcbiAgICBhcHAucG9zdCgnL2F1dGgvZmlyc3QtbmFtZScsIHN1cGVybG9naW4ucmVxdWlyZUF1dGgsIChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKSA9PiB7XG4gICAgICAgIC8vIGdldCB0aGUgdXNlciBkYXRhIG9mIHRoZSBjdXJyZW50IHVzZXJcbiAgICAgICAgc3VwZXJsb2dpbi51c2VyREIuZ2V0KHJlcS51c2VyLl9pZClcbiAgICAgICAgICAgIC8vIGlmIHJlcXVlc3Qgd2FzIHN1Y2Nlc3NmdWwgdHJ5IHRvIHVwZGF0ZSB0aGUgZmlyc3QgbmFtZVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpPT57XG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSB1c2VyIGRhdGEgd2l0aCB0aGUgbmV3IGZpcnN0IG5hbWVcbiAgICAgICAgICAgICAgICBkYXRhLmZpcnN0TmFtZSA9IHJlcS5ib2R5LmZpcnN0TmFtZTtcblxuICAgICAgICAgICAgICAgIC8vIHVwbG9hZCB0aGUgdXBkYXRlZCB1c2VyIGRhdGFcbiAgICAgICAgICAgICAgICBzdXBlcmxvZ2luLnVzZXJEQi5wdXQoZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2l2ZSBmZWVkYmFjayB0byB0aGUgdXNlciB3aGV0aGVyIG9yIG5vdCBzZXR0aW5nIGEgbmV3IGZpcnN0IG5hbWUgd2FzIHN1Y2Nlc3NmdWxcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uub2sgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zZW5kU3RhdHVzKDIwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNlbmRTdGF0dXMoNTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAvL2lmIHRoZXJlIHdhcyBhbiBlcnJvciwgcmV0dXJuIHRoZSBlcnJvciBjb2RlXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXMuc2VuZFN0YXR1cyhlcnJvci5zdGF0dXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH0pO1xufVxuXG4vLyBNb3VudCBTdXBlckxvZ2luJ3Mgcm91dGVzIHRvIHRoZSBhcHBcbmFwcC51c2UoJy9hdXRoJywgc3VwZXJsb2dpbi5yb3V0ZXIpO1xuXG4vLyBkZWZpbmUgdGhlIHN0YXRpYyByb3V0ZXMgd2hlcmUganVzdCB0aGUgZmlsZXMgc2hvdWxkIGdldCBsb2FkZWQgZnJvbVxuYXBwLnVzZSgnL2FwcCcsIGV4cHJlc3Muc3RhdGljKF9fZGlybmFtZSArICcvYXBwJykpO1xuXG4vLyBhbGwgcmVxdWVzdHMgdGhhdCBjb3VsZCBub3QgYmUgaGFuZGxlZCB1bnRpbCB0aGlzIHBvaW50IGdldCBhbnN3ZXJlZCBieSByZXR1cm5pbmcgdGhlIGluZGV4Lmh0bWxcbmFwcC5nZXQoJy8qJywgKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpID0+IHtcbiAgICByZXMuc2VuZEZpbGUoX19kaXJuYW1lICsgJy9pbmRleC5odG1sJyk7XG59KTtcblxuLy8gc3RhcnQgdGhlIHNlcnZlclxubGV0IHNlcnZlciA9IGFwcC5saXN0ZW4ocG9ydCwgZnVuY3Rpb24oKSB7XG4gICAgbGV0IGhvc3QgPSBzZXJ2ZXIuYWRkcmVzcygpLmFkZHJlc3M7XG4gICAgbGV0IHBvcnQgPSBzZXJ2ZXIuYWRkcmVzcygpLnBvcnQ7XG4gICAgY29uc29sZS5sb2coJ1RoaXMgZXhwcmVzcyBhcHAgaXMgbGlzdGVuaW5nIG9uIHBvcnQ6JyArIHBvcnQpO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
