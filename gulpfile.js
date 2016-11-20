// File Paths
var prodOutputPathApp = "build/app";
var devOutputPathApp = "dist/app";
var prodOutputPathServer = "build";
var devOutputPathServer = "dist";
var cordovaProjectPath = "cordova";
var cordovaWwwPath = "cordova/www";
var cordovaPlatformsPath = "cordova/platforms";
var cordovaOutputPathApp = "cordova/www/app";

var appSrcFolderPath = "client/app";
var appTypeScriptFiles = appSrcFolderPath + "/**/*.ts";
var appTypeScriptCompilerFiles = [appTypeScriptFiles, 'typings_own/**/*.ts', 'typings/**/*.ts'];
var appSassFiles = appSrcFolderPath + "/**/*.scss";
var appHtmlFiles = [
    appSrcFolderPath + "/**/*.+(htm|html)",
    "!" + appSrcFolderPath + "/../index.html",
    "!" + appSrcFolderPath + "/../index-js-dev.html",
    "!" + appSrcFolderPath + "/../index-js-prod.html"
];
var appIndexHtmlFilesDev = [
    appSrcFolderPath + "/../index.html",
    appSrcFolderPath + "/../index-js-dev.html"
];
var appResFiles = "client/app/res/**/*";
var appLibsFiles = "client/libs/**/*";

var serverSrcFolderPath = "server";
var serverTypeScriptFiles = serverSrcFolderPath + "/**/*.ts";
var serverTypeScriptCompilerFiles = [serverTypeScriptFiles, 'typings_own/**/*.ts', 'typings/**/*.ts'];

// Gulp Tools
var gulp = require('gulp');
var server = require( 'gulp-develop-server' );
var systemJsBuilder = new (require('systemjs-builder'))();
var del = require('del');
var rename = require('gulp-rename');
var gulpTsc = require('gulp-typescript');
var typescript = require('typescript');
var sourcemaps = require('gulp-sourcemaps');
var appTsProject = gulpTsc.createProject('tsconfigApp.json', { typescript: typescript });
var serverTsProject = gulpTsc.createProject('tsconfigServer.json', { typescript: typescript });
var browserSync = require('browser-sync').create();
var htmlreplace = require('gulp-html-replace');
var fileLoader = require('fs');
var sass = require('gulp-sass');
var cordovaBuild = require("taco-team-build");
var removeCode = require('gulp-remove-code');

// is used in order to control if tasks should be run parallel or in sequenze
var gulpSequence = require('gulp-sequence');

// ////////////////////////////////////////////////
// TypeScripts Tasks
// ///////////////////////////////////////////////

// the task bundles all the JavaScript files (including own TypeScript files and used libraries)
// that are used in the project into one file. This file will also be minimized.
// The output file is perfect for deploying the application.
//
// COUTION: This function does not work properly anymore!
// (1) no support for removing the Cordova specific code
// (2) does not seem to support ES6 and await/async (review notes in OneNote)
gulp.task('typescript-prod', ['typescript-own-dev'], function(cb) {
    systemJsBuilder.loadConfig('./systemjs.config.js')
        .then(function() {
            // combines ALL JavaScript files into one file - the systemjs.config.js is not needed anymore afterwards!
            return systemJsBuilder.buildStatic(appSrcFolderPath, prodOutputPathApp + "/script.js", { minify: true, sourceMaps: 'inline'});
        })
        .then(function(){
            console.log('library bundles built successfully!');
        });
    cb();
});

// the task bundles all the libraries that are used in the project into one
// JavaScript file
gulp.task('typescript-libs-dev', function(cb) {
    systemJsBuilder.loadConfig('./systemjs.config.js')
        .then(function(){
            return systemJsBuilder.bundle(
                appSrcFolderPath + ' - [' + appSrcFolderPath + '/**/*]', // build app and remove the app code - this leaves only 3rd party dependencies
                devOutputPathServer + '/libs' + '/libs-bundle.js', { minify: true, sourceMaps:true});
        })
        .then(function(){
            console.log('library bundles built successfully!');
        });

    cb();
});

// the task bundles all the libraries that are used in the project into one
// JavaScript file and saves them in the Cordova folder
gulp.task('cordova-typescript-libs-dev', function(cb) {
    systemJsBuilder.loadConfig('./systemjs.config.js')
        .then(function(){
            return systemJsBuilder.bundle(
                appSrcFolderPath + ' - [' + appSrcFolderPath + '/**/*]', // build app and remove the app code - this leaves only 3rd party dependencies
                cordovaWwwPath + '/libs' + '/libs-bundle.js', { minify: true, sourceMaps:true});
        })
        .then(function(){
            console.log('library bundles built successfully!');
        });

    cb();
});


