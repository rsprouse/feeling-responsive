---
permalink: list/index.html
layout: page
search_include: true
search_results: true
tabs_include: true
title: Search results
hide_title: true
header: no
sitemap: false
---

{% include _search_form.html %}

<ul id="tablist" class="tabs" data-tab>
  <li class="tab-title active" data-tabname="coll"><a href="#coll"><span id="colltab_title">Collections</span><span id="collcnt"></span></a></li>
  <li class="tab-title" data-tabname="bndl"><a href="#bndl"><span id="bndltab_title">Items</span><span id="bndlcnt"></span></a></li>
</ul>
<div class="tabs-content">
<!-- TODO: content and active classes are for Foundation tabs. The sectiontab
class is a holdover from old CLA website.  Clean this up later, if desired. -->
  <div class="content active sectiontab" id="coll">
    <p id="collresultscnt">&nbsp;<span name="results"></span> <b><span name="start" class="counts"></span></b> &ndash; <b><span name="end"></span></b></p>
    <label id="collshowall" class="showall">Show All/Collapse All&nbsp;<i id="show-all-caret-coll" class="icon fa-caret-right"></i></label>
    <ol id="colllist" class="alt" start="0">
    </ol>
  <div class="pagination" id="collpaginator"></div>
  </div>
  <div class="content sectiontab" id="bndl">
    <p id="bndlresultscnt">&nbsp;<span name="results"></span> <b><span name="start" class="counts"></span></b> &ndash; <b><span name="end"></span></b></p>
    <label id="bndlshowall" class="showall">Show All/Collapse All&nbsp;<i id="show-all-caret-bndl" class="icon fa-caret-right"></i></label>
    <ol id="bndllist" class="alt" start="0">
    </ol>
  <div class="pagination" id="bndlpaginator"></div>
  </div>
</div>
