import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackageComponent } from './package.component';
import { PackageAddComponent } from './package-manager/package-add/package-add.component';
import { PackageDetailComponent } from './package-manager/package-detail/package-detail.component';

const routes: Routes = [
  { path: '',                  component: PackageComponent },
  { path: 'add',               component: PackageAddComponent },
  { path: 'detail',            component: PackageDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackageRoutingModule { }
