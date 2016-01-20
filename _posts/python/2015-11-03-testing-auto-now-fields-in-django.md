---
layout: post
title: Testing `auto_now` fields in Django models
description: ""
category: python
tags: [python, django, testing]
---
{% include JB/setup %}

Django models have a nice attribute of [`auto_now`](https://docs.djangoproject.com/en/1.9/ref/models/fields/#datefield)
that will automatically be set to the date/time that the model gets created or updated.

{% highlight python %}
class MyModel(models.Model):
  created = models.DateTimeField(auto_now=True)
{% endhighlight %}

This can make testing difficult, because the `created` field will always be the current time.  If you try changing it with
something like this:

{% highlight python %}
sometime = datetime.today()
myobject.time_field = sometime
myobject.save()
{% endhighlight %}

it will get reset to the current time when saving.

If you need to have a specific time to test against, for example, "all instances within 'x' time frame",
"last updated more than 'y' time ago", the models will quite possibly only be milli-seconds old.

Here's how to change the time that it gets set to in a test:

{% highlight python %}
testtime = datetime.strptime('2015-10-31', '%Y-%m-%d')
with mock.patch('django.utils.timezone.now') as mock_now:
  mock_now.return_value = testtime
  MyModel.objects.create()
{% endhighlight %}

When the `with` block is over, further models will be created with current time.
