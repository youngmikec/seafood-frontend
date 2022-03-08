import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import {ApiResponse, Parcel } from '../models';
import { EnvService, ApiService } from '../services';




@Injectable()

export class Parcels {
    parcels: Array<Parcel> = [];

    constructor(
        private env: EnvService,
        private apiService: ApiService
    ){}
  
    query(params?: any) {
      if (!params) {
        return this.parcels;
      }
      return this.parcels.filter((parcel) => {
        for (const key in params) {
          if (params.hasOwnProperty(key)) {
            //@ts-ignore
            const field = parcel[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return parcel;
            } else if (field === params[key]) {
              return parcel;
            }
          }
        }
        return null;
      });
    }
  
    add(parcel: Parcel) {
      this.parcels.push(parcel);
    }
  
    delete(parcel: Parcel) {
      this.parcels.splice(this.parcels.indexOf(parcel), 1);
    }
  
    // CRUD Service
    // async recordRetrieve(queryString = '?sort=-createdAt'): Promise<ApiResponse> {
    async recordRetrieve(queryString = '' ): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/parcel${queryString}`;
      const proRes = this.apiService.getApi(url).pipe(
        map((res: ApiResponse) => {
          console.log(res);
          if (res.success && res.payload.length > 0) {
            res.payload.forEach((element: any) => {
              this.add(element);
            });
          } else {
            throwError(res.message);
          }
          return res;
        }));
      return await proRes.toPromise();
    }
  
    async recordCreate(data: any): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/parcel`;
      const proRes = this.apiService.postApi(url, data).pipe(
        map((res: ApiResponse) => {
          if (res.success && res.payload) {
            console.log('recordCreate() successful');
          } else {
            throwError(res.message);
          }
          return res;
        }));
      return await proRes.toPromise();
    }
  
    async recordUpdate(record: Parcel, payload: any): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/parcel/operation/${record.id}`;
      const proRes = this.apiService.updateApi(url, payload).pipe(
        map((res: ApiResponse) => {
          if (res.success) {
            this.delete(record);
            this.recordRetrieve().then(res =>{
                this.parcels = res.payload;
            })
          } else {
            throwError(res.message);
          }
          return res;
        }));
      return await proRes.toPromise();
    }
  
    async recordDelete(record: Parcel): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/parcel/${record.id}`;
      const proRes = this.apiService.deleteApi(url).pipe(
        map((res: any) => {
          if (res.success) {
            this.delete(record);
          } else {
            throwError(res.message);
          }
          return res;
        }));
      return await proRes.toPromise();
    }
}