// the task compiles all the own TypeScript files of the project to JavaScript files
gulp.task('typescript-own-dev', function(cb) {
    var tscResult = gulp.src(appTypeScriptCompilerFiles) // instead of "appTsProject.src()" because the other one slows down the transpiler process
        .pipe(removeCode({notWeb: false, notCordova: true}))
        .pipe(sourcemaps.init()) // This means sourcemaps will be generated
        .pipe(appTsProject());

    return tscResult.js
        .pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file
        .pipe(gulp.dest(devOutputPathApp, cb));
});


// the task compiles all the own TypeScript files of the project to JavaScript files and saves them in the Cordova folder
gulp.task('cordova-typescript-own-dev', function(cb) {
    var tscResult = gulp.src(appTypeScriptCompilerFiles) // instead of "appTsProject.src()" because the other one slows down the transpiler process
        .pipe(removeCode({notWeb: true, notCordova: false}))
        .pipe(sourcemaps.init()) // This means sourcemaps will be generated
        .pipe(appTsProject());

    return tscResult.js
        .pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file
        .pipe(gulp.dest(cordovaOutputPathApp, cb));
});

// ////////////////////////////////////////////////
// SASS Tasks
// ////////////////////////////////////////////////

// the task compiles all the own SASS files to CSS files and saves them in the dist folder
gulp.task('sass-dev', function() {
    return gulp.src(appSassFiles)
        .pipe(removeCode({notWeb: false, notCordova: true}))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(devOutputPathApp, {overwrite: true}));
});

// the task compiles all the own SASS files to CSS files and saves them in the Cordova folder
gulp.task('cordova-sass-dev', function() {
    return gulp.src(appSassFiles)
        .pipe(removeCode({notWeb: true, notCordova: false}))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cordovaOutputPathApp, {overwrite: true}));
});

// the task compiles all the own SASS files to CSS files and saves them in the build folder
gulp.task('sass-prod', function() {
    return gulp.src(appSassFiles)
        .pipe(removeCode({notWeb: false, notCordova: true}))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(prodOutputPathApp, {overwrite: true}));
});


// ////////////////////////////////////////////////
// HTML Tasks
// ////////////////////////////////////////////////

// copies all HTML files into the build folder
gulp.task('view-prod', function() {
    return gulp.src(appHtmlFiles)
        .pipe(removeCode({notWeb: false, notCordova: true}))
        .pipe(gulp.dest(prodOutputPathApp, {overwrite: true}));
});

// copies all HTML files into the development folder
gulp.task('view-dev', function() {
    return gulp.src(appHtmlFiles)
        .pipe(removeCode({notWeb: false, notCordova: true}))
        .pipe(gulp.dest(devOutputPathApp, {overwrite: true}));
});

// copies all HTML files into the Cordova folder
gulp.task('cordova-view-dev', function() {
    return gulp.src(appHtmlFiles)
        .pipe(removeCode({notWeb: true, notCordova: false}))
        .pipe(gulp.dest(cordovaOutputPathApp, {overwrite: true}));
});

// copies the index.html file in the dist folder after including the JavaScript
gulp.task('index-dev', function() {
    // load the index-js-dev.html file
    fileLoader.readFile(appSrcFolderPath + '/../index-js-dev.html', "utf-8", function(err, data) {
        // place the content of the index-js-dev.html inside the index.html template
        return gulp.src(appSrcFolderPath + '/../index.html')
            .pipe(htmlreplace({
                'js': data
            }))
            .pipe(removeCode({notWeb: false, notCordova: true}))
            .pipe(gulp.dest(devOutputPathApp + "/.."));
    });
});

// copies the index.html file in the Cordova folder after including the JavaScript
gulp.task('cordova-index-dev', function() {
    // load the index-js-dev.html file
    fileLoader.readFile(appSrcFolderPath + '/../index-js-dev.html', "utf-8", function(err, data) {
        // place the content of the index-js-dev.html inside the index.html template
        return gulp.src(appSrcFolderPath + '/../index.html')
            .pipe(htmlreplace({
                'js': data
            }))
            .pipe(removeCode({notWeb: true, notCordova: false}))
            .pipe(gulp.dest(cordovaOutputPathApp + "/.."));
    });
});

