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
var location_service_1 = require('./location.service');
var router_1 = require('@angular/router');
var LocationsComponent = (function () {
    function LocationsComponent(locationService, router) {
        this.locationService = locationService;
        this.router = router;
    }
    ;
    LocationsComponent.prototype.ngOnInit = function () {
        this.getLocations();
    };
    LocationsComponent.prototype.getLocations = function () {
        var _this = this;
        this.locationService.getLocations().then(function (locationObjects) { return _this.locationObjects = locationObjects; });
    };
    LocationsComponent.prototype.gotoDetail = function (locationObject) {
        if (locationObject) {
            this.router.navigate(['/locationDetail', locationObject._id]);
        }
        else {
            this.router.navigate(['/locationDetail', ""]);
        }
    };
    LocationsComponent = __decorate([
        core_1.Component({
            selector: 'my-locations',
            templateUrl: 'app/locations.component.html',
            providers: [location_service_1.LocationService]
        }), 
        __metadata('design:paramtypes', [location_service_1.LocationService, router_1.Router])
    ], LocationsComponent);
    return LocationsComponent;
}());
exports.LocationsComponent = LocationsComponent;
//# sourceMappingURL=locations.component.js.map