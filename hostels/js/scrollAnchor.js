(function () {
  $(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    var scrollValue = $($.attr(this, 'href')).offset().top;
    scrollValue = scrollValue - 20;

    $('html, body').animate({
        scrollTop: scrollValue
    }, 800);

    console.log($('html, body').scrollTop);
  });
})();
