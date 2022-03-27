import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { genCode } from 'src/app/helpers';
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
  ) {
    this.initializeForm();
   }

  ngOnInit(): void {
  }

  initializeForm(): void {
    this.addForm = this.formBuilder.group({
      surname: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
    })
  }

  async onSubmit() {
    this.loading = true;
    const payload = this.addForm?.value;
    payload.isProfileComplete = false;
    payload.createdBy = this.authService.getUser().id;
    payload.code = genCode(8);
    // const currentElm = $('button.hovering.ld-over');
    // currentElm.addClass('running');
    if(this.addForm?.valid){
      console.log('got here')
      await this.authService.postLogin(payload, '')
    }else {
      console.log('form is invalild')
      // this.addForm?.controls.email.markAsTouched();
      // this.addForm?.controls.password.markAsTouched();
    }
  }

}
