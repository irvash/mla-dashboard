import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {BehaviorSubject, catchError, map, Observable} from "rxjs";
import {APP_CONFIG, IAppConfig} from "./app.config";


import {BaseHttpService} from "./base-http.service";
import {AboutDto} from "../../models/about-dto.interface";
import {EnumController, EnumLanguage} from "../../models/enum-controller.enum";

import {TranslateService} from "@ngx-translate/core";
import {SliderDto} from "../../models/slider-dto.interface";
import {resultShow2} from "../../models/result-show.interface";
import {DepartmentDto} from "../../models/department.interface";
import {AcademyDto} from "../../models/academy-dto.interface";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // public reloadLanguageSource = new BehaviorSubject<string>('fa');
  // public reloadLanguageCast$ = this.reloadLanguageSource.asObservable();

  constructor(
    public translate: TranslateService,
    private http: HttpClient,
    private baseHttpService: BaseHttpService,
    // private router: Router,
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
  ) {

  }


  get getAppConfig(): IAppConfig {
    return this.appConfig;
  }

  get currentLanguage(): number {
    switch (this.translate.currentLang) {
      case EnumLanguage.en:
        return 2;
      case EnumLanguage.fa:
        return 1;
      default:
        return 0;
    }
  }

  // this.baseHttpService.get(`/${EnumController.Cardboard}/GetAllContractWithAcceptUseInContractCardboard?${this.baseHttpService.toQueryString(model)}`);
  getAbout = (): Observable<resultShow2<AboutDto>> => this.baseHttpService.get(`/${EnumController.Home}/GetAbout`);

  getAllSliders = (): Observable<resultShow2<SliderDto[]>> => this.baseHttpService.get(`/${EnumController.Home}/GetAllSliders?lang=${this.currentLanguage}`);

  getAcademies = (): Observable<resultShow2<AcademyDto[]>> => this.baseHttpService.get(`/${EnumController.Home}/GetAcademies?lang=${this.currentLanguage}`);

  getAllDepartments = (): Observable<resultShow2<DepartmentDto[]>> => this.baseHttpService.get(`/${EnumController.Home}/GetAllDepartments`);


  isNullOrEmpty = (val: any) => {
    if (!val) // if a is negative,undefined,null,empty value then...
    {
      // do whatever
      return true;
    } else {

      // do whatever
      return false
    }
  };

  isNullOrEmptyOr0 = (val: any) => {
    if (this.isNullOrEmpty(val)) {
      return true;
    }
    if (val == 0) {
      return true;
    }
    return false;
  }

  isNullOrEmptyList = (val: any) => {
    if (val && val.length && val.length > 0) {
      return false;
    } else {
      return true;
    }
  }

}
