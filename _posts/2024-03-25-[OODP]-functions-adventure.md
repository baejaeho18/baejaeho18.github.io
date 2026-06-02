---
layout: post
title: "[OODP] 5. Functions(2)"
category: study
tags: [oodp]
---

> POSTECH OODP Lecture at 24SS

### Functions and Structures
function의 매개변수로 structure 역시 올 수 있다.
그러나 크기가 큰 structure의 경우, 모든 값을 복사(call by value)하는 것은 낭비가 될 것이다.
그래서 구조체를 활용하는 함수는 대체로 element copy보다는 reference copy를 포인터를 사용해 작성된다.
<!--more-->
* typedef : Defining an alias of a data type
    - syntax: typedef typeName aliasName;

``` c++
typedef char byte;
byte a, b;          // equiv. to char a, b;

typedef unsigned char uchar;
uchar c;            // equiv. to unsigned char c;

typedef char* char_ptr;
char_ptr ptr1, ptr2;    // equiv. to

typedef 

```
[strctfun.cpp]

C++에서 Class object는 structure에 기반하고 있기 때문에, object 역시 동일한 방법으로 function에서 넘겨받을 수 있다. 
array template class를 활용한 [arr_obj.cpp]를 참고하면 좋을 것 같다.

### Pointers to Function
C/C++에서 function은 data items처럼 address가 있다. function의 주소는 function에 대한 기계어가 저장된 곳의 시작주소이다.
> Similar to array name, function name acts as the address to the function

아래는 함수 포인터를 선언하는 예이다.
``` c++
double pam(int);
double *(pf)(int);
pf = pam;

double a = pf(3);
double a = (*pf)(3);

// a function that takes a function pointer as its 2nd argument
void estimate(int lines, double (*pf)(int));    

estimate(50, pam);      // function call telling estimate() to use pam()

typedef double (*func_type)(int);
func_type pf;
// equivalent to double (*pf)(int);
```
function pointer란 포인터의 형태로 선언한 함수를 말한다.
[fun_ptr.cpp], [arr_fun_ptr.cpp] 예제를 통해 어떻게 활용되는지 다시 확인하는 것을 추천한다.


## How Function Call Works
* Regular function calls:
    1. Store function arguments somewhere(registers or the stack)
    2. Store the return address in the stack
    3. Execute the function code
    4. Store a return value somewhere(register)
    5. Jump back to the instruction whose address is saved

함수 호출은 많은 메모리 접근과 절차가 필요한 작업이다.
다수의 반복이나 재귀에서 사용되기에는 무거울 수 있다.
그렇다면 어떻게해야 보다 가볍게 코드를 짤 수 있을까?

### Function-like Macros
함수처럼 작동하는 매크로를 #define으로 정의할 수 있다.
함수호출에 의한 overhead가 존재하지 않아 전자보자 후자가 더 빠르다.

``` c++
double square(double x) {
    return x * x;
}

#define SQUARE(x) ((x) * (x))
```

그러나 define 문의 특성을 잘 생각하고 작성해야 한다.
``` c++
define MULTIPLY(x,y) (x*y)
int e = MULTIPLY(a+b, c*d);     // equiv to. int 3 = (a+b*c*d);

define MULTIPLY(x,y) ((x)*(y))
int e = MULTIPLY(a+b, c*d);     // equiv to. int 3 = ((a+b)*(c*d));
// Tip! 괄호를 잘 작성할 것
```
return type도 지정할 수 없고, 단순한 작업 밖에 하지 못하며, overleaf?를 방지할 수 없기 때문에 괄호를 유심히 작성해야한다.

### C++ Inline Functions
위의 단점들을 보완하여 빠르면서도 작성하기 쉽게 만들어진 것이 **Inline Function**이다.
마치 전처리기(macro)와 같이 동작한다.
``` c++
inline double square(double x) {
    return x * x;
}

a = square(3.0);        // compiler embed it to a = 3.0 * 3.0;
```
[inline.cpp]와 같이, inline keyword는 compiler가 inline code로 대체하도록 제안한다. 그러나 macro처럼 무조건 바꾸는 것이 아니라, compiler가 정말로 바꿀지 결정하도록 한다.
compiler가 바꾸지 않는 경우에는 inline code가 너무 크거나, recursion을 사용하는 것 등이 있다. 이런 경우, 일반적인 function과 같이 동작한다.



## Questions?
**Q1.**         <br>
**A1.** 


**Q2.**      <br>
**A2.** 

<!-- Links -->
[strctfun.cpp]:
[strctptr.cpp]:
[arr_obj.cpp]:
[fun_ptr.cpp]: 
[arr_fun_ptr.cpp]:
[inline.cpp]: 