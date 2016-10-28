import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { LocationObject } from './location';

@Injectable()
export class LocationService {
  private locationsUrl = 'http://localhost:8080/api/locations/';  // URL to web api
  
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

  update(locationObject: LocationObject): Promise<Location> {
    const url = `${this.locationsUrl}${locationObject._id}`;
    return this.http
      .put(url, "name="+locationObject.name, {headers: this.headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);  
  }

  constructor(private http: Http) { }

  getLocations(): Promise<LocationObject[]> {
     return this.http.get(this.locationsUrl)
               .toPromise()
               .then(response => response.json() as LocationObject[])
               .catch(this.handleError);
  }

  getLocation(id: string): Promise<LocationObject> {
    return this.http.get(this.locationsUrl + id)
      .toPromise()
      .then(response => response.json() as LocationObject)
      .catch(this.handleError);
  }

  create(locationObject: LocationObject): Promise<LocationObject> {
    return this.http
      .post(this.locationsUrl, "name="+locationObject.name, {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    let url = `${this.locationsUrl}${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

}
