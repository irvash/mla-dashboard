import {Component, Injector, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SliderDto} from "../../../../models/slider-dto.interface";
import {DepartmentDto} from "../../../../models/department.interface";
import {AppComponentBase} from "../../../app-component-base";

@Component({
  selector: 'app-department-home',
  templateUrl: './department-home.component.html'
})
export class DepartmentHomeComponent extends AppComponentBase implements OnInit {

  public gridData: DepartmentDto[] = [];
  @ViewChild('itemModal', {static: false}) itemModal: TemplateRef<any>;
  model: DepartmentDto = {} as any;
  public picFileList: FileList | null = null;
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
    this.modalRef = this.modalService.show(
      this.itemModal,
      this.initModal());
  }

  editModal(item: DepartmentDto) {
    this.errorsListForPage = [];
    this.model = item;
    this.modalRef = this.modalService.show(
      this.itemModal,
      this.initModal());
  }

  loadItems() {
    this.gridData = [];
    this.apiService.getAllDepartments()
      .subscribe(res => {
        if (res.status) {
          this.gridData = res.data;
        } else {
          this.sweetAlertService.callErrorType2(res);
        }
      })
  }

  delete(item: DepartmentDto) {
    this.errorsListForPage = [];

    const title = `آیا از حذف دپارتمان ${item.title } مطمئن هستید؟`;
    this.sweetAlertService.sweetAlertCustom(title)
      .subscribe(res => {
        if (res === true) {
          this.apiService.deleteDepartment(item.id).subscribe(data => {
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
    this.apiService.addOrUpdateDepartment(this.model, this.picFileList).subscribe(data => {
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
