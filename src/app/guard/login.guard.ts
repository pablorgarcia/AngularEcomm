import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private readonly router: Router) {}

  canActivate(): any {
    if(sessionStorage.getItem('user')) {
      this.router.navigateByUrl('/');
    } else {
      return true;
    }
  }

}
