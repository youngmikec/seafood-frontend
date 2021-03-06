import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { EnvService } from './env.service';
import { LoginResponse, User } from '../models';
import { getLocalStorage, setLocalStorage, removeLocalStorage, cleanObject } from '../helpers';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  token: string | null = null;
  depth = 0;
  user: User;

  constructor(private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private env: EnvService) {
    this.user = this.getUser();
    this.user = !this.user ? this.getUser() : this.user;
  }

  async postLogin(data: {[keys: string]: string | any}, element: any): Promise<LoginResponse> {
    const payload = cleanObject(data);
    // console.log('auth.service: payload =>', payload, this.env.API_URL + '/admin/login');
    this.env.API_URL + '/admin/login'
    const response = this.http.post(`${this.env.API_URL}${data.userType === 'ADMIN' ? '/admin/login' : '/user/login' }`, payload)
      .pipe(tap((res: LoginResponse) => {
        // element.removeClass('running');
        //  console.log('auth.service: res =>', res);
        if (res.success) {
          this.showNotification(`${res.message}l<br/>Welcome! SeaWay`);
          const { user, token } = res.payload;
          this.user = user;
          this.token = token;
          if (setLocalStorage('user', user, null)) {
            //  console.log('User info stored');
          } else {
            console.error('Error storing record customer');
          }
          if (setLocalStorage('token', token, null)) {
            //   console.log('Token string stored');
          } else {
            console.error('Error storing record token');
          }
          // const goingTo = payload.otp ? '/forgot-password' :  '/admin/dashboard';
          const goingTo = data.userType !== 'ADMIN' ? '/login' :  '/admin/dashboard';
          this.isLoggedIn = true;
          // const intendURL = getLocalStorage('intendURL') === null ? goingTo : getLocalStorage('intendURL');
          this.router.navigate([goingTo]);
        } else {
          this.showNotification(res.message);
          this.token = null;
          this.isLoggedIn = false;
        }
      }, (err) => {
        // element.removeClass('running');
        this.showNotification('Error processing. Check your Internet and Try Again');
        this.showNotification(`${err}`);
        this.token = null;
        this.isLoggedIn = false;
      }));
    return await response.toPromise();
  }


  showNotification(message: string | undefined) {
    this.toastr.show(`<span class="fa ui-1_bell-53"></span> <b>${message}</b>`, '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-primary alert-with-icon',
    });
  }

  register(data: any) {
    const payload = cleanObject(data);
    return this.http.post(this.env.API_URL + '/admin', payload);
  }

  getUser(): User {
    if (!!this.user) return this.user;
    return getLocalStorage('user');
  }

  public async getToken(): Promise<any> {
    try {
      const token = await getLocalStorage('token');
      if (token != null) {
        this.token = token;
        this.isLoggedIn = true;
      } else {
        this.token = null;
        this.isLoggedIn = false;
      }
      return token;
    } catch (e) {
      console.log(e);
      alert(JSON.stringify(e));
      return null;
    }
  }

  userLogOut(): void {
    this.isLoggedIn = false;
    this.token = null;
    removeLocalStorage('user');
    removeLocalStorage('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return (!!getLocalStorage('user')) ? true : false;
  }

}
