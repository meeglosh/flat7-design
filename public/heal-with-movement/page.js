/* Heal with Movement: the seam opens.
   Bespoke, driven from each pinned act's --sc-p (published by the untouched engine).
   Modes, kept on <html>:
     hwm-split  the surface splits and the ledger stratum shows in the gap
     hwm-flat   pinned acts collapse to ordinary blocks (reduced motion, Lift)
   Default (no JS): static, the ledger is a plain panel beneath each card.
   Reduced motion: flat, no split. Lift: flat + split held fully open. */
(function () {
  'use strict';
  var root = document.documentElement;
  var mq = matchMedia('(prefers-reduced-motion: reduce)');
  var reduced = mq.matches;
  var lifted = false;

  ScrollCraft.mount(document.body);

  function ss(x) { x = x < 0 ? 0 : x > 1 ? 1 : x; return x * x * (3 - 2 * x); }

  var moments = Array.prototype.map.call(document.querySelectorAll('.moment'), function (el) {
    var seam = el.querySelector('.seam');
    var lines = Array.prototype.slice.call(el.querySelectorAll('[data-line]'));
    var peak = el.classList.contains('moment--peak');
    return {
      el: el, seam: seam,
      card: seam.querySelector('.seam__card'),
      top: seam.querySelector('.half--top'),
      bot: seam.querySelector('.half--bot'),
      panel: seam.querySelector('.ledger-panel'),
      inner: seam.querySelector('.ledger-inner'),
      chip: seam.querySelector('[data-chip]'),
      copy: el.querySelector('.m-copy'),
      lines: lines,
      peak: peak,
      gMax: 0, cardH: 0, last: '', lastP: -1
    };
  });
  var closeEl = document.getElementById('close');

  // timeline in act progress: closed, opens, ledger stamps in, holds, seals, chip lands
  var T = { openA: 0.12, openB: 0.38, closeA: 0.74, closeB: 0.9, stampA: 0.26, stampB: 0.5, chipA: 0.9, chipB: 0.95 };

  function fit(m) {
    var split = root.classList.contains('hwm-split');
    m.seam.style.width = '';
    m.seam.style.height = '';
    if (!split) { m.gMax = 0; return; }
    var cell = m.seam.parentElement.clientWidth;
    var maxW = parseFloat(getComputedStyle(m.seam).maxWidth) || cell;
    var w = Math.min(cell, maxW);
    var flat = root.classList.contains('hwm-flat');
    var avail = Infinity;
    if (!flat) {
      var narrow = innerWidth <= 860;
      var stage = m.el.querySelector('.stage');
      var cs = getComputedStyle(stage);
      avail = innerHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - 12;
      if (narrow) {
        var gap = parseFloat(getComputedStyle(m.copy.parentElement).rowGap) || 16;
        avail -= m.copy.offsetHeight + gap;
        if (innerWidth <= 860) avail -= 40; // keep clear of the Lift pill
      }
    }
    var c = 0, g = 0;
    for (var i = 0; i < 6; i++) {
      m.seam.style.width = w + 'px';
      c = m.card.offsetHeight;
      g = m.inner.offsetHeight;
      var tot = c + g;
      if (tot <= avail || w <= 240) break;
      w = Math.max(240, w * (avail / tot) * 0.985);
    }
    m.cardH = c; m.gMax = g;
    m.seam.style.height = Math.ceil(c + g) + 'px';
  }

  function render(m, p) {
    var split = root.classList.contains('hwm-split');
    var n = m.lines.length;
    var open, i, o, stamped = 0;
    if (!split) {
      // static: everything shown, nothing driven
      m.top.style.transform = ''; m.bot.style.transform = '';
      m.panel.style.height = '';
      for (i = 0; i < n; i++) { m.lines[i].style.opacity = ''; m.lines[i].style.transform = ''; }
      m.chip.style.opacity = '';
      set(m, 'open', n);
      return;
    }
    if (lifted) {
      open = 1;
    } else {
      open = ss((p - T.openA) / (T.openB - T.openA)) * (1 - ss((p - T.closeA) / (T.closeB - T.closeA)));
    }
    var g = open * m.gMax;
    m.top.style.transform = 'translate3d(0,' + (-g / 2).toFixed(1) + 'px,0)';
    m.bot.style.transform = 'translate3d(0,' + (g / 2).toFixed(1) + 'px,0)';
    m.panel.style.height = g.toFixed(1) + 'px';
    for (i = 0; i < n; i++) {
      if (lifted) o = 1;
      else {
        var s = T.stampA + (i / Math.max(n, 1)) * (T.stampB - T.stampA - 0.05);
        o = ss((p - s) / 0.045);
        // a line that has stamped stays until the seam begins to seal
        if (p > T.closeA) o = Math.min(o, 1 - ss((p - T.closeA) / (T.closeB - T.closeA)));
      }
      m.lines[i].style.opacity = o.toFixed(3);
      m.lines[i].style.transform = lifted ? '' : 'translate3d(0,' + ((1 - o) * 5).toFixed(1) + 'px,0)';
      if (o > 0.5) stamped++;
    }
    var chip = lifted ? 1 : ss((p - T.chipA) / (T.chipB - T.chipA));
    m.chip.style.opacity = chip.toFixed(3);
    set(m, open > 0.02 ? 'open' : 'closed', stamped);
  }

  function set(m, state, lines) {
    var v = 'seam:' + state + ';lines:' + lines;
    if (v !== m.last) { m.last = v; m.el.setAttribute('data-sc-verify-state', v); }
  }

  var allClosed = true;
  function frame() {
    var vh = innerHeight;
    allClosed = true;
    for (var k = 0; k < moments.length; k++) {
      var m = moments[k];
      var r = m.el.getBoundingClientRect();
      var p = parseFloat(m.el.style.getPropertyValue('--sc-p')) || 0;
      if (root.classList.contains('hwm-flat') && !lifted) p = 0;
      var near = r.bottom > -vh && r.top < 2 * vh;
      if (near && (p !== m.lastP || m.dirty)) { m.lastP = p; m.dirty = false; render(m, p); }
      if (m.last.indexOf('seam:closed') !== 0) allClosed = false;
    }
    if (closeEl) {
      var s = lifted ? 'open' : (allClosed ? 'closed' : 'open');
      var v = 'seam:' + s + ';lines:0';
      if (closeEl.getAttribute('data-sc-verify-state') !== v) closeEl.setAttribute('data-sc-verify-state', v);
    }
    requestAnimationFrame(frame);
  }

  function relayout() {
    moments.forEach(function (m) {
      fit(m); m.dirty = true;
      var p = parseFloat(m.el.style.getPropertyValue('--sc-p')) || 0;
      if (root.classList.contains('hwm-flat') && !lifted) p = 0;
      m.lastP = p; m.dirty = false; render(m, p);
    });
  }

  function setMode() {
    root.classList.toggle('hwm-flat', reduced || lifted);
    root.classList.toggle('hwm-split', !reduced || lifted);
  }

  // Lift / Seal
  var btn = document.getElementById('lift');
  function anchor() {
    var best = null, mid = innerHeight / 2;
    document.querySelectorAll('main > section').forEach(function (s) {
      var r = s.getBoundingClientRect();
      if (r.top <= mid && r.bottom >= mid) best = { s: s, off: r.top };
    });
    return best;
  }
  btn.addEventListener('click', function () {
    var a = anchor();
    lifted = !lifted;
    btn.setAttribute('aria-pressed', String(lifted));
    btn.textContent = lifted ? 'Seal' : 'Lift';
    btn.setAttribute('aria-label', lifted ? 'Seal: close every seam again' : 'Lift: open every seam on the page');
    setMode();
    window.dispatchEvent(new Event('resize'));
    relayout();
    if (a) { var r = a.s.getBoundingClientRect(); window.scrollBy(0, r.top - a.off); }
  });

  mq.addEventListener && mq.addEventListener('change', function (e) { reduced = e.matches; setMode(); window.dispatchEvent(new Event('resize')); relayout(); });

  var rz;
  addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(relayout, 60); });

  setMode();
  relayout();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { window.dispatchEvent(new Event('resize')); relayout(); });
  addEventListener('load', relayout);
  requestAnimationFrame(frame);
})();
