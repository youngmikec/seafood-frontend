import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Trackings } from '../../providers';

@Component({
  selector: 'app-admin-tracking',
  templateUrl: './admin-tracking.component.html',
  styleUrls: ['./admin-tracking.component.scss']
})
export class AdminTrackingComponent implements OnInit {
  //@ts-ignore
  @ViewChild('modalButton', {static: false}) modalButton: ElementRef;
  //@ts-ignore
  trackingForm: FormGroup;
  loading: boolean = false;
  currentRecord: any;
  currentRecords: Array<any> = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private trackings: Trackings,
    private modalService: NgbModal,
    private elementRef: ElementRef
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

  getTrackingRecords(code: string = ''): void {
    const query = `?trackingCode=${code}&populate=shipment`;
    this.trackings.recordRetrieve(code ? query : '').then(res => {
      if(res.success){
        this.currentRecords = res.payload;
      }
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
        console.log('trackingCode', trackingCode);
        this.trackingForm.reset();
        this.modalButton.nativeElement.click();
        this.getTrackingRecords(trackingCode);
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
