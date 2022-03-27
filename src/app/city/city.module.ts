import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import { CityListComponent } from './city-list/city-list.component';
import { CityAddComponent } from './city-add/city-add.component';

const routes: Routes = [
  {
    path: '',
    component: CityListComponent
  },
  {
    path: ':countryId',
    component: CityListComponent
  }
]

@NgModule({
  declarations: [
    CityListComponent,
    CityAddComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CityModule { }
