---
permalink: list.html
layout: page
title: "Search results"
sitemap: false
search_results: true
search:
  placeholder: Search languages, people, topics, identifiers.
  button_text: Search CLA
  url: list.html
---

{% include _search_form.html %}
<ul class="tabs" data-deep-link="true" data-update-history="true" data-deep-link-smudge="true" data-deep-link-smudge-delay="500" data-tabs id="results-tabs">
  <li class="tabs-title is-active"><a href="#coll" aria-selected="true">Collections</a></li>
  <li class="tabs-title"><a href="#bndl">Bundles</a></li>
</ul>
<div class="tabs-content" data-tabs-content="results-tabs">
  <div class="tabs-panel is-active" id="coll-tab"><p>Collection metadata</p></div>
  <div class="tabs-panel" id="bndl-tab"><p>Bndl metadata</p></div>
</div>
{% comment %}
<div class="sectiontab" id="coll-tab"><div class="pagination" id="collpaginator"></div></div>
<div id="results"></div>
<div class="sectiontab" id="bndl-tab"><div class="pagination" id="bndlpaginator"></div></div>
{% endcomment %}

