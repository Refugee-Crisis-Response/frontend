function initAutocomplete() {

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.9909516, lng: 23.668127},
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  //export for play in console
  pageMap = map;

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {

    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();

    places.forEach(function(place) {
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
    });

    map.fitBounds(bounds);

  });

  // --------------------------------------------------
  // Custom marker function
  var infowindow = new google.maps.InfoWindow();

  function addMarker(data){

    var icon = {
      url: data.urlIcon, // url
      scaledSize: new google.maps.Size(30, 30), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(5, 15) // anchor
    };

    marker = new google.maps.Marker({
      position: new google.maps.LatLng(data.lat, data.lon),
      icon: icon,
      map: map,
      draggable: false,
      //animation: google.maps.Animation.DROP
    });

    google.maps.event.addListener(marker, 'click', ( function(marker){
      return function() {
        infowindow.setContent(data.description);
        infowindow.open(map, marker);
      }
    })(marker));

  } // end of addMarker()

  var dataPoint1 = {
    "lat": 37.9459406,
    "lon": 23.6377888,
    "urlIcon": "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png",
    "description": "<strong>Blue Star Ferries</strong><br/><br/>Boat transportation in Pireaus."
  }
  var dataPoint2 = {
    "lat": 39.1043867,
    "lon": 26.5578451,
    "urlIcon": "http://www.myiconfinder.com/uploads/iconsets/256-256-a5485b563efc4511e0cd8bd04ad0fe9e.png",
    "description": "<strong>Port of Mytilene</strong><br/><br/>Boat transportation in Mytilene (Lesvos)."
  }
  addMarker(dataPoint1);
  addMarker(dataPoint2);
  // --------------------------------------------------

}