// copies the index.html file in the build folder after including the JavaScript
gulp.task('index-prod', function() {
    // load the index-js-prod.html file
    fileLoader.readFile(appSrcFolderPath + '/../index-js-prod.html', "utf-8", function(err, data) {
        // place the content of the index-js-prod.html inside the index.html template
        return gulp.src(appSrcFolderPath + '/../index.html')
            .pipe(htmlreplace({
                'js': data
            }))
            .pipe(removeCode({notWeb: false, notCordova: true}))
            .pipe(gulp.dest(prodOutputPathApp + "/.."));
    });
});

// ////////////////////////////////////////////////
// App Resources Tasks
// // /////////////////////////////////////////////

// copies all resources into the build folder
gulp.task('res-prod', function() {
    return gulp.src(appResFiles)
        .pipe(gulp.dest(prodOutputPathApp + '/res', {overwrite: true}));
});

// copies all resources into the development folder
gulp.task('res-dev', function() {
    return gulp.src(appResFiles)
        .pipe(gulp.dest(devOutputPathApp + '/res', {overwrite: true}));
});

// copies all resources into the Cordova development folder
gulp.task('cordova-res-dev', function() {
    return gulp.src(appResFiles)
        .pipe(gulp.dest(cordovaOutputPathApp + '/res', {overwrite: true}));
});

// ////////////////////////////////////////////////
// Downloaded libraries Tasks
// (libraries and polyfills add in the index.html)
// // /////////////////////////////////////////////

// copies all libraries into the build folder
gulp.task('libs-prod', function() {
    return gulp.src(appLibsFiles)
        .pipe(gulp.dest(prodOutputPathServer + '/libs', {overwrite: true}));
});

// copies all libraries into the development folder
gulp.task('libs-dev', function() {
    return gulp.src(appLibsFiles)
        .pipe(gulp.dest(devOutputPathServer + '/libs', {overwrite: true}));
});

// copies all libraries into the Cordova development folder
gulp.task('cordova-libs-dev', function() {
    return gulp.src(appLibsFiles)
        .pipe(gulp.dest(cordovaWwwPath + '/libs', {overwrite: true}));
});

// ////////////////////////////////////////////////
// Server TypeScript Files Tasks
// // /////////////////////////////////////////////

// the task compiles all the own TypeScript files of the project to JavaScript files
gulp.task('server-typescript-own-dev', function(cb) {
    var tscResult = gulp.src(serverTypeScriptCompilerFiles) // instead of "serverTsProject.src()" because the other one slows down the transpile process
        .pipe(sourcemaps.init()) // This means sourcemaps will be generated
        .pipe(serverTsProject());

    return tscResult.js
        .pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file
        .pipe(gulp.dest(devOutputPathServer, cb));
});

// the task compiles all the own TypeScript files of the project to JavaScript files
gulp.task('server-typescript-own-prod', function(cb) {
    var tscResult = gulp.src(serverTypeScriptCompilerFiles) // instead of "appTsProject.src()" because the other one slows down the transpile process
        .pipe(sourcemaps.init()) // This means sourcemaps will be generated
        .pipe(serverTsProject());

    return tscResult.js
        .pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file
        .pipe(gulp.dest(prodOutputPathServer, cb));
});

// ////////////////////////////////////////////////
// Cordova Build Tasks
// // /////////////////////////////////////////////

// configure cordova builder
gulp.task("cordova-configure", function (cb) {
    cordovaBuild.configure({
        projectPath: cordovaWwwPath
    });

    cordovaBuild.setupCordova().done(function (cordova) {
        cordova.plugin("add", "cordova-plugin-network-information", function () {
            cb();
        });
    });
});

// this task builds the android application
gulp.task("cordova-build-android", ['cordova-configure'], function () {
    return cordovaBuild.buildProject("android", ["--device", "--gradleArg=--no-daemon"]);
});

// ////////////////////////////////////////////////
// Web Deployment Tasks
// // /////////////////////////////////////////////

// starts the node.js server to test the build
gulp.task('serve-prod', function () {
    server.listen( { path: prodOutputPathServer + '/server.js' });
});

// ////////////////////////////////////////////////
// Web Development Tasks
// ////////////////////////////////////////////////

// starts the node.js server for development
gulp.task('start-dev-server', function () {
    server.listen( { path: devOutputPathServer + '/server.js' });
});

