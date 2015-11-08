var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DataEntry = new Schema({
    timestamp: {type: Date, required: true, index: true},
    cpu_usage: {type: Number, required: true},
    mem_free: {type: Number, required: true},
    mem_cache: {type: Number, required: true},
    mem_used: {type: Number, required: true}
});

module.exports = mongoose.model('DataEntry', DataEntry);
