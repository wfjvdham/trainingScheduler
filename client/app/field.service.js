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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var FieldService = (function () {
    function FieldService(http) {
        this.http = http;
        this.fieldsUrl = 'http://localhost:8080/api/fields/'; // URL to web api
        this.headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    }
    FieldService.prototype.createBody = function (field) {
        return "locationID=" + field.locationID + "&" +
            "dayOfTheWeek=" + field.dayOfTheWeek + "&" +
            "startTime=" + field.startTime + "&" +
            "endTime=" + field.endTime + "&" +
            "fieldNr=" + field.fieldNr;
    };
    FieldService.prototype.update = function (field) {
        var url = "" + this.fieldsUrl + field._id;
        return this.http
            .put(url, this.createBody(field), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    FieldService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    FieldService.prototype.getFields = function () {
        return this.http.get(this.fieldsUrl)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    FieldService.prototype.getField = function (id) {
        return this.http.get(this.fieldsUrl + id)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    FieldService.prototype.create = function (field) {
        return this.http
            .post(this.fieldsUrl, this.createBody(field), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    FieldService.prototype.delete = function (id) {
        var url = "" + this.fieldsUrl + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    FieldService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], FieldService);
    return FieldService;
}());
exports.FieldService = FieldService;
//# sourceMappingURL=field.service.js.map