const hamButton = document.querySelector('.page-header__ham-button');
const mainNavigation = document.querySelector('.main-navigation');

hamButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  mainNavigation.classList.toggle('main-navigation--hide');
})

const closeMenuAfterLoad = () => {
  if (window.screen.width < 720) {
    mainNavigation.classList.toggle('main-navigation--hide');
  }
};

closeMenuAfterLoad();
