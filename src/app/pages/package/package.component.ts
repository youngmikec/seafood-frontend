import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Package } from '../../models';
import { Packages } from '../../providers';
import { ModalService } from '../../services';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {

  loading: boolean = false;
  packaging: boolean = false;
  currentRecord: Package | any = null;
  currentRecords: Array<Package> = [];
  headers: Array<string> = ['S/N', 'Name'];
  sidebarContent: string = '';
  currentSelectedPackages: Array<any> = [];
  //@ts-ignore
  packageForm: FormGroup;


  constructor(
    private packages: Packages,
    private toastr: ToastrService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords(){
    this.loading = true;
    this.packages.recordRetrieve().then((res: any) => {
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


  openModalLarge(type: string = 'create', record: Package | null = null): void {
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

