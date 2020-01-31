import {
  CanActivate,
  Router,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';

import { LoginService } from './login.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  

  constructor(private authService: LoginService, private router: Router) {

  }

  canActivate():boolean | UrlTree
  {
    const isAuth = this.authService.getUser();
    console.log("isAuth "+isAuth);
    if (isAuth) {
      return true;
    }
    return this.router.createUrlTree(['/app-login']);
  };
  
}
