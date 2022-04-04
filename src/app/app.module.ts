import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  DEFAULT_TIMEOUT,
  ApiService,
  AppModalService,
  AuthGuard,
  AuthService,
  EnvService,
  ErrorInterceptor,
  JwtInterceptor,
  TimeoutInterceptor,
  UploadModalService,
  ModalService,
  MapService
} from './services';

import {
  Geocodings,
  Packages,
  Parcels,
  Shipments,
  Trackings,
  Users
} from './providers';

import { ComponentsModule } from './components/components.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LandingPageComponent } from './home/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { RegisterItemComponent } from './home/register-item/register-item.component';
import { WalletManagerComponent } from './home/wallet/wallet-manager/wallet-manager.component';
import { ProfileComponent } from './home/profile/profile.component';
import { OfficesComponent } from './home/offices/offices.component';
import { AboutUsComponent } from './home/about-us/about-us.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LandingPageComponent,
    LoginComponent,
    SignupComponent,
    RegisterItemComponent,
    WalletManagerComponent,
    ProfileComponent,
    OfficesComponent,
    AboutUsComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      toastClass: 'alert alert-success alert-with-icon',
    }),
  ],
  providers: [
    ApiService,
    AppModalService,
    AuthGuard,
    AuthService,
    EnvService,
    MapService,
    ModalService,
    
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
    { provide: LocationStrategy,  useClass: HashLocationStrategy },
    [{ provide: DEFAULT_TIMEOUT, useValue: 60000 }],

    UploadModalService,
    Parcels, Packages, Shipments, Users, Trackings, Geocodings,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
