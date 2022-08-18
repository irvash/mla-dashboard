import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AboutSiteComponent} from "./about-site/about-site.component";
import {SliderHomeComponent} from "./slider-home/slider-home.component";
import {DepartmentHomeComponent} from "./department-home/department-home.component";
import {AcademyHomeComponent} from "./academy-home/academy-home.component";
import {QuestionHomeComponent} from "./question-home/question-home.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'صفحه اصلی'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'about-site'
      },
      {
        path: 'about-site',
        component: AboutSiteComponent,
        data: {
          title: 'درباره وب سایت',
        }
      },
      {
        path: 'slider-home',
        component: SliderHomeComponent,
        data: {title: 'اسلایدر',}
      },
      {
        path: 'department-home',
        component: DepartmentHomeComponent,
        title: 'دپارتمان ها',
      },
      {
        path: 'academy-home',
        component: AcademyHomeComponent,
        title: 'آکادمی ها',
      },
      {
        path: 'question-home',
        component: QuestionHomeComponent,
        data: {title: 'سوالات متداول',}
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule {
}
