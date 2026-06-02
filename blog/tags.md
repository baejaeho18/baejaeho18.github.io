---
layout: blog-base
title: Tags
subtitle: Browse posts by tag.
permalink: /blog/tags/
---

{% assign tags = site.tags | sort %}
<div class="widget__tags" style="margin-bottom:2.5rem">
{% for tag in tags %}
  <a class="tag-chip" href="#{{ tag[0] }}">{{ tag[0] }} <span>{{ tag[1].size }}</span></a>
{% endfor %}
</div>

{% for tag in tags %}
<section class="taxo-group" id="{{ tag[0] }}">
  <h2 class="taxo-group__head">#{{ tag[0] }} <span class="taxo-count">({{ tag[1].size }})</span></h2>
  <ul class="archive-list">
  {% assign sorted = tag[1] | sort: "date" | reverse %}
  {% for post in sorted %}
    <li>
      <span class="archive-date">{{ post.date | date: "%Y.%m" }}</span>
      <a href="{{ post.url | relative_url }}">{{ post.title | remove: '"' }}</a>
    </li>
  {% endfor %}
  </ul>
</section>
{% endfor %}
