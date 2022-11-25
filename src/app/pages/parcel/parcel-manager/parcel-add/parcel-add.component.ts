import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Parcel, User } from '../../../../models';
import { Parcels } from '../../../../providers';
import { categories } from '../../../../helpers';

@Component({
  selector: 'app-parcel-add',
  templateUrl: './parcel-add.component.html',
  styleUrls: ['./parcel-add.component.scss']
})

export class ParcelAddComponent implements OnInit {
  @Input()record: Parcel | null = null;
  @Input()formType: string = 'create';
  @Output()changed = new EventEmitter <boolean> ();

  //@ts-ignore
  addForm: FormGroup;
  //@ts-ignore
  updateForm: FormGroup;
  loading: boolean = false;
  searching: boolean = false;
  documentsArray: Array<string> = []; 
  organizationDetail: User | null = null;
  organizationName: string = '';
  categoryOptions: string[] = [];
  deliveryCoordinates: Array<number> = [];
  pickupCoordinates: Array<number> = [];


  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private parcels: Parcels,
    // private users: Users,
  ) {
    this.createAddForm();
    this.createUpdateForm();
   }

  ngOnInit(): void {
    this.categoryOptions = categories;
    if(this.formType == 'edit' && this.record){
      console.log(this.formType);
      this.setUpdateForm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.formType == 'edit' && this.record){
      this.setUpdateForm();
    } 
  }

  createAddForm(){
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      mass: ['', Validators.required],
      volume: ['', Validators.required],
      worth: ['', Validators.required],
      category: ['', Validators.required],
      identification: ['', Validators.required],
    });
  }

  createUpdateForm(){
    this.updateForm = this.formBuilder.group({
      name: [''],
      description: [''],
      quantity: [''],
      mass: [''],
      volume: [''],
      worth: [''],
      category: [''],
      identification: [''],
    })
  }

  setUpdateForm(){
    this.updateForm.patchValue({
      name: this.record?.name ? this.record?.name : '',
      category: this.record?.category ? this.record?.category : '',
      description: this.record?.description ? this.record?.description : '',
      quantity: this.record?.quantity ? this.record?.quantity : '',
      mass: this.record?.mass ? this.record?.mass : '',
      volume: this.record?.volume ? this.record?.volume : '',
      worth: this.record?.worth ? this.record?.worth : '',
      identification: this.record?.identification ? this.record?.identification : '',
    })
  }

  onSubmit(){
    this.loading = true;
    const payload = this.addForm.value;

    if(this.addForm.invalid){
      this.loading = false;
      this.showNotification('Pls fill in the requird Inputs');
    }

    this.parcels.recordCreate(payload).then(res => {
      if(res.success){
        this.loading = false;
        this.addForm.reset();
        this.changed.emit(true);
        this.documentsArray = [];
        this.showNotification('Parcel successfully created');
      }
    }).catch(error => {
      this.loading = false;
      this.showNotification(error);
    })
  }

  onUpdate(){
    this.loading = true;
    const payload = this.updateForm.value;

    this.parcels.recordUpdate(this.record, payload).then(res => {
      if(res.success){
        this.loading = false;
        this.changed.emit(true);
        this.showNotification('Parcel Record successfully updated!');
      }
    }).catch(error => {
      this.loading = false;
      this.showNotification(error);
    })
  }

  showNotification(message: string) {
    this.toastr.show(`<span class="now-ui-icons ui-1_bell-53"></span> <b>${message}</b>`, '', {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: 'alert alert-primary alert-with-icon',
    });
  }

}
