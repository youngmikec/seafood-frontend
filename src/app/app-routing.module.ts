import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './home/landing-page/landing-page.component';
import { RegisterItemComponent } from './home/register-item/register-item.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuard } from './services';

const routes: Routes = [
  { path: '',        redirectTo: 'home', pathMatch: 'full' },
  
  { path: 'home',                      component: LandingPageComponent },
  { path: 'register-item',             component: RegisterItemComponent, canActivate: [AuthGuard] },
  // { path: 'login',   loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'login',                     component: LoginComponent },
  { path: 'signup',                    component: SignupComponent },
  // { path: 'login-otp',              component: LoginOtpComponent },
  // { path: 'forgot-password',        component: ForgotPasswordComponent },

  { path: 'admin',        component: AdminLayoutComponent,
    children: [
        { path: '',   loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule) },
    ]},
  { path: '**',       redirectTo: 'admin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
