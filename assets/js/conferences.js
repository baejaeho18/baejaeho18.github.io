(function () {
  'use strict';
  var dataEl = document.getElementById('conf-data');
  if (!dataEl) return;

  var venues;
  try { venues = JSON.parse(dataEl.textContent); } catch (e) { return; }

  var now = new Date();
  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var tz = 'local time';
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || tz; } catch (e) {}

  // A submission deadline is AoE (UTC-12) at 23:59.
  function deadlineInstant(d) { return new Date(d + 'T23:59:00-12:00'); }
  // Plain calendar day (for month placement / display), parsed as local midnight.
  function dayDate(d) { var p = d.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }

  function fmtDay(d) { var x = dayDate(d); return MONTHS[x.getMonth()] + ' ' + x.getDate(); }
  function fmtRange(s, e) {
    if (!s) return 'TBA';
    var a = dayDate(s);
    if (!e || e === s) return MONTHS[a.getMonth()] + ' ' + a.getDate() + ', ' + a.getFullYear();
    var b = dayDate(e);
    if (a.getMonth() === b.getMonth())
      return MONTHS[a.getMonth()] + ' ' + a.getDate() + '–' + b.getDate() + ', ' + a.getFullYear();
    return MONTHS[a.getMonth()] + ' ' + a.getDate() + ' – ' + MONTHS[b.getMonth()] + ' ' + b.getDate() + ', ' + b.getFullYear();
  }

  // D-day relative to now, in the visitor's local timezone (absolute instant diff).
  function dday(inst) {
    var ms = inst.getTime() - now.getTime();
    if (ms <= 0) return { txt: 'closed', cls: 'is-closed' };
    var hours = ms / 3600000;
    if (hours < 24) return { txt: 'D-' + Math.max(1, Math.ceil(hours)) + 'h', cls: 'is-urgent' };
    var days = Math.ceil(hours / 24);
    return { txt: 'D-' + days, cls: days <= 14 ? 'is-soon' : '' };
  }

  function esc(s) { return String(s).replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }
  function rankBadge(r) { return '<span class="conf-rank' + (r === 'A*' ? ' is-astar' : '') + '">' + esc(r) + '</span>'; }

  // ── Section 1: upcoming submission deadlines (sorted by soonest) ──────────
  var deadlines = [];
  venues.forEach(function (v) {
    (v.deadlines || []).forEach(function (dl) {
      deadlines.push({ v: v, label: dl.label, date: dl.date, inst: deadlineInstant(dl.date) });
    });
  });
  var upcoming = deadlines.filter(function (x) { return x.inst.getTime() > now.getTime(); })
                          .sort(function (a, b) { return a.inst - b.inst; });

  var tzNote = document.getElementById('conf-tznote');
  if (tzNote) tzNote.textContent = 'D-day is counted from your local time zone (' + tz + ').';

  var upEl = document.getElementById('conf-upcoming');
  if (upEl) {
    if (!upcoming.length) {
      upEl.innerHTML = '<p class="conf-empty">No upcoming deadlines on record — update _data/conferences.yml.</p>';
    } else {
      upEl.innerHTML = upcoming.map(function (x) {
        var d = dday(x.inst);
        var conf = x.v.conf_start ? '🎤 ' + esc(fmtRange(x.v.conf_start, x.v.conf_end)) + ' · ' + esc(x.v.place) : '🎤 ' + esc(x.v.place || 'TBA');
        var notif = x.v.notification ? '🔔 ' + esc(fmtRange(x.v.notification)) : '🔔 notification TBA';
        return '' +
          '<a class="conf-card" href="' + esc(x.v.link) + '" target="_blank" rel="noopener">' +
            '<span class="conf-dday ' + d.cls + '">' + d.txt + '</span>' +
            '<span class="conf-card__body">' +
              '<span class="conf-card__head">' + rankBadge(x.v.rank) + '<strong>' + esc(x.v.short) + ' ' + esc(x.v.year) + '</strong> <span class="conf-round">' + esc(x.label) + '</span></span>' +
              '<span class="conf-card__meta">📝 ' + esc(fmtDay(x.date)) + ' (AoE) &nbsp;·&nbsp; ' + notif + ' &nbsp;·&nbsp; ' + conf + '</span>' +
            '</span>' +
          '</a>';
      }).join('');
    }
  }

  // ── Section 2: 12-month calendar ─────────────────────────────────────────
  var calEl = document.getElementById('conf-calendar');
  if (calEl) {
    var startY = now.getFullYear(), startM = now.getMonth();
    var winStart = new Date(startY, startM, 1);
    var winEnd = new Date(startY, startM + 12, 1);
    function inWin(d) { var x = dayDate(d); return x >= winStart && x < winEnd; }
    function key(d) { var x = dayDate(d); return x.getFullYear() + '-' + x.getMonth(); }

    // bucket events by month key
    var buckets = {};
    function push(d, html) { var k = key(d); (buckets[k] = buckets[k] || []).push({ day: dayDate(d).getDate(), html: html }); }

    venues.forEach(function (v) {
      (v.deadlines || []).forEach(function (dl) {
        if (inWin(dl.date)) {
          var d = dday(deadlineInstant(dl.date));
          push(dl.date, '<li class="ce ce--sub"><span class="ci ci--sub">📝</span> ' + rankBadge(v.rank) +
            '<span class="ce__name">' + esc(v.short) + ' ' + esc(v.year) + '</span> <span class="ce__sub">' + esc(dl.label) + '</span>' +
            '<span class="ce__dday ' + d.cls + '">' + d.txt + '</span></li>');
        }
      });
      if (v.notification && inWin(v.notification)) {
        push(v.notification, '<li class="ce ce--notif"><span class="ci ci--notif">🔔</span> ' + rankBadge(v.rank) +
          '<span class="ce__name">' + esc(v.short) + ' ' + esc(v.year) + '</span> <span class="ce__sub">notification</span></li>');
      }
      if (v.conf_start && inWin(v.conf_start)) {
        push(v.conf_start, '<li class="ce ce--conf"><span class="ci ci--conf">🎤</span> ' + rankBadge(v.rank) +
          '<span class="ce__name">' + esc(v.short) + ' ' + esc(v.year) + '</span> <span class="ce__sub">' + esc(fmtRange(v.conf_start, v.conf_end)) + '</span></li>');
      }
    });

    var html = '';
    for (var i = 0; i < 12; i++) {
      var d = new Date(startY, startM + i, 1);
      var k = d.getFullYear() + '-' + d.getMonth();
      var items = (buckets[k] || []).sort(function (a, b) { return a.day - b.day; });
      html += '<div class="conf-month' + (items.length ? '' : ' is-empty') + '">' +
                '<div class="conf-month__label">' + MONTHS[d.getMonth()] + ' <span>' + d.getFullYear() + '</span></div>' +
                (items.length ? '<ul class="conf-month__list">' + items.map(function (it) { return it.html; }).join('') + '</ul>'
                              : '<div class="conf-month__empty">—</div>') +
              '</div>';
    }
    calEl.innerHTML = html;
  }
})();
