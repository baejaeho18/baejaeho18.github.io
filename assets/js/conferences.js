(function () {
  'use strict';
  var dataEl = document.getElementById('conf-data');
  if (!dataEl) return;

  var venues;
  try { venues = JSON.parse(dataEl.textContent); } catch (e) { return; }

  var now = new Date();
  var TODAY0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var tz = 'local time';
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || tz; } catch (e) {}

  function deadlineInstant(d) { return new Date(d + 'T23:59:00-12:00'); }      // AoE 23:59
  function dayDate(d) { var p = d.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function iso(d) { return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function addYears(ds, n) { if (!ds || !n) return ds; var d = dayDate(ds); return iso(new Date(d.getFullYear() + n, d.getMonth(), d.getDate())); }
  function fmtDay(d) { var x = dayDate(d); return MONTHS[x.getMonth()] + ' ' + x.getDate(); }
  function fmtRange(s, e) {
    if (!s) return 'TBA';
    var a = dayDate(s);
    if (!e || e === s) return MONTHS[a.getMonth()] + ' ' + a.getDate() + ', ' + a.getFullYear();
    var b = dayDate(e);
    if (a.getMonth() === b.getMonth()) return MONTHS[a.getMonth()] + ' ' + a.getDate() + '–' + b.getDate() + ', ' + a.getFullYear();
    return MONTHS[a.getMonth()] + ' ' + a.getDate() + ' – ' + MONTHS[b.getMonth()] + ' ' + b.getDate() + ', ' + b.getFullYear();
  }
  function fmtRangeNoYear(s, e) {
    if (!s) return 'TBA';
    var a = dayDate(s);
    if (!e || e === s) return MONTHS[a.getMonth()] + ' ' + a.getDate();
    var b = dayDate(e);
    if (a.getMonth() === b.getMonth()) return MONTHS[a.getMonth()] + ' ' + a.getDate() + '–' + b.getDate();
    return MONTHS[a.getMonth()] + ' ' + a.getDate() + ' – ' + MONTHS[b.getMonth()] + ' ' + b.getDate();
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

  // ── Pre-process: roll each venue to its upcoming cycle, anchored on the
  //    conference date. Once the conference has passed we shift the whole venue
  //    forward by whole years and flag it estimated (TBA) until it is re-announced.
  function rollYears(confStr) {
    if (!confStr) return 0;
    var x = dayDate(confStr), n = 0;
    while (x < TODAY0 && n < 8) { x = new Date(x.getFullYear() + 1, x.getMonth(), x.getDate()); n++; }
    return n;
  }
  var P = venues.map(function (v) {
    var ry = rollYears(v.conf_end || v.conf_start);   // roll only after the conference ends
    var vEst = ry > 0;                       // whole venue rolled → estimated
    var dls = (v.deadlines || []).map(function (dl) {
      return {
        label: dl.label,
        date: addYears(dl.date, ry), subEst: vEst || !!dl.tba,
        notif: dl.notif ? addYears(dl.notif, ry) : '', notifEst: vEst || !!dl.notif_tba
      };
    });
    var cs = addYears(v.conf_start, ry), ce = addYears(v.conf_end, ry);
    return {
      v: v, deadlines: dls, conf_start: cs, conf_end: ce,
      confEst: vEst || !!v.conf_tba,
      year: cs ? dayDate(cs).getFullYear() : v.year
    };
  });

  // ── Section 1: upcoming submission deadlines (confirmed only), live D-day ──
  var deadlines = [];
  P.forEach(function (p) {
    p.deadlines.forEach(function (dl) {
      deadlines.push({ p: p, label: dl.label, date: dl.date, est: dl.subEst, notif: dl.notif, notifEst: dl.notifEst, inst: deadlineInstant(dl.date) });
    });
  });
  var upcoming = deadlines.filter(function (x) { return !x.est && x.inst.getTime() > now.getTime(); })
                          .sort(function (a, b) { return a.inst - b.inst; });

  var tzNote = document.getElementById('conf-tznote');
  if (tzNote) tzNote.textContent = 'D-day is counted from your local time zone (' + tz + ').';

  var upEl = document.getElementById('conf-upcoming');
  if (upEl) {
    upEl.innerHTML = upcoming.length ? upcoming.map(function (x) {
      var p = x.p, d = dday(x.inst);
      var conf = '🎤 ' + (p.conf_start ? esc(fmtRangeNoYear(p.conf_start, p.conf_end)) + (p.confEst ? ' (TBA)' : '') : 'dates TBA') + (p.v.place && p.v.place !== 'TBA' ? ' · ' + esc(p.v.place) : '');
      var notif = x.notif ? '🔔 ' + esc(fmtRange(x.notif)) + (x.notifEst ? ' (TBA)' : '') : '🔔 notification TBA';
      var round = (x.label && x.label !== 'Full') ? ' <span class="conf-round">' + esc(x.label) + '</span>' : '';
      return '<a class="conf-card" href="' + esc(p.v.link) + '" target="_blank" rel="noopener">' +
        '<span class="conf-dday ' + d.cls + '">' + d.txt + '</span>' +
        '<span class="conf-card__body">' +
          '<span class="conf-card__head"><strong>' + esc(p.v.short) + ' ' + esc(p.year) + '</strong>' + round + '</span>' +
          '<span class="conf-card__meta">📝 ' + esc(fmtDay(x.date)) + ' (AoE) &nbsp;·&nbsp; ' + notif + ' &nbsp;·&nbsp; ' + conf + '</span>' +
        '</span></a>';
    }).join('') : '<p class="conf-empty">No upcoming confirmed deadlines — see the timeline below.</p>';
  }

  // ── Section 2: Google-Calendar-style horizontal timeline (Gantt) ──────────
  var calEl = document.getElementById('conf-calendar');
  if (!calEl) return;

  var startY = now.getFullYear(), startM = now.getMonth();
  var winStart = new Date(startY, startM, 1), winEnd = new Date(startY, startM + 12, 1);
  function inWin(d) { var x = dayDate(d); return x >= winStart && x < winEnd; }
  function monthsSince(x) { return (x.getFullYear() - startY) * 12 + (x.getMonth() - startM); }
  function daysInMonth(x) { return new Date(x.getFullYear(), x.getMonth() + 1, 0).getDate(); }
  function posOf(dateStr, endOfDay) {
    var x = dayDate(dateStr);
    var frac = ((x.getDate() - 1) + (endOfDay ? 1 : 0)) / daysInMonth(x);
    return Math.max(0, Math.min(100, (monthsSince(x) + frac) / 12 * 100));
  }

  var rows = [];
  P.forEach(function (p) {
    var ev = [];
    p.deadlines.forEach(function (dl) {
      if (inWin(dl.date)) ev.push({ kind: 'sub', date: dl.date, pos: posOf(dl.date), label: dl.label, est: dl.subEst, dd: dday(deadlineInstant(dl.date)) });
      if (dl.notif && inWin(dl.notif)) ev.push({ kind: 'notif', date: dl.notif, pos: posOf(dl.notif), label: dl.label, est: dl.notifEst });
    });
    if (p.conf_start && inWin(p.conf_start)) {
      var ps = posOf(p.conf_start), pe = posOf(p.conf_end || p.conf_start, true);
      ev.push({ kind: 'conf', date: p.conf_start, end: p.conf_end, pos: ps, width: Math.min(100 - ps, Math.max(pe - ps, 2.6)), est: p.confEst });
    }
    if (ev.length) rows.push({ p: p, ev: ev });
  });
  // order rows by conference (start) date, earliest first
  function confKey(p) { return p.conf_start ? dayDate(p.conf_start).getTime() : Infinity; }
  rows.sort(function (a, b) { return confKey(a.p) - confKey(b.p); });

  // header months
  var head = '<div class="gantt__row gantt__row--head"><div class="gantt__label"></div><div class="gantt__track gantt__months">';
  for (var i = 0; i < 12; i++) {
    var d = new Date(startY, startM + i, 1);
    head += '<div class="gantt__m"><span>' + MONTHS[d.getMonth()] + '</span>' + ((i === 0 || d.getMonth() === 0) ? '<small>' + d.getFullYear() + '</small>' : '') + '</div>';
  }
  head += '</div></div>';

  var body = rows.map(function (r) {
    var marks = r.ev.map(function (e) {
      var estTip = e.est ? ' (TBA)' : '';
      var lbl = (e.label && e.label !== 'Full') ? ' (' + esc(e.label) + ')' : '';
      if (e.kind === 'conf') {
        var where = (r.p.v.place && r.p.v.place !== 'TBA') ? ' · ' + esc(r.p.v.place) : '';
        return '<span class="g-bar' + (e.est ? ' is-tba' : '') + '" tabindex="0" style="left:' + e.pos.toFixed(2) + '%;width:' + e.width.toFixed(2) + '%" ' +
          'data-tip="' + esc(r.p.v.short + ' ' + r.p.year) + ' · Conference · ' + esc(fmtRangeNoYear(e.date, e.end)) + where + estTip + '"></span>';
      }
      var sub = e.kind === 'sub';
      var tip = esc(r.p.v.short + ' ' + r.p.year) + ' · ' + (sub
        ? 'Submission' + lbl + ' · ' + esc(fmtDay(e.date)) + ' AoE' + (e.est ? estTip : ' · ' + e.dd.txt)
        : 'Notification' + lbl + ' · ' + esc(fmtDay(e.date)) + estTip);
      return '<span class="g-dot ' + (sub ? 'g-dot--sub' : 'g-dot--notif') + (e.est ? ' is-tba' : '') + '" tabindex="0" style="left:' + e.pos.toFixed(2) + '%" data-tip="' + tip + '"></span>';
    }).join('');
    return '<div class="gantt__row"><div class="gantt__label"><span>' + esc(r.p.v.short) + ' ' + esc(r.p.year) + '</span></div>' +
           '<div class="gantt__track">' + marks + '</div></div>';
  }).join('');

  calEl.innerHTML = '<div class="gantt-scroll"><div class="gantt">' + head +
    '<div class="gantt__body">' + (body || '<div class="conf-empty" style="padding:1rem">No events in this window.</div>') + '</div>' +
    '</div></div>';

  // ── Custom tooltip ────────────────────────────────────────────────────────
  // The native `title` attribute is unreliable across machines (no touch
  // devices, tiny hover targets, inconsistent timing), so render our own.
  var tip = document.createElement('div');
  tip.className = 'conf-tip';
  tip.hidden = true;
  document.body.appendChild(tip);

  function showTip(el) {
    var txt = el.getAttribute('data-tip');
    if (!txt) return;
    tip.textContent = txt;
    tip.hidden = false;
    var r = el.getBoundingClientRect();
    var t = tip.getBoundingClientRect();
    var left = r.left + r.width / 2 - t.width / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - t.width - 8));
    var top = r.top - t.height - 10;
    if (top < 4) top = r.bottom + 10;            // flip below if no room above
    tip.style.left = (left + window.pageXOffset) + 'px';
    tip.style.top = (top + window.pageYOffset) + 'px';
  }
  function hideTip() { tip.hidden = true; }

  var scroller = calEl.querySelector('.gantt-scroll') || calEl;
  function target(e) { return e.target.closest ? e.target.closest('[data-tip]') : null; }
  scroller.addEventListener('mouseover', function (e) { var m = target(e); if (m) showTip(m); });
  scroller.addEventListener('mouseout',  function (e) { if (target(e)) hideTip(); });
  scroller.addEventListener('focusin',   function (e) { var m = target(e); if (m) showTip(m); });
  scroller.addEventListener('focusout',  hideTip);
  // touch / click: tap a marker to toggle, tap elsewhere to dismiss
  scroller.addEventListener('click', function (e) {
    var m = target(e);
    if (m) { if (tip.hidden) showTip(m); else hideTip(); }
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('[data-tip]') && e.target !== tip) hideTip();
  });
  window.addEventListener('scroll', hideTip, { passive: true });
})();
