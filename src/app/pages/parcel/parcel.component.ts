import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Parcel } from '../../models';
import { Parcels } from '../../providers';

@Component({
  selector: 'app-parcel',
  templateUrl: './parcel.component.html',
  styleUrls: ['./parcel.component.scss']
})
export class ParcelComponent implements OnInit {

  loading: boolean = false;
  currentRecord: Parcel | null = null;
  currentRecords: Array<Parcel> = [];
  headers: Array<string> = ['S/N', 'Name'];

  constructor(
    private parcels: Parcels,
    private toastr: ToastrService,
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

  showNotification(message: string) {
    this.toastr.show(`<span class="now-ui-icons ui-1_bell-53"></span> <b>${message}</b>`, '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-primary alert-with-icon',
    });
  }

}
