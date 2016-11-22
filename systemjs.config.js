// this file configures the SystemJS Loader
// it is ONLY used during the build process to create the JavaScript File Bundles
// to configure the SystemJS Loader of the actual application please look
// inside index-js-dev.html and index-js-prod.html in the source folder

System.config({
  map: {
    'rxjs': 'node_modules/rxjs',
    '@angular/core': 'node_modules/@angular/core/bundles/core.umd.js',
    '@angular/common': 'node_modules/@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'node_modules/@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'node_modules/@angular/http/bundles/http.umd.js',
    '@angular/router': 'node_modules/@angular/router/bundles/router.umd.js',
    '@angular/forms': 'node_modules/@angular/forms/bundles/forms.umd.js',
    'jquery-param' : 'node_modules/jquery-param',
    'angular-sortablejs': 'node_modules/angular-sortablejs',
    'pouchdb': 'node_modules/pouchdb/dist',
    'sortablejs': 'node_modules/sortablejs/Sortable.js',
    'client/app': 'dist/app'
  },
  
  packages: {
    'rxjs': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    'jquery-param': {
      main: 'jquery-param.js',
      defaultExtension: 'js'
    },
    'angular-sortablejs': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    'pouchdb': {
      main: 'pouchdb.min.js',
      defaultExtension: 'js'
    },
    'client/app': {
      main: 'main.js',
      defaultExtension: 'js'
    }
  }
});