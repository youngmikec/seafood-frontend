import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Parcel, User } from '../../../../models';
import { Parcels } from '../../../../providers';

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
    if(this.formType !== 'create' && this.record){
      this.setUpdateForm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.formType !== 'create' && this.record){
      this.setUpdateForm();
    } 
  }

  createAddForm(){
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      senderName: ['', Validators.required],
      senderPhone: ['', Validators.required],
      senderEmail: ['', Validators.required],
      recipientName: ['', Validators.required],
      recipientPhone: ['', Validators.required],
      recipientEmail: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      mass: ['', Validators.required],
      volume: ['', Validators.required],
      worth: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      pickupAddress: ['', Validators.required],
      isParcelPaid: ['', Validators.required],
      category: ['', Validators.required],
      identification: ['', Validators.required],
    });
  }

  createUpdateForm(){
    this.updateForm = this.formBuilder.group({
      name: [''],
      senderName: [''],
      senderPhone: [''],
      senderEmail: [''],
      recipientName: [''],
      recipientPhone: [''],
      recipientEmail: [''],
      description: [''],
      quantity: [''],
      mass: [''],
      volume: [''],
      worth: [''],
      deliveryAddress: [''],
      pickupAddress: [''],
      isParcelPaid: [''],
      category: [''],
      identification: [''],
    })
  }

  setUpdateForm(){
    this.updateForm.patchValue({
      name: this.record?.name ? this.record?.name : '',
      category: this.record?.category ? this.record?.category : '',
      senderName: this.record?.senderName ? this.record?.senderName : '',
      senderPhone: this.record?.senderPhone ? this.record?.senderPhone : '',
      senderEmail: this.record?.senderEmail ? this.record?.senderEmail : '',
      recipientName: this.record?.recipientName ? this.record?.recipientName : '',
      recipientPhone: this.record?.recipientPhone ? this.record?.recipientPhone : '',
      recipientEmail: this.record?.recipientEmail ? this.record?.recipientEmail : '',
      description: this.record?.description ? this.record?.description : '',
      quantity: this.record?.quantity ? this.record?.quantity : '',
      mass: this.record?.mass ? this.record?.mass : '',
      volume: this.record?.volume ? this.record?.volume : '',
      worth: this.record?.worth ? this.record?.worth : '',
      deliveryAddress: this.record?.deliveryAddress ? this.record?.deliveryAddress : '',
      deliveryCoodinates: this.record?.deliveryCoordinates ? this.record?.deliveryCoordinates : '',
      pickupAddress: this.record?.pickupAddress ? this.record?.pickupAddress : '',
      pickupCoordinates: this.record?.pickupCoordinates ? this.record?.pickupCoordinates : '',
      isParcelPaid: this.record?.isParcelPaid ? this.record?.isParcelPaid : '',
      identification: this.record?.identification ? this.record?.identification : '',
    })
  }

  onSubmit(){
    this.loading = true;
    const payload = this.addForm.value;
    payload.deliveryCoordinates = [4.6560, 6.9874];
    payload.pickupCoordinates = [5.6560, 9.9874];

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

  // searchMember = async (e) => {
  //   this.searching = true;
  //   e.preventDefault();
  //   const type = 'someOrganizations';
  //   this.members.queryReocrds(type, 'asc', 'createdAt', this.organizationName).subscribe(
  //     res => {
  //       if(res.data[type]['edges'].length > 0){
  //         this.searching = false;
  //         this.organizationDetail = res.data[type]['edges'][0]['node'];
  //         console.log('organization', this.organizationDetail);   
  //         this.showNotification(`${res.data[type]['edges'].length} Member Found`)
  //         if(this.formType === 'create'){
  //           this.addForm.patchValue({
  //             organization: this.organizationDetail.id,
  //             organizationName: `${this.organizationDetail.organizationName}`,
  //             organizationDetail:  this.organizationDetail.id,
  //           })
  //         }else{
  //           this.updateForm.patchValue({
  //             organization: this.organizationDetail.id,
  //             organizationName: `${this.organizationDetail.organizationName}`,
  //             organizationDetail:  this.organizationDetail.id, 
  //           })
  //         }
  //       }else{
  //         this.searching = false;
  //         this.showNotification("No member found for the provided name");
  //       }
  //     })
  // }

  // addDocument({ target }){
  //   if(target){
  //     this.documentsArray.push(target.value);
  //     this.showNotification('Document added');
  //   } 
  //   return
  // }

  showNotification(message: string) {
    this.toastr.show(`<span class="now-ui-icons ui-1_bell-53"></span> <b>${message}</b>`, '', {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-primary alert-with-icon',
      });
  }

}
