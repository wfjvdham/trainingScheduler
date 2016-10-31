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
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var trainer_service_1 = require('./trainer.service');
var trainer_1 = require('./trainer');
var team_service_1 = require('./team.service');
var TrainerDetailComponent = (function () {
    function TrainerDetailComponent(trainerService, teamService, route, location) {
        this.trainerService = trainerService;
        this.teamService = teamService;
        this.route = route;
        this.location = location;
        this.monday = true;
        this.tuesday = true;
        this.wednesday = true;
        this.thursday = true;
        this.friday = true;
    }
    TrainerDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = params['id'];
            if (id != "") {
                _this.trainerService.getTrainer(id)
                    .then(function (trainer) { return _this.trainer = trainer; })
                    .then(function (trainer) { return _this.initDayValues(trainer); });
            }
            else {
                _this.trainer = new trainer_1.Trainer("", "", "", "", "-1");
            }
        });
        this.teamService.getTeams().then(function (teams) { return _this.teams = teams; });
    };
    TrainerDetailComponent.prototype.initDayValues = function (trainer) {
        var array = JSON.parse("[" + trainer.dayOfTheWeek + "]");
        this.monday = false;
        this.tuesday = false;
        this.wednesday = false;
        this.thursday = false;
        this.friday = false;
        for (var i = 0; i < array.length; i++) {
            var day = array[i];
            if (day == 1) {
                this.monday = true;
            }
            if (day == 2) {
                this.tuesday = true;
            }
            if (day == 3) {
                this.wednesday = true;
            }
            if (day == 4) {
                this.thursday = true;
            }
            if (day == 5) {
                this.friday = true;
            }
        }
    };
    TrainerDetailComponent.prototype.createDayArray = function () {
        var dayArray = [];
        if (this.monday) {
            dayArray.push(1);
        }
        if (this.tuesday) {
            dayArray.push(2);
        }
        if (this.wednesday) {
            dayArray.push(3);
        }
        if (this.thursday) {
            dayArray.push(4);
        }
        if (this.friday) {
            dayArray.push(5);
        }
        return dayArray;
    };
    TrainerDetailComponent.prototype.update = function () {
        this.trainer.dayOfTheWeek = this.createDayArray().toString();
        this.trainerService.update(this.trainer)
            .then(this.goBack);
    };
    TrainerDetailComponent.prototype.create = function () {
        this.trainer.dayOfTheWeek = this.createDayArray().toString();
        this.trainerService.create(this.trainer)
            .then(this.goBack);
    };
    TrainerDetailComponent.prototype.delete = function () {
        this.trainerService.delete(this.trainer._id)
            .then(this.goBack);
    };
    TrainerDetailComponent.prototype.goBack = function () {
        window.history.back();
    };
    TrainerDetailComponent.prototype.goToLocations = function () {
        //this.location.go('/locations');
        //this.router.navigate(['/locations']);
    };
    TrainerDetailComponent.prototype.changeDay = function (element) {
        switch (element.name) {
            case "monday":
                this.monday = element.checked;
                break;
            case "tuesday":
                this.tuesday = element.checked;
                break;
            case "wednesday":
                this.wednesday = element.checked;
                break;
            case "thursday":
                this.thursday = element.checked;
                break;
            default:
                this.friday = element.checked;
        }
    };
    TrainerDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-trainer-detail',
            templateUrl: 'app/trainer-detail.component.html'
        }), 
        __metadata('design:paramtypes', [trainer_service_1.TrainerService, team_service_1.TeamService, router_1.ActivatedRoute, common_1.Location])
    ], TrainerDetailComponent);
    return TrainerDetailComponent;
}());
exports.TrainerDetailComponent = TrainerDetailComponent;
//# sourceMappingURL=trainer-detail.component.js.map