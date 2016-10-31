import { Component, OnInit }              from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }                       from '@angular/common';

import { TrainerService }                 from './trainer.service';
import { Trainer }                        from './trainer';
import { TeamService }                 from './team.service';
import { Team }                        from './team';

@Component({
  selector: 'my-trainer-detail',
  templateUrl: 'app/trainer-detail.component.html'
})
export class TrainerDetailComponent implements OnInit {

  trainer: Trainer;
  teams: Team[];
  monday: Boolean = true;
  tuesday: Boolean = true;
  wednesday: Boolean = true;
  thursday: Boolean = true;
  friday: Boolean = true;

  constructor(
    private trainerService: TrainerService,
    private teamService: TeamService,
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      if (id != "") {
        this.trainerService.getTrainer(id)
          .then(trainer => this.trainer = trainer)
          .then(trainer => this.initDayValues(trainer));
      } else {
        this.trainer = new Trainer("","","","","-1");
      }
    });
    this.teamService.getTeams().then(teams => this.teams = teams);
  }

  initDayValues(trainer :Trainer): void {
    var array = JSON.parse("[" + trainer.dayOfTheWeek + "]");
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

  update(): void {  
    this.trainer.dayOfTheWeek = this.createDayArray().toString();
    this.trainerService.update(this.trainer)
      .then(this.goBack);  
  } 

  create(): void {
    this.trainer.dayOfTheWeek = this.createDayArray().toString();
    this.trainerService.create(this.trainer)
      .then(this.goBack); 
  }

  delete(): void {
    this.trainerService.delete(this.trainer._id)
      .then(this.goBack);
  }

  goBack(): void {
    window.history.back();
  }

  goToLocations(): void {
    //this.location.go('/locations');
    //this.router.navigate(['/locations']);
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

}
