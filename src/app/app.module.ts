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
import { ChartsModule } from 'ng2-charts';
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
  ModalService
} from './services';

import {
  Packages,
  Parcels,
  Shipments,
  Users
} from './providers';

import { ComponentsModule } from './components/components.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LandingPageComponent } from './home/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LandingPageComponent,
    LoginComponent,
    SignupComponent,
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
    ChartsModule,
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
    ModalService,
    
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
    { provide: LocationStrategy,  useClass: HashLocationStrategy },
    [{ provide: DEFAULT_TIMEOUT, useValue: 60000 }],

    UploadModalService,
    Parcels, Packages, Shipments, Users
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
