import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { IHeader } from '../models/header.model';
import { IParam } from '../models/param.model';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css'],
})
export class ParametersComponent implements OnInit {
  @Input() param!: IParam | IHeader;
  @Input() activeParam!: string;

  public onRemoveClick = () => {
    if (this.activeParam === 'Query Params') {
      this.appService.params = this.appService.params.filter(
        (el) => el.id !== this.param.id
      );
    } else if (this.activeParam === 'Headers') {
      this.appService.headers = this.appService.headers.filter(
        (el) => el.id !== this.param.id
      );
    }
  };

  constructor(private appService: AppService) {}

  ngOnInit(): void {}
}
