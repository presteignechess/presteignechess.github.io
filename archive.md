---
layout: page
title: Archive
page-class: page--archive
section-class: section-archive
section-id: section:archive
permalink: /archive/
---

<ul class="archive-list list-ui">
  {% for post in site.posts %}
  <li class="archive-list__item list-ui__item">
    <time class="post__date" datetime="{{ post.date | date: "%Y-%m-%d" }}">{{ post.date | date: "%d %B, %Y" }}</time>
    <h2 class="post__title"><a href="{{ post.url }}">{{ post.title }}</a></h2>
  </li>
  {% endfor %}
</ul>
