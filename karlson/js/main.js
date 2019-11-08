/**********************************************
 *  Инициализация фото-слайдера
 ********************************************/

var mySwiper = new Swiper ('.photo-slider', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,

  // Navigation arrows
  navigation: {
    nextEl: '.photo-slider__next',
    prevEl: '.photo-slider__prev',
    disabledClass: 'disabled',
  },

  // fadeEffect: {
  //   crossFade: true
  // },

  slidesPerView: 1,
  // spaceBetween: 10,

  breakpointsInverse: true,
  breakpoints: {
    // when window width is >= 320px
    640: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    1300: {
      slidesPerView: 3,
      spaceBetween: 10
    }
  }
})

/**********************************************
 *  Инициализация меню-слайдера
 ********************************************/

var mySwiper = new Swiper ('.carte-slider', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,

  // Navigation arrows
  navigation: {
    nextEl: '.carte-slider__next',
    prevEl: '.carte-slider__prev',
    disabledClass: 'disabled',
  },

  slidesPerView: 1,
  // spaceBetween: 10,

  breakpointsInverse: true,
  breakpoints: {
    // when window width is >= 320px
    640: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    1300: {
      slidesPerView: 3,
      spaceBetween: 10
    }
  }
})
