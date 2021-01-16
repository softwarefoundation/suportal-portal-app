import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AutheticationService} from "./service/authetication.service";
import {UserService} from "./service/user.service";
import {AuthInterceptor} from "./auth.interceptor";
import {NotificationModule} from "./notification.module";
import {NotificationService} from "./service/notification.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotificationModule
  ],
  providers: [NotificationService,AutheticationService,UserService,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
