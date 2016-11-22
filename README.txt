##################################################################
#   INSTALLATION
##################################################################
Manual configuration to be able to run "npm install" properly:
1) install Python 2.7 (https://www.python.org/downloads/release/python-2712/)
2) install Visual C++ Build Tools (http://go.microsoft.com/fwlink/?LinkId=691126")
(PouchDB needs "leveldown" which again needs "node-gyp"
 node-gyp needs Pathon 2.7 and Visual C++ Build Tools)



##################################################################
#   Known Issues
##################################################################
Node Server throws the following Warning:
   "(node:7600) DeprecationWarning: crypto.pbkdf2 without specifying a digest is deprecated. Please specify a digest"
This gets caused by superlogin: https://github.com/colinskow/superlogin/issues/64

------------------------------------------------------------------




##################################################################
#   In Case of Errors
##################################################################
1) check for the latest Angular2 Version and the Braking Changes that force to
    a) update the code (syntax)
    b) use newer versions of...
        I) zone.js
        II) any other polyfill
        III) other npm libraries
2) check for Node.js updates
3) check for TypeScript updates
4) look for typings (do they get downloaded?)