import { Component, OnInit } from '@angular/core';
import { OFFICE_LOCATIONS } from '../../helpers';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.scss']
})
export class OfficesComponent implements OnInit {

  officeLocations: Array<any> = [];
  constructor() {
    this.officeLocations = OFFICE_LOCATIONS.locations;
   }

  ngOnInit(): void {
  }

}
