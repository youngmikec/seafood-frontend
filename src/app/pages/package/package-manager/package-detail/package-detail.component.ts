import { Component, OnInit, Input } from '@angular/core';
import { Package } from '../../../../models';

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.scss']
})
export class PackageDetailComponent implements OnInit {
  @Input() record: Package | any;

  constructor() { }

  ngOnInit(): void {
  }

}
