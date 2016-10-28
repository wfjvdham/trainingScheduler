// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var async	   = require('async');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,application,x-www-form-urlencoded');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var port     	= process.env.PORT || 8080; // set our port

var mongoose   	= require('mongoose');
mongoose.connect('mongodb://localhost:27017/Iganiq8o'); // connect to our database

var Field		= require('./app/models/field');
var Team		= require('./app/models/team');
var Trainer     = require('./app/models/trainer');
var Location	= require('./app/models/location');
var Solution	= require('./app/models/solution');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	async.parallel(
		    {
		        fields: function(callback){
		            Field.find(function(err, fields) {
		            	callback(err, fields);
		        	});
		        },
		        teams: function(callback){
		            Team.find(function(err, teams) {
		            	callback(err, teams);
		        	});
		        },
		        trainers: function(callback){
		        	Trainer.find(function(err, trainers) {
		        		callback(err, trainers);
		        	});
		        }
		    }, 
		    function(e, r){
		    	var fieldsParsed = [];
		    	var id = 0;
		    	for (var i = 0; i < r.fields.length; i++) {
		    		//parse fields
		    		var field = r.fields[i];
		    		for (var j = 0; j < field.fieldNr; j++) {
		    			daysOfWeek = field.dayOfTheWeek[0].split(',');
		    			for (var k = 0; k < daysOfWeek.length; k++) {
		    				var fieldParsed = {};
		    				fieldParsed.field = j+1;
		    				fieldParsed.location = field.locationID;
		    				var startTimeArray = field.startTime.split(':');
		    				fieldParsed.startTime = 60*Number(startTimeArray[0])+Number(startTimeArray[1]);
		    				var endTimeArray = field.endTime.split(':');
		    				fieldParsed.endTime = 60*Number(endTimeArray[0])+Number(endTimeArray[1]);
		    				fieldParsed.dayOfWeek = Number(daysOfWeek[k]);
		    				fieldParsed.fieldID = id;
		    				id++;
		    				fieldParsed.asignedTo = '-1';
		    				fieldParsed.trainerScore = 0;
		    				fieldParsed.connectionScore = 0;
		    				fieldParsed.multipleTrainingScore = 0;
		    				fieldsParsed.push(fieldParsed);
		    			}
		    		}
		    	}
		    	var fieldRequired=0;
		    	for (var i in r.teams) { fieldRequired += r.teams[i].nrOfTrainings; }
		    	if (fieldsParsed.length >= fieldRequired) {
		    		//console.log("enough fields");
		    		
		    		//calculate connection scores
		    		for (var i = 0; i < fieldsParsed.length; i++) {
		    			var field = fieldsParsed[i];
		    			function filterConnected(object) {
		    				return object.location == field.location &&
		    					   object.dayOfWeek == field.dayOfWeek &&
		    					   object.startTime != field.startTime &&
		    					   (Math.abs(object.startTime-field.startTime)<=120);
		    			}
		    			var fieldsFiltered = fieldsParsed.filter(filterConnected);
		    			fieldsParsed[i].connectionScore = fieldsFiltered.length;
		    		}
		    		
		    		var teamsParsed = [];
		    		//number of trainers in a team
		    		for (var i = 0; i < r.teams.length; i++) {
		    			var team = {};
		    			team.nrOfTrainings = r.teams[i].nrOfTrainings;
		    			team.name = r.teams[i].name;
		    			team.possibleTrainingFields = r.teams[i].possibleTrainingFields;
		    			team._id = r.teams[i]._id;
		    			team.n = 0;
		    			function filterTrainers(object) {
		    				return object.inTeam == team._id;
		    			}
		    			var trainersFiltered = r.trainers.filter(filterTrainers);
		    			for (var j = 0; j < trainersFiltered.length; j++) {
		    				var trainer = trainersFiltered[j];
			    			function filterTeams(object) {
			    				return object._id == trainer.trains;
			    			}
			    			var teamsFiltered = r.teams.filter(filterTeams);
			    			team.n = teamsFiltered[0].nrOfTrainings;
		    			}
		    			teamsParsed.push(team);
		    		}
		    		var nMax = 1;
		    		var solutionFound=false;
		    		var solutions;
		    		Solution.remove({}, function(err){
		    			if(err)
		    				console.log(err);
		    		});
		    		for (var n=0; n<nMax; n++) {
		    			//console.log("attempt " + n);
		    			teamsParsed.sort(function(a, b){return b.n-a.n});
		    			for (var i=0;i<teamsParsed.length;i++) {
		    				//console.log("i= " + i);
		    				var team = teamsParsed[i];
		    				for (var j=0;j<team.nrOfTrainings;j++) {
		    					//console.log("j= " + j);
		    					//hard
		    					//collect free fields
		    					var free = fieldsParsed.filter(function(o){return o.asignedTo=='-1'});
		    					//team can only train one time on a day
		    					//TODO for now assume a team can max 2 times a week
		    					var usedDay = undefined;
		    					var otherTrainingFields = fieldsParsed.filter(function(o){return o.asignedTo==team._id});
		    					if (otherTrainingFields.length>0) {
		    						usedDay = otherTrainingFields[0].dayOfWeek;
		    					}
		    					if (usedDay) {
		    						//prevent training two days in a row or on the same day
		    						free = free.filter(function(o){return Math.abs(o.dayOfWeek-usedDay)>1});
		    					}
		    					
		    					//TODO add restrictions for team
		    					
		    				    //trainer must not be training at the same time
		    					//TODO add functionality for two trainer on one team
		    				    var trainer = r.trainers.filter(function(o){return o.trains == team._id});
		    				    if (trainer.length>0) {
		    				    	//team has a trainer
		    				    	
		    				    	//TODO add restrictions for trainer
		    				    	
	    				    		//get fields where the trainer is training
	    				    		var fieldsOfTrainer = fieldsParsed.filter(function(o){return o.asignedTo!='-1'&&o.asignedTo == trainer[0].inTeam});
	    				    		for (var k=0;k<fieldsOfTrainer.length;k++) {
	    				    			console.log("k= " + k);
	    				    			var fieldOfTrainer = fieldsOfTrainer[k];
	    				    			//hard
	    				    			free = free.filter(function(o){return !(o.dayOfWeek==fieldOfTrainer.dayOfWeek&&o.startTime==fieldOfTrainer.startTime)});
	    				    			//soft
	    				    			var freeSameDay = free.filter(function(o){return o.dayOfWeek == fieldOfTrainer.dayOfWeek});
	    				    			for (var l=0;l<freeSameDay.length;l++) {
	    				    				freeSameDay[l].trainerScore = freeSameDay[l].trainerScore + 4;
	    				    			}
	    				    			//TODO fix this for different time slots for training
	    				    			var freeSameDayAndNextTimeslot = free.filter(function(o){return (o.dayOfWeek==fieldOfTrainer.dayOfWeek&&(Math.abs(o.startTime-fieldOfTrainer.startTime)<=120))});
	    				    			for (var l=0;l<freeSameDayAndNextTimeslot.length;l++) {
	    				    				freeSameDay[l].trainerScore = freeSameDay[l].trainerScore + 2;
	    				    			}
	    				    			var freeSameDayAndLocation = free.filter(function(o){return (o.dayOfWeek==fieldOfTrainer.dayOfWeek&&o.location==fieldOfTrainer.location)});
	    				    			for (var l=0;l<freeSameDayAndNextTimeslot.length;l++) {
	    				    				freeSameDay[l].trainerScore = freeSameDay[l].trainerScore + 1;
	    				    			}
	    				    		}
		    				    }
		    					
		    					//assign field
		    				    if (free.length>0) {
		    				    	free.sort(function(o1, o2) {  
		    				    		if (o1.trainerScore < o2.trainerScore) return 1;
		    				    		if (o1.trainerScore > o2.trainerScore) return -1;
		    				    		if (o1.connectionScore < o2.connectionScore) return 1;
		    				    		if (o1.connectionScore > o2.connectionScore) return -1;
		    				    		return 0;
		    				    	});
		    				    	console.log(team.name + " assigned to " + free[0].fieldID);
		    				    	free[0].asignedTo = team._id;
		    				    	solutionFound=true;
		    				    } else {
		    				    	console.log("no field found");
		    				    	for (var k=0;k<fieldsParsed.length;k++) {
		    				    		fieldsParsed[k].asignedTo ='-1';
		    				    	}
		    				    	team.n = team.n + 1;
		    				    	solutionFound=false;
		    				    }
		    				}			    				
		    			}
		    			if (solutionFound==true) {
		    				console.log("solutionFound");
		    				solutions = fieldsParsed.filter(function(o){return o.asignedTo!='-1'});
		    				Solution.collection.insert(solutions, function(err){
		    					if (err) {
		    						console.log(err);
		    					} else {
		    						console.log("succesfull added solutions");
		    					}
		    				})
		    				break;
		    			}
		    		}
		    		if (solutionFound==false) {
	    				console.log("no solutionFound");
	    				res.json({ error: 'No solution possible' });
	    			} else {
	    				res.json(solutions);
	    			}		    		
		    	} else {
		    		res.json({ error: 'Not enough fields' });
		    	}
		    }
		);	
	//var exec = require('child_process').exec;
	//var cmd = 'C://Users//w.vanderham//Documents//R//R-3.3.1//bin//Rscript.exe C://Users//w.vanderham//workspace//trainingSchedule//node-api//RScripts//scheduler.R';
	//console.log("test cmd");
	//exec(cmd, function(error, stdout, stderr) {
		// command output is in stdout
	//	console.log(stdout);
	//	if(error==null) {
	//		res.json({ result: true });	
	//	} else {
	//		console.log(error);
	//		res.json({ result: false });	
	//	}
	//});
});

