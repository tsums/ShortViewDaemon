var express = require('express'),
    fs = require('fs')
    url = require('url');
var app = express();

var count = 0;

app.post('/receive', function(request, respond) {
    var body = '';
    count += 1;

    filePath = __dirname + '/public/data' + count + '.txt';
    request.on('data', function(data) {
        body += data;
    });

    request.on('end', function (){
        fs.appendFile(filePath, body, function() {
            respond.end();
        });
    });
});

app.listen(9235);
