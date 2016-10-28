var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TrainerSchema   = new Schema({
	name: String,
	trains: String,
	inTeam: String,
	possibleTrainingFields: {type: Array}
});

module.exports = mongoose.model('Trainer', TrainerSchema);