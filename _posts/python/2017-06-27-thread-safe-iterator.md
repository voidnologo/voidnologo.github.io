---
layout: post
title: "Threadsafe Iterator"
description: ""
tagline: ""
category: python
tags: [python, coroutine, decorators, generator]
---
{% include JB/setup %}

- Python3.4
- Django1.11

## The Problem

For a service that we integrate with at work we have a number of accounts to which we make
many thousands of requests.  We have any number of API keys per account, which we want to
sequentially iterate over in order to even out the number of calls per key.

#### The Criteria

- Way to look up API tokens per account
- Lazily initialized since the keys are stored in a database and don't want to hit it when the files are read
    (and need to wait for connections to be established, etc.)
- Somewhat global as requests are made from a number of places in the system
- Iterators need to maintain their position so each call to get the next token will be on a per account basis
- Iterators need to cycle infinitely (loop over the tokens per account)
- Threadsafe.  Calls to `next` on a generator are not threadsafe in Python


## Solution

A coroutine that contains a dictionary of generators for the accounts.
Decorator to make generators threadsafe.


{% highlight python %}
from functools import wraps
import itertools
import threading

from app.models import AuthModel


class CredentialsDoNotExist(Exception):
    pass


class ThreadSafeIterator:

    def __init__(self, gen):
        self.gen = gen
        self.lock = threading.Lock()

    def __iter__(self):
        return self

    def __next__(self):
        with self.lock:
            return self.gen.__next__()

    def send(self, val):
        return self.gen.send(val)


def threadsafe_generator(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        return ThreadSafeIterator(f(*args, **kwargs))
    return wrapper


@threadsafe_generator
def token_pool_generator():
    yield
    account_token_pool = {
        auth_obj.account_id: (
            token for token in itertools.cycle(auth_obj.tokens)
        ) for auth_obj in AuthModels.objects.all()}
    while True:
        key = yield
        try:
            yield next(account_token_pool[key])
        except (StopIteration, KeyError):
            yield None


tokenpool = token_pool_generator()
next(tokenpool)


def get_token_for_account(account_number):
    next(tokenpool)
    token = tokenpool.send(account_number)
    if token:
        return token
    raise CredentialsDoNotExist('No credentials for account {}.'.format(account_number))


{% endhighlight %}


-----------

## More references

The code for making threadsafe generators came from [here](http://anandology.com/blog/using-iterators-and-generators/)
