import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { DepositRoutingModule } from './deposit-routing.module';
import { DepositPageComponent } from './deposit-page/deposit-page.component';
import { DepositManagerComponent } from './deposit-manager/deposit-manager.component';
import { DepositDetailComponent } from './deposit-manager/deposit-detail/deposit-detail.component';
import { DepositAddComponent } from './deposit-manager/deposit-add/deposit-add.component';




@NgModule({
  declarations: [
    DepositPageComponent,
    DepositManagerComponent,
    DepositDetailComponent,
    DepositAddComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DepositRoutingModule,
    ComponentsModule
  ]
})
export class DepositModule { }
