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
var team_service_1 = require('./team.service');
var team_1 = require('./team');
var TeamDetailComponent = (function () {
    function TeamDetailComponent(teamService, route, location) {
        this.teamService = teamService;
        this.route = route;
        this.location = location;
        this.monday = true;
        this.tuesday = true;
        this.wednesday = true;
        this.thursday = true;
        this.friday = true;
    }
    TeamDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = params['id'];
            if (id != "") {
                _this.teamService.getTeam(id)
                    .then(function (team) { return _this.team = team; })
                    .then(function (team) { return _this.initDayValues(team); });
            }
            else {
                _this.team = new team_1.Team("", 1, "", "");
            }
        });
    };
    TeamDetailComponent.prototype.initDayValues = function (team) {
        var array = JSON.parse("[" + team.dayOfTheWeek + "]");
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
    TeamDetailComponent.prototype.createDayArray = function () {
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
    TeamDetailComponent.prototype.changeDay = function (element) {
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
    TeamDetailComponent.prototype.update = function () {
        this.team.dayOfTheWeek = this.createDayArray().toString();
        this.teamService.update(this.team)
            .then(this.goBack);
    };
    TeamDetailComponent.prototype.create = function () {
        this.team.dayOfTheWeek = this.createDayArray().toString();
        this.teamService.create(this.team)
            .then(this.goBack);
    };
    TeamDetailComponent.prototype.delete = function () {
        this.teamService.delete(this.team._id)
            .then(this.goBack);
    };
    TeamDetailComponent.prototype.goBack = function () {
        window.history.back();
    };
    TeamDetailComponent.prototype.goToLocations = function () {
        //this.location.go('/locations');
        //this.router.navigate(['/locations']);
    };
    TeamDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-team-detail',
            templateUrl: 'app/team-detail.component.html'
        }), 
        __metadata('design:paramtypes', [team_service_1.TeamService, router_1.ActivatedRoute, common_1.Location])
    ], TeamDetailComponent);
    return TeamDetailComponent;
}());
exports.TeamDetailComponent = TeamDetailComponent;
//# sourceMappingURL=team-detail.component.js.map