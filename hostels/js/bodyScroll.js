(function () {
  var curScrollTop;

  var getCurrentScroll = function () {
    curScrollTop = $(window).scrollTop();
    return curScrollTop;
  }

  var StopScrollBody = function () {
    getCurrentScroll();

    $('html').addClass('noscroll').css('top', '-' + curScrollTop + 'px');
  }

  var resetScrollBody =function () {
    $('html').removeClass('noscroll');
    $('html, body').scrollTop(curScrollTop)
  }

  window.bodyScroll = {
    'StopScrollBody': StopScrollBody,
    'resetScrollBody': resetScrollBody,
  }
})()
