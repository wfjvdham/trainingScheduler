import { Component } from '@angular/core';
import { Field } from './field';
import { FieldService } from './field.service';
import { LocationObject } from './location';
import { LocationService } from './location.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-fields',
  templateUrl: 'app/fields.component.html',
  providers: [FieldService]
})
export class FieldsComponent implements OnInit { 
  fields: Field[];
  locationObjects: LocationObject[];

  constructor(
    private fieldService: FieldService,
    private router: Router,
    private locationService: LocationService
  ) {};

  ngOnInit(): void {
    this.getFields();
    this.locationService.getLocations().then(locationObjects => this.locationObjects = locationObjects);
  }

  getFields(): void {
    this.fieldService.getFields().then(fields => this.fields = fields);
  }

  gotoDetail(field: Field): void {
    if (field) {
      this.router.navigate(['/fieldDetail', field._id]);
    } else {
      this.router.navigate(['/fieldDetail', ""]);
    }
  }

  getLocationName(locationID: string): string {
    var loc = this.locationObjects.find(locationObject => locationObject._id === locationID);
    var name = "not found";
    if (loc) {
      name = loc.name;
    }
    return name;
  }

  getDays(dayOfTheWeek: string): string {
    var array = JSON.parse("[" + dayOfTheWeek + "]");
    var result = "";
    for (var i = 0; i < array.length; i++) { 
      var day = array[i];
      if (day == 1) {
        result = result + "Monday, ";
      }
      if (day == 2) {
        result = result + "Tuesday, ";
      }
      if (day == 3) {
        result = result + "Wednesday, ";
      }
      if (day == 4) {
        result = result + "Thursday, ";
      }
      if (day == 5) {
        result = result + "Friday, ";
      }
      if (day == 6) {
        result = result + "Saturday, ";
      }
      if (day == 7) {
        result = result + "Sunday, ";
      }
    }
    return result.substring(0, result.length-2);
  }
  
}