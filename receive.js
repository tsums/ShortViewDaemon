var express = require('express'),
    fs = require('fs')
    url = require('url');
var mongoose = require('mongoose')
var app = express();
var bodyParser = require('body-parser');

var count = 0;

mongoose.connect('mongodb://localhost/myapp');

var DataEntry = require('./models/DataEntry');

app.use(bodyParser.json());

app.post('/receive', function(request, respond) {

    var timestamp = request.body.payload[0].timestamp;
    var load = request.body.payload[0].LONGTERM.Load;

    console.log('timestamp:\t' + timestamp);
    console.log('load:\t' + load);

    var d = new Date(0);
    d.setUTCSeconds(timestamp);

    var de = new DataEntry({
        timestamp: d,
        cpu_usage: load
    });

    de.save(function(err) {
        if (err) {
            console.log(err);
        }
        respond.status(200).send();
    })

});

app.get('/cpu_usage'. function(request, response) {

    DataEntry.find().sort({timestamp: -1}).limit(10).exec(function(err, entries) {
        if (err) {
            console.log(err);
        }

        response.send(entries);
    }
})

app.listen(9235);
