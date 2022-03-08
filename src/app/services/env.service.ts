import { Injectable } from '@angular/core';
import { getLocalStorage } from '../helpers';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EnvService {

  public API_URL = environment.CURRENT_URL;
  // public FLUTTERWAVE_KEY = environment.FLUTTERWAVE_KEY;
  // public GEOCODING_URL = environment.GEOCODE_URL;
  // public CENTRAL_API = 'http://63.34.89.156/api';
  // public LOCAL_API = 'http://127.0.0.1:5111/api';
  // public apiMode: 'ONLINE' | 'OFFLINE' = 'ONLINE';

  constructor() {
  }

}
