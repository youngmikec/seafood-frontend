import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { Package, Shipment } from '../../models';
import { Shipments, Packages } from '../../providers';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss']
})
export class ShipmentComponent implements OnInit {

  loading: boolean = false;
  deleting: boolean = false;
  currentRecord: Shipment | any = null;
  currentShipmentRecord: Shipment | any = null;
  currentRecords: Array<Shipment> = [];
  returnedPackages: Array<Package> = [];
  formType: string = '';
 


  constructor(
    private shipments: Shipments,
    private toastr: ToastrService,
    private packages: Packages,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getAllRecords();
  }

  getAllRecords(){
    this.getRecords();
    this.getAvailablePackages();
  }
  getRecords(){
    this.loading = true;
    const queryString = `?sort=-createdAt&populate=packages,createdBy`;
    this.shipments.recordRetrieve(queryString).then((res: any) => {
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

  getAvailablePackages(){
    const queryString = '';
    this.packages.recordRetrieve().then(res => {
      if(res.success){
        this.returnedPackages = res.payload;
      }
    }).catch(err => console.log(err));
  }

  openModal(size: string = 'xl', type: string, content: any = '', record: any = null): void {
    switch (type) {
      case 'create':
        this.formType = 'create';
        this.currentRecord = record;
        break;
      case 'edit':
        this.formType = 'edit';
        this.currentRecord = record;
        break;
      case "peep": 
        this.formType = 'peep';
        this.currentRecord = record;
        break;
      case "delete": 
        this.formType = 'delete';
        this.currentRecord = record;
        break;
      default:
        this.formType = 'create';
        this.currentRecord = record;
    }
    this.modalService.open(content, { size: size });
  }

  openViewModal(record: any = null): void {
    this.openModal('lg', '', record);
  }
  openEditModal(formType: string = '', record: any = null): void {
    this.formType = formType;
    this.currentShipmentRecord = record;
    this.openModal('xl', record);
  }
  openDeleteModal(record: any = null): void {
    this.openModal('sm', '', record);
  }

  deleteRecord(record: Shipment | null){
    this.deleting = true;
    this.shipments.recordDelete(record).then(res => {
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

  operateShipment(record: Shipment, action: string): void {
    let operationObject: any = {
      remark: 'Okay'
    };
    if(action == 'depart'){
      operationObject.status = 'DEPARTED';
    }
    if(action == 'arrive'){
      operationObject.status = 'ARRIVED';
    }

    this.shipments.shipmentOperation(record, operationObject).then((res) => {
      if(res.success){
        this.showNotification(res.message);
      }
    }).catch((err: any) => this.showNotification(err));
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

