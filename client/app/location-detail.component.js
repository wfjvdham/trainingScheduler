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
var location_service_1 = require('./location.service');
var location_1 = require('./location');
var LocationDetailComponent = (function () {
    function LocationDetailComponent(locationService, route, location) {
        this.locationService = locationService;
        this.route = route;
        this.location = location;
    }
    LocationDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = params['id'];
            if (id != "") {
                _this.locationService.getLocation(id)
                    .then(function (locationObject) { return _this.locationObject = locationObject; });
            }
            else {
                _this.locationObject = new location_1.LocationObject("", "");
            }
        });
    };
    LocationDetailComponent.prototype.update = function () {
        this.locationService.update(this.locationObject)
            .then(this.goBack);
    };
    LocationDetailComponent.prototype.create = function () {
        this.locationService.create(this.locationObject)
            .then(this.goBack);
    };
    LocationDetailComponent.prototype.delete = function () {
        this.locationService.delete(this.locationObject._id)
            .then(this.goBack);
    };
    LocationDetailComponent.prototype.goBack = function () {
        window.history.back();
    };
    LocationDetailComponent.prototype.goToLocations = function () {
        //this.location.go('/locations');
        //this.router.navigate(['/locations']);
    };
    LocationDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-location-detail',
            templateUrl: 'app/location-detail.component.html'
        }), 
        __metadata('design:paramtypes', [location_service_1.LocationService, router_1.ActivatedRoute, common_1.Location])
    ], LocationDetailComponent);
    return LocationDetailComponent;
}());
exports.LocationDetailComponent = LocationDetailComponent;
//# sourceMappingURL=location-detail.component.js.map