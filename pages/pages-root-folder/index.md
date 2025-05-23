---
#
# Use the widgets beneath and the content will be
# inserted automagically in the webpage. To make
# this work, you have to use › layout: frontpage
#
layout: cla-frontpage
header:
  image_fullwidth: cla_website-banner_v2.jpg
  title: California Language Archive
search_include: true
widget1:
  title: "The CLA Blog"
  url: blog/2025/lakota-field-methods.html
  image: lakota-02.jpg
  imgalt: Knud Lambrecht's notes on Lakota from the 1980 Berkeley graduate field methods
  text: Knud Lambrecht's notes on Lakota from the 1980 Berkeley graduate field methods
widget2:
  title: "Project spotlight"
  url: projects/cucapa.html
  image: cucapa.jpg
  imgalt: Photo of Cucapá community members
  text: El fortalecimiento de la lengua cucapá
widget3:
  title: "Collection spotlight"
  url: collections/matsigenka_yine.html
  image: lewingtonmap02.jpg
  imgalt: Hand-drawn map of the river system in the area where Matsigenka is spoken
  text: Anna Lewington Collection of Matsigenka and Yine Recordings
#
# Use the call for action to show a button on the frontpage
#
# To make internal links, just use a permalink like this
# url: /getting-started/
#
# To style the button in different colors, use no value
# to use the main color or success, alert or secondary.
# To change colors see sass/_01_settings_colors.scss
#
callforaction:
  url: give.html
  text: Support the CLA
  style: alert
permalink: /index.html
#
# This is a nasty hack to make the navigation highlight
# this page as active in the topbar navigation
#
homepage: true
---