// this tasks starts a simple HTTP web server with browser sync functionality
// this means that when ever the content inside web browser changes, all browsers are getting refreshed automatically
gulp.task('serve-dev', ['start-dev-server'], function(cb) {
    browserSync.init({
        proxy: "localhost:3000",  // local node app address
        port: 5000,  // use *different* port than above
        notify: true,
        // if true all sessions in different browsers and devices are getting synced = if you type in something in one window it will appear in every video
        // this feature is good for testing multiple browsers at the same time
        ghostMode: false
    });

    gulp.watch(appTypeScriptFiles, ["browserSync-typescript-own-dev"], cb);
    gulp.watch(appSassFiles, ["browserSync-sass-own-dev"], cb);
    gulp.watch(appHtmlFiles, ["browserSync-view-dev"], cb);
    gulp.watch(appIndexHtmlFilesDev, ["browserSync-index-dev"], cb);
    gulp.watch(serverTypeScriptFiles, ["browserSync-server-typescript-dev"], cb);
    gulp.watch(appResFiles, ["browserSync-res-dev"], cb);
});

// the task reloads all browsers using browserSync after compiling and deploying all the TypeScript files
gulp.task('browserSync-typescript-own-dev', ["typescript-own-dev"], function(cb) {
    browserSync.reload();
    cb();
});

// the task reloads all browsers using browserSync after compiling and deploying all the Sass files
gulp.task('browserSync-sass-own-dev', ["sass-dev"], function(cb) {
    browserSync.reload();
    cb();
});

// the task reloads all browsers using browserSync after copying all view elements to the server
gulp.task('browserSync-view-dev', ["view-dev"], function(cb) {
    browserSync.reload();
    cb();
});

// the task reloads all browsers using browserSync after generating and copying the index.html file elements to the server
gulp.task('browserSync-index-dev', ["index-dev"], function(cb) {
    browserSync.reload();
    cb();
});

// the task reloads all browsers using browserSync after compiling all TypeScript server files to JavaScript files and copying the files to the server
// and finally also restarting the server
gulp.task('browserSync-server-typescript-dev', ["server-typescript-own-dev"], function(cb) {
    // restart the server
    server.restart(function() {
        // reload all browser windows
        browserSync.reload();
    });
    cb();
});

// the task reloads all browsers using browserSync after copying all resources to the server
gulp.task('browserSync-res-dev', ["res-dev"], function(cb) {
    browserSync.reload();
    cb();
});

gulp.task('clear-console', function(cb) {
    process.stdout.write("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
    cb();
});

// the tasks compiles all the own typescript files automatically, when ever they change
gulp.task('dev-typescript', ['clear-web-dev'], function(cb) {
    gulp.watch(appTypeScriptFiles, ["clear-console", "typescript-own-dev"], cb);
    gulp.watch(serverTypeScriptFiles, ["clear-console", "server-typescript-own-dev"], cb);
});

// ////////////////////////////////////////////////
// Build Tasks
// // /////////////////////////////////////////////

// clean out all files and folders from build folder
gulp.task('clear-web-prod', function (cb) {
    del([prodOutputPathApp + '/**']);
    del([prodOutputPathServer + '/**'], cb);
});

// clean out all files and folders from build folder
gulp.task('clear-web-dev', function (cb) {
    del([devOutputPathApp + '/**']);
    del([devOutputPathServer + '/**'], cb);
});

// clean out all files and folders from build folder
gulp.task('clear-cordova', function (cb) {
    del([cordovaWwwPath + '/**']);
    del([cordovaPlatformsPath + '/**'], cb);
});

// build process for production
gulp.task('deploy', gulpSequence('clear-web-prod', 'typescript-prod', ['server-typescript-own-prod', 'view-prod', 'index-prod', 'sass-prod', 'res-prod', 'libs-prod'], 'serve-prod'));

// build process for production
gulp.task('develop-web', gulpSequence('clear-web-dev', 'typescript-own-dev', ['server-typescript-own-dev', 'typescript-libs-dev', 'view-dev', 'index-dev', 'sass-dev', 'res-dev', 'libs-dev'], 'serve-dev'));

// build process for production
gulp.task('develop-cordova-android', gulpSequence('clear-cordova', 'cordova-typescript-own-dev', ['cordova-typescript-libs-dev', 'cordova-view-dev', 'cordova-index-dev', 'cordova-sass-dev', 'cordova-res-dev', 'cordova-libs-dev'], 'cordova-build-android'));

// ////////////////////////////////////////////////
// Default Tasks
// // /////////////////////////////////////////////

gulp.task('default', ['develop-web']);