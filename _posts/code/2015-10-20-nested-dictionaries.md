---
layout: post
title: "Nested Dictionaries"
date:   2015-02-10 15:14:54
categories: data-structures django
---

Recently came across a situation where I was trying to display a dictionary of dictionaries of lists in a django template.
In the python code, the data structure was built like:

{% highlight python %}
@property
def nested(self, a_list_of_objects):
    from collections import defaultdict
    data = defaultdict(lambda: defaultdict(list))
    for x in a_list_of_objects:
         data['key'][x.an_attribute].append(x)
    return data
{% endhighlight %}

This results in
{% highlight python %}
{'key': {'an_attribute': [item1, item2]}}
{% endhighlight %}

### To display in django templates

So if I had the following objects, and wanted to organzie them by color:
{% highlight python %}
Cat(name='Kuro', color='black')
Cat(name='Nekko', color='black')
{% endhighlight %}

The dictionary that will be generated (key of `cat` and attribute `color`)
to be used in the template will look like:
{% highlight python %}
{'cat': {'black': [<Cat>'Kuro', <Cat>'Nekko']}}
{% endhighlight %}

And accessing each level of the structure in our template:

{% highlight django %}
{% raw %}
{% for k, v in nested.items %}
  <tr>
    <td>ONE {{ k }}:{{ v }}</td>
      {% for k2, v2 in v.items %}
        <td>TWO {{ k2 }}:{{ v2 }}</td>
        {% for k3 in v2 %}
          <td>THREE {{ k3 }}</td>
        {% endfor %}
      {% endfor %}
  </tr>
{% endfor %}
{% endraw %}
{% endhighlight %}

### Display

<table style="border:1px solid;">
      <tr>
            <td style="border:1px solid; padding:5px;">ONE cat {'black': ['Kuro', 'Nekko']}</td>
            <td style="border:1px solid; padding:5px;">TWO black ['Kuro', 'Nekko']</td>
            <td style="border:1px solid; padding:5px;">THREE Kuro</td>
            <td style="border:1px solid; padding:5px;">THREE Nekko</td>
      </tr>
</table>
