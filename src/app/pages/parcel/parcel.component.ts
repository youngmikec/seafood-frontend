import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { Parcel } from '../../models';
import { MapService } from '../../services';
import { DestructureGeocoding } from '../../helpers';
import { Parcels, Packages, Geocodings } from '../../providers';

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
  deleting: boolean = false;
  currentRecord: Parcel | any = null;
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
    private mapService: MapService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private geocodings: Geocodings,
  ) {
    this.createPackageForm();
   }

  ngOnInit(): void {
    this.getRecords();
    this.getGeoCoding("47 Ezuth street Emene Enugu state");
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
      deliveryCoordinates: [''],
      pickupCoordinates: [''],
      paymentMethod: ['', Validators.required],
      paymentGateway: [''],
      paymentStatus: ['PENDING', Validators.required],
      remark: ['', Validators.required],
      isCheckedOut: ['', Validators.required],
    })
  }
  
  getRecords(){
    this.loading = true;
    const query: string = `?sort=-createdAt`;
    this.parcels.recordRetrieve(query).then((res: any) => {
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

  getGeoCoordinate($event: any, name: any): void {
    const { target } = $event;
    const payload = {
      address: target.value,
      direction: 'forward'
    }
    this.geocodings.recordCreate(payload).then(res => {
      if(res.success){
        const { address, coordinate: {lat, lng} } = DestructureGeocoding(res.payload.results[0]);
        if(name === 'deliveryAddress'){
          this.packageForm.patchValue({
            deliveryCoordinates: [lat, lng]
          })
        }
        if(name === 'pickupAddress'){
          this.packageForm.patchValue({
            pickupCoordinates: [lat, lng]
          })
        }
        this.showNotification(`Successful`);
      }
    }).catch((err: any) => this.showNotification(err));
  } 

  calculateCost = (records: any) => {
    const cummulativeAmount = records.map((item: any) => item.amountPayable).reduce((a: number, b: number) => a + b);
    const cummulativeShippingFee = records.map((item: any) => item.shippingFee).reduce((a: number, b: number) => a + b);
    return { amount: cummulativeAmount + cummulativeShippingFee };
  }

  onSelectChange(event: Parcel | any) {
    const found = this.currentSelectedParcels.filter(option => option.id === event.id);
    if (found.length < 1) {
      this.currentSelectedParcels.push(event);
      const { amount } = this.calculateCost(this.currentSelectedParcels);
      this.totalAmount = amount;
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

  getGeoCoding(address: string){
    const query = `&address=${address}`;
    this.mapService.geoCoding(query).subscribe({
      next: (res: any) => {
        console.log(res)
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getReverseGeoCoding(coordinates: string){
    this.mapService.reverseGeoCoding(coordinates).subscribe({
      next: (res: any) => {
        console.log(res)
      }
    })
  }

  openModal(size: string = 'xl', type: string, content: any = '', record: any = null): void {
    switch (type) {
      case 'parcel':
        this.modalType = type;
        this.currentRecord = record;
        break;
      case 'package':
        this.modalType = type;
        this.currentRecord = record;
        break;
      case "peep": 
        this.modalType = type;
        this.currentRecord = record;
        break;
      case "detail": 
        this.modalType = type;
        this.currentRecord = record;
        break;
      case "delete": 
        this.modalType = type;
        this.currentRecord = record;
        break;
      default:
        this.modalType = 'create';
        this.currentRecord = record;
    }
    this.modalService.open(content, { size: size });
  }

  deleteRecord(record: Parcel | any){
    this.deleting = true;
    this.parcels.recordDelete(record).then(res => {
      if(res.success){
        this.currentRecord = null;
        this.getRecords();
        this.showNotification(res.message);
      }
    }).catch(err => {
      this.showNotification(err);
    }).finally(() => {
      this.deleting = false;
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
