'use strict';

/* jshint ignore:start */
var menuController = (function () {
/* jshint ignore:end */
var element;
var closeButton;
var menuLinkClass;

var onMenuLinkClick = function (e) {
  e.preventDefault();
  closeButton.click();
};

var constructor = function (el, close, linkClass) {
  element = $(el);
  closeButton = $(close);
  menuLinkClass = linkClass;
  element.delegate('.' + menuLinkClass, 'click', onMenuLinkClick);
};

return constructor;
/* jshint ignore:start */
})();
/* jshint ignore:end */
