---
layout: page
title: Experience
subtitle: Research, professional service, and military service.
permalink: /experience/
---

{% assign exp = site.data.cv.experience %}
<ul class="timeline">
{% for e in exp %}
  <li class="timeline__item">
    <div class="timeline__date">{{ e.start }} – {{ e.end }}</div>
    <div class="timeline__body">
      <h3 class="timeline__head">{{ e.role }}{% if e.type %}<span class="timeline__badge">{{ e.type }}</span>{% endif %}</h3>
      <p class="timeline__sub">
        {% if e.url and e.url != "" %}<a href="{{ e.url }}" target="_blank" rel="noopener">{{ e.org }}</a>{% else %}{{ e.org }}{% endif %}
      </p>
      {% if e.summary and e.summary != "" %}<p class="timeline__note">{{ e.summary }}</p>{% endif %}
    </div>
  </li>
{% endfor %}
</ul>
