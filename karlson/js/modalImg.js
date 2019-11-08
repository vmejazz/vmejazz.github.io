const photoList = document.querySelector('.photo-slider__list');
const carteList = document.querySelector('.carte-slider__list');
const modalImg = document.querySelector('.modal-img');
const closeModalButton = modalImg.querySelector('.modal-img__button-close');
const modalSlider = modalImg.querySelector('.modal-img__slider');
const modalBigImage = modalImg.querySelector('img');
let arraySrc = [];

const ESC_KEYCODE = 27;
const WIDTH_FOR_DESKTOP = 770;

//      Проверяем ширину экрана
const checkDisplayWidth = () => {

    const widthUser = window.screen.width;
    return checked = (widthUser >= WIDTH_FOR_DESKTOP) ? true : false;

}

//      Получаем массив ссылок на картинки
const getArrayImage = (list) => {
  let listImage = list.querySelectorAll('a img');
  let arraySrc = [];
  for (let i = 0; i < listImage.length; i += 1) {
    arraySrc.push(listImage[i].src);
  }
  return arraySrc;
};

//      Получаем список в котором искать картинки
const getSliderList = (target) => {
  const sliderList = target.classList.contains('slider')
  if (sliderList) {
    arraySrc = getArrayImage(target);
    return
  }
  getSliderList(target.parentNode);
};

//      Проверка открыто или закрыто модальное окно
const checkModal = () => {
  return statusModal = document.querySelector('.modal-img--hide') ? false : true;
};

//      Открываем модальное окно
const openModal = (target) => {
  if (checkDisplayWidth()) {          //  проверяем должную ширину экрана
    const newSource = target.src;
    modalBigImage.src = newSource;
    modalImg.classList.remove('modal-img--hide');
    modalImg.classList.remove('soft-hide');
    modalImg.classList.add('soft-show');
    modalImg.classList.add('noscroll');
    getSliderList(target);
  };
};

photoList.addEventListener('click', (evt) => {
  evt.preventDefault();
  openModal(evt.target);
})

const setHideClass = () => {
  modalImg.classList.add('modal-img--hide');
}

closeModalButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  modalImg.classList.remove('soft-show');
  modalImg.classList.add('soft-hide');
  setTimeout(setHideClass, 500);
})

carteList.addEventListener('click', (evt) => {
  evt.preventDefault();
  openModal(evt.target);
})

document.addEventListener('keydown', (evt) => {
  if (checkModal()) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeModalButton.click();
    }
  }
})

const changeSrcImage = (direction, currentSrc) => {
  const currentIndex = arraySrc.indexOf(currentSrc)
  console.log(direction, currentIndex)
  if (direction === 'next') {
    modalBigImage.src = (currentIndex === arraySrc.length - 1) ? arraySrc[0] : arraySrc[currentIndex + 1];
  } else {
    modalBigImage.src = (currentIndex === 0) ? arraySrc[arraySrc.length - 1] : arraySrc[currentIndex - 1];
  }
};

modalSlider.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('modal-img__button--next')) {
    changeSrcImage('next', modalBigImage.src);
  } else {
    changeSrcImage('prev', modalBigImage.src);
  }
  return;
})
