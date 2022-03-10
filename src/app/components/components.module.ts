import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { TableComponent } from './table/table.component';
import { ModalLargeComponent } from './modal-large/modal-large.component';



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
  ],
  imports: [
    CommonModule,
    RouterModule,
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
  ]
})
export class ComponentsModule { }
