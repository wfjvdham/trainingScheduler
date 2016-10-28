import { Component, OnInit } from '@angular/core';
import { Team } from './team';
import { TeamService } from './team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-teams',
  templateUrl: 'app/teams.component.html',
  providers: [TeamService]
})
export class TeamsComponent implements OnInit { 
  teams: Team[];

  constructor(
    private teamService: TeamService,
    private router: Router
  ) {};

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams(): void {
    this.teamService.getTeams().then(teams => this.teams = teams);
  }

  gotoDetail(team: Team): void {
    if (team) {
      this.router.navigate(['/teamDetail', team._id]);
    } else {
      this.router.navigate(['/teamDetail', ""]);
    }
  }
  
}