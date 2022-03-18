import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data: {email: string, password: string}): Observable<any> {
    return this.http.post<{token: string}>('https://taskfrontendapi.azurewebsites.net/api/user/login', data);
  }

  checkToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
