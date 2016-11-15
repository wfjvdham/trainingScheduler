var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TeamSchema   = new Schema({
	nrOfTrainings: Number,
	name: String,
	dayOfTheWeek: {type: Array},
	possibleTrainingFields: {type: Array}
});

module.exports = mongoose.model('Team', TeamSchema);