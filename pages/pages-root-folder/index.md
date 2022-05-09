---
#
# Use the widgets beneath and the content will be
# inserted automagically in the webpage. To make
# this work, you have to use › layout: frontpage
#
layout: cla-frontpage
header:
  image_fullwidth: cla_website-banner_v2.png
  title: California Language Archive
search_include: true
widget1:
  title: "The CLA Blog"
  url: blog/2022/northern_paiute_natches.html
  image: natches021.png
  text: Gilbert Natches's Northern Paiute documentation
widget2:
  title: "Project spotlight"
  url: projects/atchan.html
  image: atchan3.jpg
  text: The Atchan language project
widget3:
  title: "Collection spotlight"
  url: collections/matsigenka_yine.html
  image: lewingtonmap02.jpg
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

