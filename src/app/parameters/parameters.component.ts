import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  @Input() url!: BehaviorSubject<string>;
  initialUrl!: string;

  public onRemoveClick = () => {
    if (this.activeParam === 'Query Params') {
      const filtered = this.params.filter((el) => el.id !== this.param.id);
      this.appService.params.next(filtered);
    } else if (this.activeParam === 'Headers') {
      const filtered = this.headers.filter((el) => el.id !== this.param.id);
      this.appService.headers.next(filtered);
    }
  };

  public onParamsChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (this.activeParam === 'Query Params') {
      if (target.name === 'paramKey') {
        let prev = this.params.find((el) => el.id === this.param.id);
        prev!.paramKey = target.value;
        if (this.params.length > 1) {
          this.url.next(this.initialUrl + '&' + target.value);
        } else {
          this.url.next(this.initialUrl + '?' + target.value);
        }
      } else if (target.name === 'paramVal') {
        let prev = this.params.find((el) => el.id === this.param.id);
        prev!.paramVal = target.value;
        if (this.params.length > 1) {
          this.url.next(
            this.initialUrl + '&' + prev!.paramKey + '=' + target.value
          );
        } else {
          this.url.next(
            this.initialUrl + '?' + prev!.paramKey + '=' + target.value
          );
        }
      }
    } else if (this.activeParam === 'Headers') {
      if (target.name === 'headerKey') {
        let prev = this.headers.find((el) => el.id === this.param.id);
        prev!.headerKey = target.value;
      } else if (target.name === 'headerVal') {
        let prev = this.headers.find((el) => el.id === this.param.id);
        prev!.headerVal = target.value;
      }
    }
  };

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.initialUrl = this.url.getValue();
  }
}
