var menuToggle = document.querySelector(".navigation__toggle");
var menuList = document.querySelector(".navigation__list");
// var modal = document.querySelector(".modal");
// var modalClose = document.querySelector(".modal__overlay");

document.addEventListener('DOMContentLoaded', function() {
  menuList.classList.remove("navigation__list--show");
  menuList.classList.add("navigation__list--hide");
  menuToggle.classList.add("navigation__toggle--close");
}, false);

menuToggle.addEventListener("click", function(evt) {
  evt.preventDefault ();
  menuList.classList.toggle("navigation__list--hide");
  menuList.classList.toggle("navigation__list--show");
  menuToggle.classList.toggle("navigation__toggle--open");
  menuToggle.classList.toggle("navigation__toggle--close");
});

// if (cardButton) {
//   cardButton.addEventListener("click", function (evt) {
//     evt.preventDefault ();
//     modal.classList.add("modal--show");
//   });
// };

// modalClose.addEventListener("click", function () {
//   modal.classList.remove("modal--show");
// });

// modalAddButton.addEventListener("click", function () {
//   modal.classList.remove("modal--show");
// });


// window.addEventListener("keydown", function(evt) {
//   if (evt.keyCode === 27) {
//     if (modal.classList.contains("modal--show")) {
//       modal.classList.remove("modal--show");
//     };
//   };
// });

// for (var i = 0; i < linkAddProduct.length; i++) {
//   linkAddProduct[i].addEventListener("click", function(evt) {
//     evt.preventDefault();
//     modal.classList.add("modal--show");
//   });
// };
