import $ from 'jquery';
import 'bootstrap';

import PrjScrollOut from './prj-scroll-out';
import PrjFlatpickr from './prj-flatpickr';

// const api_Key = process.env.API_KEY;  Currently not using. env file not set up
// console.log(process.env);

//Multilanguage Menu
const url = new URL(window.location.href);

let urlPathname = url.pathname;
let path = urlPathname.split("/");
let langDir = path[path.length - 2];
let finalDir = path[path.length - 1];

console.log(url);
console.log(langDir);
console.log(finalDir);

let buttons = document.getElementsByClassName("btn-lang");

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        let btnId = this.id;
        if (btnId != langDir) {
            let urlReroute = url.host + "/carmelitas/" + btnId + "/" + finalDir;
            console.log(urlReroute);
            window.location.href = urlReroute;
        }
    });
}


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
