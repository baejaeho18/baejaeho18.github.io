---
layout: page
title: Teaching
subtitle: Teaching assistant & materials development roles at Handong Global University.
permalink: /teaching/
---

{% assign teaching = site.data.cv.teaching %}
<ul class="timeline">
{% for t in teaching %}
  <li class="timeline__item">
    <div class="timeline__date">{{ t.start }} – {{ t.end }}</div>
    <div class="timeline__body">
      <h3 class="timeline__head">{{ t.course }}</h3>
      <p class="timeline__sub">{{ t.role }} · {{ t.org }}</p>
    </div>
  </li>
{% endfor %}
</ul>
