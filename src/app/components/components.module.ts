import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { TableComponent } from './table/table.component';
import { ModalLargeComponent } from './modal-large/modal-large.component';
import { Page404Component } from './page404/page404.component';
import { TrackingComponent } from './tracking/tracking.component';



@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    AdminNavbarComponent,
    AdminFooterComponent,
    BreadcrumbComponent,
    TableComponent,
    ModalLargeComponent,
    Page404Component,
    TrackingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    AdminNavbarComponent,
    AdminFooterComponent,
    BreadcrumbComponent,
    TableComponent,
    ModalLargeComponent,
    Page404Component,
    TrackingComponent,
  ]
})
export class ComponentsModule { }
