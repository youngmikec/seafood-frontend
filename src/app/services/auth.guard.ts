import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { User } from '../models';
import { AuthService } from './auth.service';
import { setLocalStorage } from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: User;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.user = this.authService.getUser();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isAuthenticated()) {
            setLocalStorage('intendURL', state.url, null);
            return true;
          } else {
            this.router.navigate(['/login']);
            this.showNotification('Pls Kindly Singup or Signin');
            return false;
          }
  }

  showNotification(message: string) {
    this.toastr.show(`<span class="now-ui-icons ui-1_bell-53"></span> <b>${message}</b>`, '', {
      timeOut: 4000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-success alert-with-icon',
    });
  }

}
