import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Solution } from './solution';
import { SolutionService } from './solution.service';
import { Team } from './team';
import { TeamService } from './team.service';
import { LocationService } from './location.service';
import { LocationObject } from './location';
import { Trainer } from './trainer';
import { TrainerService } from './trainer.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

class Res {
    constructor(public result: boolean) {}
};

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  
  solutions: Solution[];
  locationObjects: LocationObject[];
  teams: Team[];
  trainers: Trainer[];

  constructor(
    private router: Router,
    private http: Http,
    private solutionService: SolutionService,
    private locationService: LocationService,
    private teamService: TeamService,
    private trainerService: TrainerService) {}

  ngOnInit(): void {
    this.solutionService.getSolutions()
      .then(solutions => this.solutions = solutions)
      .then(solutions => this.sortSolutions());
    this.trainerService.getTrainers().then(trainers => this.trainers = trainers);
    this.locationService.getLocations().then(locationObjects => this.locationObjects = locationObjects);
    this.teamService.getTeams().then(teams => this.teams = teams);
  }

  log(): void {
    console.log(this.solutions);
    console.log(this.locationObjects);
    console.log(this.teams);
    console.log(this.trainers);
  }

  sortSolutions(): void {
    this.solutions.sort((h1, h2) => {
      return h1.dayOfWeek < h2.dayOfWeek ? -1 :
            (h1.dayOfWeek > h2.dayOfWeek ? 1 : 0);
    });
  }

  gotoLocationDetail(): void {
    this.router.navigate(['/locationDetail', ""]);
  }

  gotoFieldDetail(): void {
    this.router.navigate(['/fieldDetail', ""]);
  }

  gotoTeamDetail(): void {
    this.router.navigate(['/teamDetail', ""]);
  }

  gotoTrainerDetail(): void {
    this.router.navigate(['/trainerDetail', ""]);
  }

  updateSchedule(): void {
    var fieldsUrl = 'http://localhost:8080/api/';  // URL to web api
    var headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    this.http
      .get(fieldsUrl, {headers: headers})
      .toPromise()
      .then(res => this.reloadTable())
      .catch(this.handleError);
  }

  reloadTable(): void {
    this.solutionService.getSolutions()
      .then(solutions => this.solutions = solutions)
      .then(solutions => this.sortSolutions());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);  
  }

  getLocationName(locationID: string): string {
    var loc = this.locationObjects.find(locationObject => locationObject._id === locationID);
    var name = "not found";
    if (loc) {
      name = loc.name;
    }
    return name;
  }

  getTeamName(teamID: string): string {
    var loc = this.teams.find(team => team._id === teamID);
    var name = "not found";
    if (loc) {
      name = loc.name;
    }
    return name;
  }

  getTrainer(teamID: string): string {
    var loc = this.trainers.find(trainer => trainer.trains === teamID);
    var name = "not found";
    if (loc) {
      name = loc.name;
    }
    return name;
  }

  getTime(minutes: number): string {
    var hours = String(minutes/60);
    if(hours.length==1) {
      hours = "0"+hours;
    }
    var min = String(minutes%60);
    if(min.length==1) {
      min = "0"+min;
    }
    return hours+":"+min;
  }

  getDays(dayOfTheWeek: string): string {
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
    return result.substring(0, result.length-2);
  }
  
}

