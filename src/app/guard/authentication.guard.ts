import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AutheticationService} from "../service/authetication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {


  constructor(private autheticationService:AutheticationService, private router:Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return true;
  }

  private isUserLoggedIn(): boolean {
    if(this.autheticationService.isLoggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    //TODO - Enviar notiticação para o usuario.
    return false;
  }

}
