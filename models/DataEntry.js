var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DataEntry = new Schema({
    timestamp: {Type: Date, required: true, index: true},
    cpu_usage: {Type: Number, required: true}
});

module.exports = mongoose.model('AttendanceRecord', AttendanceRecord);
