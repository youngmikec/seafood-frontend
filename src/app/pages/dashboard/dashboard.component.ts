import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';
import { Router } from '@angular/router';
import { Label } from 'ng2-charts';
import { dateDaysAgo, nextDate } from 'src/app/helpers';

import { Parcel, Package, Shipment, User } from '../../models';
import { Packages, Parcels, Shipments, Users } from '../../providers'



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  chart:any = [];
  @ViewChild('chartBars', { static: false }) ctx: any; 
  today: string = new Date().toISOString();
  yesterday: string = dateDaysAgo(1);
  totalIncome: number | undefined = 0;
  
  parcelsArray: Array<Parcel> = [];
  packagesArray: Array<Package> = [];
  usersArray: Array<User> = [];
  shipmentsArray: Array<Shipment> = [];

  constructor(
    private eleRef: ElementRef,
    private users: Users,
    private parcels: Parcels,
    private packages: Packages,
    private shipments: Shipments
  ) {
    this.ctx = this.eleRef.nativeElement
   }

  ngOnInit(): void {
    this.getAllRecords();

  }

  getAllRecords(): void {
    this.getUsers();
    this.getParcels();
    this.getPackages();
    this.getShipments();
  }
  
  getParcels(): void {
    const query = `?createdAt>${this.yesterday}&createdAt<${this.today}`;
    this.parcels.recordRetrieve(query).then(res => {
      if(res.success){
        this.parcelsArray = res.payload;
      }
    }).catch(err => console.log(err));
  }

  getPackages(): void {
    const query = `?createdAt>${this.yesterday}&createdAt<${this.today}&isCheckedOut=true`;
    this.packages.recordRetrieve(query).then(res => {
      if(res.success){
        this.packagesArray = res.payload;
        console.log(this.packagesArray)
        this.totalIncome = this.packagesArray.map((item: Package) => item.amountPayable)
        .reduce((a: number | any, b: number | any) => (a + b) )
      }
    }).catch(err => console.log(err));
  }

  getShipments(): void {
    const query = `?createdAt>${this.yesterday}&createdAt<${this.today}`;
    this.shipments.recordRetrieve(query).then(res => {
      if(res.success){
        this.shipmentsArray = res.payload;
      }
    }).catch(err => console.log(err));
  }

  getUsers(): void {
    this.users.recordRetrieve().then(res => {
      if(res.success){
        this.usersArray = res.payload;
      }
    }).catch(err => console.log(err));
  }

}
