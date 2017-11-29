---
layout: post
title: Testing `print()` statements in Python
description: ""
category: python
tags: [python, testing, games]
---


I like command line / text games.  They are fun to write, fun to play.  The "interactive fiction"
scene is still alive and well.

The interaction all takes place with displaying information to the user and waiting for input.
One problem I've run into is with testing.  Unfortunately, intercepting `sysout` can get quite complex;
I can't remember how to set up the test and have to keep looking it up.

Fortunately Python 3.4 has released some very handy methods to deal with this.
[Checkout the rest of `contextlib`.](https://docs.python.org/3.4/library/contextlib.html)

-------

## Python 2

Examples taken from [this Stackoverflow](http://stackoverflow.com/questions/4219717/how-to-assert-output-with-nosetest-unittest-in-python)
question:


{% highlight python %}
def test_foo():
    import sys
    from foomodule import foo
    from StringIO import StringIO

    saved_stdout = sys.stdout
    try:
        out = StringIO()
        sys.stdout = out
        foo()
        output = out.getvalue().strip()
        assert output == 'hello world!'
    finally:
        sys.stdout = saved_stdout
{% endhighlight %}


Or create a [context manager](http://eigenhombre.com/2013/04/20/introduction-to-context-managers/):

{% highlight python %}
from contextlib import contextmanager
from StringIO import StringIO

@contextmanager
def captured_output():
    new_out, new_err = StringIO(), StringIO()
    old_out, old_err = sys.stdout, sys.stderr
    try:
        sys.stdout, sys.stderr = new_out, new_err
        yield sys.stdout, sys.stderr
    finally:
        sys.stdout, sys.stderr = old_out, old_err
{% endhighlight %}

to use like this:

{% highlight python %}
with captured_output() as (out, err):
    foo()
# This can go inside or outside the `with` block
output = out.getvalue().strip()
self.assertEqual(output, 'hello world!')
{% endhighlight %}

-------

## Python 3.4

In the [`contextlib` library](https://docs.python.org/3.4/library/contextlib.html) there is a new context manager to do
something similar to the last example.  You now no longer have to
write your own.


{% highlight python %}
from contextlib import redirect_stdout
from io import StringIO

out = StringIO()
with redirect_stdout(out):
  # any calls to print (either here or in a called method) get caught while in this scope
  print('Some output')

self.assertEqual('Some output', out.getvalue())
{% endhighlight %}
