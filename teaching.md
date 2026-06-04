---
layout: page
title: Teaching
subtitle: Teaching assistant & teaching-materials roles.
permalink: /teaching/
parent: explore
---

{% assign grouped = site.data.cv.teaching | group_by_exp: "t", "t.start | slice: 0, 4" %}
{% assign grouped = grouped | sort: "name" | reverse %}
{% for g in grouped %}
<h2 class="cv-year">{{ g.name }}</h2>
<ul class="timeline">
{% for t in g.items %}<li class="timeline__item"><div class="timeline__date">{{ t.start }} – {{ t.end }}</div><div class="timeline__body"><h3 class="timeline__head">{% if t.url %}<a href="{{ t.url }}" target="_blank" rel="noopener">{{ t.course }}</a>{% else %}{{ t.course }}{% endif %}</h3><p class="timeline__sub">{{ t.role }} · {{ t.org }}</p></div></li>
{% endfor %}</ul>
{% endfor %}
