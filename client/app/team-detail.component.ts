import { Component, OnInit }              from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }                       from '@angular/common';

import { TeamService }                    from './team.service';
import { Team }                           from './team';

@Component({
  selector: 'my-team-detail',
  templateUrl: 'app/team-detail.component.html'
})
export class TeamDetailComponent implements OnInit {

  team: Team;
  monday: Boolean = true;
  tuesday: Boolean = true;
  wednesday: Boolean = true;
  thursday: Boolean = true;
  friday: Boolean = true;

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      if (id != "") {
        this.teamService.getTeam(id)
          .then(team => this.team = team)
          .then(team => this.initDayValues(team));
      } else {
        this.team = new Team("",1,"","");
      }
    });
  }

  initDayValues(team :Team): void {
    var array = JSON.parse("[" + team.dayOfTheWeek + "]");
    this.monday = false;
    this.tuesday = false;
    this.wednesday = false;
    this.thursday = false;
    this.friday = false;
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
    }
  }

  createDayArray(): Array<number> {
    var dayArray = [];
    if(this.monday) {
      dayArray.push(1);
    }
    if(this.tuesday) {
      dayArray.push(2);
    }
    if(this.wednesday) {
      dayArray.push(3);
    }
    if(this.thursday) {
      dayArray.push(4);
    }
    if(this.friday) {
      dayArray.push(5);
    }
    return dayArray;
  }

  changeDay(element: HTMLInputElement): void {
    switch(element.name) {
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
      default:
        this.friday = element.checked;
    }
  }

  update(): void {  
    this.team.dayOfTheWeek = this.createDayArray().toString();
    this.teamService.update(this.team)
      .then(this.goBack);  
  } 

  create(): void {
    this.team.dayOfTheWeek = this.createDayArray().toString();
    this.teamService.create(this.team)
      .then(this.goBack); 
  }

  delete(): void {
    this.teamService.delete(this.team._id)
      .then(this.goBack);
  }

  goBack(): void {
    window.history.back();
  }

  goToLocations(): void {
    //this.location.go('/locations');
    //this.router.navigate(['/locations']);
  }

}
