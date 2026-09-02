/**
 * Puts the page's own address at the foot of a printout.
 *
 * On paper a link is just underlined text — the reader cannot follow it, and
 * has no way of telling which page the sheets in front of them came from or
 * whether a newer version exists. This adds one line at the end giving the
 * URL and the date it was printed.
 *
 * The address comes from the canonical link the site emits, so a printout made
 * from a local preview still cites wiki.mazduino.com rather than localhost.
 *
 * Inserted once on load and hidden by CSS until printing, rather than built in
 * a beforeprint handler: print preview and "save as PDF" do not always fire
 * that event early enough for a newly added element to be laid out.
 */
(function () {
  function sourceUrl() {
    var canonical = document.querySelector('link[rel="canonical"]');
    return (canonical && canonical.href) || window.location.href;
  }

  function build() {
    var host = document.querySelector('div[role="main"]') || document.body;
    if (!host || document.querySelector('.print-source')) return;

    var el = document.createElement('div');
    el.className = 'print-source';
    // Hidden inline rather than relying on print.css alone. A stale cached
    // stylesheet, or the file failing to load at all, would otherwise leave
    // this line sitting in the middle of the page on screen. The print rule
    // overrides it with !important.
    el.style.display = 'none';

    var url = document.createElement('span');
    url.className = 'print-source-url';
    url.textContent = sourceUrl();

    var when = document.createElement('span');
    when.className = 'print-source-date';
    // Locale-formatted so the date reads the way the rest of the site does.
    when.textContent = new Date().toLocaleDateString('id-ID', {
      year: 'numeric', month: 'long', day: 'numeric'
    });

    el.appendChild(document.createTextNode('Sumber: '));
    el.appendChild(url);
    el.appendChild(document.createTextNode(' — dicetak '));
    el.appendChild(when);
    host.appendChild(el);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
