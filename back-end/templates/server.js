var express = require('express');
var app = express();
var cors = require('cors');
// If we deploy, will set the port to whatever server, else 4200 //
var PORT = process.env.PORT || 4200;
//Middleware//
app.use(cors());
app.use(express.json());
//Serve static files//
app.use(express.static(__dirname + '/public'));
// Start Server //
app.listen(PORT, function () {
    console.log("server started on port: ".concat(PORT));
});
