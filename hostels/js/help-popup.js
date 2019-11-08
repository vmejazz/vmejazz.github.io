var $mainForm = $('.margin-order__form');
var $scrollButton = $('.main-order__scroll')
var $helpPopupFirst = $mainForm.find('.help-popup')
var $helpPopupSecond = $scrollButton.find('.help-popup')

var showPopup = function (time = 3000) {
  setTimeout ( function () {
    $helpPopupFirst.addClass('help-popup--show')
  }, time)

  setTimeout ( function () {
    $helpPopupSecond.addClass('help-popup--show')
  }, time*2)
}

$(document).ready(function() {
  width = $(window).width();
  if (width >= 720) {
    $(window).one( 'scroll', function(){
      showPopup(300)
    })
  }
})
