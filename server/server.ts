import express = require('express');

var port: number = process.env.PORT || 3000;
var app = express();

// define the static routes where just the files should get loaded from
app.use('/app', express.static(__dirname + '/app'));

// all requests get answered by returning the index.html
app.get('/*', (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + '/index.html');
});

// start the server
var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('This express app is listening on port:' + port);
});