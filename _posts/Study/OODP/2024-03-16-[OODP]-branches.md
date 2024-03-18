---
layout: post
title: "[OODP] 3. Branching Statements and Logical Operators"
category: study
tags: oodp
---

> POSTECH OODP Lecture at 24SS

## Branch Statements

### if Statement
> Syntax: if (test_expression) statement

### if else Statement
> Syntax: if (test_expression) statement1 else statement2

### if else if else Construction
두 가지 선택지보다 더 많은 선택지가 존재할 때, 사용된다.
```c++
if(ch == 'A')
    a_grade++;
else
    if(ch == 'B')
        b_grade++;
    else
        soso++;
// The following is exactly the same with above, but better formatted:
if(ch == 'A')
    a_grade++;
else if(ch == 'B')
    b_grade++;
else
    soso++;
```
else if라는 별도의 keyword가 존재하는 것이 아니다.
그저 whitespace(space, tab, newline)이 생략된 형태이다.

### Logical Expressions
Logical Operator에는 '||(or), &&(and), !(not)'이 있다.
연산자 간의 우선순위는 '! > (relational or arithmetic operators) > && > ||'이다.
``` c++
bool b1 = 5 > 3 && 2 > 3;
bool b2 = 5 > 3 || 2 > 3;
bool b3 = !(5 > 6) && 1 > 3 || 5 < 6 && 3 > 2;
// 'T && T' = T
// 'T || T' = T
// '!(F) && F || T && T' = 'T && F || T && T' = 'F || T' = T
```

Branch문과 Logical 연산자들을 cctype Library of Character Functions과 함께 사용한 예시가 [cctype.cpp]에 있다.
> The **cctype** header file(ctype.h in C) provides handy character-related functions

### ? : Conditional Operator
> Syntax: expression1 ? expression2 : expression3

if else문 대신 사용되는 삼항연산자이다. 
``` c++
int c = a > b ? a : b;
// equivalent to:
int c;
if (a > b)  c = a;
else        c = b;
```

### Switch Statement
> Syntax: switch (integer-expression)
{
    case label1 : statement(s)
    case label2 : statement(s)
    ...
    default     : statement(s)      // default is optional
}

integer-expression을 통해 맞는 cases로 jump한다.
각 케이스에 **break**문이 있다면 'jump END'의 역할을 한다.
default문은 주로 error handling에 쓰이는데, 어떤 case에도 존재하지 않을 경우 실행된다.

### break and continue Statements
> break&continue: enable a program to skip over parts of the code

* break: used in switch or loops. Skip the rest of the code
* continue: used in loops to skip the rest of the body of the loop and then start a new loop cycle

![break_continue](/assets/img/2024-03-18/break_continue.png)

### File 입출력
> File I/O in C++ is very similar to console I/O using cin/cout

우선 **fstream** 헤더파일을 포함해야한다.
이 안에는 파일을 쓰는 **ofstream**과 파일을 읽어오는 **ifstream** classes가 존재한다.




## Questions?
**Q1.** 파이썬에서 elif라는 특유의 형태가 존재하는 것이, indentation에 민감하여 c++처럼 whitespace생략으로 else if를 인식할 수 없기 때문인건가요? 그럼 c/c++이나 java 컴파일러에는 'else if'라는 예약어가 존재하는 것이 아니라, 'else'와 'if'만 있는 건가요? <br>
**A1.** 

**Q2.** C++에서 '?'연산자 말고도 삼항연산자가 존재하나요? <br>
**A2.** 아니요. Conditional Operator(?) is the only C++ operator that requires 3 operands.



<!-- Links -->
[mul_dim_array.cpp]: 
[cctype.cpp]: 