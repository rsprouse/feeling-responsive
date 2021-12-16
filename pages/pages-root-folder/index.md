---
#
# Use the widgets beneath and the content will be
# inserted automagically in the webpage. To make
# this work, you have to use › layout: frontpage
#
layout: cla-frontpage
header:
  image_fullwidth: homepage_collage_beta.jpg
  title: California Language Archive
search:
  placeholder: Search languages, people, topics, identifiers.
  button_text: Search CLA
  url: list.html
widget1:
  title: "The CLA Blog"
  url: 'blog/'
  image: steele_notes.jpg
  text: 'CLA blog posts for you to read.'
widget2:
  title: Revitalizing an ISO lang
  teaser: subtitle
  url: projects/2021/revitalizing-iso-lang.html
  image: eva_aikana.jpg
  text: 'We want to highlight the YYY project.'
widget3:
  title: "Collection spotlight"
  url: collspot/permalink2
  image: xavante_coll.png
  text: 'We are pointing our spotlight at the XXX Collection.'
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
  text: Support the Survey
  style: alert
permalink: /index.html
#
# This is a nasty hack to make the navigation highlight
# this page as active in the topbar navigation
#
homepage: true
---

