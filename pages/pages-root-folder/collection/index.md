---
permalink: collection/index.html
layout: page
search_include: true
search_results: true
tabs_include: true
collbndlrec: coll
title: CLA Collection
hide_title: true
header: no
sitemap: false
---

{% include _search_form.html %}

<ul id="tablist" class="tabs" data-tab>
  <li class="tab-title active" data-tabname="coll"><a id="colltab_title" href="#coll">Collection description<span id="collcnt"></span></a></li>
  <li class="tab-title" data-tabname="bndl"><a id="bndltab_title" href="#item">Collection items<span id="bndlcnt"></span></a></li>
</ul>
<div class="tabs-content">
<!-- TODO: content and active classes are for Foundation tabs. The sectiontab
class is a holdover from old CLA website.  Clean this up later, if desired. -->
  <div class="content active" id="coll"><div class="detailonly sectiontab" id="collbndlrec"><ol id="colllist" class="alt" start="0"></ol></div></div>
  <div class="content detailonly sectiontab" id="item">
    <p id="bndlresultscnt">&nbsp;<b><span name="start" class="counts"></span></b> &ndash; <b><span name="end"></span></b> of <b><span name="total"></span></b> <span name="results"></span></p>
    <label id="bndlshowall" class="showall">Show All/Collapse All&nbsp;<i id="show-all-caret-coll" class="icon fa-caret-right"></i></label>
    <ol id="bndllist" class="alt" start="0">
    </ol>
  <div class="pagination" id="bndlpaginator"></div>
  </div>
</div>
