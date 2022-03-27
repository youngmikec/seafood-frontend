import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Parcel } from '../../models';
import { Packages, Parcels } from '../../providers';

@Component({
  selector: 'app-register-item',
  templateUrl: './register-item.component.html',
  styleUrls: ['./register-item.component.scss']
})
export class RegisterItemComponent implements OnInit {

  //@ts-ignore
  addForm: FormGroup;
  //@ts-ignore
  parcelForm: FormGroup;
  //@ts-ignore
  addressForm: FormGroup;
  currentStep: number = 1;
  totalAmount: number = 0;
  totalItemsCost: number = 0;
  totalShipingCost: number = 0;
  loading: boolean = false;
  disabled: boolean = true;
  parcelsArray: Array<Parcel> = [];

  constructor(
    private packages: Packages,
    private parcels:  Parcels,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) { 
    this.createPackageForm();
    this.createParcelForm();
  }

  ngOnInit(): void {
  }

  createPackageForm(){
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      pickupAddress: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      senderName: ['', Validators.required],
      senderPhone: ['', Validators.required],
      senderEmail: ['', Validators.required],
      recipientName: ['', Validators.required],
      recipientPhone: ['', Validators.required],
      recipientEmail: ['', Validators.required],
      amountPayable: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      paymentStatus: ['PENDING', Validators.required],
      remark: ['', Validators.required],
    })
  }

  createParcelForm(){
    this.parcelForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      mass: ['', Validators.required],
      volume: ['', Validators.required],
      worth: ['', Validators.required],
      category: ['', Validators.required],
      identification: ['', Validators.required],
    })
  }

  incrementCounter(){
    if(this.currentStep > 4){
      this.currentStep = 4;
    }
    this.currentStep ++;
  }

  decreaseCounter(){
    this.currentStep --;
    if(this.currentStep < 1){
      this.currentStep = 1;
    }
  }

  createAndAddParcel(e: any): void {
    e.preventDefault();
    const payload = this.parcelForm.value;
    if(this.parcelForm.invalid){
      this.showNotification('Fill in all the required Items field');
      return;
    }
    this.parcels.recordCreate(payload).then(res => {
      if(res.success){
        this.parcelsArray.push(res.payload);
        this.calculateCost(this.parcelsArray);
        this.parcelForm.reset();
        this.addForm.patchValue({
          amountPayable: this.totalAmount
        });
        this.showNotification('Item successfully added');
      }
    }).catch((err: any) => {
      this.showNotification(err + 'Check your internet connection and try again');
    })
  }

  // Caluclate total cost of Item and shipment fee;
  calculateCost = (records: any) => {
    const cummulativeAmount = records.map((item: any) => item.amountPayable).reduce((a: number, b: number) => a + b);
    const cummulativeShippingFee = records.map((item: any) => item.shippingFee).reduce((a: number, b: number) => a + b);
    this.totalItemsCost = cummulativeAmount;
    this.totalShipingCost = cummulativeShippingFee;
    this.totalAmount = cummulativeAmount + cummulativeShippingFee;
    // return { amount: cummulativeAmount + cummulativeShippingFee };
  }

  resetAllTransactionInfo(): void {
    this.totalAmount = 0;
    this.totalItemsCost = 0;
    this.totalShipingCost = 0;
    this.parcelsArray = [];
    this.currentStep = 1;
  }


  onSubmit(): void {
    this.loading = true;
    const payload = this.addForm.value;
    payload.parcels = this.parcelsArray ? this.parcelsArray.map((item: Parcel) => item.id) : [];
    payload.isCheckedOut = payload.paymentStatus === 'SUCCESS' ? true : false;
    payload.deliveryCoordinates = [5.4355, 7.9874];
    payload.pickupCoordinates = [5.4355, 7.9874];

    if(this.addForm.invalid){
      this.loading = false;
      this.showNotification('Pls fill all the required fields');
      return;
    }

    if(!payload.isCheckedOut){
      this.loading = false;
      this.showNotification('You have to make payment and ensure it was successful');
      return;
    }

    this.packages.recordCreate(payload).then(res => {
      if(res.success){
        this.loading = false;
        this.addForm.reset();
        this.resetAllTransactionInfo();
        this.showNotification(res.message);
      }
    }).catch((err: any) => {
      this.loading = false;
      this.showNotification(err);
    });
  }

  SearchAddressGeoCode(direction: string){
    // let address = this.addressForm.value;
    // if(direction == 'from'){
    //   this.geoCodings.getCoordinatesByAddress(address.locationFrom).then((res: any) => {
    //     if(res){
    //       this.locationFrom = res.results[0].locations[0].latLng;
    //       this.showNotification('Coordinates found for specified location');
    //     }
    //   }).catch(err => this.showNotification('unable to get coordinates of the location'))
    // }

    // if(direction == 'to'){
    //   this.geoCodings.getCoordinatesByAddress(address.locationTo).then((res: any) => {
    //     if(res){
    //       this.locationTo = res.results[0].locations[0].latLng;
    //       this.showNotification('Coordinates found for specified location');
    //     }
    //   }).catch(err => this.showNotification('unable to get coordinates of the location'))
    // }
  }

  showNotification(message: string) {
    this.toastr.show(`<span class="now-ui-icons ui-1_bell-53"></span> <b>${message}</b>`, '', {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-primary alert-with-icon',
      });
  }

}
