## Editing

### Top-level pages

Top-level pages are found under `pages/pages-root-folder`. To add another top-level page add an .md file in this folder. (I think)

The output of these pages are at the top level and have the same name as the .md file, but with an .html extension.

Subdirectories of `pages/pages-root-folder` will also be rendered as .html files in the subdirectory.

### Adding a blog post

1. Add an .md file in `_posts`
   * Use a subdir appropriate to the topic, e.g. `news` (it should match a value in the `categories` list in the post). The resulting url includes the category as part of the path, e.g. `news/post-name`.
   * The filename should be follow the pattern: `YYYY-MM-DD-descriptive_name.md`. **Use a hyphen, not underscore, in constructing the date and between the date and descriptive name. The post will not be included when the site is built if you do not use the correct pattern.** 
2. Use an existing post to model content.
3. Update [`pages-root-folder/index.md`](pages-root-folder/index.md) to point to new blog post.

## Updating

When the site is built, `cd` to the destination server directory under `/home/sites` and do:

```bash
git pull origin --rebase --allow-unrelated-histories
```

## File organization

* `assets/images/`: Where to put images that will be under `/images` url.
* `assets/img`: Where to put favicons


## Sizes in css

It appears the sizes that can be used to in css classes are small, medium, large, xlarge, and xxlarge. See lines 250-284 in `_sass/_03_settings_mixins_media_queries.scss`. Use -up and -only suffixes to constrain displays via classes, e.g. 'small-only', 'large-up'.

Margins can be added with e.g. 't10' (top 10px), 'b20' (bottom 20px), etc. See bottom of `_sass/_07_layout.scss`.

## Mising markdown and html

Some content is not easily handled by markdown and should be entered as plain html. When you do this jekyll will possibly escape certain html sequences, and you might therefore need to exclude the relevant section from escape processing to stop this. For example, the `{::nomarkdown}...<:/nomarkdown}`  section below indicates that the `<a>` tag should be rendered as-is rather than converted to html entities.

```
{::nomarkdown}
<figure>
  <img class="image fit right" width="310px" src="{{site.urlimg}}oswalt.jpeg" alt="Robert Oswalt with Essie Parrish, a speaker of Kashaya, 1960" />
  <figcaption>Robert Oswalt with Essie Parrish, a speaker of Kashaya, 1960 (<a href="http://www.livewild.org/RLO/index.html">Image source</a>)</figcaption>
</figure>
{:/nomarkdown}
```

## Pull quotes/block quotes

The preferred style for pull/block quotes is to add the `teaser` class, like this:

```css
> <span class="teaser">She trained more Americanist linguists than did Boas and Sapir put together.</span><cite>Karl Teeter</cite>
```

## Reformatting anchor tags

To reformat `<a>` tags as markdown in vim:

```
s/<a href="\([^"]\+\)">\([^<]\+\)<\/a>/[\2](\1)/gc
```

and in reverse:

```
s/\[\([^]]\+\)](\(\[^)\]\+\))/<a href="\2">\1</a>
```

## Building

### Local dev

To build and serve the site locally, specify the `local` config when using `jekyll serve`.

```bash
bundle exec jekyll serve --livereload --config _config.yml,_config_local.yml
```

### Server dev

To build the site locally and push to the server, specify the `lingdev` config when using `jekyll build`, then push with `rsync`:

```bash
bundle exec jekyll build --config _config.yml,_config_lingdev.yml && \
rsync -rvzhe ssh _site_lingdev/* ronald@linguistics.berkeley.edu:/home/sites/scoil_dev_cla_public_static/
```

### Github credentials

Store github credentials:

```
git config --global credential.helper store
```

The next time a push is requested, enter username and personal access token. When the token expires, generate a new one on github.com.

### SSH credentials

To store ssh credentials in a terminal session, do:

```bash
eval $(ssh-agent)
ssh-add ~/.ssh/id_ed25519   # or ~/.ssh/my_private_keyfile
```

Enter passphrase for the key, and then you can use rsync over ssh to push the site without having to re-enter the passphrase as long as you remain in the terminal session.

## You like and use this theme? Then support me. Just [paypal.me/PhlowMedia](https://www.paypal.me/PhlowMedia) :)

# Newsletter: Stay in Touch for Future Updates

If you are a webdesigner interested in Jekyll, the static website generator, this little newsletter is for you. I share tutorials, clever code snippets and information about my own Jekyll Themes called [*Feeling Responsive*][7] and [*Simplicity*][8]. Please don't expect weekly emails :)

[![Subscribe to Jekyll Newsletter](https://phlow.github.io/static/tinyletter_subscribe_button.png)](https://tinyletter.com/feeling-responsive)


[![Start Video](https://github.com/Phlow/feeling-responsive/blob/gh-pages/images/video-feeling-responsive-1280x720.jpg)](https://www.youtube.com/embed/3b5zCFSmVvU)

## A Responsive Jekyll Theme: *Feeling Responsive*

Do you want to get to know *Feeling Responsive*? Than check it out first and have a look on its home at  <http://phlow.github.io/feeling-responsive/>.

To get to know *Feeling Responsive* check out all the features explained in the [documentation][1].

And what license is *Feeling Responsive* released under? [This one][2].



## Why use this theme?

Feeling Responsive is heavily customizable.

1. Language-Support :)
2. Optimized for speed and it's responsive.
3. Built on Foundation Framework.
4. Six different Headers.
5. Customizable navigation, footer,...

**[More ›][3]**



## Changelog

*Feeling Responsive* is in active development. Thank you to everyone who contributed, especially [Róbert Papp][5], [Alexandra von Criegern](https://github.com/plutonik-a) and [Juan Jose Amor Iglesias](https://github.com/jjamor).

**[Read Changelog ›][6]**



## Video Tutorial

Click the image to [watch the YouTube-Video-Tutorial][4].

[![Start Video](https://github.com/Phlow/feeling-responsive/blob/gh-pages/images/video-feeling-responsive-tutorial-frontpage.jpg)](https://www.youtube.com/watch?v=rLS-BEvlEyY)








 [1]: http://phlow.github.io/feeling-responsive/documentation/
 [2]: https://github.com/Phlow/feeling-responsive/blob/gh-pages/LICENSE
 [3]: http://phlow.github.io/feeling-responsive/info/
 [4]: https://www.youtube.com/watch?v=rLS-BEvlEyY
 [5]: https://github.com/TWiStErRob
 [6]: https://phlow.github.io/feeling-responsive/changelog/
 [7]: http://phlow.github.io/feeling-responsive/
 [8]: http://phlow.github.io/simplicity/
 [9]: #
 [10]: #
