import $ from 'jquery';
import 'bootstrap';

// check for jquery
// window.onload = function () {
//     if (window.jQuery) {
//         // jQuery is loaded  
//         alert("Yeah!");
//     } else {
//         // jQuery is not loaded
//         alert("Doesn't Work");
//     }
// }

import PrjScrollOut from './prj-scroll-out';
import PrjFlatpickr from './prj-flatpickr';

// Get current year for copyright
$('#year').text(new Date().getFullYear());

//Off canvas navbar
$("[data-trigger]").on("click", function () {
    var trigger_id = $(this).attr('data-trigger');
    $(trigger_id).toggleClass("show");
    $('body').toggleClass("offcanvas-active");
});

// close button 
$(".btn-close").click(function (e) {
    $(".navbar-collapse").removeClass("show");
    $("body").removeClass("offcanvas-active");
});