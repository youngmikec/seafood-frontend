import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { Package } from '../../../../models';
import { Packages } from '../../../../providers';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  loading: boolean = false;
  packaging: boolean = false;
  currentRecord: Package | any = null;
  currentRecords: Array<Package> = [];
  headers: Array<string> = ['S/N', 'Name'];
  modalType: string = '';
  currentSelectedPackages: Array<any> = [];
  //@ts-ignore
  deliveryForm: FormGroup;


  constructor(
    private packages: Packages,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) { 
    this.createDeliveryForm();
  }

  ngOnInit(): void {
    this.getRecords();
  }

  createDeliveryForm(){
    this.deliveryForm = this.formBuilder.group({
      remark: ['', Validators.required]
    })
  }

  getRecords(){
    this.loading = true;
    let queryString = `?filter={"$or": [{"status": "ARRIVED"}, {"status": "DELIVERED"}]}`;
    queryString += `&sort=-createdAt`;
    this.packages.recordRetrieve(queryString).then((res: any) => {
      if(res.success){
        this.loading = false;
        this.currentRecords = res.payload;
        this.showNotification(res.message);
      }
    }).catch((err: string | any) => {
      this.loading = false;
      this.showNotification(err);
    });
  }

  deliverParcel(): void {
    this.loading = true;
    const payload = this.deliveryForm.value;
    payload.status = 'DELIVERED';
    this.packages.packageOperation(this.currentRecord, payload).then(res => {
      if(res.success){
        this.showNotification('Package successfully delivered');
        this.getRecords();
      }
    }).catch(err => { this.showNotification(err)})
    .finally(() => { this.loading = false });
  }

  // openXl(size: string = 'xl', content: any = ''): void {
  //   this.modalService.open(content, { size: size });
  // }

  openModal(size: string = 'xl', type: string, content: any = '', record: any = null): void {
    switch (type) {
      case 'parcel':
        this.modalType = type;
        this.currentRecord = record;
        break;
      case 'edit':
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

  showNotification(message: string) {
    this.toastr.show(`<span class="now-ui-icons ui-1_bell-53"></span> <b>${message}</b>`, '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-success alert-with-icon',
    });
  }

}

