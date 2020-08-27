if (typeof jQuery == 'undefined') {

    alert("jquery not loaded yo");

}

//Scroll-out
import ScrollOut from 'scroll-out';

ScrollOut({
    threshold: 0.2,
    once: true,
});

import 'bootstrap';

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





