---
layout: blog-base
title: Categories
subtitle: Browse posts by category.
permalink: /blog/categories/
---

{% assign cats = site.categories | sort %}
<div class="widget__tags" style="margin-bottom:2.5rem">
{% for cat in cats %}
  <a class="tag-chip" href="#{{ cat[0] }}">{{ cat[0] }} <span>{{ cat[1].size }}</span></a>
{% endfor %}
</div>

{% for cat in cats %}
<section class="taxo-group" id="{{ cat[0] }}">
  <h2 class="taxo-group__head">{{ cat[0] }} <span class="taxo-count">({{ cat[1].size }})</span></h2>
  <ul class="archive-list">
  {% assign sorted = cat[1] | sort: "date" | reverse %}
  {% for post in sorted %}
    <li>
      <span class="archive-date">{{ post.date | date: "%Y.%m" }}</span>
      <a href="{{ post.url | relative_url }}">{{ post.title | remove: '"' }}</a>
    </li>
  {% endfor %}
  </ul>
</section>
{% endfor %}
