import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AutheticationService} from "./service/authetication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private autheticationService: AutheticationService) {}

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if(httpRequest.url.includes(`${this.autheticationService.host}/user/login`)){
      return httpHandler.handle(httpRequest);
    }

    if(httpRequest.url.includes(`${this.autheticationService.host}/user/register`)){
      return httpHandler.handle(httpRequest);
    }

    if(httpRequest.url.includes(`${this.autheticationService.host}/user/resetpassword`)){
      return httpHandler.handle(httpRequest);
    }
    this.autheticationService.loadToken();
    const token = this.autheticationService.getToken();
    const request = httpRequest.clone({setHeaders:{authentication:`Bearer ${token}`}});
    return httpHandler.handle(request);
  }
}
