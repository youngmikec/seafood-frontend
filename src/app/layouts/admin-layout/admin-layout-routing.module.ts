import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../services';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ParcelManagerComponent } from '../../pages/parcel/parcel-manager/parcel-manager.component';
import { PackageManagerComponent } from '../../pages/package/package-manager/package-manager.component';
import { ShipmentManagerComponent } from '../../pages/shipment/shipment-manager/shipment-manager.component';
import { AdminTrackingComponent } from '../../pages/admin-tracking/admin-tracking.component';

const routes: Routes = [
  { path: '**', redirectTo: 'home' },
  { path: '', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  { path: 'parcel',    component: ParcelManagerComponent, 
    children: [{ path: '',   loadChildren: () => import('../../pages/parcel/parcel.module').then(m => m.ParcelModule)}]
  },

  { path: 'package',    component: PackageManagerComponent, 
    children: [{ path: '',   loadChildren: () => import('../../pages/package/package.module').then(m => m.PackageModule)}]
  },

  { path: 'shipment',    component: ShipmentManagerComponent, 
    children: [{ path: '',   loadChildren: () => import('../../pages/shipment/shipment.module').then(m => m.ShipmentModule)}]
  },
  { path: 'tracking',    component: AdminTrackingComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
