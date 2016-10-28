import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Solution } from './solution';

@Injectable()
export class SolutionService {
  private solutionsUrl = 'http://localhost:8080/api/solutions/';  // URL to web api
  
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

  createBody(solution: Solution): string {
    return "fieldID="+solution.fieldID+"&"+
            "locationID="+solution.location+"&"+
	          "dayOfTheWeek="+solution.dayOfWeek+"&"+
	          "startTime="+solution.startTime+"&"+
	          "endTime="+solution.endTime+"&"+
            "fieldNr="+solution.field+"&"+
            "asignedTo="+solution.asignedTo;
  }

  update(solution: Solution): Promise<Solution> {
    const url = `${this.solutionsUrl}${solution._id}`;
    return this.http
      .put(url, this.createBody(solution), {headers: this.headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);  
  }

  constructor(private http: Http) { }

  getSolutions(): Promise<Solution[]> {
    return this.http.get(this.solutionsUrl)
      .toPromise()
      .then(response => response.json() as Solution[])
      .catch(this.handleError);
  }

  getSolution(id: string): Promise<Solution> {
    return this.http.get(this.solutionsUrl + id)
      .toPromise()
      .then(response => response.json() as Solution)
      .catch(this.handleError);
  }

  create(solution: Solution): Promise<Solution> {
    return this.http
      .post(this.solutionsUrl, this.createBody(solution), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    let url = `${this.solutionsUrl}${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

}
