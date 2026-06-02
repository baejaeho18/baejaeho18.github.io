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

  // Navbar: solid background after scrolling past the hero
  var navbar = document.getElementById('navbar');
  var backTop = document.getElementById('backToTop');

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (navbar) navbar.classList.toggle('is-scrolled', y > 60);
    if (backTop) backTop.classList.toggle('is-visible', y > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Back to top
  if (backTop) {
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
