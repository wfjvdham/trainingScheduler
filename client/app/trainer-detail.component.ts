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
          .then(trainer => this.trainer = trainer);
      } else {
        this.trainer = new Trainer("","","","");
      }
    });
    this.teamService.getTeams().then(teams => this.teams = teams);
  }

  update(): void {  
    this.trainerService.update(this.trainer)
      .then(this.goBack);  
  } 

  create(): void {
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

}
