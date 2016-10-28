import { Component, OnInit }              from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }                       from '@angular/common';

import { LocationService }                from './location.service';
import { LocationObject }                 from './location';

@Component({
  selector: 'my-location-detail',
  templateUrl: 'app/location-detail.component.html'
})
export class LocationDetailComponent implements OnInit {

  locationObject: LocationObject;

  constructor(
    private locationService: LocationService,
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      if (id != "") {
        this.locationService.getLocation(id)
          .then(locationObject => this.locationObject = locationObject);
      } else {
        this.locationObject = new LocationObject("","")
      }
    });
  }

  update(): void {  
    this.locationService.update(this.locationObject)
      .then(this.goBack);  
  } 

  create(): void {
    this.locationService.create(this.locationObject)
      .then(this.goBack); 
  }

  delete(): void {
    this.locationService.delete(this.locationObject._id)
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
