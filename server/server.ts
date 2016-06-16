import * as express from "express";
import * as bodyParser from "body-parser";
let SuperLogin = require("superlogin");


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
        lockoutTime: 600,
        // The amount of time a new session is valid for (default: 24 hours)
        sessionLife: 86400,
        // The amount of time a password reset token is valid for
        tokenLife: 86400,
        // The maximum number of entries in the activity log in each user doc. Zero to disable completely
        userActivityLogSize: 10,
        // If set to true, the user will be logged in automatically after registering
        loginOnRegistration: true,
        // If set to true, the user will be logged in automatically after resetting the password
        loginOnPasswordReset: true
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
            private: ['boards', 'cards', 'lists']
        },
        defaultSecurityRoles: {
            admins: ['admin'],
            members: []
        }
    },
};

// select port
var port: number = process.env.PORT || 3000;
// get Express-App instance
var app = express();

// initialize SuperLogin
var superlogin = new SuperLogin(config);

// enable CORS for the Express Web Server
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Mount SuperLogin's routes to our app
app.use('/auth', superlogin.router);

// define the static routes where just the files should get loaded from
app.use('/app', express.static(__dirname + '/app'));

// all requests get answered by returning the index.html
app.get('/*'/*, superlogin.requireAuth, superlogin.requireRole('user')*/, (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + '/index.html');
});

// start the server
var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('This express app is listening on port:' + port);
});