---
layout: blog-base
title: Archive
subtitle: All posts by year.
permalink: /blog/archive/
---

{% assign byyear = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
{% for group in byyear %}
<h2 class="archive-year" id="y{{ group.name }}">{{ group.name }} <span class="taxo-count">({{ group.items.size }})</span></h2>
<ul class="archive-list">
{% for post in group.items %}<li><span class="archive-date">{{ post.date | date: "%m.%d" }}</span> <a href="{{ post.url | relative_url }}">{{ post.title | remove: '"' }}</a></li>
{% endfor %}</ul>
{% endfor %}
