import $ from 'jquery';
window.jQuery = $;
window.$ = $;

// Load Styles
import '../scss/main.scss';

// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';

// import NiceSelect from "nice-select2";


// Load Bootstrap init
import {initBootstrap} from "./bootstrap.js";

// require('bootstrap-icons/font/bootstrap-icons.css');
import '../../node_modules/@fortawesome/fontawesome-free/css/brands.css';
import '../../node_modules/@fortawesome/fontawesome-free/css/regular.css';
import '../../node_modules/@fortawesome/fontawesome-free/css/solid.css';
import '../../node_modules/@fortawesome/fontawesome-free/js/all.js';
// import FastGlob from 'fast-glob';

// Loading bootstrap with optional features
initBootstrap({
  tooltip: true,
  popover: true,
  toasts: true,
});

// Your app code
// console.log(`Hello ${process.env.HELLO}`);

$(document).ready(function() {

  $(window).scroll(function (e) {
    //navbar shrink
    var siteHeader = $("#siteHeader");
    $(window).scroll(function () {
      if ($(document).scrollTop() > 50) {
        siteHeader.addClass("site-header--shrinked shadow");
      } else {
        siteHeader.removeClass("site-header--shrinked shadow");
      }
    });

    // Scroll Top fade in out
    if ($(document).scrollTop() > 200) {
      $(".scroll-to-top-button").addClass("scroll-to-top-button--show");
    } else {
      $(".scroll-to-top-button").removeClass("scroll-to-top-button--show");
    }
  });

  // Hero Swiper
  var swiperHero = new Swiper(".hero-swiper", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    autoplay: true,
    pauseOnMouseEnter: true,
    speed: 3000,
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderCustom: function (swiper, current, total) {
        var names = [];
        $(".swiper-wrapper .swiper-slide").each(function (i) {
          names.push($(this).data("name"));
        });
        var text = "<ul>";
        for (let i = 1; i <= total; i++) {
          if (current == i) {
            text += `<li class="swiper-pagination-bullet active">${names[i]}</li>`;
          } else {
            text += `<li class="swiper-pagination-bullet">${names[i]}</li>`;
          }
        }
        text += "</ul>";
        return text;
      },
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

    // Testimonial Swiper
    var swiperTestimonial = new Swiper(".testimonial-swiper", {
      // Optional parameters
      direction: "horizontal",
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 5000,
        pauseOnMouseEnter: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1200: {
          slidesPerView: 2,
          spaceBetween: 48,
        },
        1700: {
          slidesPerView: 3,
          spaceBetween: 24,
        }
      },
      // If we need pagination
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderCustom: function (swiper, current, total) {
          var names = [];
          $(".swiper-wrapper .swiper-slide").each(function (i) {
            names.push($(this).data("name"));
          });
          var text = "<ul>";
          for (let i = 1; i <= total; i++) {
            if (current == i) {
              text += `<li class="swiper-pagination-bullet active">${names[i]}</li>`;
            } else {
              text += `<li class="swiper-pagination-bullet">${names[i]}</li>`;
            }
          }
          text += "</ul>";
          return text;
        },
      },
  
      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next--testimonial",
        prevEl: ".swiper-button-prev--testimonial",
      },
    });

    // Header Mobile Nav Dropdown Menu
    var navLinks = $(".site-header__mobile-nav > ul li a");
    navLinks.each(function () {
      $(this).next().first().slideUp(0);
    });
    navLinks.each(function () {
      $(this).on("click", function () {
        if ($(this).hasClass("has-dropdown")) {
          $(this).parent().siblings().find("ul").slideUp(300);
          $(this).parent().siblings().find("i").removeClass("fa-minus").addClass("fa-plus");
          $(this).next().first().slideToggle(300);
          if ($(this).find("i").hasClass("fa-plus")) {
            $(this).find("i").removeClass("fa-plus").addClass("fa-minus");
          } else {
            $(this).find("i").removeClass("fa-minus").addClass("fa-plus");
          }
        }
      });
    });

    // Accordion
    $(".set > a").on("click", function () {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).siblings(".content").slideUp(200);
        $(".set > a i").removeClass("fa-minus").addClass("fa-plus");
      } else {
        $(".set > a i").removeClass("fa-minus").addClass("fa-plus");
        $(this).find("i").removeClass("fa-plus").addClass("fa-minus");
        $(".set > a").removeClass("active");
        $(this).addClass("active");
        $(".content").slideUp(200);
        $(this).siblings(".content").slideDown(200);
      }
    });

    
  //Click event to scroll to top
  $(".scroll-to-top-button").click(function () {
    scrollToTop(0, 500);
    return false;
  });

  function scrollToTop(offset, duration) {
    $("html, body").animate({ scrollTop: offset }, duration);
    return false;
  }

  var current = location.pathname;
  current = current.replace('/', '');

  if(current !== '') {
    $('.site-header .site-header__nav li a').each(function(){
      var $this = $(this);  
      // if the current path is like this link, make it active
      if($this.attr('href').indexOf(current) !== -1){
        $('.site-header .site-header__nav li').removeClass('active');
          $this.parent().addClass('active');
      }
  })
  }
    

            // $('#rqfSelectSubject').select2();

  // Request a quote form - dependency on select subject
  var selectSubjectOption = $('#rqfSelectSubject');
  selectSubjectOption.on('change', function() {
      // console.log($(this).val());
      if($(this).val() === 'service'){
        $('#rqfSelectService').closest('.form__field').slideDown(300);
      }
      else {
        $('#rqfSelectService').closest('.form__field').slideUp(300);
      }
  })

  // contact form - dependency on select subject
  var selectSubjectOption2 = $('#cfSelectSubject');
  selectSubjectOption2.on('change', function() {
      // console.log($(this).val());
      if($(this).val() === 'service'){
        $('#cfSelectService').closest('.form__field').slideDown(300);
      }
      else {
        $('#cfSelectService').closest('.form__field').slideUp(300);
      }
  })

  // Software search form
  var searchInputField = $('.software-search-form .form__input');
  //var softwareTitles = $('.softwares-list-table tbody tr td:nth-child(2)');
  var softwareTitles = $('.soft-item .soft-item__title a');
  searchInputField.on('keyup', function() {
    // console.log($(this).val());
    var inpVal = $(this).val().toUpperCase();

    softwareTitles.each(function() {
      var titleVal = $(this).html().toUpperCase();
      // console.log(titleVal);
      if(titleVal.indexOf(inpVal) <= -1) {
        $(this).closest('.soft-item').hide();
        checkEmptyItems();
      }
      else {
        $(this).closest('.soft-item').show();
        checkEmptyItems();
      }
    })
  })
  function checkEmptyItems() {
    console.log($('.soft-item').length);
    if($('.soft-item').length <= 0) {
      $('soft-count--empty').removeClass('d-none');
      console.log('empty');
    }
    else {
      $('soft-count--empty').addClass('d-none');
      console.log('not empty');
    }
  }

})


