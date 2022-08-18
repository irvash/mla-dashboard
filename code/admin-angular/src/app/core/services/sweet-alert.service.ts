import {Injectable} from '@angular/core';
import swal, {SweetAlertOptions} from 'sweetalert2';
import {Observable} from 'rxjs';
import {ErrorHandling, resultShow2} from "../../../models/result-show.interface";

// پیغام های برنامه از طریق کتابخانه sweetalert2
@Injectable()
export class SweetAlertService {

  confirmSubmitMessage = `آیا از ثبت اطلاعات مطمئن هستید؟ در صورت ثبت، امکان ویرایش اطلاعات وجود نخواهد داشت!`;

  constructor() {
  }

  youDontLogin() {
    swal({
      title: 'اخطار',
      text: 'به سیستم کاربال وارد نشده اید',
      type: 'warning',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> خوب !'
    });
  }

  errorMobileIsExist() {
    swal({
      title: 'تلفن همراه وارد شده قبلا در سیستم موجود می باشد',
      type: 'warning',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> خوب !'
    });
  }

  successfullEdit() {
    swal({
      position: 'top-end',
      title: 'با موفقیت ویرایش شد',
      type: 'success',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> خوب !',
      timer: 1000
    });
  }

  successfullAdd() {


    const msg: string = 'با موفقیت ثبت شد';
    swal({
      position: 'top-end',
      type: 'success',
      title: msg,
      showConfirmButton: false,
      timer: 5000
    })


  }

  successfullText(text: any) {
    swal({
      position: 'top-end',
      type: 'success',
      title: text,
      showConfirmButton: false,
      timer: 10000
    });
  }

  successfullTextWithPosition(text: any, pos: any) {
    swal({
      position: pos,
      type: 'success',
      title: text,
      showConfirmButton: false,
      timer: 10000
    });
  }

  successfullTextWithTimer(text: any, timer: any) {
    swal({
      type: 'success',
      title: text,
      showConfirmButton: false,
      timer: timer
    });
  }


  successfullUplaod() {


    const msg: string = 'با موفقیت ویرایش شد';
    swal({
      position: 'top-end',
      type: 'success',
      title: msg,
      showConfirmButton: false,
      timer: 1000
    })
  }


  successfullDelete() {
    swal({

      title: 'با موفقیت حذف شد',
      type: 'success',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> خوب !'
    });
  }

  validationError() {
    swal({
      title: 'خطای اعتبار سنجی ، ورودی های خود را بررسی کنید',
      type: 'error',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> خوب !'
    });
  }

  errorAddMsg(msg: string) {
    swal({
      title: msg,
      type: 'error',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> خوب !'
    });
  }

  validationError2(text: string) {
    swal({
      title: 'خطای اعتبار سنجی ',
      html: `<h3>${text}</h3>`,
      type: 'error',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> خوب !'
    });
  }


  callErrorResultShow(value: resultShow2<any>) {
    switch (value.dataValue) {
      case ErrorHandling.server:
        this.serverError();
        break;

      case ErrorHandling.notfound:
        this.serverError2('یافت نشد' + value.message);
        break;

      case ErrorHandling.notAbleAccess:
        this.serverError2('، فقط کاربر ثبت کننده می تواند' + value.message);
        break;

      case ErrorHandling.duplicate:
        this.serverError2('رکورد تکراری' + value.message);
        break;

      case ErrorHandling.validation:
        this.serverError2('خطای اعتبار سنجی' + value.message);
        break;

      default:
        this.serverError2(value.message);
        break;
    }
  }


  callErrorType(value: string) {
    switch (value) {
      case ErrorHandling.server:
        this.serverError();
        break;

      case ErrorHandling.notfound:
        this.serverError2('یافت نشد');
        break;

      case ErrorHandling.cantDelete:
        this.serverError2('امکان حذف این آیتم وجود ندارد');
        break;

      case ErrorHandling.notAbleAccess:
        this.serverError2('دسترسی به تغییر اطلاعات ندارید');
        break;

      case ErrorHandling.duplicate:
        this.serverError2('رکورد تکراری');
        break;

      case ErrorHandling.validation:
        this.serverError2('خطای اعتبار سنجی');
        break;


      case ErrorHandling.nullValue:
        this.serverError2('nullValue');
        break;

      default:
        this.serverError();
        break;
    }
  }

  callErrorType2(item: resultShow2<any>) {
    switch (item.dataValue) {
      case ErrorHandling.server:
        console.log('callErrorType2', item);
        if (item.message) {
          this.serverErrorWithMsg(`<p style="text-align: left;color: black;">${item.message}</p>`);
        } else {
          this.serverError();
        }

        break;

      case ErrorHandling.notfound:
        this.serverError2('یافت نشد');
        break;


      case ErrorHandling.cantDelete:
        this.serverError2('امکان حذف این آیتم وجود ندارد');
        break;


      case ErrorHandling.notAbleAccess:
        this.serverError2(`${item.message} ، دسترسی به تغییر اطلاعات ندارید`);
        break;

      case ErrorHandling.duplicate:
        this.serverError2('رکورد تکراری');
        break;

      case ErrorHandling.userNotFound:
        this.serverError2('کاربری یافت نشد');
        break;

      case ErrorHandling.homeWebService:
        this.serverError2('خطا در اتصال به سرور Home');
        break;

      case ErrorHandling.useIt:
        this.serverError2('امکان تغییر وجود ندارد، زیرا این داده در جای دیگر مورد استفاده قرار گرفته است.');
        break;


      case ErrorHandling.validation:
        // debugger;
        let str = `   خطای اعتبار سنجی
                                <br>
                            `;
        if (item.validationErrors && item.validationErrors.length && item.validationErrors.length > 0) {

          item.validationErrors.forEach(data => {
            str += `${data.errorMessage}<br>`
          });
          if (str != null) {
            this.errorHtml(this.fontBold(str));
          } else {
            this.errorHtml(this.fontBold(str));
          }


        } else {
          this.errorHtml(this.fontBold(str))
        }

        break;

      default:
        this.serverError();
        break;
    }
  }

