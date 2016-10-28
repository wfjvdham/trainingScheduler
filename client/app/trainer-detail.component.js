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
    }
    TrainerDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = params['id'];
            if (id != "") {
                _this.trainerService.getTrainer(id)
                    .then(function (trainer) { return _this.trainer = trainer; });
            }
            else {
                _this.trainer = new trainer_1.Trainer("", "", "", "");
            }
        });
        this.teamService.getTeams().then(function (teams) { return _this.teams = teams; });
    };
    TrainerDetailComponent.prototype.update = function () {
        this.trainerService.update(this.trainer)
            .then(this.goBack);
    };
    TrainerDetailComponent.prototype.create = function () {
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