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
})();
