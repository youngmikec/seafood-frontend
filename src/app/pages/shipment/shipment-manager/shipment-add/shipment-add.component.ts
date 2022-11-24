import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Shipment, Package } from '../../../../models';
import { DestructureGeocoding } from '../../../../helpers';
import { Geocodings, Shipments } from '../../../../providers';

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
  packagesArray: Array<Package> = [];
  locationFromCoordinates: number[] = [];
  destinationCoordinates: number[] = [];
  currentLocationCoordinates: number[] = [];
  

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private shipments: Shipments,
    private geocodings: Geocodings,
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
      const record = this.packageRecords.find((item: Package) => item.id === $event.target.value);
      if(record){
        console.log('event', record);
        this.packagesArray.push(record);
        this.showNotification('package added successfully');
      }
    }
    return;
  }

  removeFromPackagesArray(id: string | undefined): void {
    this.packagesArray = this.packagesArray.filter((item: Package) => item.id !== id);
    this.showNotification('package removed successfully');
  }

  onSubmit(){
    this.loading = true;
    const payload = this.addForm.value;
    payload.packages = this.packagesArray.length > 0 ? this.packagesArray.map((item: Package) => item.id) : [];
    payload.isVehicleFull = payload.isVehicleFull == 'true' || true ? true : false;
    payload.locationFrom = {address: payload.locationFrom, coordinates: this.locationFromCoordinates}
    payload.destination = {address: payload.destination, coordinates: this.destinationCoordinates}
    payload.currentLocation = {address: payload.currentLocation, coordinates: this.currentLocationCoordinates}

    if(this.addForm.invalid){
      this.showNotification('Fill in all the required inputs');
    }

    this.shipments.recordCreate(payload).then(res => {
      if(res.success){
        this.loading = false;
        this.addForm.reset();
        this.changed.emit(true);
        this.showNotification(res.message);
      }
    })
    .catch(err => {
      this.loading = false;
      this.showNotification(err);
    })
  }

  onUpdate(){
    this.loading = true;
    const payload = this.updateForm.value;
    payload.packages = this.packagesArray.length > 0 ? this.packagesArray.map((item: Package) => item.id) : [];
    payload.isVehicleFull = payload.isVehicleFull == 'true' || true ? true : false;
    payload.locationFrom = {address: payload.locationFrom, coordinates: this.locationFromCoordinates}
    payload.destination = {address: payload.destination, coordinates: this.destinationCoordinates}
    payload.currentLocation = {address: payload.currentLocation, coordinates: this.currentLocationCoordinates}


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

  getGeoCoordinate($event: any, name: any): void {
    const { target } = $event;
    const payload = {
      address: target.value,
      direction: 'forward'
    }
    this.geocodings.recordCreate(payload).then(res => {
      if(res.success){
        const { address, coordinate: {lat, lng} } = DestructureGeocoding(res.payload.results[0]);
        if(name === 'destination'){
          this.destinationCoordinates = [lat, lng];
        }
        if(name === 'locationFrom'){
          this.locationFromCoordinates = [lat, lng];
        }
        if(name === 'currentLocation'){
          this.currentLocationCoordinates = [lat, lng];
        }
        this.showNotification(`Coordinates found for specified address`);
      }
    }).catch((err: any) => this.showNotification(err));
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
