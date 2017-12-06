---
layout: post
title: "Use __getattr__ to handle non-existant method calls"
description: ""
categories: python
---
## The Problem

Came across a 'counter collection' class in some code the other day.  There were a number of counters to keep track
of various items scattered through the program.  Each counter was set as a class attribute and had an 'increment' method
and a reset method.  Since there were about 15 counters, this created about 30 essentially identical methods.  So, I
decided to see if I could have generic methods to update or reset each counter.  Fortunately, since they were all copy-pasted
they all followed a standard naming scheme.  One of the goals is to not have to change the code in the rest of the project.


#### Example
{% highlight python %}
class Counters:

    a_ctr = 0
    b_ctr = 0

    def next_a_counter(self):
        self.a_ctr += 1

    def reset_a_counter(self):
        self.a_ctr = 0

    def next_b_counter(self):
        self.b_ctr += 1

    def reset_b_counter(self):
        self.b_ctr = 0

{% endhighlight %}

## Solution

In the Python Data model [(docs 3.1)](https://docs.python.org/3/reference/datamodel.html) 'Class instances'
it states: "If no class attribute is found, and the object’s class has a [`__getattr__()` method](https://docs.python.org/3/reference/datamodel.html#object.__getattr__), that is called to satisfy the lookup."
We are going to leverage this to be able to call methods on our class that we don't explicitly define.


#### Increment the counter

{% highlight python %}

class Counters:

    a_ctr = 0

    def __getattr__(self, name):
        def wrapper(*args, **kwargs):
            var = name.split('_')   # method calls have prefix_{attribute}_suffix
            ctr = f'{var[1]}_ctr'
            setattr(self, ctr, getattr(self, ctr) + 1)
        return wrapper


>>> c = Counters()
>>> print(c.a_ctr)
0
>>> c.next_a_counter()
>>> print(c.a_ctr)
1
{% endhighlight %}

Lets add reset.

#### Reset the counter

{% highlight python %}

class Counters:

    a_ctr = 0

    def __getattr__(self, name):
        def wrapper(*args, **kwargs):
            prefix, attr, *_ = name.split('_')   # method calls have prefix_{attribute}_suffix
            ctr = f'{attr}_ctr'
            if prefix == 'next':
                setattr(self, ctr, getattr(self, ctr) + 1)
            if prefix == 'reset':
                setattr(self, ctr, 0)
        return wrapper


>>> c = Counters()
>>> print(c.a_ctr)
0
>>> c.next_a_counter()
>>> c.next_a_counter()
>>> c.next_a_counter()
>>> print(c.a_ctr)
3
>>> c.reset_a_counter()
>>> print(c.a_ctr)
0
{% endhighlight %}

Now, to add more counters, we just need to add the counter class attribute rather than create a set of methods as well.


### Variants

-  Rather than setting the counters as class attributes, we could have made them instance attributes by using an `__init__`
   method and setting them on self.  Then we could have directly accessed the variables without having to have used
   `setattr` or `getattr` in the `__getattr__` method.

   {% highlight python %}

   class Counters:

       def __init__(self):
           self.a_ctr = 0

       def __getattr__(self, name):
           def wrapper(*args, **kwargs):
               prefix, attr, *_ = name.split('_')   # method calls have prefix_{attribute}_suffix
               ctr = f'{attr}_ctr'
               if prefix == 'next':
                   self.__dict__[ctr] += 1
               if prefix == 'reset':
                   self.__dict__[ctr] = 0
           return wrapper

   {% endhighlight %}
