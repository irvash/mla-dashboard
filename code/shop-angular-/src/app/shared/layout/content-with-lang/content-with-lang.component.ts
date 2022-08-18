import {Component, Inject, Input, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {APP_CONFIG, IAppConfig} from "../../../core";

@Component({
  selector: 'app-content-with-lang',
  template: `
    <ng-container *ngIf="this.translate.currentLang === 'fa'">{{data}}</ng-container>
    <ng-container *ngIf="this.translate.currentLang === 'en'">{{dataEn}}</ng-container>
  `
})
export class ContentWithLangComponent implements OnInit {


  @Input() data: string = '';
  @Input() dataEn: string = '';

  constructor(
    @Inject(APP_CONFIG) public appConfig: IAppConfig,
    public translate: TranslateService) {
  }

  ngOnInit(): void {
  }

}
