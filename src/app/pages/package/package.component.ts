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
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords(){
    this.loading = true;
    const queryString = `?sort=-createdAt&status=PENDING`;
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

  openXl(size: string = 'xl', content: any = ''): void {
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

