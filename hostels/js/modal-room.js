this.$container = $('.rooms-order');

this.state = {
  open: false
}

// *
// * Закрываем модальное окно
// *
this.close = function(target)
{
  this.state.open = false;
  target.classList.add('rooms-order__modal--hide')
  target.classList.remove('rooms-order__modal--show')
  window.bodyScroll.resetScrollBody();

  $(document).off('click', '.rooms-order__overlay', checkOverlayfield)

  forms[0].id = 'main-form';     //  Вешаем валидатор формы на главную
  validateUs( forms )


}.bind(this)

// *
// * Проверяем попадание клика на поле overlay
// *
var checkOverlayfield = function (evt) {
  if (evt.target.classList.contains('rooms-order__overlay')) {
    var modalOpened = $(evt.target).parents('.rooms-order__modal--show').get(0)
    this.close(modalOpened)
  }
  evt.stopPropagation();
}.bind(this);

// *
// * Открываем модальное окно
// *
this.open = function(target)
{
  this.state.open = true;
  target.classList.remove('rooms-order__modal--hide')
  target.classList.add('rooms-order__modal--show')
  window.bodyScroll.StopScrollBody();     //  останавливаем прокрутку основного сайта

  forms[0].id = 'form' + target.id.substr(5);     //  Вешаем валидатор формы на открое модальное окно
  validateUs( forms )

  window.guestRange.setTotalPrice(1);

  // *
  // * Обработчик клика по overlay
  // *
  $(document).on('click', '.rooms-order__overlay', checkOverlayfield)


  //  *
  //  * Модуль открытия/закрытия большого превью картинки
  //  *
  var closeBigImage = (evt, newModal) => {
    evt.stopPropagation();
    newModal.querySelector('.rooms-order__overlay-image').classList.remove('rooms-order__overlay-image--show');
  };

  var openBigImage = (evt, newModal) => {
    var bigImageOverlay = newModal.querySelector('.rooms-order__overlay-image img');
    bigImageOverlay.src = newModal.querySelector('.room__big-jmg').src
    newModal.querySelector('.rooms-order__overlay-image').classList.add('rooms-order__overlay-image--show');
    newModal.querySelector('.rooms-order__overlay-image').addEventListener('click', () => {
      closeBigImage(evt, newModal);
    });
  };

  target.querySelector('.room__big-jmg').addEventListener('click', (evt) => {
    openBigImage(evt, target);
  });

}.bind(this)

// *
// * Обработчик клика кнопки Забронировать карточки
// *
this.$container.on('click', '.card-room__button', function (evt) {
  var itemCard = evt.target.parentNode.parentNode;
  var modalCard = itemCard.querySelector('.rooms-order__modal')
  // this.openRoomModal(evt, modalCard)
  this.open(modalCard)
}.bind(this))

// *
// * Обработчик клика кнопки Забронировать карточки
// *
this.$container.on('click', '.card-room__link', function (evt) {
  evt.preventDefault();
  var itemCard = evt.target.parentNode.parentNode.parentNode;
  var modalCard = itemCard.querySelector('.rooms-order__modal')
  // this.openRoomModal(evt, modalCard)
  this.open(modalCard)
}.bind(this))

// *
// * Обработчик клика кнопки закрыть, модального окна
// *
this.$container.on('click', '.rooms-modal__button--close', function (evt) {
  var itemCard = evt.target.parentNode.parentNode.parentNode;
  this.close(itemCard)
}.bind(this))

// *
// * Обработчик клика ESC при открытом модальном окне
// *
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27 && this.state.open) {
    var itemCard = document.querySelector('.rooms-order__modal--show');
    this.close(itemCard)
  }
}.bind(this))
