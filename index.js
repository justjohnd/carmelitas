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

