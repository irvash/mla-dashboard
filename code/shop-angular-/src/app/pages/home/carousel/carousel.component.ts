import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {AppComponentBase} from "../../../app-component-base";
import {SliderDto} from "../../../models/slider-dto.interface";
import SwiperCore, {A11y, Autoplay, Controller, Navigation, Pagination, Scrollbar, Thumbs, Virtual, Zoom} from "swiper";
import {Subscription} from "rxjs";


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
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent extends AppComponentBase implements OnInit, OnDestroy {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  sliders: SliderDto[] = [];

  onLangChange: Subscription | undefined = undefined;

  constructor(
    injector: Injector) {
    super(injector);
  }

  getAllSliders() {
    this.apiService.getAllSliders().subscribe(res => {
      if (res.status) {
        this.sliders = res.data;
      }
    });
  }

  ngOnDestroy() {
    if (this.onLangChange !== undefined) {
      this.onLangChange.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getAllSliders();
    this.onLangChange = this.translate.onLangChange.subscribe(() => {
      this.getAllSliders();
    });

  }


}
