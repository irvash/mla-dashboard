import {Component, Injector, OnInit, TemplateRef, ViewChild} from '@angular/core';

import {AppComponentBase} from "../../../app-component-base";

import {SliderDto} from "../../../../models/slider-dto.interface";

@Component({
  selector: 'app-slider-home',
  templateUrl: './slider-home.component.html'
})
export class SliderHomeComponent extends AppComponentBase implements OnInit {
  public gridData: SliderDto[] = [];
  @ViewChild('itemModal', {static: false}) itemModal: TemplateRef<any>;
  model: SliderDto = {} as any;
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

  editModal(item: SliderDto) {
    this.errorsListForPage = [];
    this.model = item;
    this.modalRef = this.modalService.show(
      this.itemModal,
      this.initModal());
  }

  loadItems() {
    this.gridData = [];
    this.apiService.getAllSliders(3)
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

    const title = `آیا از حذف اسلایدر ${item.name} مطمئن هستید؟`;
    this.sweetAlertService.sweetAlertCustom(title)
      .subscribe(res => {
        if (res === true) {
          this.apiService.deleteSlider(item.id).subscribe(data => {
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

  addOrUpdateSlider() {
    this.errorsListForPage = [];


    this.apiService.addOrUpdateSlider(this.model, this.picNameFileList).subscribe(data => {
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
