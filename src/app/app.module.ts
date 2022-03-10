import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
  Parcels
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
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
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
    Parcels, Packages,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
