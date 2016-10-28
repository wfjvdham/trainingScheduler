import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Field } from './field';

@Injectable()
export class FieldService {
  private fieldsUrl = 'http://localhost:8080/api/fields/';  // URL to web api
  
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

  createBody(field: Field): string {
    return "locationID="+field.locationID+"&"+
	              "dayOfTheWeek="+field.dayOfTheWeek+"&"+
	              "startTime="+field.startTime+"&"+
	              "endTime="+field.endTime+"&"+
	              "fieldNr="+field.fieldNr;
  }

  update(field: Field): Promise<Field> {
    const url = `${this.fieldsUrl}${field._id}`;
    return this.http
      .put(url, this.createBody(field), {headers: this.headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);  
  }

  constructor(private http: Http) { }

  getFields(): Promise<Field[]> {
    return this.http.get(this.fieldsUrl)
      .toPromise()
      .then(response => response.json() as Field[])
      .catch(this.handleError);
  }

  getField(id: string): Promise<Field> {
    return this.http.get(this.fieldsUrl + id)
      .toPromise()
      .then(response => response.json() as Field)
      .catch(this.handleError);
  }

  create(field: Field): Promise<Field> {
    return this.http
      .post(this.fieldsUrl, this.createBody(field), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    let url = `${this.fieldsUrl}${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

}
