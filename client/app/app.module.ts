import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { AppComponent }        from './app.component';
import { LocationDetailComponent } from './location-detail.component';
import { LocationsComponent }     from './locations.component';
import { LocationService }         from './location.service';
import { FieldDetailComponent } from './field-detail.component';
import { FieldsComponent }     from './fields.component';
import { FieldService }         from './field.service';
import { TeamDetailComponent } from './team-detail.component';
import { TeamsComponent }     from './teams.component';
import { TeamService }         from './team.service';
import { TrainerDetailComponent } from './trainer-detail.component';
import { TrainersComponent }     from './trainers.component';
import { TrainerService }         from './trainer.service';
import { SolutionService }         from './solution.service';
import { DashboardComponent }     from './dashboard.component';
import { routing } from './app.routing';
import { HttpModule }    from '@angular/http';
import './rxjs-extensions';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    LocationDetailComponent,
    LocationsComponent,
    FieldDetailComponent,
    FieldsComponent,
    TeamsComponent,
    TeamDetailComponent,
    TrainersComponent,
    TrainerDetailComponent,
    DashboardComponent
  ],
  providers: [
    LocationService,
    FieldService,
    TeamService,
    TrainerService,
    SolutionService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}