(function () {
  'use strict';

  var LEAF_COLORS = ['#4E7C5A', '#6FAA7B', '#C9622B', '#E8935A', '#2E4636'];
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------
     Ambient falling leaves
     ---------------------------------------------------------- */
  function initLeafField() {
    var field = document.getElementById('leafField');
    if (!field || prefersReducedMotion) return;

    var LEAF_COUNT = window.innerWidth < 720 ? 14 : 24;
    var variants = ['', 'variant-b', 'variant-c'];

    for (var i = 0; i < LEAF_COUNT; i++) {
      spawnLeaf(field, variants, true);
    }
  }

  function spawnLeaf(field, variants, initial) {
    var leaf = document.createElement('div');
    var size = 10 + Math.random() * 16; // 10–26px
    var color = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];
    var duration = 10 + Math.random() * 12; // 10–22s
    var delay = initial ? Math.random() * -duration : 0;
    var left = Math.random() * 100;
    var variant = variants[Math.floor(Math.random() * variants.length)];

    leaf.className = 'leaf' + (variant ? ' ' + variant : '');
    leaf.style.width = size + 'px';
    leaf.style.height = size + 'px';
    leaf.style.left = left + 'vw';
    leaf.style.background = color;
    leaf.style.animationDuration = duration + 's';
    leaf.style.animationDelay = delay + 's';
    leaf.style.opacity = (0.35 + Math.random() * 0.4).toFixed(2);

    field.appendChild(leaf);
  }

  /* ----------------------------------------------------------
     Leaf ring around the hero title (signature element)
     ---------------------------------------------------------- */
  function initLeafRing() {
    var ring = document.getElementById('leafRing');
    if (!ring) return;

    var count = 14;
    var radius = 175;

    for (var i = 0; i < count; i++) {
      var angle = (360 / count) * i;
      var item = document.createElement('div');
      var color = LEAF_COLORS[i % LEAF_COLORS.length];
      var size = 12 + (i % 3) * 4;

      item.className = 'leaf-ring-item';
      item.style.width = size + 'px';
      item.style.height = size + 'px';
      item.style.background = color;
      item.style.transform =
        'rotate(' + angle + 'deg) translate(' + radius + 'px) rotate(-' + angle + 'deg)';

      ring.appendChild(item);
    }
  }

  /* ----------------------------------------------------------
     Mobile nav toggle
     ---------------------------------------------------------- */
  function initNavToggle() {
    var toggle = document.getElementById('navToggle');
    var nav = document.getElementById('primaryNav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ----------------------------------------------------------
     About page tabs (The Game / The Studio)
     ---------------------------------------------------------- */
  function initTabs() {
    var tabGame = document.getElementById('tab-game');
    var tabStudio = document.getElementById('tab-studio');
    var panelGame = document.getElementById('panel-game');
    var panelStudio = document.getElementById('panel-studio');
    if (!tabGame || !tabStudio) return;

    function activate(tab) {
      var showGame = tab === 'game';

      tabGame.classList.toggle('is-active', showGame);
      tabStudio.classList.toggle('is-active', !showGame);
      tabGame.setAttribute('aria-selected', showGame ? 'true' : 'false');
      tabStudio.setAttribute('aria-selected', !showGame ? 'true' : 'false');
      tabGame.tabIndex = showGame ? 0 : -1;
      tabStudio.tabIndex = !showGame ? 0 : -1;

      panelGame.hidden = !showGame;
      panelStudio.hidden = showGame;
      panelGame.classList.toggle('is-hidden', !showGame);
      panelStudio.classList.toggle('is-hidden', showGame);
    }

    tabGame.addEventListener('click', function () { activate('game'); });
    tabStudio.addEventListener('click', function () { activate('studio'); });
  }

  /* ----------------------------------------------------------
     Init
     ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initLeafField();
    initLeafRing();
    initNavToggle();
    initTabs();
  });
})();
