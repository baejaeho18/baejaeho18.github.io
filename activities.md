---
layout: page
title: Activities
subtitle: Experience, teaching, projects, and honors.
permalink: /activities/
redirect_from:
  - /explore/
---

<nav class="subtabs" id="subtabs">
  <a href="#experience" class="subtab is-active" data-tab="experience">Experience</a>
  <a href="#teaching"   class="subtab" data-tab="teaching">Teaching</a>
  <a href="#projects"   class="subtab" data-tab="projects">Projects</a>
  <a href="#awards"     class="subtab" data-tab="awards">Awards</a>
</nav>

<section class="subpanel is-active" data-panel="experience">
{% assign exp = site.data.cv.experience %}
<ul class="timeline">
{% for e in exp %}<li class="timeline__item"><div class="timeline__date">{{ e.start }} – {{ e.end }}</div><div class="timeline__body"><h3 class="timeline__head">{{ e.role }}{% if e.type %}<span class="timeline__badge">{{ e.type }}</span>{% endif %}</h3><p class="timeline__sub">{% if e.url and e.url != "" %}<a href="{{ e.url }}" target="_blank" rel="noopener">{{ e.org }}</a>{% else %}{{ e.org }}{% endif %}{% if e.advisor %} <span class="timeline__advisor">(Advisor: {% if e.advisor_url %}<a href="{{ e.advisor_url }}" target="_blank" rel="noopener">{{ e.advisor }}</a>{% else %}{{ e.advisor }}{% endif %})</span>{% endif %}</p>{% if e.summary and e.summary != "" %}<p class="timeline__note">{{ e.summary }}</p>{% endif %}</div></li>
{% endfor %}
</ul>
</section>

<section class="subpanel" data-panel="teaching">
{% assign grouped = site.data.cv.teaching | group_by_exp: "t", "t.start | slice: 0, 4" | sort: "name" | reverse %}
{% for g in grouped %}
<h3 class="cv-year">{{ g.name }}</h3>
<ul class="timeline">
{% for t in g.items %}<li class="timeline__item"><div class="timeline__date">{{ t.start }} – {{ t.end }}</div><div class="timeline__body"><h3 class="timeline__head">{% if t.url %}<a href="{{ t.url }}" target="_blank" rel="noopener">{{ t.course }}</a>{% else %}{{ t.course }}{% endif %}</h3><p class="timeline__sub">{{ t.role }} · {{ t.org }}</p></div></li>
{% endfor %}</ul>
{% endfor %}
</section>

<section class="subpanel" data-panel="projects">
{% assign projects = site.data.cv.projects %}
<div class="proj-grid">
{% for p in projects %}<div class="proj-card"><h3>{% if p.url and p.url != "" %}<a href="{{ p.url }}" target="_blank" rel="noopener">{{ p.name }}</a>{% else %}{{ p.name }}{% endif %}</h3><p>{{ p.description }}</p>{% if p.tags %}<div class="proj-card__tags">{% for tag in p.tags %}<span class="chip">{{ tag }}</span>{% endfor %}</div>{% endif %}</div>
{% endfor %}
</div>
</section>

<section class="subpanel" data-panel="awards">
{% assign awards = site.data.cv.awards %}
<ul class="award-list">
{% for a in awards %}<li><span class="award__year">{{ a.year }}</span><span><span class="award__title">{{ a.title }}</span><span class="award__org">{{ a.org }}</span></span></li>
{% endfor %}
</ul>
</section>
