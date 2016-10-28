import { Component, OnInit } from '@angular/core';
import { Trainer } from './trainer';
import { TrainerService } from './trainer.service';
import { Team } from './team';
import { TeamService } from './team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-trainers',
  templateUrl: 'app/trainers.component.html',
  providers: [TrainerService]
})
export class TrainersComponent implements OnInit { 
  trainers: Trainer[];
  teams: Team[];

  constructor(
    private trainerService: TrainerService,
    private teamService: TeamService,
    private router: Router
  ) {};

  ngOnInit(): void {
    this.getTrainers();
    this.teamService.getTeams().then(teams => this.teams = teams);
  }

  getTrainers(): void {
    this.trainerService.getTrainers().then(trainers => this.trainers = trainers);
  }

  gotoDetail(trainer: Trainer): void {
    if (trainer) {
      this.router.navigate(['/trainerDetail', trainer._id]);
    } else {
      this.router.navigate(['/trainerDetail', ""]);
    }
  }

  getTeamName(teamID: string) {
    var name = "not found";
    if (teamID!="-1") {
      var loc = this.teams.find(team => team._id === teamID);
      if (loc) {
        name = loc.name;
      }
    } else {
      name = "does not play"
    }
    return name;
  }

}