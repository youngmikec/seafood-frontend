import { Component, OnInit, Input } from '@angular/core';
import { Shipment } from '../../../../models';

@Component({
  selector: 'app-shipment-detail',
  templateUrl: './shipment-detail.component.html',
  styleUrls: ['./shipment-detail.component.scss']
})
export class ShipmentDetailComponent implements OnInit {

  @Input() record: Shipment | any;
  constructor() { }

  ngOnInit(): void {
  }

}
