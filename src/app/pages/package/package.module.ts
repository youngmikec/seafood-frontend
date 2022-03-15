import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';


import { PackageRoutingModule } from './package-routing.module';
import { PackageComponent } from './package.component';
import { PackageDetailComponent } from './package-manager/package-detail/package-detail.component';
import { PackageAddComponent } from './package-manager/package-add/package-add.component';
import { DeliveryComponent } from './package-manager/delivery/delivery.component';


@NgModule({
  declarations: [
    PackageComponent,
    PackageDetailComponent,
    PackageAddComponent,
    DeliveryComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PackageRoutingModule,
    ComponentsModule
  ]
})
export class PackageModule { }
