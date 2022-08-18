import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-select-language',
  template: `
    <div class="row">
      <div class="col-sm-6">
        <c-row class="mb-3">
          <label cLabel class="col-sm-4 col-form-label">
            زبان
          </label>
          <div class="col-sm-8">
            <select
              [(ngModel)]="lang"
              #langInput
              (ngModelChange)="changingValue(langInput.value)"
              [value]="1" (change)="changingValue(langInput.value)">
              <option value="1">فارسی</option>
              <option value="2">English</option>
            </select>

          </div>
        </c-row>
      </div>
    </div>

  `
})
export class SelectLanguageComponent implements OnInit {

  @Input() lang!: any;
  @Output() langChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  changingValue(value: any) {
    console.log(value);
    this.langChange.emit(value)
  }
}
