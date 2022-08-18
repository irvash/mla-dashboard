import {ApiService} from "./core/services/api.service";
import {AuthService} from "./core";
import {Injector} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {SweetAlertService} from "./core/services/sweet-alert.service";
import {EnumTypeInput} from "../models/enum-type-input.enum";
import {BsModalService, BsModalRef, ModalOptions} from 'ngx-bootstrap/modal';
import { GridDataResult } from "@progress/kendo-angular-grid";


// کامپوننت الگو
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


  sweetAlertService: SweetAlertService;
  // routeEcommerceService: RouteEcommerceService;
  // dataStoreService: DataStoreService;
  route: ActivatedRoute;
  // permissionsService: NgxPermissionsService;
  router: Router;


  modalService: BsModalService;
  modalRef?: BsModalRef;
  public kendoGridView: GridDataResult;
  constructor(
    injector: Injector
  ) {
    this.modalService = injector.get(BsModalService);
    this.apiService = injector.get(ApiService);
    this.authService = injector.get(AuthService);
    this.sweetAlertService = injector.get(SweetAlertService);
    // this.routeEcommerceService = injector.get(RouteEcommerceService);
    // this.spinner = injector.get(NgxSpinnerService);
    this.route = injector.get(ActivatedRoute);
    // this.permissionsService = injector.get(NgxPermissionsService);
    this.router = injector.get(Router);

  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  public initModal(): ModalOptions {
    return {
      class: 'modal-xl',
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: true
    }
  }


  // EnumTypeInput
  get getEnumTypeInput() {
    return EnumTypeInput;
  }


  isNullOrEmpty = (val: any) => this.apiService.isNullOrEmpty(val);

  isNullOrEmptyOr0 = (val: any) => this.apiService.isNullOrEmptyOr0(val);

  isNullOrEmptyList = (val: any) => this.apiService.isNullOrEmptyList(val);

}
