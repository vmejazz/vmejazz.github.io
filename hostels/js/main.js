var mySwiper = new Swiper ('.main-customers__slider-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: '.main-customers__button--next',
    prevEl: '.main-customers__button--back',
  },

  slidesPerView: 1,
  spaceBetween: 10,

  breakpointsInverse: true,
  breakpoints: {
    // when window width is >= 320px
    720: {
      slidesPerView: 5,
      spaceBetween: 0
    }
  }
})


var mySwiper = new Swiper ('.main-review__slider-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  spaceBetween: 30,
  // wrapperClass: '.main-review__swiper-wrapper',
  // setWrapperSize: true,

  // Navigation arrows
  navigation: {
    nextEl: '.main-review__button--next',
    prevEl: '.main-review__button--back',
  },

  slidesPerView: 3,

  breakpoints: {
    // when window width is <= 320px
    720: {
      slidesPerView: 1,
      spaceBetween: 40
    }
  }
})


//mobile-menu
$(document).ready(function() {
  this.$menuButton = $('.page-header__navigation-button');
  this.$menuNavigation = $('.main-navigation')
  this.$menuButton.addClass('page-header__navigation-button--close')
  this.$menuButton.removeClass('page-header__navigation-button--open')

  this.toggleMenu = function (e) {
    this.$menuNavigation.toggleClass('main-navigation--show')
    this.$menuNavigation.toggleClass('main-navigation--hide')
    this.$menuButton.toggleClass('page-header__navigation-button--open')
    this.$menuButton.toggleClass('page-header__navigation-button--close')
  }

  this.$menuButton.on('click', function() {
    this.toggleMenu()
  }.bind(this))
})


// Счётчик чисел в шапке сайта
var countField = $('.count-humber');

function countup(className){ //className - имя класса, в котором есть число
  var show = true;// отвечает, что если один раз счетчик сработает, больше не срабатывал

  if(show){
    show = false; //если мы видим число, то больше его не надо показывать
    $('.'+className).spincrement({ //вызов плагина с параметрами
      from: 1,               //начинать с 1
      duration: 3000,        //задержка счетчика
      thousandSeparator: ''
    });
  }
}

countup('count-humber');


//  Маска для поля ввода телефона

(function(){
  $('#input__tel').mask("+7 (999) 999-9999");
  $('.main-promotion__input').mask("+7 (999) 999-9999");
})();
