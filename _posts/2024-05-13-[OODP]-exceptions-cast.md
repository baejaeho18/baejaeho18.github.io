---
layout: post
title: "[OODP] 13. Type Cast"
category: study
tags: [oodp]
---

## Runtime Type Identification(RTTI)
구 컴파일러에서는 지원하지 않을 수 있다.

### dynamic_cast Operator
아래 코드는 아무런 compile error도 발생시키지 않는다. 과연 안전한 코드일까?
```c++
// Suppose a class hierarchy
class Base { ... };
class Derived1 : public Base { ... };
class Derived11 : public Derived1 { ... };
// Suppose the following pointers
Base* pb = new Base;
Base* pd1 = new Derived1;
Base* pd11 = new Derived11;
// Consider the following type casts
Derived11* p1 = (Derived11*)pd11;   // 11->11
Derived11* p2 = (Derived11*)pb;     // base->11
Derived1* p3 = (Derived1*)pd11;     // 11->1
```
절대 아니다. 첫번째는 동일한 type이므로 안전하다. 세번째는 base class pointer로 derived class를 가리킬 수 있으니 괜찮다.
그러나 두번째는 runtime에서 오류가 발생하게 된다.

이러한 상황을 막기 위해 dynamic_cast 연산자를 사용한다.
Typecast가 가능하다면 그대로 바꿔주고, 그렇지 않다면 0(null-pointer)를 반환한다.
```c++
Derived derived_obj;
Base base_obj;

Base *base_ptr_do = &derived_obj;
Base *base_ptr_bo = &base_obj;

Derived* dp_bp_do = dynamic_cast<Derived*>(base_ptr_do); // allowed
Derived* dp_bp_bo = dynamic_cast<Derived*>(base_ptr_bo); // return nullptr
```
dynamic_cast는 reference에도 사용할 수 있다. 다만 null-pointer에 해당하는 type이 reference value로 없기 때문에 0 대신 **bad_cast**를 반환한다.
```c++
#include <typeinfo> // for bad_cast
try {
    Derived1& rs = dynamic_cast<Derived1&>(rb);
    // ...
}
catch(bad_cast&) {
    // ...
}
```

### static_cast
C type cast와 유사하다.

기존의 표현이 가능한 type들 간에 변환만이 가능하다.
예를 들어, integer-enumeration, double-int, float-long 등 implicit type cast가 가능한 모든 경우가 이에 해당한다.
```c++
Base base;
Derived derived;
Base *pb = static_cast<Base*>(&derived);    // valid upcast
Derived *pd = static_cast<Derived*>(&base); // valid downcast
```

### const_cast
상수값(const)를 변수로 변환한다.
```c++
SomeClass obj;
const SomeClass *ptr = &obj;
SOmeClass *pb = const_cast<SomeClass*>(ptr);
// equivalent as
SomeClass *pb = (SomeClass*)(ptr);
// but it does not allow
AnotherClass *pb = (AnotherClass*)(ptr);
```
위와 같은 사례를 허용하지 않기 때문에 보다 안전하게 사용할 수 있다.

### typeid operator

### type_info structure

## Questions?
**Q1.**    <br>
**A1.** 

**Q2.**      <br>
**A2.** 

<!-- Links -->
[error-abort.cpp]:
[error-return.cpp]:
[error-try-catch]:
[error-throw-object]: 
[bad-alloc.cpp]: 