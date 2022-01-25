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
  <div class="content active sectiontab" id="coll"><div class="12u 12u$(small)">
    <p id="collresultscnt"><b><span name="start" class="counts"></span></b> &ndash; <b><span name="end"></span></b> of <b><span name="total"></span></b> <span name="results"></span></p>
    <label id="collshowall" class="showall">Show All/Collapse All&nbsp;<i id="show-all-caret-coll" class="icon fa-caret-right"></i></label>
    <ol id="colllist" class="alt" start="0">
    </ol>
  </div></div>
  <div class="content sectiontab" id="item"><div class="12u 12u$(small)">
    <p id="bndlresultscnt"><b><span name="start" class="counts"></span></b> &ndash; <b><span name="end"></span></b> of <b><span name="total"></span></b> <span name="results"></span></p>
    <label id="collshowall" class="showall">Show All/Collapse All&nbsp;<i id="show-all-caret-coll" class="icon fa-caret-right"></i></label>
    <ol id="bndllist" class="alt" start="0">
    </ol>
  </div></div>
</div>
