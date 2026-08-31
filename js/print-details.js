/**
 * Expands every collapsed <details> block before printing.
 *
 * Paper cannot be clicked, so a section left folded is simply missing from the
 * printout — the legacy configuration steps on the Racedash page were lost this
 * way. CSS alone is not reliable here: Chrome hides the contents through the
 * ::details-content pseudo-element rather than a plain display rule, and the
 * property to override it is recent and not portable. Toggling the elements
 * themselves works in every browser.
 *
 * The previous state is restored afterwards so the on-screen page is left as
 * the reader had it.
 */
(function () {
  var reopened = [];

  function expand() {
    reopened = [];
    document.querySelectorAll('details:not([open])').forEach(function (d) {
      reopened.push(d);
      d.open = true;
    });
  }

  function restore() {
    reopened.forEach(function (d) { d.open = false; });
    reopened = [];
  }

  window.addEventListener('beforeprint', expand);
  window.addEventListener('afterprint', restore);

  // Safari and older WebKit do not fire beforeprint; this covers them.
  if (window.matchMedia) {
    var mq = window.matchMedia('print');
    var onChange = function (e) { (e.matches ? expand : restore)(); };
    if (mq.addEventListener) {
      mq.addEventListener('change', onChange);
    } else if (mq.addListener) {
      mq.addListener(onChange);
    }
  }
})();
