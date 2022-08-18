import {Component, Injector, OnInit, TemplateRef, ViewChild} from '@angular/core';

import {AppComponentBase} from "../../../app-component-base";

import {QuestionDto} from "../../../../models/question-dto.interface";

@Component({
  selector: 'app-question-home ',
  templateUrl: './question-home.component.html'
})
export class QuestionHomeComponent extends AppComponentBase implements OnInit {
  public gridData: QuestionDto[] = [];
  @ViewChild('itemModal', {static: false}) itemModal: TemplateRef<any>;
  model: QuestionDto = {} as any;
  public picNameFileList: FileList | null = null;


  errorsListForPage: any[] = [];

  constructor(
    injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadItems();
  }


  addNew() {
    this.errorsListForPage = [];
    this.model = {} as any;
    this.model.lang = 1;
    this.modalRef = this.modalService.show(
      this.itemModal,
      this.initModal());
  }

  editModal(item: QuestionDto) {
    this.errorsListForPage = [];
    this.model = item;
    this.modalRef = this.modalService.show(
      this.itemModal,
      this.initModal());
  }

  loadItems() {
    this.gridData = [];
    this.apiService.getQuestions(3)
      .subscribe(res => {
        if (res.status) {
          this.gridData = res.data;
        } else {
          this.sweetAlertService.callErrorType2(res);
        }
      })
  }

  delete(item: QuestionDto) {
    this.errorsListForPage = [];

    const title = `آیا از حذف  ${item.title} مطمئن هستید؟`;
    this.sweetAlertService.sweetAlertCustom(title)
      .subscribe(res => {
        if (res === true) {
          this.apiService.deleteQuestion(item.id).subscribe(data => {
            if (data.status) {
              this.sweetAlertService.successfullAdd();
              this.loadItems();
              this.closeModal();
            } else {
              data.validationErrors.forEach(data => {
                this.errorsListForPage.push(data.errorMessage);
              });
              this.sweetAlertService.callErrorType2(data);
            }
          });
        }
      });
  }

  addOrUpdateAcademy() {
    this.errorsListForPage = [];


    this.apiService.addOrUpdateQuestion(this.model).subscribe(data => {
      if (data.status) {
        this.sweetAlertService.successfullAdd();
        this.loadItems();
        this.closeModal();
      } else {
        data.validationErrors.forEach(data => {
          this.errorsListForPage.push(data.errorMessage);
        });
        this.sweetAlertService.callErrorType2(data);
      }
    });
  }

}
