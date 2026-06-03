---
layout: page
title: Conferences
subtitle: Top security venues (CORE A / A*) — deadlines, notifications & dates for the next 12 months.
permalink: /conferences/
---

<div class="conf-legend">
  <span><span class="ci ci--sub">📝</span> Submission deadline</span>
  <span><span class="ci ci--notif">🔔</span> Notification</span>
  <span><span class="ci ci--conf">🎤</span> Conference</span>
</div>

<section class="section">
<h2 class="section__title">Upcoming submission deadlines</h2>
<p id="conf-tznote" class="conf-tznote"></p>
<div id="conf-upcoming" class="conf-upcoming">Loading…</div>
</section>

<section class="section">
<h2 class="section__title">Next 12 months</h2>
<div id="conf-calendar" class="conf-calendar"></div>
</section>

<p class="conf-source">Data adapted from <a href="https://sec-deadlines.github.io/" target="_blank" rel="noopener">sec-deadlines.github.io</a>. Deadlines are AoE (UTC−12); notification dates are shown when announced. Edit <code>_data/conferences.yml</code> to update.</p>

<script id="conf-data" type="application/json">{{ site.data.conferences.venues | jsonify }}</script>
<script src="{{ '/assets/js/conferences.js' | relative_url }}"></script>
