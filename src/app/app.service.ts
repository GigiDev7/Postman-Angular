import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { IHeader } from './models/header.model';
import { IParam } from './models/param.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public params = new BehaviorSubject<IParam[]>([]);
  public headers = new BehaviorSubject<IHeader[]>([]);

  public makeRequest(
    method: 'get' | 'post' | 'patch' | 'delete',
    url: string,
    headers: any,
    body: any
  ) {
    if (method === 'get' || method === 'delete') {
      return this.http[method](url, {
        headers,
        observe: 'response' as 'body',
      });
    } else {
      return this.http[method](url, body, { headers });
    }
  }

  constructor(private http: HttpClient) {}
}
