import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiService } from './index';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class MapService {

    API_KEY: string = environment.API_KEY;
    url: string = `https://maps.googleapis.com/maps/api/geocode/json?key=${this.API_KEY}`;

    constructor(
        private apiService: ApiService,
    ){}

    geoCoding(queryString: string = "&address=1600+Amphitheatre+Parkway,+Mountain+View,+CA"): Observable<any> {
        this.url += `${queryString}`;
        const result = this.apiService.getApi(this.url).pipe(
            tap((res: any) => res)
        );
        return result;
    }

    reverseGeoCoding(queryString: string = "&latlng=40.714224,-73.961452"): Observable<any> {
        this.url += `${queryString}`;
        const result = this.apiService.getApi(this.url).pipe(
            tap((res: any) => res)
        );
        return result;
    }
}