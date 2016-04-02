'use strict';
/* jshint ignore:start */
var mapController = (function () {
/* jshint ignore:end */

  var map;

  var constructor = function () {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.9909516, lng: 23.668127},
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  };

  return constructor;
/* jshint ignore:start */
})();
/* jshint ignore:end */
