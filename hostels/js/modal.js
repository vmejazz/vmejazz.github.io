(function () {
  var modalCallback = document.querySelector('.modal-callback,#footer-callback');     //  Модальное окно обратной связи
  var mainPromotionButton = document.querySelector('.main-promotion__button');      //  Кнопка "обратная связь" на слайде Promotion
  var modalCallbackCloseButton = modalCallback.querySelector('.modal-callback__button--close');     //  Кнопка закрытия модального окна обратной связи
  var modalCallbackOpenButton = document.querySelector('.callback__button');      //  Кнопка "обратная связь" в шапке
  var partnerButton = document.querySelector('.main-cooperation__button');      //.. Кнопка "стать партнёром"

  // *
  // * Функция открытия модального окна успешной отправки формы
  // *
  var modalSuccessShow = function () {
    var modal = $(document).find('.modal-success');
    modal.toggleClass('modal-success--show')
    modal.toggleClass('modal-success--hide')
  }

  // *
  // * Функция закрытия модального окна обратной связи
  // *
  var closeModal = function (evt) {
    modalCallback.classList.remove('modal-callback--show');
    modalCallback.classList.add('modal-callback--hide');
    window.bodyScroll.resetScrollBody();
  }

  var callbackButtonClick = function (evt) {
    evt.preventDefault();
    modalSuccessShow();
    setTimeout(modalSuccessShow, 2000)
  }

  // *
  // * Функция открытия модального окна обратной связи
  // *
  var openModal = function (evt) {
    evt.preventDefault()
    modalCallback.classList.add('modal-callback--show');
    modalCallback.classList.remove('modal-callback--hide');
    window.bodyScroll.StopScrollBody();

    document.addEventListener('keydown', function(evt){     //  Обработчик на клавишу ESC
      if (evt.keyCode === 27) {
        closeModal();
      }
    })

    $(document).on('click', '.modal-callback__overlay', closeModal).on('click', 'div', function (e) { e.stopPropagation();})      //..  Обработчик попадания на overlay

    $(document).on('click', '.modal-callback__button', callbackButtonClick)     //..  Обработчик кнопки "отправить заявку" окна обратной связи
  };

  modalCallbackOpenButton.addEventListener('click', openModal);
  modalCallbackCloseButton.addEventListener('click', closeModal);
  mainPromotionButton.addEventListener('click',openModal);
  partnerButton.addEventListener('click', openModal);
  })();

// *
// *  Активность смены маленьких превью на большое
// *
var changeSmallPhotoToBig = function () {
  $(document).ready(function() {
    this.$container = $('.room__photos')

    this.changePhotoSrc = function (evt) {
      var roomPhotoField = $(evt.target).parents('.room__photos');
      var roomBigPhoto = roomPhotoField.find('.room__big-jmg')
      roomBigPhoto.attr('src', evt.target.src)
    }

    this.$container.on('click', '.room__photo-link', function (evt) {
      evt.preventDefault()
      this.changePhotoSrc(evt)
    }.bind(this))
  })
}

// *
// // *   Оживляем модальный слайдер
// *
var setHandlerOnSliderButtons = function () {
  var orderList = $('.rooms-order__list');

  orderList.on('click', '.rooms-slider__button', function (evt) {     //  Вешаем обработчик на кнопки слайдеры
    var target = $( evt.target ).parents('.rooms-order__modal').attr('id')
    var buttonPush = evt.target;

    var roomList = $('.rooms-order__item div[id]')      //    Создаем массив из отсортированных комнат по ID
      .map( function() {
        return this.id;
      })
      .get()

      var getNewTarget = function (oldTarget, list, buttonWay) {     //  Условия выбора правильного элемента из массива отсортированных комнат
        var indexOldTarget = list.indexOf(oldTarget);

        if (buttonWay.classList.contains('rooms-slider__button--back')) {
          if (indexOldTarget === 0) {
            return list.length - 1
          } else {
            return indexOldTarget - 1
          }
        } else {
          if (indexOldTarget === (list.length - 1)) {
            return 0;
          } else {
            return indexOldTarget + 1
          }
        }
      }

      var newIndexForModal = '#' + roomList[getNewTarget(target, roomList, buttonPush)]
      var newModal = $('.rooms-order__item').find(newIndexForModal);

      this.$modal = $('#' + target);
      this.$modal.removeClass('rooms-order__modal--show')
      this.$modal.addClass('rooms-order__modal--hide')
      newModal.removeClass('rooms-order__modal--hide')
      newModal.addClass('rooms-order__modal--show')

      //  *
      //  * Модуль открытия/закрытия большого превью картинки
      //  *
      var closeBigImage = (evt) => {
        evt.stopPropagation();
        newModal.querySelector('.rooms-order__overlay-image').classList.remove('rooms-order__overlay-image--show');
      };

      var openBigImage = () => {
        var bigImageOverlay = newModal.querySelector('.rooms-order__overlay-image img');
        bigImageOverlay.src = newModal.querySelector('.room__big-jmg').src
        newModal.querySelector('.rooms-order__overlay-image').classList.add('rooms-order__overlay-image--show');
        newModal.querySelector('.rooms-order__overlay-image').addEventListener('click', closeBigImage);
      };

      newModal.find('.room__big-jmg').on('click', openBigImage);



      window.guestRange.setTotalPrice(newModal.find('#input__guest--modal').val());   //    Считаем правильную цену от кол-ва людей

      newModal = newModal.get(0)
      forms[0].id = 'form' + newModal.id.substr(5);     //  Вешаем валидатор формы на открое модальное окно
      validateUs( forms )
  })
}

window.modal = {
  'changeSmallPhotoToBig': changeSmallPhotoToBig,
  'setHandlerOnSliderButtons': setHandlerOnSliderButtons
}
