import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '../../components/components.module';


import { PackageRoutingModule } from './package-routing.module';
import { PackageComponent } from './package.component';
import { PackageDetailComponent } from './package-manager/package-detail/package-detail.component';
import { PackageAddComponent } from './package-manager/package-add/package-add.component';


@NgModule({
  declarations: [
    PackageComponent,
    PackageDetailComponent,
    PackageAddComponent
  ],
  imports: [
    CommonModule,
    PackageRoutingModule,
    ComponentsModule
  ]
})
export class PackageModule { }
