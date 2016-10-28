var express = require("express");
var app = express();

var argv = require('yargs').argv;
var port = argv.port || 3000;
var dist = argv.prod  ? '/dist' :'';

app.use(express.static(__dirname+dist));

app.listen(port);
console.log("Server listening on port " + port );

//authentication: are your credentials correct
//authorization: do you have access to the page ( who can read, who can edit, etc)
//parameter mapping


//worker.js: 'purely logic', lay off calls from external sources like apis
// - should be wasily able to create unit tests