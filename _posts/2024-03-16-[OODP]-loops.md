---
layout: post
title: "[OODP] 3. Loops and Relational-Expressions"
category: study
tags: [oodp]
---

> POSTECH OODP Lecture at 24SS

### Compound Statements, or Blocks
> Consists of paired braces and statements

Block은 하나의 statment로 인식된다.
<!--more-->
``` c++
int x = 20;
{                       // block starts
    int y = 100;
    cout << x << endl;  // ok
    cout << y << endl;  // ok
}                       // block ends
cout << x << endl;      // ok
cout << y << endl;      // invalid, won't compile
```
Block을 사용해서 변수의 범위(scope)를 제한할 수 있다.

## Loop Statements
### Relational Expressions
'x < y'와 같은 relational expression은 **true**와 **false**같은 bool value를 계산한다.
true는 (int)1, false는 (int)0로 반환된다. 
사용되는 연산자는 '<, <=, ==, >, >=, !='가 있다.

### for Loops
> Syntax: for (initialize; test; update) statment

* Comma Operator


### while Loop
> Syntax: while (test_expression) statement

``` c++
bool b_success;
do
{
    b_success = do_something();
} while(!b_success);
```

### do while Loop
> Syntax: do statement while (test_expression);

``` c++
bool b_success = false;
while(!b_success)
{
    b_success = do_something();
} 
```

for, while, do_while의 세 가지 loop문의 예시를 다차원 array로 [mul_dim_array.cpp]에서 구현하였다.
C++은 multi-dimensional array type을 제공하지는 않기 때문에, 자신의 원소가 array인 array를 생성함으로써 다차원 배열을 구현할 수 있다.


## Questions?
**Q1.**  'int a = (3 - 4, 5 * 6);'과 같은 연산은 어떻게 처리되나요?<br>
**A1.** Comma Operator(,)를 기준으로 앞 뒤 연산을 실행한 후, 뒤의 expression을 a에 할당합니다.

<!-- Links -->
[mul_dim_array.cpp]: 