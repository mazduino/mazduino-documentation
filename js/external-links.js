/**
 * Force all external links to open in a new tab.
 * 
 * This replaces the need for {:target="_blank"} attribute lists on
 * reference-style link definitions like:
 *   [mazduino-fw]: https://github.com/mazduino/mazduino-fw {:target="_blank"}
 * which don't work because attr_list only applies to rendered elements,
 * not link reference definitions.
 */
(function () {
  'use strict';
  var currentHost = window.location.hostname;
  document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelectorAll('a[href^="http"]');
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      // Only external links (different host)
      if (link.hostname !== currentHost && link.hostname !== '') {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    }
  });
})();
