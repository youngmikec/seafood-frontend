import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ParcelComponent } from './parcel.component';
import { ParcelAddComponent } from './parcel-manager/parcel-add/parcel-add.component';
import { ParcelDetailComponent } from './parcel-manager/parcel-detail/parcel-detail.component';

const routes: Routes = [
  { path: '',                   component: ParcelComponent },
  { path: 'add',                component: ParcelAddComponent },
  { path: 'detail/:id',         component: ParcelDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParcelRoutingModule { }
