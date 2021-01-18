import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AutheticationService} from "../../service/authetication.service";
import {User} from "../../model/User";
import {Subscription} from "rxjs";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {NotificationTypeEnum} from "../../enum/notification-type.enum";
import {NotificationService} from "../../service/notification.service";
import {HeaderTypeEnum} from "../../enum/header-type.enum";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public showLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private router:Router,
              private autheticationService:AutheticationService,
              private notificationService:NotificationService) { }

  ngOnInit(): void {
    if(this.autheticationService.isLoggedIn()){
      this.router.navigateByUrl('/user/management');
    } else {
      this.router.navigateByUrl('/login')
    }
  }

  public onLogin(user:User){
    this.showLoading = true;
    console.log(user);
    this.subscriptions.push(
        this.autheticationService.login(user).subscribe(
            (response: HttpResponse<User>) => {
              const token = response.headers.get(HeaderTypeEnum.JWT_TOKEN);
              this.autheticationService.saveToken(token as string);
              this.autheticationService.addUserToLocalCache(response.body as User);
              this.router.navigateByUrl('/user/management');
              this.showLoading = false;
            },
            (errorResponse:HttpErrorResponse) =>{
              console.log(errorResponse);
              this.sendErrorNotification(NotificationTypeEnum.ERROR,errorResponse.error.message)
            }
        )
    )
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private sendErrorNotification(notificationTypeEnum: NotificationTypeEnum, message: string) {
    if(message){
        this.notificationService.notify(notificationTypeEnum, message);
    } else {
        this.notificationService.notify(notificationTypeEnum, ':( Ocorreu algo inesperado. Por favor, tente novamente!');
    }
  }
}
