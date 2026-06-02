---
layout: post
title: "[OODP] 12. Friend, Exception and more"
category: study
tags: [oodp]
---

## Friend Class
## Nested Class

## Exception class
프로그램은 runtime problem을 마주치곤 한다.
존재하지 않는 파일에 접근이나, 메모리의 부족이 가장 자주 발생한다.
이러한 상황에 대처하는 강력하고 유연한 exception들을 c++은 지원한다.
<!--more-->
### Calling abort()
먼저 문제가 발생하면 프로그램을 종료하는 방법을 알아보겠다.
```c++
#include <cstdlib>
int main() {
    double x, y, z;
    std::cout << "Enter two numbers: ";
    while(std::cin >> x >> y) {
        z = hmean(x,y);
        std::cout << "Harmonic mean of " << x << " and " << y << " is " << z << std::endl;
        std::cout << "Enter next set of numbers <q to quit>: ";
    }
    return 0;
}
double hmean(double a, double b) {
    if(a == -b) {
        std::cout << "Untenable arguments to hmean()\n";
        std::abort();
    }
    return 2.0 * a * b / (a + b);
}
```
위의 [error-abort.cpp]는 standard error steam에 에러메세지를 보내고, 프로그램을 종료한다.

### Returning an Error Code
매번 프로그램을 종료시키는 것보다 조금 더 유연한 방식은 예외상황이 발생했는지 표시하는 return value를 반환하는 것이다.
```c++
bool hmean(double a, double b, double* ans)
{
    if(a == - b) {
        *ans = DBL_MAX;
        return false;
    }
    else {
        *ans = 2.0 * a * b / (a + b);
        return true;
    }
}
```
실제로 [error-return.cpp]와 같은 방식은 자주 쓰인다.
예를 들어, istream::get(void)는 end-of-file에 도달하면 special value인 **EOF**를 반환한다.
위의 error1.cpp의 while 조건문도 비슷한 접근이다.

### Exception Mechanism
프로그램 동작 중 예외적인 상황에 대한 대응으로 실행시킬 블락을 전이시킨다.
**try**-catch-throw의 세 요소로 구성된다.
try block 안에서 예외가 발생한다면 catch block이 대신 실행된다.
```c++
int main()
{
    double x, y, z;
    std::cout << "Enter two numbers: ";
    while(std::cin >> x >> y) {
        try { // start of try block
            z = hmean(x,y);
        } // end of try block
        catch(const char* s) { // start of exception handler
            std::cout << s << std::endl;
            std::cout << "Enter a new pair of numbers: ";
            continue;
        } // end of handler
        std::cout << "Harmonic mean of " << x << " and " << y << " is " << z << std::endl;
        std::cout << "Enter next set of numbers <q to quit>: ";
    }
    std::cout << "Bye!\n";
    return 0;
}

double hmean(double a, double b)
{
    if(a == -b)
        throw "bad hmean() arguments: a = -b not allowed";
    return 2.0 * a * b / (a + b);
}
```
위의 [error-try-catch.cpp]는 hmean 함수를 실행하면서 문제가 생기면 exception handler(catch block)을 대신 실행시킨다. **throw**는 return처럼 함수 실행을 종료하며, **char * s**에 문자열을 반환한다.

### Using Objects as Exceptions
위의 코드에서는 문자열을 throw했지만 일반적으로는 객체를 throw한다.
예외가 발생한 상황과 함수에 따라 다른 exception type을 사용하며 정보를 전달할 수 있기 때문이다.
```c++
class bad_hmean {
private:
    double v1;
    double v2;
public:
    bad_hmean(double a = 0., double b =0.) : v1(a), v2(b) { }
    void mesg() {
        std::cout << "hmean(" << v1 << ", " << v2 << "): " << "invalid arguments: a = -b\n";
    }
};
class bad_gmean
{
public:
    double v1;
    double v2;
    bad_gmean(double a = 0., double b =0.) : v1(a), v2(b) {}
    const char* mesg() {
        return "gmean() arguments should be >= 0\n";
    }
};

double hmean(double a, double b)
{
    if(a == -b) throw bad_hmean(a,b);
    return 2.0 * a * b / (a + b);
}
double gmean(double a, double b)
{
    if(a < 0 || b < 0) throw bad_gmean(a,b);
    return std::sqrt(a * b);
}

int main() {
    double x, y;
    cout << "Enter two numbers: ";
    while(cin >> x >> y) {
        try { // start of try block
            cout << "Harmonic mean is " << hmean(x,y) << endl;
            cout << "Geometric mean is " << gmean(x,y) << endl;
        } // end of try block
        catch(bad_hmean& bg) { // start of catch block
            bg.mesg();
            cout << "Try again.\n";
            continue;
        }
        catch(bad_gmean& hg) {
            cout << hg.mesg();
            cout << "Values used: " << hg.v1 << ", " << hg.v2 << endl;
            cout << "Sorry, you don't get to play any more.\n";
            break;
        } // end of catch block
    }
    cout << "Bye!\n";
    return 0;
}
```
[error-throw-object]는 어떤 상황에서 문제가 발생했는지에 따라 다른 catch문과 exception class을 사용하여 정보를 전달할 수 있다.

* Unwinding the Stack : 
exception이 발생하여 throw에 도달하면, function call stack들은 try block에 도달할 때까지 자동으로 제거된다.
이를 **unwinding the stack**이라고 부른다. 만약 main에도 try가 없었다면 프로그램이 종료된다.

* Rethrowing an exception : 
exception handler 내에서 throw; 가 쓰이면 catch한 exception을 call stack의 low level로 그대로 보낸다.

* catch(...) : 
특정 type인지 모르더라도 예외를 catch할 수 있다. 마치 switch문의 **default**와 같은 역할을 한다.
그러나 catch문은 sequential하게 처리되기 때문에 default exception은 반드시 맨 뒤에 있어야 한다.

### exception Class
c++을 사용자가 정의한 예외처리 클래스들의 base class로 사용할 수 있도록 exception class를 제공한다.
```c++
#include<exception>
class bad_hmean : public std::exception
{
public:
    const char* what() { return "bad arguments to hmean()"; }
};
class bad_gmean : public std::exception
{
public:
    const char* what() { return "bad arguments to gmean()"; }
}

try {
    // ...
}
catch(std::exception& e) {  // Polymorphism!
    cout << e.what() << endl;
}
```
위의 예시 코드에서 birtual member function인 **what()**은 string을 반환하며, 사용자에 의해 재정의 될 수 있다.
메모리를 할당하면서 발생하는 에러를 위와 같은 방식으로 예외처리한 [bad_alloc.cpp]에서 주의해야할 것은 할당한 동적 메모리를 해제하는 것이다. throw한 함수 내에서 바로 catch하여 해제할 필요가 있다.
```c++
void test2(int n)
{
    double* ar = new double[n];
    // ...
    if(oh_no) throw exception();
    // ...
    delete[] ar;    // never happens if exception occurs
    return;
}
void test3(int n)
{
    double* ar = new double[n];
    try {
        if(oh_no) throw exception();    // throw exception
    }
    catch(exception& ex) {              // and catch it
        delete[] ar;                    // to deallocate
        throw;                          // rethrowing ex
    }
    // ...
    delete[] ar;
    return;
}
```
* stdexcept Class :
stdexcept 헤더파일은 더 많은 exception class들을 정의한다.
logic_error과 runtime_error가 exception으로부터 상속 받아 정의되어 있다.

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