// File Paths
var prodOutputPathApp = "build/app";
var devOutputPathApp = "dist/app";
var prodOutputPathServer = "build";
var devOutputPathServer = "dist";

var appSrcFolderPath = "client/app";
var appTypeScriptFiles = appSrcFolderPath + "/**/*.ts";
var appTypeScriptCompilerFiles = [appTypeScriptFiles, 'typings_own/**/*.ts', 'typings/browser/**/*.ts', 'typings/browser.d.ts'];
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

var serverSrcFolderPath = "server";
var serverTypeScriptFiles = serverSrcFolderPath + "/**/*.ts";
var serverTypeScriptCompilerFiles = [serverTypeScriptFiles, 'typings_own/**/*.ts', 'typings/browser/**/*.ts', 'typings/browser.d.ts'];


// Gulp Tools
var gulp = require('gulp');
var server = require( 'gulp-develop-server' );
var systemJsBuilder = new (require('systemjs-builder'))();
var del = require('del');
var rename = require('gulp-rename');
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var appTsProject = tsc.createProject('tsconfigApp.json');
var serverTsProject = tsc.createProject('tsconfigServer.json');
var browserSync = require('browser-sync').create();
var htmlreplace = require('gulp-html-replace');
var fileLoader = require('fs');
var sass = require('gulp-sass');

// is used in order to control if tasks should be run parallel or in sequenze
var gulpSequence = require('gulp-sequence');

// ////////////////////////////////////////////////
// TypeScripts Tasks
// ///////////////////////////////////////////////

// the task bundels all the JavaScript files that are used in the project into one file
// this will is also mimimized
// this will is perfect for deploying the application
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

// the task bundels all the libraries that are used in the project into one
// JavaScript file
gulp.task('typescript-libs-dev', function(cb) {
    systemJsBuilder.loadConfig('./systemjs.config.js')
        .then(function(){
            return systemJsBuilder.bundle(
                appSrcFolderPath + ' - [' + appSrcFolderPath + '/**/*]', // build app and remove the app code - this leaves only 3rd party dependencies
                devOutputPathApp + '/libs-bundle.js', { minify: true, sourceMaps:true});
        })
        .then(function(){
            console.log('library bundles built successfully!');
        });

    cb();
});

// the task compiles all the own TypeScript files of the project to JavaScript files
gulp.task('typescript-own-dev', function(cb) {
    var tscResult = gulp.src(appTypeScriptCompilerFiles) // instead of "appTsProject.src()" because the other one slows down the transpile process
        .pipe(sourcemaps.init()) // This means sourcemaps will be generated
        .pipe(tsc(appTsProject));

    return tscResult.js
        .pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file
        .pipe(gulp.dest(devOutputPathApp, cb));
});

// ////////////////////////////////////////////////
// SASS Tasks
// ////////////////////////////////////////////////

// the task compiles all the own SASS files to CSS files and saves them in the dist folder
gulp.task('sass-dev', function() {
    return gulp.src(appSassFiles)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(devOutputPathApp, {overwrite: true}));
});

// the task compiles all the own SASS files to CSS files and saves them in the build folder
gulp.task('sass-prod', function() {
    return gulp.src(appSassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(prodOutputPathApp, {overwrite: true}));
});


// ////////////////////////////////////////////////
// HTML Tasks
// ////////////////////////////////////////////////

// copies all HTML files into the build folder
gulp.task('view-prod', function() {
    return gulp.src(appHtmlFiles)
        .pipe(gulp.dest(prodOutputPathApp, {overwrite: true}));
});

// copies all HTML files into the development folder
gulp.task('view-dev', function() {
    return gulp.src(appHtmlFiles)
        .pipe(gulp.dest(devOutputPathApp, {overwrite: true}));
});

// copies the index.html file in the dist folder after inculding the JavaScript
gulp.task('index-dev', function() {
    // load the index-js-dev.html file
    fileLoader.readFile(appSrcFolderPath + '/../index-js-dev.html', "utf-8", function(err, data) {
            // place the content of the index-js-dev.html inside the index.html template
            return gulp.src(appSrcFolderPath + '/../index.html')
                .pipe(htmlreplace({
                    'js': data
                }))
                .pipe(gulp.dest(devOutputPathApp + "/.."));
        });
});

// copies the index.html file in the build folder after inculding the JavaScript
gulp.task('index-prod', function() {
    // load the index-js-prod.html file
    fileLoader.readFile(appSrcFolderPath + '/../index-js-prod.html', "utf-8", function(err, data) {
            // place the conent of the index-js-prod.html inside the inde.html template
            return gulp.src(appSrcFolderPath + '/../index.html')
                .pipe(htmlreplace({
                    'js': data
                }))
                .pipe(gulp.dest(prodOutputPathApp + "/.."));
        });
});

// ////////////////////////////////////////////////
// App Resourses Tasks
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

// ////////////////////////////////////////////////
// Server TypeScript Files Tasks
// // /////////////////////////////////////////////

// the task compiles all the own TypeScript files of the project to JavaScript files
gulp.task('server-typescript-own-dev', function(cb) {
    var tscResult = gulp.src(serverTypeScriptCompilerFiles) // instead of "appTsProject.src()" because the other one slows down the transpile process
        .pipe(sourcemaps.init()) // This means sourcemaps will be generated
        .pipe(tsc(serverTsProject));

    return tscResult.js
        .pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file
        .pipe(gulp.dest(devOutputPathServer, cb));
});

// the task compiles all the own TypeScript files of the project to JavaScript files
gulp.task('server-typescript-own-prod', function(cb) {
    var tscResult = gulp.src(serverTypeScriptCompilerFiles) // instead of "appTsProject.src()" because the other one slows down the transpile process
        .pipe(sourcemaps.init()) // This means sourcemaps will be generated
        .pipe(tsc(serverTsProject));

    return tscResult.js
        .pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file
        .pipe(gulp.dest(prodOutputPathServer, cb));
});

// ////////////////////////////////////////////////
// Deployment Tasks
// // /////////////////////////////////////////////

// starts the node.js server to test the build
gulp.task('serve-prod', function () {
    server.listen( { path: prodOutputPathServer + '/server.js' });
});

// ////////////////////////////////////////////////
// Development Tasks
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
        notify: true
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

// ////////////////////////////////////////////////
// Build Tasks
// // /////////////////////////////////////////////

// clean out all files and folders from build folder
gulp.task('clear-prod', function (cb) {
    del([prodOutputPathApp + '/**']);
    del([prodOutputPathServer + '/**'], cb);
});

// clean out all files and folders from build folder
gulp.task('clear-dev', function (cb) {
    del([devOutputPathApp + '/**']);
    del([devOutputPathServer + '/**'], cb);
});

// build process for production
gulp.task('deploy', gulpSequence('clear-prod', 'typescript-prod', ['server-typescript-own-prod', 'view-prod', 'index-prod', 'sass-prod', 'res-prod'], 'serve-prod'));

// build process for production
gulp.task('develop', gulpSequence('clear-dev', 'typescript-own-dev', ['server-typescript-own-dev', 'typescript-libs-dev', 'view-dev', 'index-dev', 'sass-dev', 'res-dev'], 'serve-dev'));


// ////////////////////////////////////////////////
// Default Tasks
// // /////////////////////////////////////////////

gulp.task('default', ['develop']);