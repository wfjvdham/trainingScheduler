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
var SolutionService = (function () {
    function SolutionService(http) {
        this.http = http;
        this.solutionsUrl = 'http://localhost:8080/api/solutions/'; // URL to web api
        this.headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    }
    SolutionService.prototype.createBody = function (solution) {
        return "fieldID=" + solution.fieldID + "&" +
            "locationID=" + solution.location + "&" +
            "dayOfTheWeek=" + solution.dayOfWeek + "&" +
            "startTime=" + solution.startTime + "&" +
            "endTime=" + solution.endTime + "&" +
            "fieldNr=" + solution.field + "&" +
            "asignedTo=" + solution.asignedTo;
    };
    SolutionService.prototype.update = function (solution) {
        var url = "" + this.solutionsUrl + solution._id;
        return this.http
            .put(url, this.createBody(solution), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SolutionService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    SolutionService.prototype.getSolutions = function () {
        return this.http.get(this.solutionsUrl)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SolutionService.prototype.getSolution = function (id) {
        return this.http.get(this.solutionsUrl + id)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SolutionService.prototype.create = function (solution) {
        return this.http
            .post(this.solutionsUrl, this.createBody(solution), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    SolutionService.prototype.delete = function (id) {
        var url = "" + this.solutionsUrl + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    SolutionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SolutionService);
    return SolutionService;
}());
exports.SolutionService = SolutionService;
//# sourceMappingURL=solution.service.js.map