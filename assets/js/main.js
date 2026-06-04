(function () {
  'use strict';

  // Mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var navbar = document.getElementById('navbar');
  var toTop = document.getElementById('toTop');
  var toBottom = document.getElementById('toBottom');

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    var winH = window.innerHeight;
    var docH = document.documentElement.scrollHeight;
    if (navbar) navbar.classList.toggle('is-scrolled', y > 60);
    // show "top" once scrolled down a bit; show "bottom" until near the end
    if (toTop) toTop.classList.toggle('is-visible', y > 400);
    if (toBottom) toBottom.classList.toggle('is-visible', (y + winH) < (docH - 400));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  if (toBottom) toBottom.addEventListener('click', function () {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  });

  // Sub-tabs (e.g. the Explore page): switch panels in place via the hash
  var subbar = document.getElementById('subtabs');
  if (subbar) {
    var tabs = [].slice.call(subbar.querySelectorAll('.subtab'));
    var panels = [].slice.call(document.querySelectorAll('.subpanel'));
    var activate = function (name) {
      var matched = false;
      tabs.forEach(function (t) {
        var on = t.getAttribute('data-tab') === name;
        t.classList.toggle('is-active', on);
        if (on) matched = true;
      });
      if (!matched && tabs.length) { name = tabs[0].getAttribute('data-tab'); tabs[0].classList.add('is-active'); }
      panels.forEach(function (p) { p.classList.toggle('is-active', p.getAttribute('data-panel') === name); });
    };
    tabs.forEach(function (t) {
      t.addEventListener('click', function (e) {
        e.preventDefault();
        var n = t.getAttribute('data-tab');
        activate(n);
        if (history.replaceState) { history.replaceState(null, '', '#' + n); } else { location.hash = n; }
      });
    });
    activate((location.hash || '').replace('#', ''));
    window.addEventListener('hashchange', function () { activate((location.hash || '').replace('#', '')); });
  }
})();

