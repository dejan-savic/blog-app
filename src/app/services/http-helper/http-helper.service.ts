import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EventEmitterService } from '../event-emitter/event-emitter.service';

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  private baseUrl: string;
  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private eventEmitterService: EventEmitterService) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    this.baseUrl = 'https://frontend-api-test-nultien.azurewebsites.net/api/'
  }

  get(url: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get<any>(this.baseUrl + url, { headers: this.httpHeaders, params: params })
      .pipe(
        catchError(err => of(this.eventEmitterService.notificationEvent.emit(err.message)))
        );
  }

  post(url: string, data: any, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.post<any>(this.baseUrl + url, data, { headers: this.httpHeaders, params: params })
      .pipe(
        catchError(err => of(this.eventEmitterService.notificationEvent.emit(err.message)))
      );
  }

  put(url: string, data: any, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.put<any>(this.baseUrl + url, data, { headers: this.httpHeaders, params: params })
      .pipe(
        catchError(err => of(this.eventEmitterService.notificationEvent.emit(err.message)))
      );
  }

  patch(url: string, data: any, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.patch<any>(this.baseUrl + url, data, { headers: this.httpHeaders, params: params })
      .pipe(
        catchError(err => of(this.eventEmitterService.notificationEvent.emit(err.message)))
      );
  }

  delete(url: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.delete(this.baseUrl + url, { headers: this.httpHeaders, params: params })
      .pipe(
        catchError(err => of(this.eventEmitterService.notificationEvent.emit(err.message)))
      );
  }

 }
