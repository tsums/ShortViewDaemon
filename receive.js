var express = require('express'),
    fs = require('fs')
    url = require('url');
var mongoose = require('mongoose')
var app = express();
var bodyParser = require('body-parser');
var exec = require('child_process').exec;
var cors = require('cors');
var count = 0;
var async = require('async');

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

    var data = new DataEntry({
        timestamp: Date.now()
    });

    async.parallel([function(callback) {
        exec('/opt/shortview/load.sh', function(error, stdout, sterr) {
            var num = stdout.split(' ');
            data.cpu0 = num[0];
            data.cpu1 = num[1];
            data.cpu2 = num[2];
            data.cpu3 = num[3];
            callback();
        });
    }, function(callback) {
        exec('cat /proc/meminfo | head -n 3', function(error, stdout, stderr) {
            var meminfo = stdout.split('\n');
            var total = meminfo[0].split(' ');
            data.mem_total = total[total.length -2];
            var free = meminfo[1].split(' ');
            data.mem_free = free[free.length -2];
            callback();
        });
    }], function() {
        data.save(function(err) {
            if (err) {
                console.log(err);
            }
        });
    });

}, 5000);

app.listen(9235);
