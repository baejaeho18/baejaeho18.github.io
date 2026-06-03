---
layout: page
title: Teaching
subtitle: Teaching assistant & materials development roles at Handong Global University.
permalink: /teaching/
---

{% assign grouped = site.data.cv.teaching | group_by_exp: "t", "t.start | slice: 0, 4" %}
{% assign grouped = grouped | sort: "name" | reverse %}
{% for g in grouped %}
<h2 class="cv-year">{{ g.name }}</h2>
<ul class="timeline">
{% for t in g.items %}<li class="timeline__item"><div class="timeline__date">{{ t.start }} – {{ t.end }}</div><div class="timeline__body"><h3 class="timeline__head">{{ t.course }}</h3><p class="timeline__sub">{{ t.role }} · {{ t.org }}</p></div></li>
{% endfor %}</ul>
{% endfor %}
