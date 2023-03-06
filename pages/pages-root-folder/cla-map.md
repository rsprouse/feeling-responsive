---
layout: page-fullwidth
show_meta: false
hide_title: true
header: no
clamap: true
permalink: "/cla-map.html"
---

{% comment %}
# TODO: Figure out how to set height flexibly on screen size.
# The map seems to be visible in this theme only when there is a fixed height
# value. 100% does not work. Perhaps it would if parent elements also were 100%.
{% endcomment %}
<style type="text/css">
  @media only screen and (max-height: 20em) {
    #map {
      width: 100%;
      height: 200px;
    }
  }
  @media only screen and (min-height: 20em) and (max-height: 40em) {
    #map {
      width: 100%;
      height: 400px;
    }
  }
  @media only screen and (min-height: 40em) {
    #map {
      width: 100%;
      height: 600px;
    }
  }
/*
Suggestion from https://stackoverflow.com/questions/7527152/div-with-dynamic-min-height-based-on-browser-window-height
  min-height: 400px;
  height: auto !important;
  height: 100%;
  margin-bottom: -4em;
*/

</style>

<div id="map"></div>

