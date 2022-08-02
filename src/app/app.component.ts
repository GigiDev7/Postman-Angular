import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public activeParam: string = 'Query Params';

  public onActiveParamChange = (val: string) => {
    this.activeParam = val;
  };

  constructor() {}
}
