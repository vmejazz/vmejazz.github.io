var scrollUp = document.querySelector(".scroll-up");

window.onscroll = function() {
  var scrolled = window.pageYOffset || document.documentElement.scrollTop;
  if (scrolled >= 120) {
    scrollUp.classList.add("scroll-up--show");
    scrollUp.classList.remove("scroll-up--hide");
  } else {
    scrollUp.classList.add("scroll-up--hide");
    scrollUp.classList.remove("scroll-up--show");
  }
};
