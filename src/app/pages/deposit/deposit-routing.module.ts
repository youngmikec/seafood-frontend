import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositAddComponent } from './deposit-manager/deposit-add/deposit-add.component';
import { DepositDetailComponent } from './deposit-manager/deposit-detail/deposit-detail.component';
import { DepositPageComponent } from './deposit-page/deposit-page.component';


const routes: Routes = [
  { path: '',                  component: DepositPageComponent },
  { path: 'add',               component: DepositAddComponent },
  { path: 'detail',            component: DepositDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DepositRoutingModule { }
