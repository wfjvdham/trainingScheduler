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
var team_service_1 = require('./team.service');
var router_1 = require('@angular/router');
var TeamsComponent = (function () {
    function TeamsComponent(teamService, router) {
        this.teamService = teamService;
        this.router = router;
    }
    ;
    TeamsComponent.prototype.ngOnInit = function () {
        this.getTeams();
    };
    TeamsComponent.prototype.getTeams = function () {
        var _this = this;
        this.teamService.getTeams().then(function (teams) { return _this.teams = teams; });
    };
    TeamsComponent.prototype.getDays = function (dayOfTheWeek) {
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
    TeamsComponent.prototype.gotoDetail = function (team) {
        if (team) {
            this.router.navigate(['/teamDetail', team._id]);
        }
        else {
            this.router.navigate(['/teamDetail', ""]);
        }
    };
    TeamsComponent = __decorate([
        core_1.Component({
            selector: 'my-teams',
            templateUrl: 'app/teams.component.html',
            providers: [team_service_1.TeamService]
        }), 
        __metadata('design:paramtypes', [team_service_1.TeamService, router_1.Router])
    ], TeamsComponent);
    return TeamsComponent;
}());
exports.TeamsComponent = TeamsComponent;
//# sourceMappingURL=teams.component.js.map