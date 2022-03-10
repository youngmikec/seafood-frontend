import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../services';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  sub: any[] | null;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'business_chart-bar-32', class: '', sub: null },

  {
    path: '/admin/parcel', title: 'Parcel', icon: 'users_single-02', class: 'parent-nav',
    sub: [
      { path: '/people/users', title: 'Users', icon: 'users_circle-08', class: '' },
      { path: '/people/upgrade', title: 'Upgrade', icon: 'users_single-02', class: '' },
    ]
  },

  {
    path: '/admin/package', title: 'Package', icon: 'ui-1_email-85', class: 'parent-nav',
    sub: [
      { path: '/crm/mail', title: 'Mail', icon: 'users_single-02', class: '' },
    ]
  },
  

  // {
  //   path: '/wallet', title: 'Wallet', icon: 'business_money-coins', class: 'parent-nav',
  //   sub: [
  //     { path: '/wallet/deposit', title: 'Deposit', icon: 'business_bank', class: '' },
  //     { path: '/wallet/lien', title: 'Lien', icon: 'business_bank', class: '' },
  //     { path: '/wallet/transfer', title: 'Transfer', icon: 'files_single-copy-04', class: '' },
  //     { path: '/wallet/withdraw', title: 'Withdraw', icon: 'files_single-copy-04', class: '' },
  //     { path: '/wallet/ledger', title: 'Ledger', icon: 'files_single-copy-04', class: '' },
  //   ]
  // },

  // {
  //   path: 'operation', title: 'Operations', icon: 'transportation_bus-front-12', class: 'parent-nav',
  //   sub: [
  //     { path: '/operation/parcel', title: 'Parcel', icon: 'location_map-big', class: '' },
  //     { path: '/operation/schedule', title: 'Schedule', icon: 'location_world', class: '' },
  //     { path: '/operation/assignment', title: 'Assignment', icon: 'location_world', class: '' },
  //     { path: '/operation/vehicle', title: 'Vehicle', icon: 'location_world', class: '' },
  //     { path: '/operation/track', title: 'Track', icon: 'location_world', class: '' },
  //     { path: '/operation/rating', title: 'Rating', icon: 'location_compass-05', class: '' },
  //   ]
  // },

  // { path: '/map', title: 'Map', icon: 'location_map-big', class: '', sub: null },

  // {
  //   path: 'location', title: 'Locations', icon: 'location_pin', class: 'parent-nav',
  //   sub: [
  //     { path: '/location/terminal',   title: 'Terminal',    icon: 'location_compass-05',      class: '' },
  //     { path: '/location/region',     title: 'Region',      icon: 'location_compass-05',      class: '' },
  //     { path: '/location/country',    title: 'Country',     icon: 'location_world',           class: '' },
  //   ]
  // },

  // { path: '/media/photo', title: 'Media', icon: 'users_single-02', class: '', sub: null },

  // {
  //   path: 'setup', title: 'Setup', icon: 'design_app', class: 'parent-nav',
  //   sub: [
  //     { path: '/setup/bank', title: 'Bank', icon: 'business_bank', class: '' },
  //     { path: '/setup/category', title: 'Category', icon: 'ui-1_lock-circle-open', class: '' },
  //     { path: '/setup/setting', title: 'Setting', icon: 'ui-1_settings-gear-63', class: '' },
  //   ]
  // },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(
    // private authService: AuthService
    ) {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
   }

  ngOnInit() {
  }

  // logout() {
  //   this.authService.userLogOut();
  // }

  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
