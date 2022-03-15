import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackageComponent } from './package.component';
import { PackageAddComponent } from './package-manager/package-add/package-add.component';
import { PackageDetailComponent } from './package-manager/package-detail/package-detail.component';
import { DeliveryComponent } from './package-manager/delivery/delivery.component';

const routes: Routes = [
  { path: '',                  component: PackageComponent },
  { path: 'add',               component: PackageAddComponent },
  { path: 'detail',            component: PackageDetailComponent },
  { path: 'delivery',         component: DeliveryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackageRoutingModule { }
