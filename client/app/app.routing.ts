import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationsComponent }      from './locations.component';
import { DashboardComponent }      from './dashboard.component';
import { LocationDetailComponent }      from './location-detail.component';
import { FieldDetailComponent }      from './field-detail.component';
import { FieldsComponent }      from './fields.component';
import { TeamDetailComponent }      from './team-detail.component';
import { TeamsComponent }      from './teams.component';
import { TrainerDetailComponent }      from './trainer-detail.component';
import { TrainersComponent }      from './trainers.component';

const appRoutes: Routes = [
  {
    path: 'locationDetail/:id',
    component: LocationDetailComponent
  },
  {
    path: 'fieldDetail/:id',
    component: FieldDetailComponent
  },
  {
    path: 'teamDetail/:id',
    component: TeamDetailComponent
  },
  {
    path: 'trainerDetail/:id',
    component: TrainerDetailComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'locations',
    component: LocationsComponent
  },
  {
    path: 'fields',
    component: FieldsComponent
  },
  {
    path: 'teams',
    component: TeamsComponent
  },
  {
    path: 'trainers',
    component: TrainersComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);