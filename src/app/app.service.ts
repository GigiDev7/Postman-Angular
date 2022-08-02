import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public params: { id: string; paramKey: string; paramVal: string }[] = [];
  public headers: { id: string; headerKey: string; headerVal: string }[] = [];

  constructor() {}
}
