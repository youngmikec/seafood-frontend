import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import {ApiResponse, Deposit } from '../models';
import { EnvService, ApiService } from '../services';




@Injectable()

export class Deposits {
    depositss: Array<Deposit> = [];

    constructor(
        private env: EnvService,
        private apiService: ApiService
    ){}
  
    query(params?: any) {
      if (!params) {
        return this.depositss;
      }
      return this.depositss.filter((parcel) => {
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
  
    add(parcel: Deposit) {
      this.depositss.push(parcel);
    }
  
    delete(parcel: Deposit) {
      this.depositss.splice(this.depositss.indexOf(parcel), 1);
    }
  
    // CRUD Service
    async recordRetrieve(queryString = '' ): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/deposits${queryString}`;
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
      const url = `${this.env.API_URL}/deposits`;
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

    async AdminRecordCreate(data: any): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/deposits/admin`;
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
  
    async recordUpdate(record: Deposit | any, payload: any): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/deposits/${record.id}`;
      const proRes = this.apiService.updateApi(url, payload).pipe(
        map((res: ApiResponse) => {
          if (res.success) {
            this.delete(record);
            this.recordRetrieve().then(res =>{
                this.depositss = res.payload;
            })
          } else {
            throwError(res.message);
          }
          return res;
        }));
      return await proRes.toPromise();
    }

    async depositOperation(record: Deposit | any, payload: any): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/deposits/operation/${record.id}`;
      const proRes = this.apiService.updateApi(url, payload).pipe(
        map((res: ApiResponse) => {
          if (res.success) {
            this.delete(record);
            this.recordRetrieve().then(res =>{
                this.depositss = res.payload;
            })
          } else {
            throwError(res.message);
          }
          return res;
        }));
      return await proRes.toPromise();
    }
  
    async recordDelete(record: Deposit): Promise<ApiResponse> {
      const url = `${this.env.API_URL}/deposits/${record.id}`;
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