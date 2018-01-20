---
layout: post
title: "Searching a List of Dictionaries"
description:  ''
categories: data-structures
---
## The Problem

I wanted to find all the dictionaries in a list of dictionaries where a key had a certain value.

Given:

    data = [
        {'a': 1, 'b': 2},
        {'a': 3, 'b': 4},
        {'a': 5, 'b': 4},
        {'a': 7, 'b': 6},
    ]


<br/>
#### FIND: get all the dictionaries where 'b' is 4

{% highlight python %}
fours = [x for x in data where x['b'] == 4]

>>> print(fours)
[{'a': 3, 'b': 4}, {'a': 5, 'b': 4}]
{% endhighlight %}


<br/>
#### UPDATES: get the index to update the dictionaries in the list where 'b' is 4

{% highlight python %}
idxs = [i for i, x in enumerate(data) if x['b'] == 4]
for i in idxs:
    data[i]['b'] = 9

>>> print(data)
[{'a': 1, 'b': 2}, {'a': 3, 'b': 9}, {'a': 5, 'b': 9}, {'a': 7, 'b': 6}]
{% endhighlight %}


<br/>
Alternatives using filter and map with lambdas:
{% highlight python %}
# Search
filter(lambda i: i['b'] == 4, data)

# Updates
map(lambda x: x.update(dict(b=9)), filter(lambda i: i['b'] == 4, data))
map(lambda x: dict(x, **{'b': 9}) if x['b'] == 4 else x, data)
{% endhighlight %}

