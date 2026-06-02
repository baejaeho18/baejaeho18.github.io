---
layout: page
title: Awards & Honors
permalink: /awards/
---

{% assign awards = site.data.cv.awards %}
<ul class="award-list">
{% for a in awards %}
  <li>
    <span class="award__year">{{ a.year }}</span>
    <span>
      <span class="award__title">{{ a.title }}</span>
      <span class="award__org">{{ a.org }}</span>
    </span>
  </li>
{% endfor %}
</ul>
