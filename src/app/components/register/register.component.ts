import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AutheticationService} from "../../service/authetication.service";
import {User} from "../../model/User";
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationTypeEnum} from "../../enum/notification-type.enum";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements  OnInit, OnDestroy {

  public showLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private router:Router,
              private autheticationService:AutheticationService,
              private notificationService:NotificationService) { }

  ngOnInit(): void {
    if(this.autheticationService.isLoggedIn()){
      this.router.navigateByUrl('/user/management');
    }
  }

  public onRegister(user:User){
    this.showLoading = true;
    console.log(user);
    this.subscriptions.push(
        this.autheticationService.register(user).subscribe(
            (response: User) => {
              this.showLoading = false;
              this.sendNotification(NotificationTypeEnum.SUCCESS,`\\O/ Nova conta registrada para ${response.nome}. 
               Por favor, verifique seu e-mail!`)
            },
            (errorResponse:HttpErrorResponse) =>{
              console.log(errorResponse);
              this.sendNotification(NotificationTypeEnum.ERROR,errorResponse.error.message)
            }
        )
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private sendNotification(notificationTypeEnum: NotificationTypeEnum, message: string): void {
    if(message){
      console.log(message);
      this.notificationService.notify(notificationTypeEnum, message);
    } else {
      console.log(':( Ocorreu algo inesperado. Por favor, tente novamente!');
      this.notificationService.notify(notificationTypeEnum, ':( Ocorreu algo inesperado. Por favor, tente novamente!');
    }
  }
}
