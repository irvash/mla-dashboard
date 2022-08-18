import {Component, Injector, OnInit} from '@angular/core';
import {AppComponentBase} from "../../../app-component-base";

declare var $: any;

@Component({
  selector: 'app-question-home',
  templateUrl: './question-home.component.html'
})
export class QuestionHomeComponent extends AppComponentBase implements OnInit {

  constructor(
    injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    $(document).ready(function () {

      function toggleSlideFn() {
        $(".faq_item.expanded").children(".question_answer").slideDown(0);

        $(".faq_item").on("click", function () {
          // @ts-ignore
          let elm = $(this);
          let answer = elm.children(".question_answer");
          let slideSpeed = 300;

          answer.slideToggle(slideSpeed);
          elm.toggleClass("expanded");
          elm.siblings().children(".question_answer").slideUp(slideSpeed);
          elm.siblings().removeClass("expanded");
        });
      }

      toggleSlideFn();


    });
  }

}
