import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ParcelManagerComponent } from '../../pages/parcel/parcel-manager/parcel-manager.component';
import { PackageManagerComponent } from '../../pages/package/package-manager/package-manager.component';
import { AuthGuard } from '../../services';

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
  
  { path: 'package', loadChildren: () => import('../../pages/package/package.module').then(m => m.PackageModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
