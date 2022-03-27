import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { NgSelectModule } from '@ng-select/ng-select';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';
import { FundWalletComponent } from './wallet-manager/fund-wallet/fund-wallet.component';
import { TransferComponent } from './wallet-manager/transfer/transfer.component';


@NgModule({
  declarations: [
    WalletComponent,
    FundWalletComponent,
    TransferComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgSelectModule,
    WalletRoutingModule,
  ]
})
export class WalletModule { }
