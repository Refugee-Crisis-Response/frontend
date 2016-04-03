'use strict';
/* jshint ignore:start */
var mapController = (function () {
/* jshint ignore:end */

  var map;
  var searchInput;
  var searchBox;
  var markers = [];

  var clearMarkers = function () {
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];
  };

  var setPoint = function (point) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(point.lat, point.lng),
      map: map,
      icon: '/img/bomb.png'
    });
    markers.push(marker);
  };

  var setPlace = function (bounds, place) {
    var icon = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    // Create a marker for each place.
    markers.push(new google.maps.Marker({
      map: map,
      icon: icon,
      title: place.name,
      position: place.geometry.location
    }));

    if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
  };

  var getCities = function () {
    var bounds = map.getBounds();
    var sw = bounds.getSouthWest().toJSON();
    var ne = bounds.getNorthEast().toJSON();
    $.ajax({
      url: '/api/cities/bounds/?swlng=' + sw.lng + '&swlat=' + sw.lat + '&nelng=' + ne.lng + '&nelat=' + ne.lat,
      success: function (res) {
        for (var i = 0, len = res.length; i < len; i++ ) {
          setPoint(res[i]);
        }
      },
    });
  };

  var onSearch = function () {
    var places = searchBox.getPlaces();

    if (places.length === 0) {
      return;
    }

    // Clear out the old markers.
    clearMarkers();

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0, len = places.length; i < len; i++) {
      setPlace(bounds, places[i]);
    }
    map.fitBounds(bounds);
  };

  var onMapChange = function () {
    clearMarkers();
    searchBox.setBounds(map.getBounds());
    getCities();
  };

  var constructor = function () {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.9909516, lng: 23.668127},
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    searchInput = document.getElementById('pac-input');
    $('#pac-input').click(function () {
      $(this).val('');
    });
    searchBox = new google.maps.places.SearchBox(searchInput);
    map.addListener('dragend', onMapChange);
    map.addListener('zoom_changed', onMapChange);
    searchBox.addListener('places_changed', onSearch);
  };

  return constructor;
/* jshint ignore:start */
})();
/* jshint ignore:end */
