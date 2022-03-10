import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Parcel } from '../../models';
import { Parcels } from '../../providers';
import { ModalService } from '../../services';

@Component({
  selector: 'app-parcel',
  templateUrl: './parcel.component.html',
  styleUrls: ['./parcel.component.scss']
})
export class ParcelComponent implements OnInit {

  loading: boolean = false;
  packaging: boolean = false;
  currentRecord: Parcel | null = null;
  currentRecords: Array<Parcel> = [];
  headers: Array<string> = ['S/N', 'Name'];
  sidebarContent: string = '';
  currentSelectedParcels: Array<any> = [];
  //@ts-ignore
  packageForm: FormGroup;


  constructor(
    private parcels: Parcels,
    private toastr: ToastrService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.getRecords();
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

  onSelectChange(event: Parcel | any) {
    console.log(event.id);
    const found = this.currentSelectedParcels.filter(option => option.id === event.id);
    console.log('Seen item  => ', found);
    if (found.length < 1) {
      this.currentSelectedParcels.push(event);
      console.log('The current selected parcels ==> ', this.currentSelectedParcels);
    } else {
      this.currentSelectedParcels = this.currentSelectedParcels.filter(option => option.id !== event.id);
      console.log('T  he current selected parcels ==> ', this.currentSelectedParcels);
    }
    return;
  }

  createPackage = () => {
    this.packaging = true;
    const payload = this.packageForm.value;
    payload.pmlParcels = this.currentSelectedParcels.map(option => option.id);
    // console.log('Package to create => ', payload);
    // this.pmlPackages.recordCreate(payload).then(data => {
    //   if (data.success) {
    //     // ideally should run a local filter
    //     this.getRecords();
    //     this.currentSelectedParcels = [];
    //     this.packageForm.reset();
    //   }
    //   this.showNotification(data.message);
    // }).catch(err => {
    //   this.showNotification(err);
    // }).finally(() => {
    //   this.packaging = false;
    // });
  }

  openModalLarge(type: string = 'create', record: Parcel | null = null): void {
    this.modalService.setModalState(true);
    this.sidebarContent = type === 'create' ? type : 'edit' ;
    this.currentRecord = record ? record : null;
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
