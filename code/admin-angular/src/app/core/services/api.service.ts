import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {BehaviorSubject, catchError, map, Observable} from "rxjs";
import {APP_CONFIG, IAppConfig} from "./app.config";
import {ApiResult} from "../../../models/api-result.interface";
import {AboutDto, FileDataWithName} from "../../../models/about-dto.interface";
import {BaseHttpService} from "./base-http.service";
import {EnumController} from "../../../models/enum-controller.enum";
import {SliderDto} from "../../../models/slider-dto.interface";
import {resultShow2} from "../../../models/result-show.interface";
import {DepartmentDto} from "../../../models/department.interface";
import {AcademyDto} from "../../../models/academy-dto.interface";
import {QuestionDto} from "../../../models/question-dto.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // public reloadLanguageSource = new BehaviorSubject<string>('fa');
  // public reloadLanguageCast$ = this.reloadLanguageSource.asObservable();

  constructor(
    private http: HttpClient,
    private baseHttpService: BaseHttpService,
    // private router: Router,
    @Inject(APP_CONFIG) private appConfig: IAppConfig,
  ) {

  }

  // this.baseHttpService.get(`/${EnumController.Cardboard}/GetAllContractWithAcceptUseInContractCardboard?${this.baseHttpService.toQueryString(model)}`);
  getAbout = (): Observable<resultShow2<AboutDto>> =>
    this.baseHttpService.get(`/${EnumController.Home}/GetAbout?lang=1`);


  editAbout(data: AboutDto, fileLogoTop: FileList | null, fileLogoDown: FileList | null): Observable<resultShow2<AboutDto>> {

    const fileData: FileDataWithName[] = [
      {file: fileLogoTop, name: 'fileLogoTop'},
      {file: fileLogoDown, name: 'fileLogoDown'}
    ]

    return this.baseHttpService.postFileAppend(`/${EnumController.AdminHome}/EditAbout`, data, fileData);


  }

  getQuestions = (lang: number): Observable<resultShow2<QuestionDto[]>> =>
    this.baseHttpService.get(`/${EnumController.Home}/GetQuestions?lang=${lang}`);


  deleteQuestion = (id: number): Observable<resultShow2<QuestionDto>> =>
    this.baseHttpService.delete(`/${EnumController.AdminHome}/DeleteQuestion?id=${id}`);


  addOrUpdateQuestion(data: QuestionDto): Observable<resultShow2<QuestionDto>> {
    return this.baseHttpService.post(`/${EnumController.AdminHome}/AddOrUpdateQuestion`, data);
  }


  getAcademies = (lang: number): Observable<resultShow2<AcademyDto[]>> =>
    this.baseHttpService.get(`/${EnumController.Home}/GetAcademies?lang=${lang}`);


  deleteAcademy = (id: number): Observable<resultShow2<AcademyDto>> =>
    this.baseHttpService.delete(`/${EnumController.AdminHome}/DeleteAcademy?id=${id}`);


  addOrUpdateAcademy(data: AcademyDto, picSlider: FileList | null): Observable<resultShow2<AcademyDto>> {
    const fileData: FileDataWithName[] = [
      {file: picSlider, name: 'picAcademy'}

    ]
    return this.baseHttpService.postFileAppend(`/${EnumController.AdminHome}/AddOrUpdateAcademy`, data, fileData);
  }


  getAllSliders = (lang: number): Observable<resultShow2<SliderDto[]>> => this.baseHttpService.get(`/${EnumController.Home}/GetAllSliders?lang=${lang}`);


  deleteSlider = (id: number): Observable<resultShow2<SliderDto>> => this.baseHttpService.delete(`/${EnumController.AdminHome}/DeleteSlider?id=${id}`);


  addOrUpdateSlider(data: SliderDto, picSlider: FileList | null): Observable<resultShow2<SliderDto>> {
    const fileData: FileDataWithName[] = [
      {file: picSlider, name: 'picSlider'}

    ]
    return this.baseHttpService.postFileAppend(`/${EnumController.AdminHome}/AddOrUpdateSlider`, data, fileData);
  }


  getAllDepartments = (): Observable<resultShow2<DepartmentDto[]>> => this.baseHttpService.get(`/${EnumController.Home}/GetAllDepartments`);


  deleteDepartment = (id: number): Observable<resultShow2<DepartmentDto>> => this.baseHttpService.delete(`/${EnumController.AdminHome}/DeleteDepartment?id=${id}`);


  addOrUpdateDepartment(data: DepartmentDto, pic: FileList | null): Observable<resultShow2<DepartmentDto>> {
    const fileData: FileDataWithName[] = [
      {file: pic, name: 'picDepartment'}
    ]
    return this.baseHttpService.postFileAppend(`/${EnumController.AdminHome}/AddOrUpdateDepartment`, data, fileData);
  }


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
