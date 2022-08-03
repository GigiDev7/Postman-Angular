import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { v4 as uuidv4 } from 'uuid';
import { IParam } from './models/param.model';
import { IHeader } from './models/header.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public activeParam: string = 'Query Params';
  public url: string = '';
  public method: string = 'GET';
  public params: IParam[] = [];
  public headers: IHeader[] = [];

  public onActiveParamChange = (val: string) => {
    this.activeParam = val;
  };

  public onUrlChange = (e: Event) => {
    this.url = (e.target as HTMLInputElement).value;
  };

  public onMethodChange = (e: Event) => {
    this.method = (e.target as HTMLInputElement).value;
  };

  public onAddClick = () => {
    if (this.activeParam === 'Query Params') {
      const newParam = { id: uuidv4(), paramKey: '', paramVal: '' };
      this.appService.params.next([...this.params, newParam]);
    } else if (this.activeParam === 'Headers') {
      const newParam = { id: uuidv4(), headerKey: '', headerVal: '' };
      this.appService.headers.next([...this.headers, newParam]);
    }
  };

  constructor(private appService: AppService) {}

  public ngOnInit(): void {
    this.appService.params.subscribe({
      next: (res) => (this.params = res),
    });
    this.appService.headers.subscribe({
      next: (res) => (this.headers = res),
    });
  }
}
