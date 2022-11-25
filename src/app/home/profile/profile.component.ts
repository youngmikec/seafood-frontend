import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { User } from '../../models';
import { Deposits, Users } from '../../providers';
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
  //@ts-ignore
  depositForm: FormGroup;
  user: User;
  loading: boolean = false;
  resetting: boolean = false;

  constructor(
    private users: Users,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private deposits: Deposits,
  ) {
    this.createProfileForm();
    this.createPasswordForm();
    this.createDepositForm();
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

  createDepositForm(): void {
    this.depositForm = this.formBuilder.group({
      amount: ['', Validators.required],
      pin: ['', Validators.required],
      depositorBank: ['', Validators.required],
      depositorAcctName: ['', Validators.required],
      depositorAcctNum: ['', Validators.required],
      transactionStatus: ['', Validators.required],
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

  createDeposit(): void {
    this.loading = true;
    const payload = this.depositForm.value;
    if(this.depositForm.invalid){
      this.showNotification('Fill in the required fields!');
      return;
    }
    this.deposits.recordCreate(payload).then(res => {
      if(res.success){
        this.loading = false;
        this.depositForm.reset();
        this.showNotification('Deposit successful');
      }
    }).catch(err => {
      this.loading = false;
      this.showNotification(err);
    })
  }

  resetPassword(): void {
    this.resetting = true;
    const payload = this.passwordForm.value;
    const { newPassword, confirmPassword } = payload;
    if(this.passwordForm.invalid){
      this.showNotification('Fill in all required fields!')
      return;
    }
    if(newPassword !== confirmPassword){
      this.showNotification('Password does not match!')
      return;
    }
    delete payload.confirmPassword;

    this.users.passwordUpdate(payload).then(res => {
      if(res.success){
        this.resetting = false;
        this.passwordForm.reset();
        this.showNotification('Password successfully changed');
      }
    }).catch((err: any) => {
      this.resetting = false;
      this.showNotification(err);
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
