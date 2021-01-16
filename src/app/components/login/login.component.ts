import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AutheticationService} from "../../service/authetication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private router:Router,
              private autheticationService:AutheticationService) { }

  ngOnInit(): void {
    if(this.autheticationService.isLoggedIn()){
      this.router.navigateByUrl('/user/management');
    } else {
      this.router.navigateByUrl('/login')
    }
  }

  ngOnDestroy(): void {
  }

}
