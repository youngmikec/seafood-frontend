import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Shipment, Package } from '../../../../models';
import { Shipments } from '../../../../providers';

@Component({
  selector: 'app-shipment-add',
  templateUrl: './shipment-add.component.html',
  styleUrls: ['./shipment-add.component.scss']
})
export class ShipmentAddComponent implements OnInit {
  @Input()packageRecords: Array<Package> = [];
  @Input()formType: string = 'create';
  @Input()record: Shipment | null = null;
  @Output() changed = new EventEmitter <boolean> ();
  //@ts-ignore
  addForm: FormGroup;
  //@ts-ignore
  updateForm: FormGroup;
  loading: boolean = false;
  packagesArray: Array<string> = [];
  

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private shipments: Shipments
  ) { 
    this.createAddForm();
    this.createUpdateForm();
  }

  ngOnInit(): void {
    if(this.formType == 'edit' && this.record){
      this.setUpdateForm();
    }
  }

  createAddForm(){
    this.addForm = this.formBuilder.group({
      packages: [[]],
      locationFrom: ['', Validators.required],
      destination:  ['', Validators.required],
      currentLocation:  ['', Validators.required],
      courierName:  ['', Validators.required],
      courierPhone:  ['', Validators.required],
      status:  ['LOADING', Validators.required],
      departureDate: ['', Validators.required],
      expectedDate: ['', Validators.required],
      vehicleType: ['', Validators.required],
      vehicleDetail: ['', Validators.required],
      isVehicleFull: [false, Validators.required],
      remark: ['', Validators.required],
    });
  }

  createUpdateForm(){
    this.updateForm = this.formBuilder.group({
      packages: [[]],
      locationFrom: [''],
      destination:  [''],
      currentLocation:  [''],
      courierName:  [''],
      courierPhone:  [''],
      departureDate: [''],
      expectedDate: [''],
      vehicleType: [''],
      vehicleDetail: [''],
      isVehicleFull: [''],
      remark: [''],
    });
  }

  setUpdateForm(){
    this.updateForm.patchValue({
      packages: this.record?.packages ? this.record?.packages : '',
      locationFrom: this.record?.locationFrom ? this.record?.locationFrom['address'] : '',
      destination: this.record?.destination ? this.record?.destination['address'] : '',
      currentLocation: this.record?.currentLocation ? this.record?.currentLocation['address'] : '',
      courierName: this.record?.courierName ? this.record?.courierName : '',
      courierPhone: this.record?.courierPhone ? this.record?.courierPhone : '',
      departureDate: this.record?.departureDate ? this.record?.departureDate : '',
      expectedDate: this.record?.expectedDate ? this.record?.expectedDate : '',
      vehicleType: this.record?.vehicleType ? this.record?.vehicleType : '',
      vehicleDetail: this.record?.vehicleDetail ? this.record?.vehicleDetail : '',
      isVehicleFull: this.record?.isVehicleFull ? this.record?.isVehicleFull : '',
      remark: this.record?.remark ? this.record?.remark : '',
    })
  }

  addToPackagesArray($event: any){
    if($event){
      console.log('event', $event);
      this.packagesArray.push($event.id);
      this.showNotification('package added successfully');
    }
    return;
  }

  onSubmit(){
    this.loading = true;
    const payload = this.addForm.value;
    payload.packages = this.packagesArray.length > 0 ? this.packagesArray : [];
    payload.isVehicleFull = payload.isVehicleFull === 'true' || true ? true : false;
    payload.locationFrom = {address: payload.locationFrom, coordinates: [32.3242, 65.7564]}
    payload.destination = {address: payload.destination, coordinates: [32.3242, 65.7564]}
    payload.currentLocation = {address: payload.currentLocation, coordinates: [32.3242, 65.7564]}

    if(this.addForm.invalid){
      this.showNotification('Fill in all the required inputs');
    }

    this.shipments.recordCreate(payload).then(res => {
      if(res.success){
        this.addForm.reset();
        this.changed.emit(true);
        this.showNotification(res.message);
      }
    })
    .catch(err => this.showNotification(err))
    .finally(() => {
      this.loading = false;
    })
  }

  onUpdate(){
    this.loading = true;
    const payload = this.updateForm.value;
    payload.packages = payload.packages.length > 0 ? payload.packages.map((item: any) => item.id) : [];
    payload.isVehicleFull = payload.isVehicleFull === 'true' || true ? true : false;
    payload.locationFrom = {address: payload.locationFrom, coordinates: [32.3242, 65.7564]}
    payload.destination = {address: payload.destination, coordinates: [32.3242, 65.7564]}
    payload.currentLocation = {address: payload.currentLocation, coordinates: [32.3242, 65.7564]}


    this.shipments.recordUpdate(this.record, payload).then(res => {
      if(res.success){
        this.changed.emit(true);
        this.showNotification(res.message);
      }
    })
    .catch(err => {
      this.loading = false;
      this.showNotification(err)
    })
    .finally(() => {
      this.loading = false;
    })
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
