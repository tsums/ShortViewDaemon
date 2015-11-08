var express = require('express'),
    fs = require('fs')
    url = require('url');
var mongoose = require('mongoose')
var app = express();
var bodyParser = require('body-parser');

var cors = require('cors')
var count = 0;

mongoose.connect('mongodb://localhost/myapp');

var DataEntry = require('./models/DataEntry');

app.use(cors())
app.use(bodyParser.json());

app.post('/receive', function(request, respond) {

    var timestamp = request.body.payload[0].timestamp;
    var load = request.body.payload[0].LONGTERM.Load;
    var mem_free = request.body.payload[0].LONGTERM['Memory.real.free'];
    var mem_cache = request.body.payload[0].LONGTERM['Memory.real.cache'];
    var mem_used = request.body.payload[0].LONGTERM['Memory.real.used'];

    var d = new Date(0);
    d.setUTCSeconds(timestamp);

    var de = new DataEntry({
        timestamp: d,
        cpu_usage: load,
        mem_free: mem_free,
        mem_used: mem_used,
        mem_cache: mem_cache
    });

    de.save(function(err) {
        if (err) {
            console.log(err);
        }
        respond.status(200).send();
    })

});

app.get('/stats', function(request, response) {

    DataEntry.find().sort({timestamp: -1}).limit(60).exec(function(err, entries) {
        if (err) {
            console.log(err);
        }

        response.send(entries);
    });
});

app.get('/latest', function(request, response) {

    DataEntry.find().sort({timestamp: -1}).limit(1).exec(function(err, entries) {
        if (err) {
            console.log(err);
        }

        response.send(entries);
    });
});

app.listen(9235);
