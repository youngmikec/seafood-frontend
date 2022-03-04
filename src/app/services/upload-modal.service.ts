import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class UploadModalService {
    private state = new BehaviorSubject(false);

    constructor(){

    }

    getCurrentState(){
        return this.state;
    }

    private setCurrentState (state: any){
        this.state.next(state);
    }

    openModal(){
        this.setCurrentState(true);
    }

    closeModal(){
        this.setCurrentState(false);
    }
}