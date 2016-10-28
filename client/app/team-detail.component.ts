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
          .then(team => this.team = team);
      } else {
        this.team = new Team("",1,"");
      }
    });
  }

  update(): void {  
    this.teamService.update(this.team)
      .then(this.goBack);  
  } 

  create(): void {
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
