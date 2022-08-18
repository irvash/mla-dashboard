import {Component, Injector, Input, OnInit} from '@angular/core';
import {AppComponentBase} from "../../../app-component-base";

@Component({
  selector: 'app-show-error-list',
  template: `
    <div class="row">
      <div class="col-md-12 margin-top-10">
        <div
          class="alert alert-danger"
          role="alert"
          *ngIf="!this.isNullOrEmptyList(this.errorsListForPage)"
        >
          <ul>
            <li *ngFor="let error of errorsListForPage">
              {{ error }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  `
})
export class ShowErrorListComponent extends AppComponentBase implements OnInit {

  @Input() errorsListForPage: any[] = [];

  constructor(
    injector: Injector) {
    super(injector);
  }


  ngOnInit(): void {
  }

}
