import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Team } from './team';

@Injectable()
export class TeamService {
  private teamsUrl = 'http://localhost:8080/api/teams/';  // URL to web api
  
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

  createBody(team: Team): string {
    return "nrOfTrainings="+team.nrOfTrainings+"&"+
	              "name="+team.name;
  }

  update(team: Team): Promise<Team> {
    const url = `${this.teamsUrl}${team._id}`;
    return this.http
      .put(url, this.createBody(team), {headers: this.headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);  
  }

  constructor(private http: Http) { }

  getTeams(): Promise<Team[]> {
    return this.http.get(this.teamsUrl)
      .toPromise()
      .then(response => response.json() as Team[])
      .catch(this.handleError);
  }

  getTeam(id: string): Promise<Team> {
    return this.http.get(this.teamsUrl + id)
      .toPromise()
      .then(response => response.json() as Team)
      .catch(this.handleError);
  }

  create(team: Team): Promise<Team> {
    return this.http
      .post(this.teamsUrl, this.createBody(team), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    let url = `${this.teamsUrl}${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

}
