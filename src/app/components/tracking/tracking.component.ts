import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { Tracking } from '../../models';
import { Trackings } from '../../providers';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {
  @Output()changed = new EventEmitter <Tracking> ();
  //@ts-ignore
  trackingForm: FormGroup;
  loading: boolean = false;
  currentRecord: any;
  currentRecords: Array<any> = [];
  urlPath: string = '';
  currentPage: string | undefined = '';

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private trackings: Trackings,
    private router: Router,
  ) {
    this.initializeForm();

    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
      ).subscribe({
        next: (res: NavigationEnd) => {
          this.urlPath = res?.url;
          this.currentPage = this.getCurrentPage(this.urlPath);
      }
    })
   }

  ngOnInit(): void {
  }

  getCurrentPage(url: string): string | undefined{
    return url.split('/').pop();
  }

  initializeForm(): void {
    this.trackingForm = this.formBuilder.group({
      trackingCode: ['', Validators.required]
    })
  }

  onSubmit(): void {
    this.loading = true;
    const payload = this.trackingForm.value;
    if(this.trackingForm.invalid){
      this.loading = false;
      return this.showNotification('Input a tracking code');
    }
    this.trackings.recordCreate(payload).then((res: any) => {
      if(res.success){
        this.currentRecord = res.payload;
        const { trackingCode } = this.currentRecord.result;
        this.changed.emit(this.currentRecord);
        this.trackingForm.reset();
        this.showNotification(res.message);
      }
    }).catch((err: any) => this.showNotification(err))
    .finally(() => {
      this.loading = false;
    })
  }

  showNotification(message: string) {
    this.toastr.show(`<span class="now-ui-icons ui-1_bell-53"></span> <b>${message}</b>`, '', {
      timeOut: 4000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-success alert-with-icon',
    });
  }

}
