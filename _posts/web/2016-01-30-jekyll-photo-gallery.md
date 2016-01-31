---
layout: post
title: Jekyll Photo Gallery
description: ""
tagline:
category: web
tags: [jekyll, web]
---
{% include JB/setup %}


I've been wanting to add a photo gallery to a Jekyll website but kept running into difficulties that made
me keep putting it off. The biggest hurdle was how to loop over a directory of images, without having to
know what all the file names are.  I just wanted to dump pictures into some folder and have them appear
on the page.  I started [working on a python script](https://github.com/voidnologo/jekyll_image_dump)
to programmically rename all the files in a dump folder and then move them into the jekyll assets directory.
I didn't get very far into it before other projects ended up with higher priorities and never finished it.  Maybe someday.

Browsing [StackOverflow](http://stackoverflow.com/a/34783367/4961942) eventually got me started on my solution.
Most suggestions were to have some data file where you would list the gallery name, picture name/path, and other
data about each image.  Again, I didn't want to have to know anything about files, just put them in a directory
and have the site pick them up from there.

Jekyll creates a collection of the [static files](http://jekyllrb.com/docs/static-files/) in your project
which can be accessed by `site.static_files`.  Looping over this collection and then filtering for the appropriate
files can get you an arbitrary group of files.  The basic structure looks like:

{% highlight django %}
{% raw %}
{% for myimage in site.static_files %}
  {% if myimage.path contains 'path-you-want-to-use' %}
    code here
  {% endif %}
{% endfor %}
{% endraw %}
{% endhighlight %}

From there I just expanded out capabilities and layout.  I went with [Lightbox2](http://lokeshdhakar.com/projects/lightbox2/)
to do some cool display work for me.

###Example

You can see the page I ended up with [here](http://raccoonvalleykendo.com/gallery/).

-----

###The Code
<br>

I think we are going to end up with multiple galleries, so I wanted everything controlled by variables set in
the frontmatter so that it will be easy to extract out to an `_include`.  In the images directory we have
thumbnails of all the pictures (`image_1.jpg` and `image_1_thumb.jpg`).

[Liquid](https://github.com/Shopify/liquid) doesn't have a `not contains`, so you can use `unless` to get the negative.
Since both the full image and the thumbnail are in the `gallery: path:` both were showing up on the page, so I chose
to filter out the thumbnails; the `gallery: thumb:` controls which files are considered thumbnails.



{% highlight HTML %}
{% raw %}
---
layout: default
title: RVKendo - Gallery
gallery:
  name: kendo
  path: 'img/gallery'
  thumb: '_thumb.jpg'
---

<section class="bg-dark">
  <div class="text-center">
    <h1>Pictures</h1>
  </div>
</section>

<section id="pictures">
    <div class="container">
        <div class="row">
          {% for image in site.static_files %}
            {% if image.path contains page.gallery.path %}
              {% unless image.path contains page.gallery.thumb %}
                <div class="col-lg-4 col-md-3 col-sm-2 thumb">
                  <!-- link to full image -->
                  <a href="{{ site.baseurl }}{{ image.path }}" data-lightbox="{{ page.gallery.name }}">
                    <!-- display thumbnail by modifying file name in path -->
                    <img src="{{ site.baseurl }}{{ image.path | replace:'.jpg', page.gallery.thumb }}"/>
                  </a>
                </div>
              {% endunless %}
            {% endif %}
          {% endfor %}
        </div>
    </div>
</section>
{% endraw %}
{% endhighlight %}
