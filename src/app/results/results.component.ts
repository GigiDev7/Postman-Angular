import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  public activeParam: string = 'Body';

  public onActiveParamChange = (val: string) => {
    this.activeParam = val;
  };

  constructor() {}

  ngOnInit(): void {}
}
