---
layout: page
title: Projects
permalink: /projects/
---

* content
{:toc}

# Projects
<hr/>

## Dropbox-CLI

[![Build Status](https://travis-ci.org/voidnologo/dropbox-cli.svg?branch=master)](https://travis-ci.org/voidnologo/dropbox-cli)
[Github](https://github.com/voidnologo/dropbox-cli)

(WIP: this project is under active development, so this may be out of date.  Check the github repo for current status.)

I wrote a couple of dropbox apps for work and thought I'd make my own.
I'm a big fan of using the command line and not a fan of the dropbox ui.
This is an experiment in using the dropbox-api for interacting with dropbox, but everything
else is from the standard library.

There are three main parts:

- PathTree
- TreeFS
- Dropbox-CLI

#### PathTree

PathTree is a tree data structure (think linked-lists) whose main reference method for nodes
is through path-like strings ('/root/childa/leaf').

It provides: inserts, search, getting the path string for each node, lists of ancestors, and
a unix tree like graphical representation.

#### TreeFS

Command line program for navigating a PathTree.  This provides a user interface for navigating
the tree.

Provides:

- `cd`: like 'change directory', move around in the tree
- `ls`: view contents of "directories", or meta data stored in a PathTree node
- `find`: search the tree
- `tree`: visualize the tree structure

#### Dropbox-CLI

Extends TreeFS with dropbox-api specific functionality, such as ability to download, upload, restore deleted
files, etc.

<hr/>

## JPPrint (Json Pretty Print)

[![Build Status](https://travis-ci.org/voidnologo/jpprint.svg?branch=master)](https://travis-ci.org/voidnologo/jpprint)
[Github](https://github.com/voidnologo/jpprint)

Quick and dirty comparison and debugging of json strings.

We use a lot of json at work and I was constantly frusterated trying to debug differences in json outputs.
Unittest asserts, even with `maxDiff=None` can be really had to read.  `pprint.pprint()` does a poor job
of formatting json.

Use `jpprint` to quickly format and compare json strings (and dicts!).

Options:
  - indent depth
  - separator between strings
  - diff indicator for lines that are not identical
  - only show lines that are different
  - truncate width in each column to fit on narrower screens


{% highlight python %}
>>> import jpprint
>>> a = '{"a": "1234567890", "b": "b"}'
>>> b = {'a': '1234567890', 'b': 'rabbit'}
>>> jpprint.jpprint(a, b, max_width=20, diff_ind='---')
'
{                       |     {
    "a": "1234567...    |         "a": "1234567...
    "b": "b"           ---        "b": "rabbit"
}                       |     }
'
{% endhighlight %}


<hr/>

## Letters/Words

Two little programs I whipped up for my kids working on learning letters and reading.

The python commandline versions are reliant on the Mac OS system command `say` to work.

#### Web version of letters
[http://letters.voidnologo.com](http://letters.voidnologo.com)

#### Letters
[Python command line Letters](https://github.com/voidnologo/letters).

#### Words
[Python command line Words](https://github.com/voidnologo/words).
