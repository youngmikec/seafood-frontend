import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ParcelManagerComponent } from '../../pages/parcel/parcel-manager/parcel-manager.component';

const routes: Routes = [
  // { path: '**', redirectTo: 'parcel' },
  { path: '', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'parcel',    component: ParcelManagerComponent, 
    children: [{ path: '',   loadChildren: () => import('../../pages/parcel/parcel.module').then(m => m.ParcelModule)}]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
