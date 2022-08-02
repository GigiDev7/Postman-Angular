import { Injectable } from '@angular/core';
import { IHeader } from './models/header.model';
import { IParam } from './models/param.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public params: IParam[] = [];
  public headers: IHeader[] = [];

  constructor() {}
}
