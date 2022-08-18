import {Component, Injector, OnInit, TemplateRef, ViewChild} from '@angular/core';

import {AppComponentBase} from "../../../app-component-base";

import {SliderDto} from "../../../../models/slider-dto.interface";
import {AcademyDto} from "../../../../models/academy-dto.interface";

@Component({
  selector: 'app-academy-home',
  templateUrl: './academy-home.component.html'
})
export class AcademyHomeComponent extends AppComponentBase implements OnInit {
  public gridData: AcademyDto[] = [];
  @ViewChild('itemModal', {static: false}) itemModal: TemplateRef<any>;
  model: AcademyDto = {} as any;
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
    this.model.lang= 1;
    this.modalRef = this.modalService.show(
      this.itemModal,
      this.initModal());
  }

  editModal(item: AcademyDto) {
    this.errorsListForPage = [];
    this.model = item;
    this.modalRef = this.modalService.show(
      this.itemModal,
      this.initModal());
  }

  loadItems() {
    this.gridData = [];
    this.apiService.getAcademies(3)
      .subscribe(res => {
        if (res.status) {
          this.gridData = res.data;
        } else {
          this.sweetAlertService.callErrorType2(res);
        }
      })
  }

  delete(item: SliderDto) {
    this.errorsListForPage = [];

    const title = `آیا از حذف  ${item.name} مطمئن هستید؟`;
    this.sweetAlertService.sweetAlertCustom(title)
      .subscribe(res => {
        if (res === true) {
          this.apiService.deleteAcademy(item.id).subscribe(data => {
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


    this.apiService.addOrUpdateAcademy(this.model, this.picNameFileList).subscribe(data => {
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
