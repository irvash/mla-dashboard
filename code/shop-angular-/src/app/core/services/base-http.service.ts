import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";


import {catchError, map} from "rxjs/operators";
import {Observable, throwError as observableThrowError} from "rxjs";
import swal, {SweetAlertOptions} from 'sweetalert2';
import {APP_CONFIG, IAppConfig} from "./app.config";
import {FileDataWithName} from "../../models/about-dto.interface";


// سرویس های پایه
@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: IAppConfig
  ) {
  }

  // وس سرویس پست
  post = <T>(url: any, model: any) => this.httpClient.post(this.appConfig.apiEndpoint + url, model).pipe(map(res => res), catchError(this.handleError));

  // وس سرویس ویرایش
  put = <T>(url: any, model: any) => this.httpClient.put(this.appConfig.apiEndpoint + url, model).pipe(map(res => res), catchError(this.handleError));

  // وب سرویس پست به همراه فایل
  /* not work */
  postFile<T>(url: any, formData: any) {
    const header = new HttpHeaders().set('Accept', 'application/json');
    return this.httpClient
      .post(this.appConfig.apiEndpoint + url, formData, {headers: header, withCredentials: true})
      .pipe(map(response => response || {}), catchError(this.handleError));
  }

  // وب سرویس پست به همراه فایل
  postFileAppend<T>(url: any, model: any, file1: FileDataWithName[]) {

    const _file = this.appendFileAndDataList(model, file1);

    const header = new HttpHeaders().set('Accept', 'application/json');
    return this.httpClient
      .post(this.appConfig.apiEndpoint + url, _file, {headers: header, withCredentials: true})
      .pipe(map(response => response || {}), catchError(this.handleError));
  }

  // افزودن فایل به هدر
  appendFileAndData(model: any,
                    file1: FileList | any) {
    const formData: FormData = new FormData();
    for (const key in model) {

      if (model.hasOwnProperty(key)) {
        const m = model[key];
        if (m !== null) {
          formData.append(key, m);
        }
      }
    }
    // debugger;
    if (file1 && file1.length) {
      for (let i = 0; i < file1.length; i++) {
        formData.append(file1[i].name, file1[i], 'file1');
      }
    }
    return formData;
  }

  // افزودن فایل به هدر
  appendFileAndDataList(model: any,
                        files: FileDataWithName[]) {
    const formData: FormData = new FormData();
    for (const key in model) {

      if (model.hasOwnProperty(key)) {
        const m = model[key];
        if (m !== null) {
          formData.append(key, m);
        }
      }
    }

    files.forEach(file1 => {
      if (file1 && file1.file?.length) {
        for (let i = 0; i < file1.file.length; i++) {
          formData.append(file1.file[i].name, file1.file[i], file1.name);
        }
      }
    });

    return formData;
  }


  // وب سرویس پست به همراه هدر
  postWithHeader<T>(url: any, model: T, header: any) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/text'
    });

    return this.httpClient.post(this.appConfig.apiEndpoint + url, model)
      .pipe(map(res => res),
        catchError(this.handleError)
      );
  }


  // وب سرویس گت
  get = <T>(url: any) => this.httpClient.get(this.appConfig.apiEndpoint + url).pipe(map(res => res), catchError(this.handleError));


  // وب سرویس گت با کوری پارام
  getWithQueryParam<T>(url: any, param: any) {
    return this.httpClient.get(this.appConfig.apiEndpoint + url + `?${this.toQueryString(param)}`)
      .pipe(map(res => res),
        catchError(this.handleError)
      );
  }

  // وب سرویس حذف
  delete<T>(url: any) {

    return this.httpClient.delete(this.appConfig.apiEndpoint + url)
      .pipe(map(res => res),
        catchError(this.handleError)
      );
  }

  // خطای وب سرویس
  handleError(error: HttpErrorResponse): Observable<any> {
    // this.sweetale7rt.serverError2(JSON.stringify(error));
    // alert(`خطای سرور   ${JSON.stringify(error)}`)
    console.error("observable error: ", error);
    console.error("observable error status: ", error.status);
    switch (error.status) {
      case 404:
        swal({
          title: `وب سرویس ${error.url} یافت نشد`,
          type: 'error',
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> خوب !',
          width: '800px',
          backdrop: `
                    rgba(0,0,123,0.4)
                    center left
                    no-repeat
                  `
        });
        break;

      case 0:
        swal({
          title: `خطای وب سرویس ${error.url}`,
          type: 'error',
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> خوب !',
          width: '800px',
          backdrop: `
                    rgba(0,0,123,0.4)
                    center left
                    no-repeat
                  `
        });
        break;
    }
    if (error.status === 404) {

    }
    return observableThrowError(error);
  }

  // تبدیل کلاس به رشته
  toQueryString(obj: any): string {
    const parts = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (value !== null && value !== undefined) {
          // @ts-ignore
          parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
        }
      }
    }
    return parts.join("&");
  }


}
