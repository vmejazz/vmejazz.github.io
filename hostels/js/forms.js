/*
 * Forms settings
 * Library used: validate-us
 * @author Mikhail Vikrian
 *
 * Fields
 *
 * 01 Phone
 */

var phone = {
  value: '',
  placeholder: '+7',
  validate: {
    required: {
      error: 'Укажите, пожалуйста, Ваш телефон',
    },
    pattern: {
      reg: /^(\+7|7|8)?[\s\-]?\(?[0-9]{2,3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
      error: 'Укажите номер телефона в правильном формате',
    }
  }
}
/*
 * 02 Name
 */
var fio = {
  value: '',
  validate: {
     required: {
       error: 'Заполните поле имя',
     },
     pattern: {
       reg: /[а-яА-Я\s]+/,
       error: 'В поле имени введены недопустимые символы',
     }
   }
}
/*
 * 03 email
 */
var email = {
  value: '',
  validate: {
     required: {
       error: 'Заполните поле email',
     },
     pattern: {
       reg: /(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
       error: 'Введите корректный email адрес',
     }
   }
}/*
 * 04 date
 */
var dateIn = {
  value: '',
  validate: {
    required: {
      error: 'Это поле обязательно для заполнения'
    },
    pattern: {
      reg: /\d{1,2}\s(Январь|Февраль|Март|Апрель|Май|Июнь|Июль|Август|Сентябрь|Октябрь|Ноябрь|Декабрь) \d{4}/,
      error: 'Введите дату в корректном формате (например: 17 Август 2019)'
    }
  }
}
/*
 * 05 date
 */
var dateOut = {
  value: '',
  validate: {
    required: {
      error: 'Это поле обязательно для заполнения'
    },
    pattern: {
      reg: /\d{1,2}\s(Январь|Февраль|Март|Апрель|Май|Июнь|Июль|Август|Сентябрь|Октябрь|Ноябрь|Декабрь) \d{4}/,
      error: 'Введите дату в корректном формате (например: 17 Август 2019)'
    }
  }
}

/*
  *
 * Forms Array
 *
 */

 var forms = [
   {
     id: 'main-form',
     fields: {
       'date-from' : dateIn,
       'date-till' : dateOut,
       'fio'  : fio,
       'phone' : phone
     },
   }
 ]

 /*
  *
  * Error Handlers
  * [f = field, r = result]
  *
  * 01 On field error
  */

  var onFieldError = function( f, r ) {

    f.removeClass( 'has-success' )
    f.addClass( 'has-error' )
    appendError( f, r )
  }

  /*
   * 02 onSubmitError
   */

   var onSubmitError = function( f, r ) {
     appendError( f, r )
     f.removeClass( 'has-success' )
       f.addClass( 'has-error' )
   }

  /*
   * 03 onSuccess
   */

   var onSuccess = function( f ) {
     f.removeClass( 'has-error' )
     f.addClass( 'has-success' )
     removeError( f )
   }

   /*
    * 04 onFormSuccess
    */

    var onFormSuccess = function( f ) {
      startLoading( $(f) )
      send( $(f) )
    }

    function send( f )
    {
      var data = f.serializeJSON()
      console.log(data)
      $.ajax( {
        url: 'http://hostels.landingheroes.ru/order',
        data: data,
        type: 'POST',
        crossDomain: true,

        context: f,
        success: function( res )
        {
          f.find('.form-order__button').replaceWith( '<span class="form-alert">Ваша заявка принята. Номер Вашей заявки: #'+res.id+'</span>' );
           window.stopLoading( this )
        },
        error: function( error )
        {
           window.stopLoading( this )
        }
      } )
    }

    function removeError( f )
    {
      var $alert = f.siblings('.form-field__alert')
      if( $alert.length > 0 ) {
        $alert.remove()
      }
    }

    function appendError( f, e )
    {
      //console.log(f)
      var $alert = f.siblings('.form-field__alert')
      //console.log($alert)
      if( $alert.length > 0 ) {
        $alert.text( e.error )
      } else {
        f.after( '<div class="form-field__alert">'+e.error+'</div>' )
      }

    }

    function startLoading( f )
    {
      f.addClass('is-loading')
    }

    function stopLoading( f )
    {
      f.removeClass('is-loading')
    }


    $('#submit').click( function(e){
      e.preventDefault()
      $('#issuers-form').trigger('submit')
    } )

    //Let's rock
    validateUs( forms )
