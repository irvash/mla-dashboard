import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs";
import {ApiService} from "./core/services/api.service";
import {SeoService} from "./core/services/seo.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  onLangChange: Subscription | undefined = undefined;


  constructor(
    private seoService: SeoService,
    private apiService: ApiService,
    public el: ElementRef,
    public router: Router,
    public translate: TranslateService) {
    translate.addLangs(['en', 'fa']);
    translate.setDefaultLang('fa');
    translate.use('fa');

    this.seoService.enableSeo();
  }


  ngOnInit() {
    this.updateLanguage();
    this.onLangChange = this.translate.onLangChange.subscribe(() => {
      this.updateLanguage();
    });
  }

  ngOnDestroy() {
    if (this.onLangChange !== undefined) {
      this.onLangChange.unsubscribe();
    }
  }

  // تغییر کلی سایت
  updateLanguage(): void {
    const lang = document.createAttribute('lang');
    lang.value = this.translate.currentLang;
    this.el.nativeElement.parentElement.parentElement.parentElement.attributes.setNamedItem(lang);
  }
}
