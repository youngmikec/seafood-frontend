import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { Deposit } from '../../../models';
import { Deposits } from '../../../providers';

@Component({
  selector: 'app-deposit-page',
  templateUrl: './deposit-page.component.html',
  styleUrls: ['./deposit-page.component.scss']
})
export class DepositPageComponent implements OnInit {

  loading: boolean = false;
  deleting: boolean = false;
  currentRecord: Deposit | any = null;
  currentRecords: Array<Deposit> = [];

  sidebarContent: string = '';
  currentSelectedPackages: Array<any> = [];
  formType: string = '';
  //@ts-ignore
  packageForm: FormGroup;


  constructor(
    private deposits: Deposits,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords(): void {
    this.loading = true;
    let queryString = `?sort=-createdAt&populate=user`;
    this.deposits.recordRetrieve(queryString).then((res: any) => {
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

  handleDepositOperation(record: Deposit, status: string): void {
    this.loading = true;
    const payload = { status, remark: "okay"}
    this.deposits.depositOperation(record, payload).then(res => {
      if(res.success){
        this.loading = false;
        this.getRecords();
        this.showNotification(res.message);
      }
    }).catch(err => {
      this.loading = false;
      this.showNotification(err);
    })
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

  deleteRecord(record: Deposit){
    this.deleting = true;
    this.deposits.recordDelete(record).then(res => {
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

