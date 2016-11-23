##################################################################
#   INSTALLATION
##################################################################
Steps foor setting up the project on a new machine:
1) install Python 2.7 (https://www.python.org/downloads/release/python-2712/)
2) install Visual C++ Build Tools (http://go.microsoft.com/fwlink/?LinkId=691126")
(PouchDB needs "leveldown" which again needs "node-gyp"
 node-gyp needs Pathon 2.7 and Visual C++ Build Tools)
3) npm version 3.10.7 is required for "npm shrinkwarp" - therefore update npm if necessary by calling "npm install npm -g"
4) run "npm run install-package-json"
5) Install CouchDB, start it and run "add-cors-to-couchdb"


##################################################################
#   Known Issues
##################################################################
Node Server throws the following Warning:
   "(node:7600) DeprecationWarning: crypto.pbkdf2 without specifying a digest is deprecated. Please specify a digest"
This gets caused by superlogin: https://github.com/colinskow/superlogin/issues/64

------------------------------------------------------------------

Sometimes npm does not install packages correctly, in this case just
remove the folder in "node_modules" and install them manually using
"npm install <package-name>"



##################################################################
#   In Case of Errors
##################################################################
0) the file "npm-shrinkwrap.json" always saves the npm package versions installed and can
    be used to figure out working npm package versions since it gets also tracked via GIT
1) check for the latest Angular2 Version and the Braking Changes that force to
    a) update the code (syntax)
    b) use newer versions of...
        I) zone.js
        II) any other polyfill
        III) other npm libraries
2) check for Node.js updates
3) check for TypeScript updates
4) look for typings (do they get downloaded?)


##################################################################
#   Update package.json to new versions
##################################################################
https://www.npmjs.com/package/npm-check-updates

1) look for updates: "npm run check-for-updates"
2) update if necessary: "npm run update"