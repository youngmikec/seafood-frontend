import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import {ApiResponse } from '../models';
import { EnvService, ApiService } from '../services';




@Injectable()

export class Geocodings {

    constructor(
        private env: EnvService,
        private apiService: ApiService
    ){}
  
  
    async recordCreate(data: any): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/geocords`;
      const proRes = this.apiService.postApi(url, data).pipe(
        map((res: ApiResponse) => {
          if (res.success && res.payload) {
          } else {
            throwError(res.message);
          }
          return res;
        }));
      return await proRes.toPromise();
    }

    
}