// on routes that end in /fields
// ----------------------------------------------------
router.route('/fields')
	// create a field (accessed at POST http://localhost:8080/fields)
	.post(function(req, res) {
		var field = new Field();		// create a new instance of the Field model
		field.locationID = req.body.locationID;
		field.dayOfTheWeek = req.body.dayOfTheWeek;
		field.startTime = req.body.startTime;
		field.endTime = req.body.endTime;
		field.fieldNr = req.body.fieldNr;
		field.assignedTo = req.body.assignedTo;
		field.save(function(err) {
			if (err)
				res.send(err);
			res.json(field);
		});
	})
	// get all the fields (accessed at GET http://localhost:8080/api/fields)
	.get(function(req, res) {
		Field.find(function(err, fields) {
			if (err)
				res.send(err);
			res.json(fields);
		});
	});
// on routes that end in /fields/:field_id
// ----------------------------------------------------
router.route('/fields/:field_id')
	// get the field with that id
	.get(function(req, res) {
		Field.findById(req.params.field_id, function(err, field) {
			if (err)
				res.send(err);
			res.json(field);
		});
	})
	// update the field with this id
	.put(function(req, res) {
		Field.findById(req.params.field_id, function(err, field) {
			if (err)
				res.send(err);
			field.locationID = req.body.locationID;
			field.dayOfTheWeek = req.body.dayOfTheWeek;
			field.startTime = req.body.startTime;
			field.endTime = req.body.endTime;
			field.fieldNr = req.body.fieldNr;
			field.save(function(err) {
				if (err)
					res.send(err);
				res.json(field);
			});
		});
	})
	// delete the field with this id
	.delete(function(req, res) {
		Field.remove({
			_id: req.params.field_id
		}, function(err, field) {
			if (err)
				res.send(err);
			res.json({ message: 'Field Successfully deleted' });
		});
	});
