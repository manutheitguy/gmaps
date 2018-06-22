var myLocation, distance, category, map;
        var markers = new Array();

        window.onload = function() {
            drawMap();
        }    
        function drawMap() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(onSuccess, onError, {
                    maximumAge:60*1000,
                    timeout:5*60*1000,
                    enableHighAccuracy:true
                })
            }
            else
            alert("Your browser does not support HTML5 Geolocation!!!");
        }
        function onSuccess(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            myLocation = new google.maps.LatLng(lat, lng);

            var mapOptions = {
                center = myLocation,
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById("mapArea"), mapOptions)
        }
        function onError(error) {
            switch(error.code) {
                case PERMISSION_DENIED:
                    alert("User denied permission");
                    break;
                case TIMEOUT: 
                    alert("Geolocation timed out");
                    break;
                case POSITION_UNAVAILABLE: 
                    alert("Geolocation information is not available");
                    break;
                default: 
                    alert("Unknown error");
                    break;
            }
        }

        function getLocations() {
            category = document.getElementById("category").value;
            distance = document.getElementById("distance").value;
            if (category == "default") {
                alert("You have to select a category");
            }
            else
                findPlaces();
        }
        function findPlaces() {
            var request = {
                location: myLocation,
                radius: distance,
                types: [category]
            };

            var service = new google.maps.places.PlacesService(map);
            service.search(request, createMarkers);
        }

        function createMarkers(respose, status) {
            var latlngbounds = new google.maps.LatLngBounds();
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                clearMarkers();
                for(var i=0; i<respose.length; i++) {
                    drawMarker(respose[i]);
                    latlngbounds.extend(respose[i].geometry.location);
                }
                map.fitBounds(latlngbounds);
            }
            else
                alert("Sorry there is an error!!!");
        }
        
        function drawMarker(obj) {
            var marker = new google.maps.Marker({
                position: obj.geometry.location,
                map: map
            });
            markers.push(marker);
        }

        function clearMarkers() {
            if (markers) {
                for(i in markers) {
                    markers[i].setMap(null);
                }
                markers = [];
            }
        }