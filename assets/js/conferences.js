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

  function deadlineInstant(d) { return new Date(d + 'T23:59:00-12:00'); }      // AoE 23:59
  function dayDate(d) { var p = d.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function fmtDay(d) { var x = dayDate(d); return MONTHS[x.getMonth()] + ' ' + x.getDate(); }
  function fmtRange(s, e) {
    if (!s) return 'TBA';
    var a = dayDate(s);
    if (!e || e === s) return MONTHS[a.getMonth()] + ' ' + a.getDate() + ', ' + a.getFullYear();
    var b = dayDate(e);
    if (a.getMonth() === b.getMonth()) return MONTHS[a.getMonth()] + ' ' + a.getDate() + '–' + b.getDate() + ', ' + a.getFullYear();
    return MONTHS[a.getMonth()] + ' ' + a.getDate() + ' – ' + MONTHS[b.getMonth()] + ' ' + b.getDate() + ', ' + b.getFullYear();
  }
  function dday(inst) {
    var ms = inst.getTime() - now.getTime();
    if (ms <= 0) return { txt: 'closed', cls: 'is-closed' };
    var hours = ms / 3600000;
    if (hours < 24) return { txt: 'D-' + Math.max(1, Math.ceil(hours)) + 'h', cls: 'is-urgent' };
    var days = Math.ceil(hours / 24);
    return { txt: 'D-' + days, cls: days <= 14 ? 'is-soon' : '' };
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function rankBadge(r) { return '<span class="conf-rank' + (r === 'A*' ? ' is-astar' : '') + '">' + esc(r) + '</span>'; }

  // ── Section 1: upcoming submission deadlines, sorted by soonest, with live D-day ──
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
    upEl.innerHTML = upcoming.length ? upcoming.map(function (x) {
      var d = dday(x.inst);
      var conf = '🎤 ' + (x.v.conf_start ? esc(fmtRange(x.v.conf_start, x.v.conf_end)) : 'dates TBA') + (x.v.place ? ' · ' + esc(x.v.place) : '');
      var notif = x.v.notification ? '🔔 ' + esc(fmtRange(x.v.notification)) : '🔔 notification TBA';
      return '<a class="conf-card" href="' + esc(x.v.link) + '" target="_blank" rel="noopener">' +
        '<span class="conf-dday ' + d.cls + '">' + d.txt + '</span>' +
        '<span class="conf-card__body">' +
          '<span class="conf-card__head">' + rankBadge(x.v.rank) + '<strong>' + esc(x.v.short) + ' ' + esc(x.v.year) + '</strong> <span class="conf-round">' + esc(x.label) + '</span></span>' +
          '<span class="conf-card__meta">📝 ' + esc(fmtDay(x.date)) + ' (AoE) &nbsp;·&nbsp; ' + notif + ' &nbsp;·&nbsp; ' + conf + '</span>' +
        '</span></a>';
    }).join('') : '<p class="conf-empty">No upcoming deadlines on record — update _data/conferences.yml.</p>';
  }

  // ── Section 2: Google-Calendar-style horizontal timeline (Gantt) ──────────
  var calEl = document.getElementById('conf-calendar');
  if (!calEl) return;

  var startY = now.getFullYear(), startM = now.getMonth();
  var winStart = new Date(startY, startM, 1), winEnd = new Date(startY, startM + 12, 1);
  function inWin(d) { var x = dayDate(d); return x >= winStart && x < winEnd; }
  function monthsSince(x) { return (x.getFullYear() - startY) * 12 + (x.getMonth() - startM); }
  function daysInMonth(x) { return new Date(x.getFullYear(), x.getMonth() + 1, 0).getDate(); }
  // position (0..100) along the 12 equal-width month columns
  function posOf(dateStr, endOfDay) {
    var x = dayDate(dateStr);
    var frac = ((x.getDate() - 1) + (endOfDay ? 1 : 0)) / daysInMonth(x);
    return Math.max(0, Math.min(100, (monthsSince(x) + frac) / 12 * 100));
  }

  var rows = [];
  venues.forEach(function (v) {
    var ev = [];
    (v.deadlines || []).forEach(function (dl) {
      if (inWin(dl.date)) ev.push({ kind: 'sub', date: dl.date, pos: posOf(dl.date), label: dl.label, dd: dday(deadlineInstant(dl.date)) });
    });
    if (v.notification && inWin(v.notification)) ev.push({ kind: 'notif', date: v.notification, pos: posOf(v.notification) });
    if (v.conf_start && inWin(v.conf_start)) {
      var ps = posOf(v.conf_start), pe = posOf(v.conf_end || v.conf_start, true);
      ev.push({ kind: 'conf', date: v.conf_start, end: v.conf_end, pos: ps, width: Math.min(100 - ps, Math.max(pe - ps, 2.6)) });
    }
    if (ev.length) rows.push({ v: v, ev: ev, order: Math.min.apply(null, ev.map(function (e) { return e.pos; })) });
  });
  rows.sort(function (a, b) { return a.order - b.order; });

  // header months
  var head = '<div class="gantt__row gantt__row--head"><div class="gantt__label"></div><div class="gantt__track gantt__months">';
  for (var i = 0; i < 12; i++) {
    var d = new Date(startY, startM + i, 1);
    head += '<div class="gantt__m"><span>' + MONTHS[d.getMonth()] + '</span>' + ((i === 0 || d.getMonth() === 0) ? '<small>' + d.getFullYear() + '</small>' : '') + '</div>';
  }
  head += '</div></div>';

  // body rows
  var body = rows.map(function (r) {
    var marks = r.ev.map(function (e) {
      if (e.kind === 'conf') {
        return '<span class="g-bar" style="left:' + e.pos.toFixed(2) + '%;width:' + e.width.toFixed(2) + '%" ' +
          'title="' + esc(r.v.short + ' ' + r.v.year) + ' · Conference · ' + esc(fmtRange(e.date, e.end)) + '"></span>';
      }
      var sub = e.kind === 'sub';
      var tip = esc(r.v.short + ' ' + r.v.year) + ' · ' + (sub
        ? 'Submission (' + esc(e.label) + ') · ' + esc(fmtDay(e.date)) + ' AoE · ' + e.dd.txt
        : 'Notification · ' + esc(fmtDay(e.date)));
      return '<span class="g-dot ' + (sub ? 'g-dot--sub ' + e.dd.cls : 'g-dot--notif') + '" style="left:' + e.pos.toFixed(2) + '%" title="' + tip + '"></span>';
    }).join('');
    return '<div class="gantt__row"><div class="gantt__label">' + rankBadge(r.v.rank) + '<span>' + esc(r.v.short) + ' ' + esc(r.v.year) + '</span></div>' +
           '<div class="gantt__track">' + marks + '</div></div>';
  }).join('');

  var todayFrac = (monthsSince(now) + (now.getDate() - 1) / daysInMonth(now)) / 12;
  var today = '<span class="gantt__today" style="left:calc(var(--gantt-label) + (100% - var(--gantt-label)) * ' + todayFrac.toFixed(4) + ')" title="Today"></span>';

  calEl.innerHTML = '<div class="gantt-scroll"><div class="gantt">' + head +
    '<div class="gantt__body">' + today + (body || '<div class="conf-empty" style="padding:1rem">No events in this window.</div>') + '</div>' +
    '</div></div>';
})();
