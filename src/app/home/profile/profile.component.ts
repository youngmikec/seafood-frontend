import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { User } from '../../models';
import { Users } from '../../providers';
import { AuthService } from '../../services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  //@ts-ignore
  profileForm: FormGroup;
  //@ts-ignore
  passwordForm: FormGroup;
  user: User;
  loading: boolean = false;
  resetting: boolean = false;

  constructor(
    private users: Users,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
    this.createProfileForm();
    this.user = this.authService.getUser();
   }

  ngOnInit(): void {
    this.setProfileFor();
  }

  createProfileForm(): void {
    this.profileForm = this.formBuilder.group({
      surname: [''],
      firstName: [''],
      middleName: [''],
      email: [''],
      phone: [''],
    })
  }

  createPasswordForm(): void {
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })
  }

  setProfileFor(): void {
    this.profileForm.patchValue({
      surname: this.user?.surname ? this.user.surname : '',
      firstName: this.user?.firstName ? this.user.firstName : '',
      middleName: this.user?.middleName ? this.user.middleName : '',
      email: this.user?.email ? this.user.email : '',
      phone: this.user?.phone ? this.user.phone : '',

    });
  }

  onSubmit(): void {
    this.loading = true;
    const payload = this.profileForm.value;
    this.users.recordUpdate(this.user, payload).then(res => {
      if(res.success){
        this.showNotification(res.message);
      }
    }).catch((err: any) => {
      this.showNotification(err);
    }).finally(() => {
      this.loading = false;
    })
  }

  resetPassword(): void {
    this.resetting = true;
    const payload = this.passwordForm.value;
    this.users.recordUpdate(this.user, payload).then(res => {
      if(res.success){
        this.showNotification(res.message);
      }
    }).catch((err: any) => {
      this.showNotification(err);
    }).finally(() => {
      this.resetting = false;
    });
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
