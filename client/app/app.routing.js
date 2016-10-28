"use strict";
var router_1 = require('@angular/router');
var locations_component_1 = require('./locations.component');
var dashboard_component_1 = require('./dashboard.component');
var location_detail_component_1 = require('./location-detail.component');
var field_detail_component_1 = require('./field-detail.component');
var fields_component_1 = require('./fields.component');
var team_detail_component_1 = require('./team-detail.component');
var teams_component_1 = require('./teams.component');
var trainer_detail_component_1 = require('./trainer-detail.component');
var trainers_component_1 = require('./trainers.component');
var appRoutes = [
    {
        path: 'locationDetail/:id',
        component: location_detail_component_1.LocationDetailComponent
    },
    {
        path: 'fieldDetail/:id',
        component: field_detail_component_1.FieldDetailComponent
    },
    {
        path: 'teamDetail/:id',
        component: team_detail_component_1.TeamDetailComponent
    },
    {
        path: 'trainerDetail/:id',
        component: trainer_detail_component_1.TrainerDetailComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent
    },
    {
        path: 'locations',
        component: locations_component_1.LocationsComponent
    },
    {
        path: 'fields',
        component: fields_component_1.FieldsComponent
    },
    {
        path: 'teams',
        component: teams_component_1.TeamsComponent
    },
    {
        path: 'trainers',
        component: trainers_component_1.TrainersComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map