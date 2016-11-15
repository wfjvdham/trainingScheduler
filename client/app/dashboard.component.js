"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var solution_service_1 = require('./solution.service');
var team_service_1 = require('./team.service');
var location_service_1 = require('./location.service');
var trainer_service_1 = require('./trainer.service');
var router_1 = require('@angular/router');
var Res = (function () {
    function Res(result) {
        this.result = result;
    }
    return Res;
}());
;
var DashboardComponent = (function () {
    function DashboardComponent(router, http, solutionService, locationService, teamService, trainerService) {
        this.router = router;
        this.http = http;
        this.solutionService = solutionService;
        this.locationService = locationService;
        this.teamService = teamService;
        this.trainerService = trainerService;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.solutionService.getSolutions()
            .then(function (solutions) { return _this.solutions = solutions; })
            .then(function (solutions) { return _this.sortSolutions(); });
        this.trainerService.getTrainers().then(function (trainers) { return _this.trainers = trainers; });
        this.locationService.getLocations().then(function (locationObjects) { return _this.locationObjects = locationObjects; });
        this.teamService.getTeams().then(function (teams) { return _this.teams = teams; });
    };
    DashboardComponent.prototype.log = function () {
        console.log(this.solutions);
        console.log(this.locationObjects);
        console.log(this.teams);
        console.log(this.trainers);
    };
    DashboardComponent.prototype.sortSolutions = function () {
        this.solutions.sort(function (h1, h2) {
            return h1.dayOfWeek < h2.dayOfWeek ? -1 :
                (h1.dayOfWeek > h2.dayOfWeek ? 1 : 0);
        });
    };
    DashboardComponent.prototype.gotoLocationDetail = function () {
        this.router.navigate(['/locationDetail', ""]);
    };
    DashboardComponent.prototype.gotoFieldDetail = function () {
        this.router.navigate(['/fieldDetail', ""]);
    };
    DashboardComponent.prototype.gotoTeamDetail = function () {
        this.router.navigate(['/teamDetail', ""]);
    };
    DashboardComponent.prototype.gotoTrainerDetail = function () {
        this.router.navigate(['/trainerDetail', ""]);
    };
    DashboardComponent.prototype.updateSchedule = function () {
        var _this = this;
        var fieldsUrl = 'http://localhost:8080/api/'; // URL to web api
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        this.http
            .get(fieldsUrl, { headers: headers })
            .toPromise()
            .then(function (res) { return _this.reloadTable(); })
            .catch(this.handleError);
    };
    DashboardComponent.prototype.reloadTable = function () {
        var _this = this;
        this.solutionService.getSolutions()
            .then(function (solutions) { return _this.solutions = solutions; })
            .then(function (solutions) { return _this.sortSolutions(); });
    };
    DashboardComponent.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    DashboardComponent.prototype.getLocationName = function (locationID) {
        var loc = this.locationObjects.find(function (locationObject) { return locationObject._id === locationID; });
        var name = "not found";
        if (loc) {
            name = loc.name;
        }
        return name;
    };
    DashboardComponent.prototype.getTeamName = function (teamID) {
        var loc = this.teams.find(function (team) { return team._id === teamID; });
        var name = "not found";
        if (loc) {
            name = loc.name;
        }
        return name;
    };
    DashboardComponent.prototype.getTrainer = function (teamID) {
        var loc = this.trainers.find(function (trainer) { return trainer.trains === teamID; });
        var name = "not found";
        if (loc) {
            name = loc.name;
        }
        return name;
    };
    DashboardComponent.prototype.getTime = function (minutes) {
        var hours = String(minutes / 60);
        if (hours.length == 1) {
            hours = "0" + hours;
        }
        var min = String(minutes % 60);
        if (min.length == 1) {
            min = "0" + min;
        }
        return hours + ":" + min;
    };
    DashboardComponent.prototype.getDays = function (dayOfTheWeek) {
        var array = JSON.parse("[" + dayOfTheWeek + "]");
        var result = "";
        for (var i = 0; i < array.length; i++) {
            var day = array[i];
            if (day == 1) {
                result = result + "Monday, ";
            }
            if (day == 2) {
                result = result + "Tuesday, ";
            }
            if (day == 3) {
                result = result + "Wednesday, ";
            }
            if (day == 4) {
                result = result + "Thursday, ";
            }
            if (day == 5) {
                result = result + "Friday, ";
            }
            if (day == 6) {
                result = result + "Saturday, ";
            }
            if (day == 7) {
                result = result + "Sunday, ";
            }
        }
        return result.substring(0, result.length - 2);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'my-dashboard',
            templateUrl: 'app/dashboard.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http, solution_service_1.SolutionService, location_service_1.LocationService, team_service_1.TeamService, trainer_service_1.TrainerService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map