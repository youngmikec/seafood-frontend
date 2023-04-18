import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LandingPageComponent } from './home/landing-page/landing-page.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { RegisterItemComponent } from './home/register-item/register-item.component';
import { WalletManagerComponent } from './home/wallet/wallet-manager/wallet-manager.component';
import { TrackingComponent } from './components/tracking/tracking.component';
import { ProfileComponent } from './home/profile/profile.component';
import { OfficesComponent } from './home/offices/offices.component';
import { AboutUsComponent } from './home/about-us/about-us.component';
import { SolutionComponent } from './home/solution/solution.component';


const routes: Routes = [
  { path: '',        redirectTo: 'home', pathMatch: 'full' },
  
  { path: 'home',                      component: LandingPageComponent },
  { path: 'register-item',             component: RegisterItemComponent, canActivate: [AuthGuard] },
  { path: 'tracking',                  component: TrackingComponent },
  { path: 'login',                     component: LoginComponent },
  { path: 'signup',                    component: SignupComponent },
  { path: 'profile',                   component: ProfileComponent },
  { path: 'blogs',                     component: OfficesComponent },
  { path: 'about-us',                  component: AboutUsComponent },
  { path: 'solutions',                 component: SolutionComponent },
  // { path: 'login-otp',              component: LoginOtpComponent },
  // { path: 'forgot-password',        component: ForgotPasswordComponent },

  { path: 'admin',        component: AdminLayoutComponent,
    children: [
        { path: '',   loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule) },
  ]},
  { path: 'wallet',        component: WalletManagerComponent,
    children: [
        { path: '',   loadChildren: () => import('./home/wallet/wallet.module').then(m => m.WalletModule) },
  ]},
  { path: '**',       redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
