'use strict';

/* jshint ignore:start */
var searchController = (function () {
/* jshint ignore:end */
var container;
var button;
var searchInput;
var searchBox;

var onSearchButtonClick = function (e) {
  if (e) {
    e.preventDefault();
  }
  var openClass = 'open';
  //var closedClass = 'closed';
  if (container.hasClass(openClass)) {
    return container.removeClass(openClass);
  }
  container.addClass(openClass);
};

var onSearch = function () {
  onSearchButtonClick();
  $(window).trigger('search', [searchBox.getPlaces()]);
};

var onSearchEnd = function (e, bounds) {
  searchBox.setBounds(bounds);
};

var constructor = function (el, btn) {
  container = $(el);
  button = $(btn);
  button.click(onSearchButtonClick);
  searchInput = document.getElementById('pac-input');
  $('#pac-input').click(function () {
    $(this).val('');
  });
  searchBox = new google.maps.places.SearchBox(searchInput);
  searchBox.addListener('places_changed', onSearch);
  $(window).on('search-end', onSearchEnd);
};

return constructor;
/* jshint ignore:start */
})();
/* jshint ignore:end */
