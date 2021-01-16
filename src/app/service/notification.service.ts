import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notifier: NotificationService) { }

  public notify(type:string, message:string){
    this.notifier.notify(type, message);
  }

}
