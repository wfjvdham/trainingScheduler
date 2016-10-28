import { Component, OnInit }              from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }                       from '@angular/common';

import { FieldService }                from './field.service';
import { Field }                 from './field';
import { LocationService }                from './location.service';
import { LocationObject }                 from './location';

@Component({
  selector: 'my-field-detail',
  templateUrl: 'app/field-detail.component.html'
})
export class FieldDetailComponent implements OnInit {
  //TODO add validation
  field: Field;
  locationObjects: LocationObject[];
  monday: Boolean = false;
  tuesday: Boolean = false;
  wednesday: Boolean = false;
  thursday: Boolean = false;
  friday: Boolean = false;
  saturday: Boolean = false;
  sunday: Boolean = false;

  constructor(
    private fieldService: FieldService,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      if (id != "") {
        this.fieldService.getField(id)
          .then(field => this.field = field)
          .then(field => this.initDayValues(field));
      } else {
        this.field = new Field("","","-1","","",1);
      }
    });
    this.locationService.getLocations().then(locationObjects => this.locationObjects = locationObjects);
  }

  initDayValues(field :Field): void {
    var array = JSON.parse("[" + field.dayOfTheWeek + "]");
    for (var i = 0; i < array.length; i++) { 
      var day = array[i];
      if (day == 1) {
        this.monday = true;
      }
      if (day == 2) {
        this.tuesday = true;
      }
      if (day == 3) {
        this.wednesday = true;
      }
      if (day == 4) {
        this.thursday = true;
      }
      if (day == 5) {
        this.friday = true;
      }
      if (day == 6) {
        this.saturday = true;
      }
      if (day == 7) {
        this.sunday = true;
      }
    }
  }

  createDayArray(): Array<number> {
    var dayArray = [];
    if(this.monday) {
      dayArray.push(1);
    }
    if(this.tuesday) {
      dayArray.push(2);
    }
    if(this.wednesday) {
      dayArray.push(3);
    }
    if(this.thursday) {
      dayArray.push(4);
    }
    if(this.friday) {
      dayArray.push(5);
    }
    if(this.saturday) {
      dayArray.push(6);
    }
    if(this.sunday) {
      dayArray.push(7);
    }
    return dayArray;
  }

  update(): void {
    this.field.dayOfTheWeek = this.createDayArray().toString(); 
    this.fieldService.update(this.field)
      .then(this.goBack);  
  } 

  create(): void {
    this.field.dayOfTheWeek = this.createDayArray().toString();
    this.fieldService.create(this.field)
      .then(this.goBack); 
  }

  delete(): void {
    this.fieldService.delete(this.field._id)
      .then(this.goBack);
  }

  goBack(): void {
    window.history.back();
  }

  goToLocations(): void {
    //this.location.go('/locations');
    //this.router.navigate(['/locations']);
  }

  changeDay(element: HTMLInputElement): void {
    switch(element.name) {
      case "monday":
        this.monday = element.checked;
        break;
      case "tuesday":
        this.tuesday = element.checked;
        break;
      case "wednesday":
        this.wednesday = element.checked;
        break;
      case "thursday":
        this.thursday = element.checked;
        break;
      case "friday":
        this.friday = element.checked;
        break;
      case "saturday":
        this.saturday = element.checked;
        break;  
      default:
        this.sunday = element.checked;
    }
  }

  log(): void {
    console.log(this.field);
    console.log(this.monday);
    console.log(this.tuesday);
    console.log(this.wednesday);
    console.log(this.thursday);
    console.log(this.friday);
    console.log(this.saturday);
    console.log(this.sunday);
    console.log(this.createDayArray());
  }

}
