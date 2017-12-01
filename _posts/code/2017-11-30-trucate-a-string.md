---
layout: post
title: "Truncating a string"
description: ""
categories: python
---

## The Problem

I needed to truncate each line in a block of text to a maximum width.  The input is a single string with newline `'\n'` delimiters.

## Solution

There are several considerations I had to make.  Did the `max_width` include the ellipses or not?
So if max is 50 characters, do I show 50 characters and then three more for the `...` making the actual output 53 wide?
If so, what if there are only 51 or 52 characters,  in that case I just chopped of one or two significant characters
and replaced them with place holders. Seems like a dumb idea.  I decided that the max width would be the
absolute size, including ellipses.  I did not handle the case where `max_width` is less than 4 characters,
so in that case you'll end up with just three `.`s.  At that point I'm willing to call it user error.

{% highlight python %}
def truncate(data, width):
    ellipse = '...'
    return '\n'.join([x[:width - 3] + ellipse if len(x) > width else x for x in data.split('\n')])
{% endhighlight %}

### Explanation

Split the input on newlines, creating each line as an element in a list.  Iterate over the list of
strings, checking the length of each string.  If the length is less than the `max_width` set, leave the
string untouched.  If it is longer, slice up to `width - 3` and concatinate the ellipse string.
Join the list of modified strings back together into a single string using `'\n'` as a delimiter.

### Variants

- I could have used `data.splitlines()`.  This has several advantages in that it splits on line boundaries
  and not just newlines.  It also doesn't leave you with an empty string if the last character is a newline.
  See [docs for `splitlines`](https://docs.python.org/3/library/stdtypes.html#str.splitlines).

- Rather than using a list comprehension for the join, update to a generator expression.

- If using python 3.6, use f-strings.  (Com'on, why aren't you doing this by default!?)

- Use `textwrap.shorten()`.  This does more than wanted though.  It trims down white space in the string
  and truncates by dropping words rather than chopping to an exact character count.
  See [docs for `textwrap.shorten()`](https://docs.python.org/3/library/textwrap.html?highlight=truncate#textwrap.shorten)

{% highlight python %}
def truncate(data, width):
    ellipse = '...'
    return '\n'.join(f'{x[:width - 3]}{ellipse}' if len(x) > width else x for x in data.splitlines())
{% endhighlight %}
