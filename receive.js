var express = require('express'),
    fs = require('fs')
    url = require('url');
var mongoose = require('mongoose')
var app = express();
var bodyParser = require('body-parser');
var exec = require('child_process').exec;
var cors = require('cors');
var count = 0;

mongoose.connect('mongodb://localhost/myapp');

var DataEntry = require('./models/DataEntry');

app.use(cors())
app.use(bodyParser.json());

app.get('/clear', function(request, response) {
    DataEntry.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        response.send();
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

setInterval(function() {

    exec('/opt/shortview/load.sh', function(error, stdout, sterr) {
        var num = stdout.split(' ');

        var de = new DataEntry({
            timestamp: Date.now(),
            // cpu_usage: load,
            // mem_free: mem_free,
            // mem_used: mem_used,
            // mem_cache: mem_cache,
            cpu0: num[0],
            cpu1: num[1],
            cpu2: num[2],
            cpu3: num[3]
        });

        de.save(function(err) {
            if (err) {
                console.log(err);
            }
        });
    });

}, 5000);

app.listen(9235);
