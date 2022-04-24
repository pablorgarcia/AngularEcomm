import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(): any {
    if(sessionStorage.getItem('user')) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}
