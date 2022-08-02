import { Component, Input, OnInit } from '@angular/core';
import { IHeader } from '../models/header.model';
import { IParam } from '../models/param.model';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css'],
})
export class ParametersComponent implements OnInit {
  @Input() param!: IParam | IHeader;

  constructor() {}

  ngOnInit(): void {
    console.log(this.param);
  }
}
