---
layout: blog-base
title: Archive
subtitle: Browse posts by year.
permalink: /blog/archive/
---

{% assign byyear = site.posts | group_by_exp: "post", "post.date | date: '%Y'" | sort: "name" | reverse %}
<div class="widget__tags" style="margin-bottom:2.5rem">
{% for group in byyear %}
  <a class="tag-chip" href="#y{{ group.name }}">{{ group.name }} <span>{{ group.items.size }}</span></a>
{% endfor %}
</div>

{% for group in byyear %}
<section class="taxo-group" id="y{{ group.name }}">
  <h2 class="taxo-group__head">{{ group.name }} <span class="taxo-count">({{ group.items.size }})</span></h2>
  <ul class="archive-list">
  {% for post in group.items %}
    <li>
      <span class="archive-date">{{ post.date | date: "%m.%d" }}</span>
      <a href="{{ post.url | relative_url }}">{{ post.title | remove: '"' }}</a>
    </li>
  {% endfor %}
  </ul>
</section>
{% endfor %}
