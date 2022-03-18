import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/countries',
    pathMatch: 'full'
  },
  {
    path: 'countries',
    loadChildren: () => import('./country/country.module').then(m => m.CountryModule)
  },
  {
    path: 'cities',
    loadChildren: () => import('./city/city.module').then(m => m.CityModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
