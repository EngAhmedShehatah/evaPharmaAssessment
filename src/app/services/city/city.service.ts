import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {I_City} from "./city.modal";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CityService {
  domain = environment.domain;

  constructor(private http: HttpClient) { }

  getCities(): Observable<any> {
    return this.http.get<I_City[]>(this.domain + 'city');
  }

  addCity(city: {name: string, countryId: number}): Observable<any> {
    return this.http.post<I_City[]>(this.domain + 'city', city);
  }

  updateCity(data: {id: number, name: string, countryId: number}): Observable<any> {
    return this.http.put<I_City[]>(this.domain + 'city', data);
  }

  deleteCity(id: number): Observable<any> {
    return this.http.delete<I_City[]>(this.domain + 'city/' + id);
  }

  getCitiesOfCountry(id: number): Observable<any> {
    return this.http.get<I_City[]>(this.domain + 'city/getcities/' + id);
  }
}
