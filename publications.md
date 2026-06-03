---
layout: page
title: Publications
subtitle: Peer-reviewed papers and articles.
permalink: /publications/
---

{% assign pubs = site.data.cv.publications %}
{% assign byyear = pubs | sort: "year" | reverse %}

<ol class="pub-list">
{% for pub in byyear %}
  <li class="pub">
    <p class="pub__title">
      {% if pub.url and pub.url != "" %}<a href="{{ pub.url }}" target="_blank" rel="noopener">{{ pub.title }}</a>{% else %}{{ pub.title }}{% endif %}
      {% if pub.type %}<span class="timeline__badge">{{ pub.type }}</span>{% endif %}{% if pub.status %}<span class="timeline__badge badge--review">{{ pub.status }}</span>{% endif %}
    </p>
    <p class="pub__meta">{{ pub.authors }} · <em>{{ pub.venue }}</em>{% unless pub.status %}, {{ pub.year }}{% endunless %}{% if pub.award %} · <span class="pub__award">🏆 {{ pub.award }}</span>{% endif %}</p>
    {% if pub.title_ko %}<p class="pub__meta" lang="ko">{{ pub.title_ko }}</p>{% endif %}
  </li>
{% endfor %}
</ol>
