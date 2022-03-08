import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AppModalService {
    private _isModalOpen: boolean = false;

    constructor(){}

    private modalStatus(){
        this._isModalOpen = !this._isModalOpen;
    }

    public getModalStatus(): boolean{
        return this._isModalOpen;
    }

    public openModal(){
        if(this.getModalStatus() == false) this.modalStatus();
        console.log(this._isModalOpen);
        return this.getModalStatus()
    }

    public closeModal(){
        if(this.getModalStatus()) this.modalStatus();
        console.log(this._isModalOpen);
        return this.getModalStatus();
    }
}