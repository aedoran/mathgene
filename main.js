var express = require('express');
var parser = require('./parse');
var fs = require('fs');

var app = express.createServer();
app.listen(8000);

app.use(express.static(__dirname + '/public'));


app.get("/gauss", function(req,res) {
	var tree = parser.get(18231,6);
  res.send(JSON.stringify(tree));
});

