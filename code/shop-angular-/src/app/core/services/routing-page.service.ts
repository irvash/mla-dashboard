import {Inject, Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {ApiService} from "./api.service";
import {APP_CONFIG, IAppConfig} from "./app.config";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RoutingPageService {

  constructor(
    @Inject(APP_CONFIG) public appConfig: IAppConfig,
    private authService: AuthService,
    private apiService: ApiService,
    // private swalService: SweetAlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  // گرفتن مقدار کوری پارام در آدرس بار
  GetQueryParam(val: any) {
    this.route.queryParams.subscribe(params => {
      return params[val];
    });
  }

  Login() {
    this.router.navigate(["/login"]);
  }

  Register() {
    this.router.navigate(["/register"]);
  }


}
