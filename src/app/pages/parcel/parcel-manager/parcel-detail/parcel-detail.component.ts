import { Component, OnInit, Input } from '@angular/core';
import { Parcel } from '../../../../models';

@Component({
  selector: 'app-parcel-detail',
  templateUrl: './parcel-detail.component.html',
  styleUrls: ['./parcel-detail.component.scss']
})
export class ParcelDetailComponent implements OnInit {
  @Input() record: Parcel | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
