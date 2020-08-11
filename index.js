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

// Get current year for copyright
$('#year').text(new Date().getFullYear());

//Use keyboard to pause carousel
$(".carousel").carousel({
    keyboard: true
});

// Initialize and add the map
function initMap() {
    // The location of Uluru
    var myLatLng = {
        lat: 27.819290,
        lng: -82.753480
    };
    // The map, centered at litas
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 18,
            center: myLatLng
        });


    var image = '/images/taco.png';

    // The marker, positioned at litas
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: image
    });
    marker.addListener('click', toggleBounce);
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}


// Flatpickr
const fp = flatpickr("#basicDate", {
    enableTime: true,
    dateFormat: "F, d Y H:i",
    static: true
});

//Add scroll event for page animation
// window.addEventListener('scroll', () => {
//     const scrollable = document.documentElement.scrollHeight - window.innerHeight;
// const scrolled = window.scrollY;
// console.log(scrolled);
// if (Math.ceil(scrolled) === scrollable) {
//     alert('you\'ve reached the bottom');
// }
// });

// window.addEventListener('scroll', () => {
// const sec1 = document.getElementById('js-sec-1').offsetTop;
// const scrolled = window.scrollY; 

// if (scrolled > sec1) {
//     console.log(scrolled);
//     console.log(sec1);
//     document.getElementById('js-sec-1').classList.add("con-animated");
//     document.getElementById('js-sec-1').style.display = "block";
// } else {
//     document.getElementById('js-sec-1').style.display = "none";
// }
// });



// // Change menu on click--Currently menus are on separate pages
// document.getElementById("menu-daily").addEventListener("click", function () {
//     document.getElementById("menu-container").innerHTML = '<div class="row"> <div class = "col-md-6"><div class = "col-content"><h2 class = "menu-sec-header"> DAILY MENU </h2> </div> <div class = "col-content"><p class = "menu-item-heading" > NACHOS CON CARNE </p> <p class = "menu-sec" > Lorem ipsum dolor sit amet consectetur adipisicing elitAspernatur consequatursint </p> <p class = "menu-sec-price" > $11 .49 </p> <p class = "menu-sec-veg" > vegetarian / vegan options available </p> </div></div></div>';
                
// });

// document.getElementById("menu-catering").addEventListener("click", function () {
//     document.getElementById("menu-container").innerHTML = '<div class="row"> <div class = "col-md-6"><div class = "col-content"><h2 class = "menu-sec-header"> APPETIZERS </h2> </div> <div class = "col-content"><p class = "menu-item-heading" > NACHOS CON CARNE </p> <p class = "menu-sec" > Lorem ipsum dolor sit amet consectetur adipisicing elitAspernatur consequatursint </p> <p class = "menu-sec-price" > $11 .49 </p> <p class = "menu-sec-veg" > vegetarian / vegan options available </p> </div></div></div>';;
// });
