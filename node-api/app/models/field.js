var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FieldSchema   = new Schema({
	locationID: String,
	dayOfTheWeek: {type: Array},
	startTime: String,
	endTime: String,
	fieldNr: Number
});

module.exports = mongoose.model('Field', FieldSchema);