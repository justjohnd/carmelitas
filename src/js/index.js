import $ from 'jquery';
import 'bootstrap';

import PrjScrollOut from './prj-scroll-out';
import GoogleMap from './google-map.js';

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




