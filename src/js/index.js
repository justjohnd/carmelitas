import $ from 'jquery';
import 'bootstrap';

import PrjScrollOut from './prj-scroll-out';
import PrjFlatpickr from './prj-flatpickr';
import multilanguage from './multilanguage';

// const api_Key = process.env.API_KEY;  Currently not using. env file not set up
// console.log(process.env);

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

// Use Waypoints  to make mobile navbar appear
// Use Waypoints plugin to initialize the markers on scroll
var navbarWaypoint = new Waypoint({
    element: document.getElementById('js-navbar'),
    handler: function () {
        var elements = document.getElementsByClassName('con-nav'); // get all elements
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = "#ebd5b4";
        }
        
        var logo = document.getElementById("js-logo");
        logo.classList.remove("js-logo-d-none");
    }
});

//Anchor autocomplete to form fiedl in modal
// $(".js-autocomplete").autocomplete("option", "appendTo", ".eventInsForm");
