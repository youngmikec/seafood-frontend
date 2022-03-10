import { Component, OnInit, ViewChild, Input, OnChanges, ElementRef, Renderer2, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ModalService } from '../../services';

@Component({
  selector: 'app-modal-large',
  templateUrl: './modal-large.component.html',
  styleUrls: ['./modal-large.component.scss']
})
export class ModalLargeComponent implements OnInit, OnChanges {
  @Input() headerTitle: string = 'Modal Large';
  @ViewChild('modal', { static: false }) modal?: ElementRef<HTMLElement>; 
  state: boolean = false;

  constructor(
    private modalService: ModalService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    
   }

  ngOnInit(): void {
    this.modalService.getModalState().subscribe({
      next: (res: boolean) => {
        this.state = res;
        this.toggleModal();
        console.log('state', this.state);
      } 
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.toggleModal();
  }
  
  toggleModal(){
    if(this.state){
      console.log('Inside toggle');
      // this.currentWalletDeposit = record;
      // console.log('[Current Edit Record] ', this.currentWalletDeposit);
      // this.loadedStatus = record.isLoaded ? 'Not Loaded' : 'Loaded';
      // const deleteModal =  $(`#modalLarge`);
      const deleteModal =  this.modal?.nativeElement;
      console.log('modal', deleteModal);
      this.renderer.setAttribute(deleteModal, 'aria-modal', 'true');
      this.renderer.removeAttribute(deleteModal, 'aria-hidden');
      this.renderer.addClass(deleteModal, 'show');
      // deleteModal.attr('aria-modal', 'true');
      // deleteModal.removeAttr('aria-hidden');
      // deleteModal.addClass('show');
    }else{
      // const deleteModal =  $(`#modalLarge`);
      // deleteModal.attr('aria-hidden', 'true');
      // deleteModal.removeAttr('aria-modal');
      // deleteModal.removeClass('show');
      const deleteModal =  this.modal?.nativeElement;
      this.renderer.setAttribute(deleteModal, 'aria-hidden', 'true');
      this.renderer.removeAttribute(deleteModal, 'aria-modal');
      this.renderer.removeChild(deleteModal, 'show');
    }
  }

  closeModal(): void {
    this.modalService.setModalState(false);
    // this.toggleModal();
  }

  openModal(record: any = null): void {
    this.modalService.setModalState(true);
    
  }

  /**
   * @description "Handle close modal"
   */
  closeDepositModal(): void {
    const deleteModal =  $('#depositFormModal');
    deleteModal.attr('aria-hidden', 'true');
    deleteModal.removeAttr('aria-modal');
    deleteModal.removeClass('show');
  }

}
