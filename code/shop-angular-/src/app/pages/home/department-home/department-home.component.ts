import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {AppComponentBase} from "../../../app-component-base";
import {DepartmentDto} from "../../../models/department.interface";
// import Swiper core and required components
import { SwiperComponent } from "swiper/angular";

import SwiperCore , {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
} from 'swiper';

// install Swiper components
SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
]);


@Component({
  selector: 'app-department-home',
  templateUrl: './department-home.component.html',
  styleUrls: ['./department-home.component.scss']
})
export class DepartmentHomeComponent extends AppComponentBase implements OnInit {

  list: DepartmentDto[] = [];
  @ViewChild("swiperRef", { static: false }) sliderRef?: SwiperComponent;
  appendNumber = 4;
  prependNumber = 1;

  constructor(
    injector: Injector) {
    super(injector);
  }


  prepend() {
    // @ts-ignore
    this.sliderRef.swiperRef.prependSlide(
      '<div class="swiper-slide">Slide ' + --this.prependNumber + "</div>"
    );
  }

  prepend2() {
    // @ts-ignore
    this.sliderRef.swiperRef.prependSlide([
      '<div class="swiper-slide">Slide ' + --this.prependNumber + "</div>",
      '<div class="swiper-slide">Slide ' + --this.prependNumber + "</div>",
    ]);
  }

  append() {
    // @ts-ignore
    this.sliderRef.swiperRef.appendSlide(
      '<div class="swiper-slide">Slide ' + ++this.appendNumber + "</div>"
    );
  }

  append2() {
    // @ts-ignore
    this.sliderRef.swiperRef.appendSlide([
      '<div class="swiper-slide">Slide ' + ++this.appendNumber + "</div>",
      '<div class="swiper-slide">Slide ' + ++this.appendNumber + "</div>",
    ]);
  }
  ngOnInit(): void {
    this.list = [];
    this.apiService.getAllDepartments()
      .subscribe(res => {
        if (res.status) {
          this.list = res.data;
        }
      })
  }


}