//on routes that end in /teams
//----------------------------------------------------
router.route('/teams')
	// create a field (accessed at POST http://localhost:8080/teams)
	.post(function(req, res) {
		var team = new Team();		// create a new instance of the Team model
		team.nrOfTrainings = req.body.nrOfTrainings;
		team.name = req.body.name;
		team.possibleTrainingFields = req.body.possibleTrainingFields;
		team.save(function(err) {
			if (err)
				res.send(err);
			res.json(team);
		});
	})
	// get all the teams (accessed at GET http://localhost:8080/api/teams)
	.get(function(req, res) {
		Team.find(function(err, teams) {
			if (err)
				res.send(err);
			res.json(teams);
		});
	});
//on routes that end in /teams/:team_id
//----------------------------------------------------
router.route('/teams/:team_id')
	// get the team with that id
	.get(function(req, res) {
		Team.findById(req.params.team_id, function(err, team) {
			if (err)
				res.send(err);
			res.json(team);
		});
	})
	// update the team with this id
	.put(function(req, res) {
		Team.findById(req.params.team_id, function(err, team) {
			if (err)
				res.send(err);
			team.nrOfTrainings = req.body.nrOfTrainings;
			team.name = req.body.name;
			team.possibleTrainingFields = req.body.possibleTrainingFields;
			team.save(function(err) {
				if (err)
					res.send(err);
				res.json(team);
			});
		});
	})
	// delete the team with this id
	.delete(function(req, res) {
		Team.remove({
			_id: req.params.team_id
		}, function(err, team) {
			if (err)
				res.send(err);
			res.json({ message: 'Team Successfully deleted' });
		});
	});
//on routes that end in /trainers
//----------------------------------------------------
router.route('/trainers')
	// create a field (accessed at POST http://localhost:8080/trainers)
	.post(function(req, res) {
		var trainer = new Trainer();	// create a new instance of the Trainer model
		trainer.name = req.body.name;
		trainer.trains = req.body.trains;
		trainer.inTeam = req.body.inTeam;
		trainer.possibleTrainingFields = req.body.possibleTrainingFields;
		trainer.save(function(err) {
			if (err)
				res.send(err);
			res.json(trainer);
		});
	})
	// get all the trainers (accessed at GET http://localhost:8080/api/trainers)
	.get(function(req, res) {
		Trainer.find(function(err, trainers) {
			if (err)
				res.send(err);
			res.json(trainers);
		});
	});
