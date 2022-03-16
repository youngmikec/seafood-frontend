import { Injectable } from '@angular/core';
import { Observable, of, from, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { cleanObject } from '../helpers';


const API_ACCESS_KEY = 'jeNeSais-pas';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', Accept: "application/json"}),
  // params: new HttpParams({ fromString: `apiKey=${API_ACCESS_KEY}` }) 
};

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  depth = 0;

  constructor(private http: HttpClient,
    private router: Router) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`\n\n::Frontend Error: ${error.status}\n\n`);
    } else {
      console.error(`\n\n::Backend Error:\n\n`);
    }
    
    // return throwError(error.error); // Already extracted by ErrorInterceptor
    return throwError(error);
  }

  private extractData(res: any) {
    const body = res;
    return body || { };
  }

  // BASIC

  getApi(url: string): Observable<any> {
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postApi(url: string, data: any): Observable<any> {
    const payload = cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
      );
  }

  updateApi(url: string, data: any): Observable<any> {
    const payload = cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
      retry(3),
        catchError(this.handleError)
      );
  }

  patchApi(url: string, data: any = { deleted: true }): Observable<any> {
    
    return this.http.patch(url, data, httpOptions).pipe(
      retry(3),
        catchError(this.handleError)
      );
  }

  deleteApi(url: string): Observable<{}> {
    return this.http.delete(url, httpOptions).pipe(
      retry(3),
        catchError(this.handleError)
      );
  }

}
