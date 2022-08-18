import {Component, Inject, Injector, OnInit} from '@angular/core';
import {ApiService} from "../../core/services/api.service";
import {TranslateService} from "@ngx-translate/core";
import {AboutDto} from "../../models/about-dto.interface";
import {AppComponentBase} from "../../app-component-base";
import {APP_CONFIG, IAppConfig} from 'src/app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends AppComponentBase implements OnInit {

  param = {value: 'world'};

  model: AboutDto = {} as any;


  news: boolean = true;

  constructor(
    @Inject(APP_CONFIG) public appConfig: IAppConfig,
    injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.getAbout();


  }

  getAbout() {
    this.apiService.getAbout().subscribe(res => {
      if (res.status) {
        this.appConfig.aboutDto = res.data;
        // this.model = res.data;
      }
    })
  }


  showNews(b: boolean) {
    this.news = b;
  }
}
