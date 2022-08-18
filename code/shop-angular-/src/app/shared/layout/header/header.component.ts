import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {TranslateService} from "@ngx-translate/core";
import {APP_CONFIG, IAppConfig} from "../../../core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    @Inject(APP_CONFIG) public appConfig: IAppConfig,
    private apiService: ApiService, public translate: TranslateService) {
  }

  ngOnInit(): void {
  }

  // تغغیر زبان
  changeLanguage(name: string) {
    // this.apiService.reloadLanguageSource.next(name);
    this.translate.setDefaultLang(name);
    this.translate.use(name);
  }

}
