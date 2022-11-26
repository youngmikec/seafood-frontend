import { Component, OnInit } from '@angular/core';
import { User } from '../../models';
import { AuthService } from '../../services';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {
  defaultAvatar: string = '../../../assets/img/user-avatar.jpg';
  user: User;
  constructor(
    private authService: AuthService
  ) {
    this.user = this.authService.getUser();
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.userLogOut();
  }

}
