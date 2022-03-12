import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { Parcel } from '../../models';
import { Parcels, Packages } from '../../providers';

@Component({
  selector: 'app-parcel',
  templateUrl: './parcel.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./parcel.component.scss']
})

export class ParcelComponent implements OnInit {
  closeResult: string = '';
  loading: boolean = false;
  packaging: boolean = false;
  currentRecord: Parcel | null = null;
  currentRecords: Array<Parcel> = [];
  headers: Array<string> = ['S/N', 'Name'];
  sidebarContent: string = '';
  currentSelectedParcels: Array<any> = [];
  //@ts-ignore
  packageForm: FormGroup;
  modalType: string = '';
  paymentMethod: string = '';
  totalAmount: number = 0;


  constructor(
    private parcels: Parcels,
    private packages: Packages,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) {
    this.createPackageForm();
   }

  ngOnInit(): void {
    this.getRecords();
  }

  createPackageForm(): void {
    this.packageForm = this.formBuilder.group({
      name: ['', Validators.required],
      amountPayable: [1000, Validators.required],
      senderName: ['', Validators.required],
      senderPhone: ['', Validators.required],
      senderEmail: ['', Validators.required],
      recipientName: ['', Validators.required],
      recipientPhone: ['', Validators.required],
      recipientEmail: ['', Validators.required],
      pickupAddress: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      paymentGateway: [''],
      paymentStatus: ['PENDING', Validators.required],
      remark: ['', Validators.required],
      isCheckedOut: ['', Validators.required],
    })
  }
  getRecords(){
    this.loading = true;
    this.parcels.recordRetrieve().then((res: any) => {
      if(res.success){
        this.loading = false;
        this.currentRecords = res.payload;
        this.showNotification(res.message);
      }
    }).catch((err: string | any) => {
      this.loading = false;
      this.showNotification(err);
    })
  }

  calculateCost = (records: any) => {
    const cummulativeAmount = records.map((item: any) => item.amountPayable).reduce((a: number, b: number) => a + b);
    const cummulativeShippingFee = records.map((item: any) => item.shippingFee).reduce((a: number, b: number) => a + b);
    return { amount: cummulativeAmount + cummulativeShippingFee };
  }

  onSelectChange(event: Parcel | any) {
    console.log(event.id);
    const found = this.currentSelectedParcels.filter(option => option.id === event.id);
    console.log('Seen item  => ', found);
    if (found.length < 1) {
      this.currentSelectedParcels.push(event);
      const { amount } = this.calculateCost(this.currentSelectedParcels);
      this.totalAmount = amount;
      console.log('The current selected parcels ==> ', this.currentSelectedParcels);
    } else {
      this.currentSelectedParcels = this.currentSelectedParcels.filter(option => option.id !== event.id);
      const { amount } = this.calculateCost(this.currentSelectedParcels);
      this.totalAmount = amount;
      console.log('The current selected parcels ==> ', this.currentSelectedParcels);
    }
    return;
  }
  

  createPackage = () => {
    this.packaging = true;
    const payload = this.packageForm.value;
    payload.parcels = this.currentSelectedParcels.map(option => option.id);
    payload.deliveryCoordinates = [5.4355, 7.9874];
    payload.pickupCoordinates = [5.4355, 7.9874];

    this.packages.AdminRecordCreate(payload).then(res => {
      if(res.success){
        this.packaging = false;
        this.showNotification(res.message);
        this.packageForm.reset();
        this.getRecords();
      }
    }).catch(err => this.showNotification(err))
    .finally(() => { this.packaging = false });
  }

  openXl(size: string = 'xl', type: string = 'parcel', content: any = ''): void {
    this.modalType = type;
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
