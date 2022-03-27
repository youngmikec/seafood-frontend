import { Component, OnInit, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';

import { User } from '../../models';
import { AuthService } from '../../services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  user: User;
  defaultAvatar: string;
  

  constructor(
    private authService: AuthService,
    ) {
    this.defaultAvatar = '../../../assets/img/user-avatar.jpg';
    this.user = this.authService.getUser();
    this.isAuthenticated = this.authService.isAuthenticated();

  }
  
  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.userLogOut();
  }

}
