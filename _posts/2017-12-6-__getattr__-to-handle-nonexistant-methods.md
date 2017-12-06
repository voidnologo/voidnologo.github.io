---
layout: post
comments: false
categories: python
---
## Title
text

  class JPPrintDemoTests(test.TestCase):

  class X:

      frank_ctr = 0
      jake_ctr = 0
      caleb_ctr = 0

      def __getattr__(self, name):
          def wrapper(*args, **kwargs):
              x = name.split('_')
>>            var = f'{x[1]}_ctr'
              if x[0] == 'reset':
                  setattr(self, var, 0)
              if x[0] == 'next':
                  setattr(self, var, getattr(self, var) + 1)
          return wrapper


  x = X()

  print(f'next_frank_ctr: {x.frank_ctr}')
  print(f'next_jake_ctr: {x.jake_ctr}')
  print(f'next_caleb_ctr: {x.caleb_ctr}')

  print('=' * 50)
  x.next_jake_counter()
  x.next_caleb_counter()
  x.next_jake_counter()
  x.next_jake_counter()
  x.next_frank_counter()
  print('=' * 50)

  print(f'next_frank_ctr: {x.frank_ctr}')
  print(f'next_jake_ctr: {x.jake_ctr}')
  print(f'next_caleb_ctr: {x.caleb_ctr}')


  print('=' * 50)
  x.reset_jake_counter()
  print('=' * 50)

  print(f'next_frank_ctr: {x.frank_ctr}')
  print(f'next_jake_ctr: {x.jake_ctr}')
  print(f'next_caleb_ctr: {x.caleb_ctr}')
  ~
