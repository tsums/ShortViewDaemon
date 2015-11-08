var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DataEntry = new Schema({
    timestamp: {type: Date, required: true, index: true},
    cpu_usage: {type: Number, required: true}
});

module.exports = mongoose.model('DataEntry', DataEntry);
