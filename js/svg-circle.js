// var count = $(('#count'));
// $({ Counter: 0 }).animate({ Counter: count.text() }, {
//   duration: 5000,
//   easing: 'linear',
//   step: function () {
//     count.text(Math.ceil(this.Counter)+ "%");
//   }
// });

var s = document.select('#svg-circle');
var progress = s.select('#progress');

progress.attr({strokeDasharray: '0, 251.2'});
s.animate(0,150.2, function( value ) {
    progress.attr({ 'stroke-dasharray':value+',251.2'});
}, 5000);
