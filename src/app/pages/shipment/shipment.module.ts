import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { NgSelectModule } from '@ng-select/ng-select';


import { ShipmentRoutingModule } from './shipment-routing.module';
import { ShipmentComponent } from './shipment.component';
import { ShipmentAddComponent } from './shipment-manager/shipment-add/shipment-add.component';
import { ShipmentDetailComponent } from './shipment-manager/shipment-detail/shipment-detail.component';


@NgModule({
  declarations: [
    ShipmentComponent,
    ShipmentAddComponent,
    ShipmentDetailComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ShipmentRoutingModule,
    ComponentsModule,
  ],
  exports: [
    ShipmentAddComponent,
  ]
})
export class ShipmentModule { }
