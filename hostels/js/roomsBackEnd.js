(function () {
  var orderList = document.querySelector('.rooms-order__list');
  var roomsFromBackEnd = [];
  var smallPhotoTemplate = document.querySelector('#small-photo__template')     //  Ищем шаблон для малых фоток
  .content
  .querySelector('.room__small-photo');
  var mapCardTemplate = document.querySelector('#card-room__template')      //..  Ищем шаблон для карточки номера
  .content
  .querySelector('.rooms-order__item');

  // *
  // * Очищаем список карточек
  // *
  var resetListRooms = function () {
    orderList.innerHTML = '';
  }

  // *
  // * Устанавливаем правильный адрес главной фото на карточку
  // *
  var setPhotoSrc = function ( imageSrc) {
    var smallPhotoElement = smallPhotoTemplate.cloneNode(true);

    smallPhotoElement.querySelector('.room__photo-link img').src = imageSrc;

    return smallPhotoElement;
  }

  // *
  // * Добавляем элемент малой фотки в модаль
  // *
  var smallPhotoRoomList = function (elem, photoList ) {
    var fragment = document.createDocumentFragment();

    fragment.appendChild(setPhotoSrc(elem));
    photoList.appendChild(fragment);
  }

  // *
  // * Основной рендеринг всех данных по номеру
  // *
  this.renderCard = function (elem) {
    var cardElement = mapCardTemplate.cloneNode(true);

    cardElement.id =  'room-id__' + elem.id;
    cardElement.querySelector('.form-order').id = 'form-id__' + elem.id;
    cardElement.querySelector('.rooms-order__modal').id = 'modal-id__' + elem.id;
    cardElement.querySelector('.card-room__title').innerHTML = elem.title;
    cardElement.querySelector('.price__sell').innerHTML = elem.sale_price + ' руб / сутки';
    cardElement.querySelector('.price__old').innerHTML = elem.price + ' руб / сутки';
    cardElement.querySelector('.card-room__description').innerHTML = elem.price_for;
    cardElement.querySelector('.card-room__img').src = elem.thumbnail;

    var stations = ''
    elem.metro.line.split(',').map( function(color){
      stations += '<span class="metro-icon metro-icon--'+color+'"></span>'
    } )

    cardElement.querySelector('.metro-field__checkbox-label').innerHTML = elem.metro.title + stations
    cardElement.querySelector('.room__title').innerHTML = elem.title;
    cardElement.querySelector('.room__adress').innerHTML = elem.metro_station + ', ' + elem.address.slice(10);
    cardElement.querySelector('.room__big-jmg').src = elem.thumbnail;
    var inputIdIn = 'check-in__id-' + elem.id;
    cardElement.querySelector('.form-order__check-in--modal input').id = inputIdIn;
    cardElement.querySelector('.form-order__check-in--modal label').htmlFor = inputIdIn;
    var inputIdOut = 'check-out__id-' + elem.id;
    cardElement.querySelector('.form-order__check-out--modal input').id = inputIdOut;
    cardElement.querySelector('.form-order__check-out--modal label').htmlFor = inputIdOut;
    var bedID = 'room-bed__id-' + elem.id;
    cardElement.querySelector('.modal-guest__bed input').id = bedID;
    cardElement.querySelectorAll('.modal-guest__bed label').forEach ( function ( elem ) {
      elem.htmlFor = bedID;
    })

    if (elem.sale_price !== '-') {
      cardElement.querySelector('.price__sell').innerHTML = elem.sale_price + ' руб / сутки';
      cardElement.querySelector('.card-room__sale-icon').classList.remove('card-room__sale-icon--hide');
      cardElement.querySelector('.card-room__sale-icon').classList.add('card-room__sale-icon--show')
    } else {
      cardElement.querySelector('.price__sell').innerHTML = elem.price + ' руб / сутки';
      cardElement.querySelector('.price__old').innerHTML = '';
    }

    if (elem.price_for === '1') {
      cardElement.querySelector('.card-room__description').innerHTML = 'Цена указана за 1 человека';
      cardElement.querySelector('.form-order__price-person span').innerHTML = elem.price + ' руб';
    } else if ( elem.price_for === '2') {
      cardElement.querySelector('.card-room__description').innerHTML = 'Цена указана за 2 человек';
      cardElement.querySelector('.form-order__price-person span').innerHTML = elem.price + ' руб';
      // cardElement.querySelector('.form-order__price-person').innerHTML = 'Цена указана за номер';
    } else if (elem.price_for === '3') {
      cardElement.querySelector('.card-room__description').innerHTML = 'Цена указана за 3 человек';
      cardElement.querySelector('.form-order__price-person span').innerHTML = elem.price + ' руб';
      // cardElement.querySelector('.form-order__price-person').innerHTML = 'Цена указана за номер';
    } else {
      cardElement.querySelector('.card-room__description').innerHTML = elem.price_for;
      cardElement.querySelector('.form-order__price-person').innerHTML = elem.price_for;
    }

    // if (elem.sale_price === '-') {
    //   cardElement.querySelector('.form-order__price-all span').innerHTML = elem.price;
    // } else {
    //   cardElement.querySelector('.form-order__price-all span').innerHTML = elem.sale_price;
    //   cardElement.querySelector('.form-order__price-person span').innerHTML = elem.sale_price + ' руб';
    // }

    var mapImages = []
    if( elem.images ) {
      mapImages = elem.images.split(',');
    }
    cardElement.querySelector('.room__small-photos').innerHTML = "";
    smallPhotoRoomList(elem.thumbnail, cardElement.querySelector('.room__small-photos'));
    mapImages.map( function ( elem ){
      if (elem.length > 5) {
        smallPhotoRoomList(elem, cardElement.querySelector('.room__small-photos'));
      }
    })

    return cardElement;
  }

  // *
  // * Запрос на бэк для получения всех данных по номерам
  // *
  this.getRoomsFromBackEnd = function () {
    orderList.innerHTML = '';

    $.ajax(
      {
        url: 'http://hostels.landingheroes.ru/rooms',
        ataType: 'json',
        method: 'post',
        async: false,
        context: this,
        success: function( res )
        {
          res.map (function ( Obj ) {
            roomsFromBackEnd.push(Obj)
          })
        },
        error: function( err )
		  	{
			  	console.error(err)
		  	}
      }
    )

    return roomsFromBackEnd;
  }

  // *
  // * активация запроса данных с бэка
  // *
  getRoomsFromBackEnd();

  // *
  // * Добавляем карточку номера в ДОМ сайта
  // *
  var addCardOnSite = function (card) {
    var fragment = document.createDocumentFragment();

    fragment.appendChild(renderCard(card));
    $(fragment).find('.form-order__check-in--modal input').datepicker({dateFormat: 'd MM yyyy'})      //  Активируем календарь для карточки
    $(fragment).find('.form-order__check-out--modal input').datepicker({dateFormat: 'd MM yyyy'})     //  Активируем календарь для карточки
    orderList.appendChild(fragment);
  };

  // *
  // * Отрисовка определенного количества карточек
  // *
  var renderSomeCards = function ( array, maxRenderElement) {
    for (var i = 0; i < maxRenderElement && i < array.length; i++) {
      addCardOnSite(array[i]);
    }
  }

  renderSomeCards(roomsFromBackEnd, 8);   // * Отрисовка определенного количества карточек

  window.modal.setHandlerOnSliderButtons();     //  Устанавливаем обработчик на кнопки слайдеры


  window.modal.changeSmallPhotoToBig()      //      вешаем обработчик смены адреса большой фотки при клике по маленькой фото

  window.roomsBackEnd = {
    'fromBack': roomsFromBackEnd,
    'addCardOnSite': addCardOnSite,
    'resetListRooms': resetListRooms,
    'renderSomeCards': renderSomeCards
  }
})();
