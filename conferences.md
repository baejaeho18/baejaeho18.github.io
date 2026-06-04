---
layout: page
title: Conferences
subtitle: Top security venues (CORE A / A*) — deadlines, notifications & dates for the next 12 months.
permalink: /conferences/
---

<section class="section">
<h2 class="section__title">Upcoming submission deadlines</h2>
<p id="conf-tznote" class="conf-tznote"></p>
<div id="conf-upcoming" class="conf-upcoming">Loading…</div>
</section>

<section class="section">
<h2 class="section__title">Next 12 months</h2>
<div class="conf-legend">
  <span><i class="lg lg--sub"></i> Submission deadline</span>
  <span><i class="lg lg--notif"></i> Notification</span>
  <span><i class="lg lg--conf"></i> Conference period</span>
  <span><i class="lg lg--tba"></i> TBA (estimated: last year + 1)</span>
</div>
<div id="conf-calendar" class="conf-calendar"></div>
<p class="conf-hint">Rows are ordered by conference date. Blue circle = submission deadline, amber diamond = notification, green bar = conference period; a dashed (faded) marker means the date is estimated (TBA) — venues roll over to next year automatically once their conference passes. Hover any marker for details.</p>
</section>

<p class="conf-source">Data adapted from <a href="https://sec-deadlines.github.io/" target="_blank" rel="noopener">sec-deadlines.github.io</a>. Deadlines are AoE (UTC−12); notification dates are shown when announced. Edit <code>_data/conferences.yml</code> to update.</p>

<script id="conf-data" type="application/json">{{ site.data.conferences.venues | jsonify }}</script>
<script src="{{ '/assets/js/conferences.js' | relative_url }}"></script>
