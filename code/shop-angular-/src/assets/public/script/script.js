
// - Home Page Scripts - Start

// - Components

// --- Menu Toggle Function
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

// --- Scroll to Anchors Function
function anchorScrollFn() {
  // let titles, anchor;
  // let anchorsParent = $(".anchor_list");
  // let anchorItem = $("<li class='anchor_item'></li>");
  // let anchorLink = $("<a href='#' class='anchor_link'></a>");

  let sectionElm = document.getElementsByTagName("section");
  let sectionObj = {
    id: "",
    class: "",
    title: "",
  };

  for (let i = 0; i <= sectionElm.length; i++) {
    // console.log("Section Class: " + sectionElm[i].getAttribute("class"));
    // sectionObj.id = sectionElm[i].getAttribute("id");
    // sectionObj.class = sectionElm[i].getAttribute("class");
    // sectionObj.title = sectionElm[i].getAttribute("title");
  }
  // console.log(sectionObj);

  // anchorsParent
  //   .children()
  //   .find(".anchor_link")
  //   .on("click", function (e) {
  //     console.log("default prevented");
  //     e.preventDefault();
  //   });
}

// ----- Homepage hero Slider Scripts
const heroSlider = new Swiper(".hero_slider", {
  pagination: {
    el: ".hero-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".hero-button-next",
    prevEl: ".hero-button-prev",
  },
  on: {
    init: function () {
      // console.log("hero slider initialized");
    },
  },
});

// ----- Homepage Department Carousel Scripts
const departmentCarousel = new Swiper(".department_carousel", {
  slidesPerView: "auto",
  spaceBetween: 12,
});

// ----- Homepage FAQ-NEWS Tab switch Scripts
function tabSwitch() {
  let target = $(document).find(".faq_news_section .title_tabs_cta .title");
  let key;

  $(target).on("click", function () {
    key = $(this).attr("data-key");
    if (!$(this).hasClass("active")) {
      $(this).toggleClass("active");
      $(this).siblings().toggleClass("active");
    }
    $("." + key).addClass("active");
    $("." + key)
      .siblings()
      .removeClass("active");
  });
}

// ----- Homepage FAQ Toggle Slide Scripts
function toggleSlideFn() {
  $(".faq_item.expanded").children(".question_answer").slideDown(0);

  $(".faq_item").on("click", function () {
    let elm = $(this);
    let answer = elm.children(".question_answer");
    let slideSpeed = 300;

    answer.slideToggle(slideSpeed);
    elm.toggleClass("expanded");
    elm.siblings().children(".question_answer").slideUp(slideSpeed);
    elm.siblings().removeClass("expanded");
  });
}

// ----- Homepage Comments Carousel Scripts
const commentsCarousel = new Swiper(".comments_carousel", {
  pagination: {
    el: ".comments-pagination",
  },
  slidesPerView: 3,
  grabCursor: true,
});

// - Home Page Scripts - End

// ------------------------------------------------

// jQuery Document Ready Fn
$(() => {
  console.log("Document Ready");

  // Init Home page functions
  menuToggleFn();

  // Init Home page functions
  if ($(".home_page").length) {
    tabSwitch();
    toggleSlideFn();
  }
});

window.onload = function () {
  anchorScrollFn();
};
