// کامپوننت الگو
import {ApiService} from "./core/services/api.service";
import {AuthService, IAppConfig} from "./core";
import {Injector} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {SweetAlertService} from "./core/services/sweet-alert.service";
import {EnumTypeInput} from "./models/enum-type-input.enum";
import {EnumLanguage} from "./models/enum-controller.enum";
import {TranslateService} from "@ngx-translate/core";


export abstract class AppComponentBase {
  /*
             constructor(
                injector: Injector){
                super(injector);
            }

        constructor(
        @Inject(APP_CONFIG) public appConfig: IAppConfig,
            injector: Injector){
            super(injector);
        }
     */
  /*
  @Inject(APP_CONFIG) public appConfig: IAppConfig
   */

  apiService: ApiService;
  authService: AuthService;
  isLoading: boolean = false;
  isLoading2: boolean = false

  isLoading3: boolean = false;

  sweetAlertService: SweetAlertService;
  // routeEcommerceService: RouteEcommerceService;
  // dataStoreService: DataStoreService;
  route: ActivatedRoute;
  // permissionsService: NgxPermissionsService;
  router: Router;
  translate: TranslateService;

  constructor(
    injector: Injector
  ) {
    // this.bsModalService = injector.get(BsModalService);
    this.apiService = injector.get(ApiService);
    this.authService = injector.get(AuthService);
    this.sweetAlertService = injector.get(SweetAlertService);
    // this.routeEcommerceService = injector.get(RouteEcommerceService);
    // this.spinner = injector.get(NgxSpinnerService);
    this.route = injector.get(ActivatedRoute);
    // this.permissionsService = injector.get(NgxPermissionsService);
    this.router = injector.get(Router);
    this.translate = injector.get(TranslateService);

  }

  // EnumTypeInput
  get getEnumTypeInput() {
    return EnumTypeInput;
  }

  get getEnumLanguage() {
    return EnumLanguage;
  }

  get getAppConfig(): IAppConfig {
    return this.apiService.getAppConfig;
  }


  currentLanguage = () => this.apiService.currentLanguage;


  contentWithLanguage(fa: string, en: string): string {
    switch (this.translate.currentLang) {
      case EnumLanguage.en:
        return en;
      case EnumLanguage.fa:
        return fa;
      default:
        return '';
    }
  }

  isNullOrEmpty = (val: any) => this.apiService.isNullOrEmpty(val);

  isNullOrEmptyOr0 = (val: any) => this.apiService.isNullOrEmptyOr0(val);

  isNullOrEmptyList = (val: any) => this.apiService.isNullOrEmptyList(val);

}
