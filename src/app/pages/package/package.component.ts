import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { Package } from '../../models';
import { Packages } from '../../providers';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {

  loading: boolean = false;
  deleting: boolean = false;
  packaging: boolean = false;
  currentRecord: Package | any = null;
  currentRecords: Array<Package> = [];
  headers: Array<string> = ['S/N', 'Name'];
  sidebarContent: string = '';
  currentSelectedPackages: Array<any> = [];
  formType: string = '';
  //@ts-ignore
  packageForm: FormGroup;


  constructor(
    private packages: Packages,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords(): void {
    this.loading = true;
    let queryString = `?filter={"$and": [{"status": {"$ne": "ARRIVED"}}, {"status": {"$ne": "DELIVERED"}}]}`;
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

  pickupPackage(record: Package): void {
    const payload = { 
      status: "PICKEDUP",
      remark: "Good"
    };
    this.packages.packageOperation(record, payload).then(res => {
      if(res.success){
        this.showNotification(res.message);
        this.getRecords();
      }
    }).catch((error: any) => this.showNotification(error));
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
      case "detail": 
        this.formType = 'detail';
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

  deleteRecord(record: Package){
    this.deleting = true;
    this.packages.recordDelete(record).then(res => {
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

