import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  public activeParam: string = 'Body';
  @Input() data!: any;
  @Input() responseHeaders!: any;
  @Input() responseDetails!: { status: string; time: number; size: string };

  public onActiveParamChange = (val: string) => {
    this.activeParam = val;
  };

  constructor() {}

  ngOnInit(): void {}
}
