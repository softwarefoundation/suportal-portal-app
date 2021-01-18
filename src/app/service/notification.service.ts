import { Injectable } from '@angular/core';
import {NotificationTypeEnum} from "../enum/notification-type.enum";
import {NotifierService} from "angular-notifier";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notifier: NotifierService) { }

  public notify(type:NotificationTypeEnum, message:string){
    this.notifier.notify(type, message);
  }

}
