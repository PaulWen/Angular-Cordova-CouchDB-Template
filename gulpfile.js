var prodOutputPath = "build";
var devOutputPath = "dist";

var gulp = require('gulp');
var SystemJsBuilder = require('systemjs-builder');
var builder = new SystemJsBuilder();
var del = require('del');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var tsProject = tsc.createProject('tsconfig.json');
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
    builder.loadConfig('./systemjs.config.js')
        .then(function() {
            // combines ALL JavaScript files into one file - the systemjs.config.js is not needed anymore afterwards!
            return builder.buildStatic("src", prodOutputPath + "/script.js", { minify: true, sourceMaps: false});
        })
        .then(function(){
            console.log('library bundles built successfully!');
        })
        .then(function () {
            // Changes all path references inside the scripts to the view,
            // since the views are no longer stored under /app/view/ but instead
            // under /view/
            gulp.src(prodOutputPath + '/script.js')
                .pipe(replace('src/view/', 'view/'))
                .pipe(gulp.dest(prodOutputPath, {overwrite: true}));
        });

    cb();
});

// the task bundels all the libraries that are used in the project into one
// JavaScript file
gulp.task('typescript-libs-dev', function(cb) {
    builder.loadConfig('./systemjs.config.js')
        .then(function(){
            return builder.bundle(
                'src - [src/**/*]', // build app and remove the app code - this leaves only 3rd party dependencies
                devOutputPath + '/libs-bundle.js', { minify: true });
        })
        .then(function(){
            console.log('library bundles built successfully!');
        });

    cb();
});

// the task compiles all the own TypeScript files of the project to JavaScript files
gulp.task('typescript-own-dev', function(cb) {
    var tscResult = gulp.src(['src/**/*.ts', 'typings/browser/**/*.ts', 'typings/browser.d.ts']) // instead of "tsProject.src()" because the other one slows down the transpile process
        // Changes all path references inside the scripts to the view,
        // since the views are no longer stored under /app/view/ but instead
        // under /view/
        .pipe(replace('src/view/', 'view/'))
        .pipe(sourcemaps.init()) // This means sourcemaps will be generated
        .pipe(tsc(tsProject));

    return tscResult.js
        .pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file
        .pipe(gulp.dest(devOutputPath, cb));
});

// ////////////////////////////////////////////////
// SASS Tasks
// ////////////////////////////////////////////////

// the task compiles all the own SASS files to CSS files and saves them in the dist folder
gulp.task('sass-dev', function() {
    return gulp.src('src/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(devOutputPath, {overwrite: true}));
});

// the task compiles all the own SASS files to CSS files and saves them in the build folder
gulp.task('sass-prod', function() {
    return gulp.src('src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(prodOutputPath, {overwrite: true}));
});


// ////////////////////////////////////////////////
// HTML Tasks
// ////////////////////////////////////////////////
var viewElementsToCopy = [
    "src/**/*.+(htm|html)",
    "!src/index.html",
    "!src/index-js-dev.html",
    "!src/index-js-prod.html"
];

// copies all HTML files into the build folder
gulp.task('view-prod', function() {
    return gulp.src(viewElementsToCopy)
        .pipe(gulp.dest(prodOutputPath, {overwrite: true}));
});

// copies all HTML files into the development folder
gulp.task('view-dev', function() {
    return gulp.src(viewElementsToCopy)
        .pipe(gulp.dest(devOutputPath, {overwrite: true}));
});

// copies the index.html file in the dist folder after inculding the JavaScript
gulp.task('index-dev', function() {
    // load the index-js-dev.html file
    fileLoader.readFile('src/index-js-dev.html', "utf-8", function(err, data) {
            // place the conent of the index-js-dev.html inside the inde.html template
            return gulp.src('src/index.html')
                .pipe(htmlreplace({
                    'js': data
                }))
                .pipe(gulp.dest(devOutputPath));
        });
});

// copies the index.html file in the build folder after inculding the JavaScript
gulp.task('index-prod', function() {
    // load the index-js-prod.html file
    fileLoader.readFile('src/index-js-prod.html', "utf-8", function(err, data) {
            // place the conent of the index-js-prod.html inside the inde.html template
            return gulp.src('src/index.html')
                .pipe(htmlreplace({
                    'js': data
                }))
                .pipe(gulp.dest(prodOutputPath));
        });
});

// ////////////////////////////////////////////////
// Deployment Tasks
// // /////////////////////////////////////////////

// this tasks starts a simple HTTP web server for testing the build
gulp.task('serve-prod', function(cb) {
    browserSync.init({
        port: 8000,
        server: {
            baseDir: prodOutputPath
        }
    });
});

// ////////////////////////////////////////////////
// Development Tasks
// // /////////////////////////////////////////////

// this tasks starts a simple HTTP web server with browser sync functionality
// this means that when ever the content inside web browser changes, all browsers are getting refreshed automatically
gulp.task('serve-dev', function(cb) {
    browserSync.init({
        port: 8000,
        server: {
            baseDir: devOutputPath
        }
    });

    gulp.watch(["src/**/*.ts"], ["browserSync-typescript-own-dev"], cb);
    gulp.watch(["src/**/*.scss"], ["browserSync-sass-own-dev"], cb);
    gulp.watch(viewElementsToCopy, ["browserSync-view-dev"], cb);
    gulp.watch(["src/index.html", "src/index-js-dev.html"], ["browserSync-index-dev"], cb);
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


// ////////////////////////////////////////////////
// Build Tasks
// // /////////////////////////////////////////////

// clean out all files and folders from build folder
gulp.task('clear-prod', function (cb) {
    return del([prodOutputPath + '/**'], cb);
});

// clean out all files and folders from build folder
gulp.task('clear-dev', function (cb) {
    return del([devOutputPath + '/**'], cb);
});

// build process for production
gulp.task('deploy', gulpSequence('clear-prod', ['typescript-prod', 'view-prod', 'index-prod', 'sass-prod'], 'serve-prod'));

// build process for production
gulp.task('develop', gulpSequence('clear-dev', 'typescript-own-dev', ['typescript-libs-dev', 'view-dev', 'index-dev', 'sass-dev'], 'serve-dev'));


// ////////////////////////////////////////////////
// Default Tasks
// // /////////////////////////////////////////////

gulp.task('default', ['develop']);