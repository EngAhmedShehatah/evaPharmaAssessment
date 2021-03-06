import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FullComponent} from "./layouts/full/full.component";
import {BlankComponent} from "./layouts/blank/blank.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./services/auth/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/countries',
    pathMatch: 'full'
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'countries',
        loadChildren: () => import('./country/country.module').then(m => m.CountryModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'cities',
        loadChildren: () => import('./city/city.module').then(m => m.CityModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
