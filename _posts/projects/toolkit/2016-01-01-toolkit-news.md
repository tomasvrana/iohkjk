---
layout: project
title: Toolkit news
language: en
thumbnail: /images/project.jpg
permalink: /projects/toolkit/news/
defaulturl: /projects/toolkit/news/
slug: news
parent: toolkit
visible: true
---
{% for post in site.categories['toolkit'] %}
{% if page.language == post.language %}
{% if post.visible == true %}
<div class="{{ post.slug }}">
<p class="date marginb0"><span class="c_f00">{{ post.date | date: '%B %d, %Y' }}</span> by {{ post.author }}</p>
<h2 class="margint0"><a class="" href="{{ site.baseurl }}{{ post.permalink }}{% if page.language != 'en' %}/{{ page.language }}/{% endif %}">{{ post.title }}</a></h2>
<div class="text">{{post.excerpt}}</div>
</div>
{% endif %}
{% endif %}
{% endfor %}


