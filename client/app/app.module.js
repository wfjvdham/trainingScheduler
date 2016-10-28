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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var app_component_1 = require('./app.component');
var location_detail_component_1 = require('./location-detail.component');
var locations_component_1 = require('./locations.component');
var location_service_1 = require('./location.service');
var field_detail_component_1 = require('./field-detail.component');
var fields_component_1 = require('./fields.component');
var field_service_1 = require('./field.service');
var team_detail_component_1 = require('./team-detail.component');
var teams_component_1 = require('./teams.component');
var team_service_1 = require('./team.service');
var trainer_detail_component_1 = require('./trainer-detail.component');
var trainers_component_1 = require('./trainers.component');
var trainer_service_1 = require('./trainer.service');
var solution_service_1 = require('./solution.service');
var dashboard_component_1 = require('./dashboard.component');
var app_routing_1 = require('./app.routing');
var http_1 = require('@angular/http');
require('./rxjs-extensions');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_1.routing
            ],
            declarations: [
                app_component_1.AppComponent,
                location_detail_component_1.LocationDetailComponent,
                locations_component_1.LocationsComponent,
                field_detail_component_1.FieldDetailComponent,
                fields_component_1.FieldsComponent,
                teams_component_1.TeamsComponent,
                team_detail_component_1.TeamDetailComponent,
                trainers_component_1.TrainersComponent,
                trainer_detail_component_1.TrainerDetailComponent,
                dashboard_component_1.DashboardComponent
            ],
            providers: [
                location_service_1.LocationService,
                field_service_1.FieldService,
                team_service_1.TeamService,
                trainer_service_1.TrainerService,
                solution_service_1.SolutionService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map