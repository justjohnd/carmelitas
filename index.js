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

//Init Scrollspy
$('body').scrollspy({
    target: '#main-nav'
});

$("#main-nav a").on('click', function (event) {
    if (this.hash !== "") {
        event.preventDefault();

        const hash = this.hash;

        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function () {
            window.location.hash = hash;
        });
    }
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
