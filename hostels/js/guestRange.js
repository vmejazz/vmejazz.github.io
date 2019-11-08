//  *
//  * Обновляем поле цены, от количества людей
//  *
var setTotalPrice = function (totalHuman) {
  var checkModal = document.querySelector('.rooms-order__modal--show');
  if (checkModal) {
    var priceForAll = checkModal.querySelector('.form-order__price-all span');
    var perconPrice = checkModal.querySelector('.form-order__price-person span');
    if (perconPrice === null) {
      return;
    }
    var priceForPersonField = checkModal.querySelector('.form-order__price-person span').innerHTML;
    var r = /\d+/;
    priceForPersonField = priceForPersonField.match(r);
    priceForPerson = priceForPersonField[0];
    priceForAll.innerHTML = priceForPerson * totalHuman;
  } else {
    return;
  }
};

// *
// * Обновляем общее количество гостей
// *

var setCurrentGuest = function (sumGuestInput, adultInput, childrenInput) {
  var adult = parseInt(adultInput.val());
  var children = parseInt(childrenInput.val());
  sum = parseInt(adult + children);
  sumGuestInput.val(sum);
  setTotalPrice(sum);
};

// *
// * Открытие модального окна выбора гостей взрослых и детей
// *
var openModalGuest = function (evt) {
  var $currentFormGuest = $(evt.target).parents('.form-order')
  var $modalGuest = $currentFormGuest.find('.modal-guest')
  var $currentSumGuest = $currentFormGuest.find('.form-order__guest-all')
  var $currentAdultGuest = $currentFormGuest.find('.modal-guest__adult input')
  // var currentChildrenGuest = $currentFormGuest.find('.modal-guest__children input')

  var showElement = function (elem, classRemove, classAdd) {
    elem.removeClass(classRemove);
    elem.addClass(classAdd);
  };

  if (evt.target.classList.contains('form-order__guest-button--plus')) {    // если  нажал на плюсик
    showElement($modalGuest, 'modal-guest--hide', 'modal-guest--show');
    var guestCount = $currentSumGuest.val();
    $currentSumGuest.val(++guestCount);
  } else if (evt.target.classList.contains('form-order__guest-button--minus')) {    // если  нажал на плюсик
    var guestCount = $currentSumGuest.val();
    if (guestCount > 1) {
      $currentSumGuest.val(--guestCount);
      if (guestCount === 1) {
        showElement($modalGuest, 'modal-guest--show', 'modal-guest--hide')
      }
    }
    else {
      showElement($modalGuest, 'modal-guest--show', 'modal-guest--hide')
    }
  }

  $currentAdultGuest.val($currentSumGuest.val());
  setTotalPrice($currentAdultGuest.val());
};

// *
// * увеличение/уменьшение числа взрослых/детей
// *

var guestNumbers = function (evt) {
  var $currentFormGuest = $(evt.target).parents('.form-order')
  var $currentSumGuest = $currentFormGuest.find('.form-order__guest-all')
  var $currentAdultGuest = $currentFormGuest.find('.modal-guest__adult input')
  var currentChildrenGuest = $currentFormGuest.find('.modal-guest__children input')

  var $parentButtonInput = $(evt.target).parent()
  var childrenNode = evt.target.parentNode.classList.contains('modal-guest__children');
  var $inputField = $parentButtonInput.find('input');
  var guestCount = parseInt($inputField.val());
  if (evt.target.classList.contains('modal-guest__button--plus')) {
    $inputField.val(guestCount + 1);
  } else if (evt.target.classList.contains('modal-guest__button--minus')) {
      if (childrenNode) {
        if (guestCount > 0 ) {
          $inputField.val(guestCount - 1);
        }
      } else {
        if (guestCount > 1) {
          $inputField.val(guestCount - 1);
        }
      }

  }



  setCurrentGuest($currentSumGuest, $currentAdultGuest, currentChildrenGuest);
};

// *
// * вешаем событие на кнопки управления количеством гостей
// *

var guestNumberHandler = function () {
  $('.form-order__guest-button').on('click', openModalGuest);
  $('.modal-guest__button').on('click', guestNumbers);
};


$(window.document).ready(function() {
  guestNumberHandler();
})

// *
// * Инициализируем календари для главной формы
// *

$('#input__check-in--style').datepicker({
  minDate: new Date(),
  dateFormat: 'd MM yyyy',
  onSelect: function( formattedDate, date, inst ){
    $( inst.el ).trigger('change')
  }
})

$('#input__check-out--style').datepicker({
  minDate: new Date(),
  dateFormat: 'd MM yyyy',
  onSelect: function( formattedDate, date, inst ){
    $( inst.el ).trigger('change')
  }
})

window.guestRange = {
  'guestNumberHandler': guestNumberHandler,
  'setTotalPrice': setTotalPrice
};
