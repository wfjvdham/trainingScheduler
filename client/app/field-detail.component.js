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
var field_service_1 = require('./field.service');
var field_1 = require('./field');
var location_service_1 = require('./location.service');
var FieldDetailComponent = (function () {
    function FieldDetailComponent(fieldService, locationService, route, location) {
        this.fieldService = fieldService;
        this.locationService = locationService;
        this.route = route;
        this.location = location;
        this.monday = false;
        this.tuesday = false;
        this.wednesday = false;
        this.thursday = false;
        this.friday = false;
        this.saturday = false;
        this.sunday = false;
    }
    FieldDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = params['id'];
            if (id != "") {
                _this.fieldService.getField(id)
                    .then(function (field) { return _this.field = field; })
                    .then(function (field) { return _this.initDayValues(field); });
            }
            else {
                _this.field = new field_1.Field("", "", "-1", "", "", 1);
            }
        });
        this.locationService.getLocations().then(function (locationObjects) { return _this.locationObjects = locationObjects; });
    };
    FieldDetailComponent.prototype.initDayValues = function (field) {
        var array = JSON.parse("[" + field.dayOfTheWeek + "]");
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
            if (day == 6) {
                this.saturday = true;
            }
            if (day == 7) {
                this.sunday = true;
            }
        }
    };
    FieldDetailComponent.prototype.createDayArray = function () {
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
        if (this.saturday) {
            dayArray.push(6);
        }
        if (this.sunday) {
            dayArray.push(7);
        }
        return dayArray;
    };
    FieldDetailComponent.prototype.update = function () {
        this.field.dayOfTheWeek = this.createDayArray().toString();
        this.fieldService.update(this.field)
            .then(this.goBack);
    };
    FieldDetailComponent.prototype.create = function () {
        this.field.dayOfTheWeek = this.createDayArray().toString();
        this.fieldService.create(this.field)
            .then(this.goBack);
    };
    FieldDetailComponent.prototype.delete = function () {
        this.fieldService.delete(this.field._id)
            .then(this.goBack);
    };
    FieldDetailComponent.prototype.goBack = function () {
        window.history.back();
    };
    FieldDetailComponent.prototype.goToLocations = function () {
        //this.location.go('/locations');
        //this.router.navigate(['/locations']);
    };
    FieldDetailComponent.prototype.changeDay = function (element) {
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
            case "friday":
                this.friday = element.checked;
                break;
            case "saturday":
                this.saturday = element.checked;
                break;
            default:
                this.sunday = element.checked;
        }
    };
    FieldDetailComponent.prototype.log = function () {
        console.log(this.field);
        console.log(this.monday);
        console.log(this.tuesday);
        console.log(this.wednesday);
        console.log(this.thursday);
        console.log(this.friday);
        console.log(this.saturday);
        console.log(this.sunday);
        console.log(this.createDayArray());
    };
    FieldDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-field-detail',
            templateUrl: 'app/field-detail.component.html'
        }), 
        __metadata('design:paramtypes', [field_service_1.FieldService, location_service_1.LocationService, router_1.ActivatedRoute, common_1.Location])
    ], FieldDetailComponent);
    return FieldDetailComponent;
}());
exports.FieldDetailComponent = FieldDetailComponent;
//# sourceMappingURL=field-detail.component.js.map