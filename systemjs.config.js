// this file configures the SystemJS Loader
// it is ONLY used during the build process to create the JavaScript File Bundles
// to configure the SystemJS Loader of the actuall application please look
// inside index-js-dev.html and index-js-prod.html in the source folder

System.config({
  map: {
    'rxjs': 'node_modules/rxjs',
    '@angular': 'node_modules/@angular',
    'jquery-param' : 'node_modules/jquery-param',
    'client/app': 'dist/app'
  },
  
  packages: {
    '@angular/core': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/compiler': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/common': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/platform-browser': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/platform-browser-dynamic': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/router': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/http': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/router-deprecated': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    'rxjs': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    'jquery-param': {
      main: 'jquery-param.js',
      defaultExtension: 'js'
    },
    'client/app': {
      main: 'main.js',
      defaultExtension: 'js'
    }
  }
});