# Notes for developers

## Google Maps API Key

The Google Maps API requires that a developer key be provided when the
javascript library is loaded. The key value is not present in any of the page
templates in the repository. While this key is not private (it is sent in
clear text with every view of the home page), GitHub scans repositories for
various kinds of credentials automatically and sends scary-sounding warnings
if the key is found. To prevent this the key is not present in the repository
itself and is provided as a GitHub secret (found via the repo's Settings page),
and it is interpolated into the page templates when the website is built.

## Release numbering

Releases are named according to the following scheme:

`v{Major}.{Minor}.{Patch}`

TODO: more info on numbering

## Creating a release and publishing the website

A GitHub Action that builds the public website is triggered whenever a
release is published on GitHub. If the release is marked as a
'pre-release' the website is copied to the gh-pages-dev branch. Full
releases are copied to the gh-pages-prod branch. Creating
a draft release does not trigger the publishing action.

These are the recommended steps for creating a release and publishing the
public website, using branch `main`:

1. Determine the version number of the new release.
1. Publish a prerelease version of the website for testing.
   * Go to the [repo releases page](releases).
   * Click the 'Draft a new release' button.
   * Click the 'Choose a tag' button and enter the version, e.g. 'v1.0.15'. In the widget click on 'Create new tag: v1.0.15 on publish' option.
   * Enter the version as the title, e.g. 'v1.0.15'.
   * Enter a description.
   * Select the 'This is a pre-release' checkbox.
   * Click the 'Publish release' button.
1. Verify that the publishing action succeeded by reviewing the GitHub
Actions build logs.
1. View the [prerelease build result](tree/gh-pages-dev).
1. Pull the prerelease site to the ling server (see below).
1. Review the
['prerelease' website](https://trill.linguistics.berkeley.edu)
by visiting the site in your web browser.
  ***If the prerelease is not satisfactory and additional changes are required,
make the needed changes and commit and push to github. Then reset the commit
referenced by the release to the latest commit so that the release includes
your new changes. One way to do that is to delete the existing
release and tag on github, then redo the preceding steps to re-create the new
release. One way to delete the release is to visit the
[releases page](releases), click on the release name, then click on the
'Delete' button. Next visit the [tags page](tags), click on the corresponding
tag name, then click on the 'Delete' button to delete the tag.***
1. If the prerelease website is satisfactory, edit the release on GitHub and
remove the 'pre-release' qualifier. This will build the website again and
push the result to the [gh-pages-prod branch](tree/gh-pages-prod).
1. Pull the production release site to the ling server (see below).

See the file [`.github/workflows/publish_to_branch_on_release.yaml`](../.github/workflows/publish_to_branch_on_release.yaml)
file for details on configuring the publishing action.

## Pulling the website to the ling server

The dev and prod versions of the website have been set up on the ling
server already. The gh-pages-dev and gh-pages-prod branches were cloned
to appropriate folders (via `git clone -b gh-pages-dev https://github.com/rsprouse/feeling-responsive` and `git clone -b gh-pages-prod https://github.com/rsprouse/feeling-responsive`). These locations were configured in the
`200-cla.conf` apache configuration file.

To update the contents of these folders, log in to the ling server and
do the following from the folder root:

`git pull origin --rebase --allow-unrelated-histories`

Files are pulled from the appropriate branch, depending on whether you
give this command from the dev or prod folder.
