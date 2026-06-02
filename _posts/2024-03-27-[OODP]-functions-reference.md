---
layout: post
title: "[OODP] 5. Functions(2)"
category: study
tags: [oodp]
---

> POSTECH OODP Lecture at 24SS

## Reference Variable
포인터를 대체하기 위해서 만들어진 개념이다. 이미 정의된 변수에 대해서 alias처럼 동작한다.
``` c++
int rats = 101;
int &rodents = rat;     // rodent is a reference
```
위와 같이 **&** 연산자를 사용해 선언할 경우, 메모리를 가리키는 연산자가 아니라 rats라는 변수의 별명(alias)가 rodents라는 뜻이다.

### Comparison with pointers
> ref_variable == (*pointer_variable)

reference variable을 선언하면서 반드시 초기화가 함께해야 한다.
reference는 **const** pointer와 유사해서, 선언한 이후 값을 변경할 수 없다. 
<!--more-->
``` c++
int &rodents = rats;
// is equivalent to
int * const pr = &rats;
```
### Reference as Function Parameters
대부분의 경우, reference는 function parameter로 사용된다.
Passing by reference를 통해 호출된 함수가 호출한 함수의 변수에 접근할 수 있다.

``` c++
void swapr(int &a, int &b) // a, b are aliases for ints
{
    int temp = a;
    a = b;
    b = temp;
}
void swapp(int *p, int *q) // p, q are addresses of ints
{
    int temp = *p;
    *p = *q;
    *q = temp;
}
void swapv(int a, int b) // a, b are new variables (doesn’t work!)
{
    int temp = a;
    a = b;
    b = temp;
}
```
위 함수들의 결과는 [swaps.cpp]에서 확인할 수 있다.
사실 fundamental type들은 굳이 reference parameter을 사용할 필요는 없다. 본래 (커다란) structure과 class에 사용되기 위해 만들어졌다. reference argument를 사용하면
1) 호출하는 함수의 data object에 접근할 수 있고
2) passing by reference로 불필요한 data object 전체를 복사하지 않아도 된다.

보다 많은 예시들이 준비되어 있으니 [reference]를 참고하라.

## Default Arguments
> a value that's used automatically if you omit the corresponding actual argument from a function call

``` c++
int harpo(int n, int m = 4, int j = 5);
int groucho(int k = 1, int m = 2, int n = 3);

beeps = harpo(2);       // same as harpo(2, 4, 5);
beeps = harpo(1, 8);    // same as harpo(1, 8, 5);
beeps = harpo(8,7,6);   // no default arguments used
val = groucho();        // same as groucho(1,2,3);
```

반드시 default argument는 오른쪽부터 고려한다. 마지막부터 순서대로 적용된다.

```c++
beeps = harpo(3, , 8);  // invalid, doesn’t set m to 4

int chico(int n, int m = 6, int j); // INVALID
```
[norm.cpp]를 참고해도 좋다.

## Function Overloading
C에서는 동작이 동일해도, argument와 return type이 다르면 모두 이름을 다르게 선언해야했다.
이런 귀찮음을 C++은 **Polymorphism**(다형성)으로 해소한다.

```c++
// in C
float cosf(float arg);
double cos(double arg);
long double cosl(long double arg);
// in C++
int square(int x) { return x*x; }
double square(double x) { return x*x; }
```
동일한 이름을 가지고 동일한 동작을 하는 다양한 type의 함수를 선언할 수 있다.
호출한 함수의 parameter에 따라 어떤 함수가 호출될 것인지 결정된다.
이렇게 함수의 argument의 type과 순서, 개수로 **Function Signature**가 결정된다.

```c++
// Not allowed case 1) ambiguous signature
double cube(double x);
double cube(double &x);
void print(const char *str, int width=0);
void print(const char *str);

// Not allowed case 2) same signature, different return type
long gronk(int n, float m);
double gronk(int n, float m);
```
그러나 signature가 애매하거나, signature가 동일하고 return type만 다른 경우에는 overloading을 적용할 수 없다.

## Function Templates
function overloading을 통해 type만 다른 동일한 이름과 동작의 함수들을 만들 수 있게 되었다.
그러나 모두 동일한데, type마다 함수를 선언해야한다면 중복된 코드가 너무 길어질 수 있다.
이를 해결하기 위해 C++ function template(generic description)이 존재한다.

> Generic Programming : programming in terms of a generic type instead of a specific type

```c++
// Function Overloading
void Swap(int &a, int &b);
void Swap(float &a, float &b);
void Swap(double &a, double &b);

// Function template prototype
template <typename T>       // or template <class T>
void Swap(T &a, T& b);
```
아래 함수가 실제로 호출될 때, compiler가 자동으로 위의 함수 중 적합한 함수를 생성하여 대체한다. 이를 (implicit) instantiation이라고 부른다.

[func_temp.cpp]

### Overloaded Templates
그러나 모든 타입이 동일한 동작(algorithm)을 하지 않을 수 있다.
이런 경우, [two_temps.cpp]처럼 template을 사용한 함수도 overloading하여 해결할 수 있다.

### Explicit Specialization
특정한 data type에 대해 특화된 함수를 정의하는 방식이다.
예를 들어, array 타입 변수에는 '='를 사용할 수 없고, struct 타입의 변수에는 '>'과 같은 연산자를 사용할 수 없기 때문이다.

```c++
template<typename T> void Swap(T &a, T &b);
template<> void Swap<job>(job &a, job &b); // explicit specialization
template<> void Swap(job &a, job &b); // <job> after “Swap” can be omitted
```
위와 같은 코드에서 일반적인 타입에 대한 함수와, 특정한 타입(job struct)에 대해 동작하는 함수를 overload한 것이다.
swap 뒤의 <job>은 생략될 수 있는데, argument list에서 job 타입이라는 것이 명시되기 때문이다.




## Questions?
**Q1.** swapv가 call by value여서 잘 동작하지 않고, swapp는 포인터를 사용해서 call by reference처럼 구현된다고 했다. 그러나 엄밀히 말하면 call by value라는 것까지 배웠다. 그렇다면 swapr은 정말로 call by reference인가?    <br>
**A1.** Yes, correct.


**Q2.** C/C++이 메모리에 강제적인 접근이 가능하다는 점 때문에 보안문제가 많이 발생하는데 '*'가 아니라 '&'를 사용하면 이런 문제가 덜한가요? <br>
**A2.** 분명 포인터보다 덜 위험한 것은 사실이지만 여전히 보안문제는 유효하다.

**Q3.** template을 사용할 때, 타입마다 다르게 동작하게하는 것은 의도에 어긋나는 건가요? <br>
**A3.** Nope, we'll practice that on next lecture.

<!-- Links -->
[swaps.cpp]: 
[reference]: 
[strquote.cpp]: 