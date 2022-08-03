import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IHeader } from './models/header.model';
import { IParam } from './models/param.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public params = new BehaviorSubject<IParam[]>([]);
  public headers = new BehaviorSubject<IHeader[]>([]);

  constructor() {}
}
