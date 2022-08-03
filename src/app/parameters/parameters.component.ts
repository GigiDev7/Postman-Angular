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
  @Input() params!: IParam[];
  @Input() headers!: IHeader[];

  public onRemoveClick = () => {
    if (this.activeParam === 'Query Params') {
      const filtered = this.params.filter((el) => el.id !== this.param.id);
      this.appService.params.next(filtered);
    } else if (this.activeParam === 'Headers') {
      const filtered = this.headers.filter((el) => el.id !== this.param.id);
      this.appService.headers.next(filtered);
    }
  };

  constructor(private appService: AppService) {}

  ngOnInit(): void {}
}
