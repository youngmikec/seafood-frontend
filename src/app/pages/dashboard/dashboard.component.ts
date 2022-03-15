import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { Parcel, Shipment, User } from '../../models';
import { Parcels, Shipments, Users } from '../../providers'



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  chart:any = [];
  @ViewChild('chartBars', { static: false }) ctx: any; 
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
    // = document.getElementById("chart-bars").getContext("2d");
  
  parcelsArray: Array<Parcel> = [];
  usersArray: Array<User> = [];
  shipmentsArray: Array<Shipment> = [];

  constructor(
    private eleRef: ElementRef,
    private users: Users,
    private parcels: Parcels,
    private shipments: Shipments
  ) {
    this.ctx = this.eleRef.nativeElement
   }

  ngOnInit(): void {
    // this.ctx.getContext("2d");
    // this.createChart(this.ctx, "bar", []);
    this.getAllRecords();

  }

  getAllRecords(): void {
    this.getUsers();
    this.getParcels();
    this.getShipments();
  }
  
  getParcels(): void {
    this.parcels.recordRetrieve().then(res => {
      if(res.success){
        this.parcelsArray = res.payload;
      }
    }).catch(err => console.log(err));
  }

  getShipments(): void {
    this.shipments.recordRetrieve().then(res => {
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
  // createChart(ctx: any, type: string | any = "bar", data: Array<object> = []){
  //   this.chart = new Chart('canvas', {
  //     type: type,
  //     data: {
  //       labels: ["M", "T", "W", "T", "F", "S", "S"],
  //       datasets: [{
  //         label: "Sales",
  //         tension: 0.4,
  //         borderWidth: 0,
  //         borderRadius: 4,
  //         borderSkipped: false,
  //         backgroundColor: "rgba(255, 255, 255, .8)",
  //         data: [50, 20, 10, 22, 50, 10, 40],
  //         maxBarThickness: 6
  //       }, ],
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       plugins: {
  //         legend: {
  //           display: false,
  //         }
  //       },
  //       interaction: {
  //         intersect: false,
  //         mode: 'index',
  //       },
  //       scales: {
  //         y: {
  //           grid: {
  //             drawBorder: false,
  //             display: true,
  //             drawOnChartArea: true,
  //             drawTicks: false,
  //             borderDash: [5, 5],
  //             color: 'rgba(255, 255, 255, .2)'
  //           },
  //           ticks: {
  //             suggestedMin: 0,
  //             suggestedMax: 500,
  //             beginAtZero: true,
  //             padding: 10,
  //             font: {
  //               size: 14,
  //               weight: 300,
  //               family: "Roboto",
  //               style: 'normal',
  //               lineHeight: 2
  //             },
  //             color: "#fff"
  //           },
  //         },
  //         x: {
  //           grid: {
  //             drawBorder: false,
  //             display: true,
  //             drawOnChartArea: true,
  //             drawTicks: false,
  //             borderDash: [5, 5],
  //             color: 'rgba(255, 255, 255, .2)'
  //           },
  //           ticks: {
  //             display: true,
  //             color: '#f8f9fa',
  //             padding: 10,
  //             font: {
  //               size: 14,
  //               weight: 300,
  //               family: "Roboto",
  //               style: 'normal',
  //               lineHeight: 2
  //             },
  //           }
  //         },
  //       },
  //     },
  //   });

  // }


}
