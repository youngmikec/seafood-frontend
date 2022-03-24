import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { Trackings } from '../../providers';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  //@ts-ignore
  @ViewChild('modalButton', {static: false}) modalButton: ElementRef;
  //@ts-ignore
  trackingForm: FormGroup;
  loading: boolean = false;
  currentRecord: any;
  currentRecords: Array<any> = [];

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private trackings: Trackings,
  ) {
    this.initializeForm();
   }

  ngOnInit(): void {
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
        this.trackingForm.reset();
        this.modalButton.nativeElement.click();
        // this.getTrackingRecords(trackingCode);
        this.showNotification(res.message);
      }
    }).catch((err: any) => this.showNotification(err))
    .finally(() => {
      this.loading = false;
    })

  }

  openModal(size: string = 'xl',content: any = ''): void {
    
    this.modalService.open(content, { size: size });
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
