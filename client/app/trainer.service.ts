import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Trainer } from './trainer';

@Injectable()
export class TrainerService {
  private trainersUrl = 'http://localhost:8080/api/trainers/';  // URL to web api
  
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

  createBody(trainer: Trainer): string {
    return "trains="+trainer.trains+"&"+
	              "name="+trainer.name+"&"+
                "inTeam="+trainer.inTeam;
  }

  update(trainer: Trainer): Promise<Trainer> {
    const url = `${this.trainersUrl}${trainer._id}`;
    return this.http
      .put(url, this.createBody(trainer), {headers: this.headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);  
  }

  constructor(private http: Http) { }

  getTrainers(): Promise<Trainer[]> {
    return this.http.get(this.trainersUrl)
      .toPromise()
      .then(response => response.json() as Trainer[])
      .catch(this.handleError);
  }

  getTrainer(id: string): Promise<Trainer> {
    return this.http.get(this.trainersUrl + id)
      .toPromise()
      .then(response => response.json() as Trainer)
      .catch(this.handleError);
  }

  create(trainer: Trainer): Promise<Trainer> {
    return this.http
      .post(this.trainersUrl, this.createBody(trainer), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    let url = `${this.trainersUrl}${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

}
