---
permalink: list.html
layout: page
search_include: true
search_results: true
tabs_include: true
title: Search results
sitemap: false
---

{% include _search_form.html %}

<ul class="tabs" data-tab>
  <li class="tab-title active"><a href="#coll">Collections<span id="collcnt"></span></a></li>
  <li class="tab-title"><a href="#item">Items<span id="bndlcnt'></span></a></li>
</ul>
<div class="tabs-content">
  <div class="content active" id="coll">
    <p>List of collections</p>
  </div>
  <div class="content" id="item">
    <p>List of items</p>
  </div>
</div>
