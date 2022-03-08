import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from 'src/app/components/components.module';


import { ParcelRoutingModule } from './parcel-routing.module';
import { ParcelComponent } from './parcel.component';
import { ParcelAddComponent } from './parcel-manager/parcel-add/parcel-add.component';
import { ParcelDetailComponent } from './parcel-manager/parcel-detail/parcel-detail.component';


@NgModule({
  declarations: [
    ParcelComponent,
    ParcelAddComponent,
    ParcelDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ParcelRoutingModule,
    ComponentsModule,
  ]
})
export class ParcelModule { }
