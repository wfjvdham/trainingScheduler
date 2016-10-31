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
var trainer_service_1 = require('./trainer.service');
var team_service_1 = require('./team.service');
var router_1 = require('@angular/router');
var TrainersComponent = (function () {
    function TrainersComponent(trainerService, teamService, router) {
        this.trainerService = trainerService;
        this.teamService = teamService;
        this.router = router;
    }
    ;
    TrainersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getTrainers();
        this.teamService.getTeams().then(function (teams) { return _this.teams = teams; });
    };
    TrainersComponent.prototype.getTrainers = function () {
        var _this = this;
        this.trainerService.getTrainers().then(function (trainers) { return _this.trainers = trainers; });
    };
    TrainersComponent.prototype.gotoDetail = function (trainer) {
        if (trainer) {
            this.router.navigate(['/trainerDetail', trainer._id]);
        }
        else {
            this.router.navigate(['/trainerDetail', ""]);
        }
    };
    TrainersComponent.prototype.getTeamName = function (teamID) {
        var name = "not found";
        if (teamID != "-1") {
            var loc = this.teams.find(function (team) { return team._id === teamID; });
            if (loc) {
                name = loc.name;
            }
        }
        else {
            name = "does not play";
        }
        return name;
    };
    TrainersComponent.prototype.getDays = function (dayOfTheWeek) {
        var array = JSON.parse("[" + dayOfTheWeek + "]");
        var result = "";
        for (var i = 0; i < array.length; i++) {
            var day = array[i];
            if (day == 1) {
                result = result + "Mon, ";
            }
            if (day == 2) {
                result = result + "Tue, ";
            }
            if (day == 3) {
                result = result + "Wed, ";
            }
            if (day == 4) {
                result = result + "Thu, ";
            }
            if (day == 5) {
                result = result + "Fri, ";
            }
        }
        return result.substring(0, result.length - 2);
    };
    TrainersComponent = __decorate([
        core_1.Component({
            selector: 'my-trainers',
            templateUrl: 'app/trainers.component.html',
            providers: [trainer_service_1.TrainerService]
        }), 
        __metadata('design:paramtypes', [trainer_service_1.TrainerService, team_service_1.TeamService, router_1.Router])
    ], TrainersComponent);
    return TrainersComponent;
}());
exports.TrainersComponent = TrainersComponent;
//# sourceMappingURL=trainers.component.js.map