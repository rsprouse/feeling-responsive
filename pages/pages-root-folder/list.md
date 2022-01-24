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
  <li class="tab-title"><a href="#item">Items<span id="bndlcnt"></span></a></li>
</ul>
<div class="tabs-content">
  <div class="content active" id="coll">
{::nomarkdown}
    <ol id="colllist" class="alt", start="0">
    </ol>
{/::nomarkdown}
  </div>
  <div class="content" id="item">
{::nomarkdown}
    <ol id="bndllist" class="alt", start="0">
    </ol>
{/::nomarkdown}
  </div>
</div>