//on routes that end in /trainers/:trainer_id
//----------------------------------------------------
router.route('/trainers/:trainer_id')
	// get the trainer with that id
	.get(function(req, res) {
		Trainer.findById(req.params.trainer_id, function(err, trainer) {
			if (err)
				res.send(err);
			res.json(trainer);
		});
	})
	// update the trainer with this id
	.put(function(req, res) {
		Trainer.findById(req.params.trainer_id, function(err, trainer) {
			if (err)
				res.send(err);
			trainer.name = req.body.name;
			trainer.trains = req.body.trains;
			trainer.inTeam = req.body.inTeam;
			trainer.possibleTrainingFields = req.body.possibleTrainingFields;
			trainer.save(function(err) {
				if (err)
					res.send(err);
				res.json(trainer);
			});
		});
	})
	// delete the trainer with this id
	.delete(function(req, res) {
		Trainer.remove({
			_id: req.params.trainer_id
		}, function(err, team) {
			if (err)
				res.send(err);
			res.json({ message: 'Trainer Successfully deleted' });
		});
	});
//on routes that end in /location
//----------------------------------------------------
router.route('/locations')
	// create a location (accessed at POST http://localhost:8080/locations)
	.post(function(req, res) {
		var location = new Location();	// create a new instance of the Location model
		location.name = req.body.name;
		location.save(function(err) {
			if (err)
				res.send(err);
			res.json(location);
		});
	})
	// get all the locations (accessed at GET http://localhost:8080/api/locations)
	.get(function(req, res) {
		Location.find(function(err, locations) {
			if (err)
				res.send(err);
			res.json(locations);
		});
	});
//on routes that end in /locations/:location_id
//----------------------------------------------------
router.route('/locations/:location_id')
	// get the location with that id
	.get(function(req, res) {
		Location.findById(req.params.location_id, function(err, location) {
			if (err)
				res.send(err);
			res.json(location);
		});
	})
	// update the location with this id
	.put(function(req, res) {
		Location.findById(req.params.location_id, function(err, location) {
			if (err)
				res.send(err);
			location.name = req.body.name;
			location.save(function(err) {
				if (err)
					res.send(err);
				res.json(location);
			});
		});
	})
	// delete the location with this id
	.delete(function(req, res) {
		Location.remove({
			_id: req.params.location_id
		}, function(err, location) {
			if (err)
				res.send(err);
			res.json({ message: 'Location Successfully deleted' });
		});
	});

router.route('/solutions')
	// create a solution (accessed at POST http://localhost:8080/solutions)
	.post(function(req, res) {
		var solution = new Solution();	// create a new instance of the Solution model
		solution.fieldID = req.body.fieldID;
		solution.location = req.body.location;
		solution.dayOfWeek = req.body.dayOfWeek;
		solution.startTime = req.body.startTime;
		solution.endTime = req.body.endTime;
		solution.field = req.body.field;
		solution.asignedTo = req.body.asignedTo;
		solution.trainerScore = req.body.trainerScore;
		solution.connectionScore = req.body.connectionScore;
		solution.multipleTrainingScore = req.body.multipleTrainingScore;
		solution.save(function(err) {
			if (err)
				res.send(err);
			res.json(solution);
		});
	})
	// get all the solution (accessed at GET http://localhost:8080/api/solutions)
	.get(function(req, res) {
		Solution.find(function(err, solutions) {
			console.log(solutions);
			if (err)
				res.send(err);
			res.json(solutions);
		});
	});
//on routes that end in /solutions/:solution_id
//----------------------------------------------------
router.route('/solutions/:solution_id')
	// get the solution with that id
	.get(function(req, res) {
		Solution.findById(req.params.solution_id, function(err, solution) {
			if (err)
				res.send(err);
			res.json(solution);
		});
	})
	// update the solution with this id
	.put(function(req, res) {
		Solution.findById(req.params.solution_id, function(err, solution) {
			if (err)
				res.send(err);
			solution.fieldID = req.body.fieldID;
			solution.location = req.body.location;
			solution.dayOfWeek = req.body.dayOfWeek;
			solution.startTime = req.body.startTime;
			solution.endTime = req.body.endTime;
			solution.field = req.body.field;
			solution.asignedTo = req.body.asignedTo;
			solution.trainerScore = req.body.trainerScore;
			solution.connectionScore = req.body.connectionScore;
			solution.multipleTrainingScore = req.body.multipleTrainingScore;
			solution.save(function(err) {
				if (err)
					res.send(err);
				res.json(solution);
			});
		});
	})
	// delete the solution with this id
	.delete(function(req, res) {
		Solution.remove({
			_id: req.params.solution_id
		}, function(err, solution) {
			if (err)
				res.send(err);
			res.json({ message: 'Solutions Successfully deleted' });
		});
	});

//app.post('/', function(req, res) {
//  console.log(req.body);
  //res.send(200);

  // sending a response does not pause the function
//  foo();
//  res.redirect('/');
//});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
