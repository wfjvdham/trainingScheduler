import { Component } from '@angular/core';
import { LocationObject } from './location';
import { LocationService } from './location.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-locations',
  templateUrl: 'app/locations.component.html',
  providers: [LocationService]
})
export class LocationsComponent implements OnInit { 
  locationObjects: LocationObject[];

  constructor(
    private locationService: LocationService,
    private router: Router
  ) {};

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations(): void {
    this.locationService.getLocations().then(locationObjects => this.locationObjects = locationObjects);
  }

  gotoDetail(locationObject: LocationObject): void {
    if (locationObject) {
      this.router.navigate(['/locationDetail', locationObject._id]);
    } else {
      this.router.navigate(['/locationDetail', ""]);
    }
  }
  
}

