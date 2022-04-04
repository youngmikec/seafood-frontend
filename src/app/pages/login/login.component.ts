import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  addForm: FormGroup | any;
  loading: boolean = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.initializeForm();
   }

  ngOnInit(): void {
  }

  initializeForm(): void {
    this.addForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      userType: ['SENDER', Validators.required],
    })
  }

  async onSubmit() {
    this.loading = true;
    const payload = this.addForm?.value;
    if(this.addForm?.valid){
        this.authService.postLogin(payload, '').then(res => {
          if(res.success){
            // this.showNotification("User login successful");
          }
        }).catch((err: any) => this.showNotification(err))
        .finally(() => {
          this.loading = false;
        });
    }else {
      console.log('form is invalild')
      // this.addForm?.controls.email.markAsTouched();
      // this.addForm?.controls.password.markAsTouched();
    }
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
