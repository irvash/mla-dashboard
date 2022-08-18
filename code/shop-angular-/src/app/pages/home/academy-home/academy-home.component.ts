import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {AppComponentBase} from "../../../app-component-base";
import {Subscription} from "rxjs";
import {AcademyDto} from "../../../models/academy-dto.interface";

declare var $: any;

@Component({
  selector: 'app-academy-home',
  templateUrl: './academy-home.component.html'
})
export class AcademyHomeComponent extends AppComponentBase implements OnInit, OnDestroy {

  onLangChange: Subscription | undefined = undefined;
  list: AcademyDto[] = [];

  constructor(
    injector: Injector) {
    super(injector);
  }

  ngOnDestroy() {
    if (this.onLangChange !== undefined) {
      this.onLangChange.unsubscribe();
    }
  }

  menuToggleFn() {

  }

  ngOnInit(): void {
    // let t = document.getElementsByClassName(`.faq_news_section .title_tabs_cta .title`);



    $(document).ready(function () {

      function tabSwitch() {
        let target = $(document).find(".faq_news_section .title_tabs_cta .title");
        let key;

        $(target).on("click", function () {
          key = $(target).attr("data-key");
          if (!$(target).hasClass("active")) {
            $(target).toggleClass("active");
            $(target).siblings().toggleClass("active");
          }
          $("." + key).addClass("active");
          $("." + key)
            .siblings()
            .removeClass("active");
        });
      }

      function menuToggleFn() {
        let parentElm = $(".nav_modal");
        let openBtn = $(".nav_triggers .handle");
        let closeBtn = $(".modal_close");

        openBtn.on("click", function () {
          parentElm.attr("style", "display:flex");
        });
        closeBtn.on("click", function () {
          parentElm.attr("style", "display:none");
        });
      }

      // Init Home page functions

      menuToggleFn();

      // Init Home page functions

      tabSwitch();

    });


    this.getAcademies();
    this.onLangChange = this.translate.onLangChange.subscribe(() => {
      this.getAcademies();
    });
  }

  getAcademies() {
    this.list = [];
    this.apiService.getAcademies().subscribe(res => {
      if (res.status) {
        this.list = res.data;
      } else {
        this.sweetAlertService.callErrorType2(res);
      }
    });
  }

}
