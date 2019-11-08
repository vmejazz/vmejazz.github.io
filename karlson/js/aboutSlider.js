const aboutContent = document.querySelector('.about-content');
const aboutSliderList = aboutContent.querySelectorAll('li');
const requisitesElement = document.querySelector('.about__requisites');

// const sliderButtons = document.querySelectorAll('.about-slider__button');

const setShowSlider = (index) => {

};

const findCurrentIndex = (item) => {
  for (let i = 0; i < aboutSliderList.length; i += 1) {
    if (aboutSliderList[i] == item ) {
      return i;
    }
  }
};

const changeSlider = (target, currentItem) => {
  // console.log(target, currentItem)
  const currentIndex = findCurrentIndex(currentItem);
  // console.log(currentIndex)

  if (target.classList.contains('about-slider__button--inn')) {
    console.log('Реквизиты')
    requisitesElement.classList.toggle('about__requisites--show');
  } else if (target.classList.contains('about-slider__button--next')) {
    currentItem.classList.remove('about-slider__item--show');
    if ( currentIndex < aboutSliderList.length - 1) {
      aboutSliderList[currentIndex + 1].classList.add('about-slider__item--show');
    } else {
      aboutSliderList[0].classList.add('about-slider__item--show');
    }
  }
  else {
    currentItem.classList.remove('about-slider__item--show');
    if ( currentIndex > 0) {
      aboutSliderList[currentIndex - 1].classList.add('about-slider__item--show');
    } else {
      aboutSliderList[aboutSliderList.length - 1].classList.add('about-slider__item--show');
    }

  }
};

aboutContent.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (evt.target.classList.contains('about-slider__button')) {
    const currentItem = aboutContent.querySelector('.about-slider__item--show');
    changeSlider(evt.target, currentItem);
  }
})


