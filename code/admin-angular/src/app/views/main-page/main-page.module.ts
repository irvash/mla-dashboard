import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutSiteComponent} from './about-site/about-site.component';
import {MainPageRoutingModule} from "./main-page-routing.module";
import {SharedMainModule} from "../../shared-main/shared-main.module";
import {SliderHomeComponent} from './slider-home/slider-home.component';
import {CustomKendoModule} from "../../shared-main/custom-kendo/custom-kendo.module";
import {DepartmentHomeComponent} from './department-home/department-home.component';
import {AcademyHomeComponent} from "./academy-home/academy-home.component";
import {QuestionHomeComponent} from "./question-home/question-home.component";

const COMPONENT = [
  AboutSiteComponent,
  SliderHomeComponent,
  DepartmentHomeComponent,
  AcademyHomeComponent,
  QuestionHomeComponent,
];

@NgModule({
  declarations: [...COMPONENT],
  imports: [
    CommonModule,
    CustomKendoModule,
    SharedMainModule,
    MainPageRoutingModule
  ]
})
export class MainPageModule {
}
