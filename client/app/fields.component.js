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
var field_service_1 = require('./field.service');
var location_service_1 = require('./location.service');
var router_1 = require('@angular/router');
var FieldsComponent = (function () {
    function FieldsComponent(fieldService, router, locationService) {
        this.fieldService = fieldService;
        this.router = router;
        this.locationService = locationService;
    }
    ;
    FieldsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getFields();
        this.locationService.getLocations().then(function (locationObjects) { return _this.locationObjects = locationObjects; });
    };
    FieldsComponent.prototype.getFields = function () {
        var _this = this;
        this.fieldService.getFields().then(function (fields) { return _this.fields = fields; });
    };
    FieldsComponent.prototype.gotoDetail = function (field) {
        if (field) {
            this.router.navigate(['/fieldDetail', field._id]);
        }
        else {
            this.router.navigate(['/fieldDetail', ""]);
        }
    };
    FieldsComponent.prototype.getLocationName = function (locationID) {
        var loc = this.locationObjects.find(function (locationObject) { return locationObject._id === locationID; });
        var name = "not found";
        if (loc) {
            name = loc.name;
        }
        return name;
    };
    FieldsComponent.prototype.getDays = function (dayOfTheWeek) {
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
    FieldsComponent = __decorate([
        core_1.Component({
            selector: 'my-fields',
            templateUrl: 'app/fields.component.html',
            providers: [field_service_1.FieldService]
        }), 
        __metadata('design:paramtypes', [field_service_1.FieldService, router_1.Router, location_service_1.LocationService])
    ], FieldsComponent);
    return FieldsComponent;
}());
exports.FieldsComponent = FieldsComponent;
//# sourceMappingURL=fields.component.js.map