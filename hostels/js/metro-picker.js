var MetroPicker = function()
{
	this.$container = $('.metro-field__box')
	this.$checkbox  = this.$container.find('.metro-field__checkbox')
	this.$button    = this.$container.find('.metro-field__button')
	this.$list      = this.$container.find('.metro-field__checkbox-list')
  this.$reset     = this.$container.find('.metro-field__checkbox-button[type=reset]')
  this.$metroInput = this.$container.find('.metro-field__input')
  this.$startSearch = this.$container.find('.metro-field__find-button')
  this.$loadingImg = this.$container.find('.metro-field__loading')

  // *
  // * Показать окно загрузки
  // *
  this.showLoadingAction = function () {
    this.$loadingImg.toggleClass('metro-field__loading--show')
    this.$loadingImg.toggleClass('metro-field__loading--hide')
  }.bind(this)

  var showLoadingCards = function () {
    var cardsField = $(document).find('.rooms-order__preloader');
    cardsField.toggleClass('rooms-order__preloader--loading')
  }

  // *
  // * Объект с данными о станциях метро
  // *
	this.state = {
		open: false,
		value: '',
		options: [
			{
				title:'Маяковская',
        checked: false,
        filtred: true
			},
			{
				title:'Арбатская',
				checked: false,
        filtred: true
			},
			{
				title:'Ясенево',
				checked: false,
        filtred: true
			},
			{
				title:'Третьяковская',
				checked: false,
        filtred: true
			}
		]
  }

  // *
  // * Открывает список станций
  // *
	this.open = function()
	{
		this.state.open = true
		this.$container.trigger('stateChange')
	}

  // *
  // * Закрывает список станций
  // *
	this.close = function()
	{
		this.state.open = false
		this.$container.trigger('stateChange')
	}

  // *
  // * Клик по любой области вне списка станций, закрывает список
  // *
	$('body').on( 'click', function(e){
		if( !$(e.target).is('.metro-field__checkbox-label, input, .metro-field__find-button button,.metro-field__checkbox-list') ) {
			this.close()
		}
	}.bind(this) )

	// *
  // * Кнопка открытия/скрытия списка станций
  // *
	this.$button.on('click', function(e){
		e.preventDefault()
		e.stopPropagation()
		if(this.state.open) {
			this.close()
		} else {
			this.open()
		}

  }.bind(this))

  // *
  // * Открывает список станций при клике на поле ввода + визуально очищает его
  // *
  this.$metroInput.focus( function (e)
  {
		e.preventDefault()
    this.$metroInput.val('')
    this.state.options.map( function (option)
    {
      option.filtred = true;
    })
    if(this.state.open == false) {
      this.open()
    }
  }.bind(this))

  // *
  // * Меняем состояние выбора станции
  // *
	this.toggleStation = function(e)
	{
		e.stopPropagation()

		var station = $(e.currentTarget).text()
		this.state.options.map( function(option){


			if( option.title.trim() == station.trim() ) {
        option.checked == true ? option.checked = false : option.checked = true
        // this.$startSearch.click();       //  Отфильтровать после выбора станции
			}
		}.bind(this) )
	}

  // *
  // * Обработчик по клику на названии стации, менять состояние
  // *
	$(document).on( 'click', '.metro-field__checkbox-label', this.toggleStation.bind(this) )

  // *
  // * Изменяет состояние бокса с метро
  // *
	$('.metro-field__box').on( 'stateChange', function(){

		if( this.state.open ) {

			this.$container.addClass('metro-field__box--active')
			this.$checkbox.addClass('metro-field__checkbox--show')
			this.$checkbox.removeClass('metro-field__checkbox--hide')

		} else {

			this.$container.removeClass('metro-field__box--active')
			this.$checkbox.removeClass('metro-field__checkbox--show')
			this.$checkbox.addClass('metro-field__checkbox--hide')

		}

	}.bind(this))

  // *
  // * Отрисовка списка станций
  // *
	this.renderStations = function()
	{
		var r = ''

		this.state.options.map( function( option ){
      if (option.filtred) {
			  r += '<li class="metro-field__checkbox-item">'
		        r += '<input type="checkbox" id="'+option.title+'" value="'+option.title+'" ' + ( option.checked ? ' checked' : '' ) + '>'
		        r += '<label class="metro-field__checkbox-label" for="'+option.title+'">'
              r += option.title
              option.colors.map( function (color) {
                r += ' <span class="metro-icon metro-icon--'+color+'"></span>'
              })
		        r += '</label>'
        r += '</li>'
      }
		} )

		this.$list.html( r )

	}

  // *
  // * Сброс всех выбранных станций
  // *
	this.reset = function(e)
	{
		e.stopPropagation()
		$('.metro-field__checkbox-item > input').prop( 'checked', false )
		this.state.options.map( function( option ){
			option.checked = false
		} )
    this.$metroInput.val('')
    this.state.options.map( function (option)
    {
      option.filtred = true;
    })

    this.renderStations()     //  отрисовка станций
    window.roomsBackEnd.resetListRooms()      //  стираем все карточки с отелями
    window.roomsBackEnd.renderSomeCards(window.roomsBackEnd.fromBack, 8)      //  рисуем первые 8 карточек
    window.modal.changeSmallPhotoToBig()      //     обработчик смены маленьких фото на большие
    this.close()     // закрываем окно списка станций
	}

  // *
  // * Обработчик на кнопку reset
  // *
	this.$reset.click( this.reset.bind(this) )


  // *
  // * Возвращает все выбранные станции
  // *
	this.getChekedStations = function()
	{
		return this.state.options.filter( function( option ) {
			return option.checked == true
		} )
  }

  // *
  // * Запрашиваем / рисуем станции с бэка
  // *
	this.getStations = function()
	{
		$.ajax( {

			url: 'http://hostels.landingheroes.ru/stations',
			dataType: 'json',
			method: 'get',
			context: this,
			success: function( res )
			{
				var stations = []

				res.map( function( station ){
					stations.push( { title: station.title, checked: false, filtred: true, colors: station.line.split(',') } )
				} )

				this.state.options = stations
				this.renderStations()
			},
			error: function( err )
			{
				console.error(err)
			}

		} )
	}

  // *
  // * Запуск запроса станций на бэк
  // *
  this.getStations()

  // *
  // * Быстрая фильтрация списка станций из строки ввода
  // *
  var getInputFilterStations = function (target) {
		this.state.options.map( function( option ){
      if (option.title.toLowerCase().indexOf(target) + 1) {
        console.log('yes')
        option.filtred = true;
      } else {
        option.filtred = false
      }
    })
  }.bind(this);

  // *
  // * Запуск нахождения/отрисовки карточек отеля, по выбранным станциям метро
  // *
  this.$startSearch.click( function(e)
  {
		e.stopPropagation()
    this.$metroInput.val('')
    var i = 0;
    this.state.options.map( function( option ){
      if (option.checked && i < 3) {
        i += 1;
        oldValueInput = this.$metroInput.val()
        this.$metroInput.val(oldValueInput + option.title + ', ')
      }
    }.bind(this))

    var chackedStations = this.getChekedStations();     //  получаем список выбранных станций
    window.roomsBackEnd.resetListRooms()      //  очищаем все карточки
    window.roomsBackEnd.fromBack.map( function ( elem ) {     //  сравниваем карточку и выбранную станцию, при совпадении рисуем
      for (var i = 0; i < chackedStations.length; i++) {
        if (elem.metro.title === chackedStations[i].title) {
          window.roomsBackEnd.addCardOnSite(elem)
        }
      }
    })

    showLoadingCards();     //  показываем preloader загрузки карточек
    setTimeout(showLoadingCards, 500)     //  закрываем preloader загрузки карточек
    window.modal.changeSmallPhotoToBig()      //  вешаем обработчик смены маленьких фото на модальном окне
    window.guestRange.guestNumberHandler();     //  вешаем обработчик окна выбора гостей
    this.close();
  }.bind(this))

  // *
  // * Обработчик на поле ввода, для запуска фильтрации станций метро по вводимым данным
  // *
  this.$metroInput.on('input', function(){
    console.log(this.$metroInput.val())
    var target = this.$metroInput.val().toLowerCase()
    getInputFilterStations(target)
    this.renderStations()
  }.bind(this))

	return this
}

var mp = new MetroPicker()
