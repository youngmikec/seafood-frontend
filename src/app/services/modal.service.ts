import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ModalService {
    private state = new BehaviorSubject <boolean> (false);

    constructor(){}

    setModalState(state: boolean): void {
        this.state.next(state);
    }

    getModalState(): Observable<boolean> {
        return this.state;
    }
}
