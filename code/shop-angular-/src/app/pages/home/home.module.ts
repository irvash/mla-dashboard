import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {RouterModule, Routes} from "@angular/router";
import {CarouselComponent} from './carousel/carousel.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TranslateModule} from "@ngx-translate/core";
import {DepartmentHomeComponent} from './department-home/department-home.component';
import {SwiperModule} from "swiper/angular";
import {AcademyHomeComponent} from './academy-home/academy-home.component';
import {QuestionHomeComponent} from './question-home/question-home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      // title: "Page Title",
      metaTags: {
        description: "کانون زبان",
        keywords: "فروشگاه, زبان, کودکان, فروشگاه زبان, کتاب زبان, زبان خارجه"
      }
    }
  }
];

const COMPONENT = [
  HomeComponent,
  CarouselComponent,
  DepartmentHomeComponent,
  AcademyHomeComponent,
  QuestionHomeComponent
];

@NgModule({
  declarations: [
    ...COMPONENT
  ],
  imports: [
    CommonModule,
    SwiperModule,
    TranslateModule.forChild(),
    NgbModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule {
}
