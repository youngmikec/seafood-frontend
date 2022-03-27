import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { Tracking } from '../../models';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  //@ts-ignore
  @ViewChild('modalButton', {static: false}) modalButton: ElementRef;
  currentRecord: Tracking | any;


  constructor(
    private toastr: ToastrService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
  }

  

  openModal(size: string = 'xl',content: any = ''): void {
    
    this.modalService.open(content, { size: size });
  }

  setCurrentRecord($event: Tracking): void {
    if($event) this.currentRecord = $event;
    this.modalButton.nativeElement.click();
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
