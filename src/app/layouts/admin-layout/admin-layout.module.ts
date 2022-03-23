import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ParcelManagerComponent } from '../../pages/parcel/parcel-manager/parcel-manager.component';
import { PackageManagerComponent } from '../../pages/package/package-manager/package-manager.component';
import { ShipmentManagerComponent } from '../../pages/shipment/shipment-manager/shipment-manager.component';
import { AdminTrackingComponent } from 'src/app/pages/admin-tracking/admin-tracking.component';


@NgModule({
  declarations: [
    AdminTrackingComponent,
    DashboardComponent,
    ParcelManagerComponent,
    PackageManagerComponent,
    ShipmentManagerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AdminLayoutRoutingModule,
    ComponentsModule,
  ]
})
export class AdminLayoutModule { }
