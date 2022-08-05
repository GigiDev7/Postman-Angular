import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { v4 as uuidv4 } from 'uuid';
import { IParam } from './models/param.model';
import { IHeader } from './models/header.model';
import { BehaviorSubject } from 'rxjs';
import prettyBytes from 'pretty-bytes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public activeParam: string = 'Query Params';
  public url = new BehaviorSubject<string>('');
  public method: string = 'GET';
  public params: IParam[] = [];
  public headers: IHeader[] = [];
  public requestBody: any = '{}';
  public data: any = null;
  public responseDetails: { status: string; size: string; time: number } = {
    status: '',
    time: 0,
    size: '',
  };
  public responseHeaders: any = {};

  public editorOptions = { theme: 'default', language: 'json' };

  public onActiveParamChange = (val: string) => {
    this.activeParam = val;
  };

  public onUrlChange = (e: Event) => {
    this.url.next((e.target as HTMLInputElement).value);
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

  public handleSubmit = () => {
    this.appService
      .makeRequest(
        (this.method as any).toLowerCase(),
        this.url.getValue(),
        this.headers,
        JSON.parse(this.requestBody)
      )
      .subscribe({
        next: (res) => {
          this.data = (res as any).body;
          for (const key of (res as any).headers.keys()) {
            this.responseHeaders[key] = (res as any).headers.get(key);
          }
          this.responseDetails = {
            status: (res as any).status,
            time: (res as any).endTime * 1 - (res as any).startTime * 1,
            size: prettyBytes(
              JSON.stringify(this.data).length +
                JSON.stringify(this.responseHeaders).length
            ),
          };
        },
        error: (err) => {
          this.data = 'Error';
          for (const key of (err as any).headers.keys()) {
            this.responseHeaders[key] = (err as any).headers.get(key);
          }
          this.responseDetails = {
            status: (err as any).status,
            time: (err as any).endTime * 1 - (err as any).startTime * 1,
            size: prettyBytes(JSON.stringify(this.responseHeaders).length),
          };
        },
      });
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
