import { Component, OnInit, Input } from '@angular/core';
import { Deposit } from '../../../../models';

@Component({
  selector: 'app-deposit-detail',
  templateUrl: './deposit-detail.component.html',
  styleUrls: ['./deposit-detail.component.scss']
})
export class DepositDetailComponent implements OnInit {
  @Input() record!: Deposit;
  
  constructor() { }

  ngOnInit(): void {
  }

}
