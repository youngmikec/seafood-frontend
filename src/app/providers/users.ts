import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import {ApiResponse, User } from '../models';
import { EnvService, ApiService } from '../services';




@Injectable()

export class Users {
    shipments: Array<User> = [];

    constructor(
        private env: EnvService,
        private apiService: ApiService
    ){}
  
    query(params?: any) {
      if (!params) {
        return this.shipments;
      }
      return this.shipments.filter((parcel) => {
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
  
    add(parcel: User) {
      this.shipments.push(parcel);
    }
  
    delete(parcel: User) {
      this.shipments.splice(this.shipments.indexOf(parcel), 1);
    }
  
    // CRUD Service
    // async recordRetrieve(queryString = '?sort=-createdAt'): Promise<ApiResponse> {
    async recordRetrieve(queryString = '' ): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/user${queryString}`;
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
      const url = `${this.env.API_URL}/user`;
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
  
    async recordUpdate(record: User | any, payload: any): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/user/${record.id}`;
      const proRes = this.apiService.updateApi(url, payload).pipe(
        map((res: ApiResponse) => {
          if (res.success) {
            this.delete(record);
            this.recordRetrieve().then(res =>{
                this.shipments = res.payload;
            })
          } else {
            throwError(res.message);
          }
          return res;
        }));
      return await proRes.toPromise();
    }
  
    async recordDelete(record: User | any): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/user/${record.id}`;
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