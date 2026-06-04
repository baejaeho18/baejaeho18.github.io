---
layout: page
title: Projects
subtitle: Selected things I have built.
permalink: /projects/
parent: explore
---

{% assign projects = site.data.cv.projects %}
<div class="proj-grid">
{% for p in projects %}
  <div class="proj-card">
    <h3>{% if p.url and p.url != "" %}<a href="{{ p.url }}" target="_blank" rel="noopener">{{ p.name }}</a>{% else %}{{ p.name }}{% endif %}</h3>
    <p>{{ p.description }}</p>
    {% if p.tags %}
    <div class="proj-card__tags">
      {% for tag in p.tags %}<span class="chip">{{ tag }}</span>{% endfor %}
    </div>
    {% endif %}
  </div>
{% endfor %}
</div>
