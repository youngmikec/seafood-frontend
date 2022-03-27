import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FundWalletComponent } from './wallet-manager/fund-wallet/fund-wallet.component';
import { TransferComponent } from './wallet-manager/transfer/transfer.component';
import { WalletComponent } from './wallet.component';

const routes: Routes = [
  { path: '',        redirectTo: 'dashboard' },
  { path: 'dashboard',                      component: WalletComponent },
  { path: 'fund-wallet',           component: FundWalletComponent },
  { path: 'transfer',              component: TransferComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }
