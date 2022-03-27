import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {I_Country} from "./country.modal";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  domain = environment.domain;

  constructor(
    private http: HttpClient
  ) { }

  getCountries(): Observable<any> {
    return this.http.get<any>(this.domain + 'country');
  }

  addCountry(data: {name: string}): Observable<any> {
    return this.http.post<I_Country>(this.domain + 'country', data);
  }

  updateCountry(data: I_Country): Observable<any> {
    return this.http.put<I_Country>(this.domain + 'country', data);
  }

  deleteCountry(id: number): Observable<any> {
    return this.http.delete<I_Country>(this.domain + 'country/' + id);
  }
}
