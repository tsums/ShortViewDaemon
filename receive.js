var express = require('express'),
    fs = require('fs')
    url = require('url');
var mongoose = require('mongoose')
var app = express();
var bodyParser = require('body-parser');

var count = 0;

mongoose.connect('mongodb://localhost/myapp');

var DataEntry = require('./models/DataEntry')

app.use(bodyParser.json());

app.post('/receive', function(request, respond) {

    console.log(request.body);

});

app.listen(9235);
