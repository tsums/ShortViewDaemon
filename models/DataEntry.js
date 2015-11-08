var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DataEntry = new Schema({
    timestamp: {type: Date, index: true},
    cpu_usage: {type: Number},
    mem_free: {type: Number},
    mem_cache: {type: Number},
    mem_used: {type: Number},
    cpu0: {type: Number},
    cpu1: {type: Number},
    cpu2: {type: Number},
    cpu3: {type: Number}
});

module.exports = mongoose.model('DataEntry', DataEntry);
