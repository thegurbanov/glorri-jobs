import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../../config/app-config';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { ConfigService } from '../general/config.service';

@Injectable()
export class BaseService {
  headers: HttpHeaders;
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) {
    this.http = http;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language':'az',
      'Access-Control-Allow-Origin': '*' ,
      'Accept': '*/*',
    });
    this.headers = headers;

  }

  addQueryParams(url: string): string {
    let param = "";
    return url + param;
  }

  get<T>(url: string, request: any, contentType?: string): Observable<T> {
    let param = "";
    for (const key in request) {
      if (typeof request[key] === 'function') continue;
      if (typeof request[key] === 'undefined') continue;
      if (typeof request[key] === 'object') {
        let data = JSON.stringify(request[key]);
        if (data !== 'undefined') {
          if (param?.length == 0) {
            param += `?${key}=${encodeURI(JSON.stringify(request[key]))}`;
          } else {
            param += `&${key}=${encodeURI(JSON.stringify(request[key]))}`;
          }
        }
      } else {
        if (param.length == 0) {
          param += `?${key}=${encodeURI(request[key])}`;
        } else {
          param += `&${key}=${encodeURI(request[key])}`;
        }
      }
    }
    return this.http.get<T>(this.addQueryParams(AppSettings.BASE_URL + url + param), { headers: this.headers });
  }

  post<T>(url: string, request: any): Observable<T> {
    return this.http.post<T>(this.addQueryParams(AppSettings.BASE_URL + url), request, { headers: this.headers }).pipe(map(response => response));
  }

  put<T>(url: string, request: any): Observable<T> {
    let data = this.http.put<T>(this.addQueryParams(AppSettings.BASE_URL + url), request, { headers: this.headers });
    return data;
  }

  delete<T>(url: string, request: any): Observable<T> {
    let data = this.http.delete<T>(this.addQueryParams(AppSettings.BASE_URL + url), { headers: this.headers });
    return data;
  }

}
