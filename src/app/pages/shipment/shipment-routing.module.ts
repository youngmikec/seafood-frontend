import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipmentAddComponent } from './shipment-manager/shipment-add/shipment-add.component';
import { ShipmentDetailComponent } from './shipment-manager/shipment-detail/shipment-detail.component';
import { ShipmentComponent } from './shipment.component';

const routes: Routes = [
  { path: '',              component: ShipmentComponent },
  { path: 'add',           component: ShipmentAddComponent },
  { path: 'detail/:id',    component: ShipmentDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentRoutingModule { }
