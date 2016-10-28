var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SolutionSchema   = new Schema({
	fieldID: Number,
	location: String,
	dayOfWeek: String,
	startTime: Number,
	endTime: Number,
	field: Number,
	asignedTo: String,
	trainerScore: Number,
	connectionScore: Number,
	multipleTrainingScore: Number
});

module.exports = mongoose.model('Solution', SolutionSchema);