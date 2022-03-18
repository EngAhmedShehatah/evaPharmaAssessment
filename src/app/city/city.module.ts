import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CityComponent} from "./city.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: CityComponent
  }
]

@NgModule({
  declarations: [
    CityComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CityModule { }
