    // Initialize and add the map
    function initMap() {
        // The location of Carmelitas
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
        marker.addListener("click", toggleBounce);
    }

    function toggleBounce() {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }