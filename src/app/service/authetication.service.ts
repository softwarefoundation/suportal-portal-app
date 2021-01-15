import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class AutheticationService {

  private host = environment.apiUrl;
  private token: string = '';
  private loggedInUserName: string = '';

  constructor(private http: HttpClient) { }

  public login (user:User):Observable<HttpResponse<any> | HttpErrorResponse>{
    return this.http.post<HttpResponse<any> | HttpErrorResponse>(
        `${this.host}/user/login`, user, {observe: 'response'}
    );
  }

  public register (user:User):Observable<HttpResponse<any> | HttpErrorResponse>{
    return this.http.post<HttpResponse<any> | HttpErrorResponse>(
        `${this.host}/user/register`, user
    );
  }

  public logout(): void {
    this.token = '';
    this.loggedInUserName = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

}