  fontBold = (str: any) => {
    return ` <div style="font-size: 16px;">
                              ${str}
                            </div>`;
  };

  serverError() {
    swal({
      title: 'خطای سرور',
      type: 'error',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> خوب !'
    });
  }

  fileUploadError() {
    swal({
      title: 'خطای در آپلود فایل',
      type: 'error',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> خوب !'
    });
  }

  // نمیشا حطا ها در قالب html
  errorHtml(html: any) {
    swal({
      //  title: 'خطای سمت سروس',
      html: `<div style="font-size: 20px;">${html}</div>`,
      type: 'error',
      width: '600',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> خوب !'
    });
  }

  systemMessageHtml(html: any) {
    swal({
      //  title: 'خطای سمت سروس',
      html: html,
      type: 'info',
      width: '600',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> متوجه شدم !'
    });
  }


  serverError2(text: string) {
    swal({
      //  title: 'خطای سمت سروس',
      title: text,
      type: 'error',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> خوب !',
      width: '800px',
      backdrop: `
                    rgba(0,0,123,0.4)
                    center left
                    no-repeat
                  `
    });
  }

  serverErrorWithMsg(msg: string) {
    swal({
      html: msg,
      type: 'error',
      width: 1200,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> خوب !'
    })
  }

  serverErrorPortal() {
    swal({
      title: 'خطای در برقراری با سرور Portal',
      type: 'error',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> خوب !'
    });
  }

  serverErrorPMIS() {
    swal({
      title: 'خطای در برقراری با سرور PMIS',
      type: 'error',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> خوب !'
    });
  }


  serverError3(item: string) {
    swal({
      title: item,
      type: 'error',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> خوب !'
    });
  }

  error(text: string) {
    swal({
      title: 'خطا',
      html: `<h3>${text}</h3>`,
      type: 'error',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> خوب !'
    });
  }

  uploadError() {
    swal({
      title: 'خطای در حین آپلود فایل',
      type: 'error',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> خوب !'
    });
  }

  nofile() {
    swal({
      title: 'خطا ، فایلی انتخاب نکرد ه اید',
      type: 'error',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> خوب !'
    });
  }

  duplicateError() {
    swal({
      title: 'رکورد تکراری',
      type: 'warning',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> خوب !'
    });
  }

  alertTopEnd(msg: string) {
    swal({
      position: 'top-end',
      type: 'warning',
      title: msg,
      width: '950',
      showConfirmButton: false,
      timer: 15000
    })
  }

  alertTopEndTime2000(msg: string) {
    swal({
      position: 'top',
      type: 'warning',
      title: msg,
      width: '600',
      showConfirmButton: false,
      timer: 2000
    })
  }

  dangerTopCenter(msg: string) {
    swal({
      position: 'center',
      type: 'error',
      title: msg,
      showConfirmButton: false,
      timer: 10000
    })
  }

  /*
  // پیام بله خیر
  public sweetAlertDefaultMessage = (type: TypeSweetAlertMessage, field): Observable<boolean> => {
      let title: string = '';
      switch (type) {
          case this.getTypeSweetAlertMessage.Sure:
              title = `آیا از حذف آیتم مورد نظر مطمئن هستید؟`;
              break;
          case this.getTypeSweetAlertMessage.SureWithField:
              title = `آیا از حذف ${field} مطمئن هستید ؟`;
              break;
          case this.getTypeSweetAlertMessage.ConfirmSubmitMessage:
              title = this.confirmSubmitMessage;
              break;

          case this.getTypeSweetAlertMessage.Cardboard:
              title = `آیا از ارسال به ثبت کننده ای ${field} مطمئن هستید؟`;
              break;
          default:
              title = `آیا از حذف آیتم مورد نظر مطمئن هستید؟`;
      }
      return this.sweetAlertCustom(title);
  };*/

  public sweetAlertCustom = (title: any): Observable<boolean> => new Observable<boolean>(observer => {
    let options: SweetAlertOptions = {
      title: title,
      cancelButtonText: 'خیر',
      confirmButtonText: 'بله',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      width: '800px',
      backdrop: `
                    rgba(0,0,123,0.4)
                    center left
                    no-repeat
                  `
    }


    swal(options).then((result) => {
      if (result.value) {
        observer.next(true);
      } else {
        observer.next(false);
      }
    });

  });
  /*
      get getTypeSweetAlertMessage() {
          return TypeSweetAlertMessage;
      }
  */

}
