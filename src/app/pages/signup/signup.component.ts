import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { genCode } from '../../helpers';
import { Users } from '../../providers';
import { AuthService } from '../../services';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  addForm: FormGroup | any;
  loading: boolean = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private users: Users
  ) {
    this.initializeForm();
   }

  ngOnInit(): void {
  }

  initializeForm(): void {
    this.addForm = this.formBuilder.group({
      title: ['MR'],
      surname: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phone: ['', Validators.required],
    })
  }

  async onSubmit() {
    this.loading = true;
    const payload = this.addForm?.value;
    payload.isProfileComplete = false;
    payload.createdBy = this.authService.getUser().id;

    const { password, confirmPassword } = payload;
    if (password !== confirmPassword) { 
      return this.showNotification('password does not match'); 
    }
    delete payload.confirmPassword;
  
    this.users.recordCreate(payload).then( async (res) => {
      if(res.success){
        this.addForm.reset();
        const loginPayload = {
          email: payload.email,
          password: payload.password,
          userType: 'SENDER'
        }
        await this.authService.postLogin(loginPayload, '')
        this.showNotification(res.message);
        this.router.navigate(["/home"]);
      }
    }).catch((err: any) => {
      this.showNotification(err);
    }).finally(() => {
      this.loading = false;
    })
  }

  showNotification(message: string) {
    this.toastr.show(`<span class="now-ui-icons ui-1_bell-53"></span> <b>${message}</b>`, '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-success alert-with-icon',
    });
  }

}
