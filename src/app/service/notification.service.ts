import { Injectable } from '@angular/core';
import {NotificationTypeEnum} from "../enum/notification-type.enum";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notifier: NotificationService) { }

  public notify(type:NotificationTypeEnum, message:string){
    this.notifier.notify(type, message);
  }

}
