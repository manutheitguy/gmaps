var myLocation, distance, category, map, infoWindow, marker, service;
var markers = new Array();
var icpak = { lat: -1.2538866, lng: 36.8599411 };

function initMap() {
    // Map options
    var options = {
        center: icpak,
        zoom: 15
    }

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var myLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(icpak);
        },

        function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } 
    else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    // New map
    map = new google.maps.Map(document.getElementById('map'), options);
    
    infoWindow = new google.maps.InfoWindow({
        content: "<h1>CPA Center</h1>"
    });

    marker.addListener("click", function () {
        infoWindow.open(map, marker);
    });
}