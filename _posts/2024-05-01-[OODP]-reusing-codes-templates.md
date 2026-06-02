---
layout: post
title: "[OODP] 11. Reusing Code in C++(2)"
category: study
tags: [oodp]
---

# Class Templates
Class template는 코드를 재사용하기 위한 또다른 수단이다.
C++의 STL(Standard Template Library)는 valarray, vector, array와 같은 여러 temlate class들을 지원한다.
이렇게 type-independent한 형태로 코드를 작성하는 패러다임을 generic programming이라고 부른다.

## Defining a Class Template
Class template의 정의는 function template과 유사하다.
개발자와 compiler가 찾기 쉬운(ex, header file) 곳에 정의할 필요가 있다.

Stack을 class template을 사용하여 구현해보자.
```c++
template <typename Type>    // Type : type parameter
// equivalent with
// template <class Type>
class Stack
{
private:
    enum {MAX = 10};    // constant specific to class
    Type items[MAX];    // holds stack items
    int top;            // index for top stack item
public:
    Stack();
    bool isempty();
    bool isfull();
    bool push(const Type& item);
    bool pop(Type& item);
};
template<typename Type>
Stack<Type>::Stack()
{
    top = 0;
}
```
여기서 type parameter(Type)은 매개변수처럼 원하는 type을 컴파일러에게 넘긴다.
function template의 경우, 넘겨받은 값의 type에 맞게 맞춰지지만 class template은 type을 명시해줘야 한다.
```c++
Stack<int> kernels;     // create a stack of ints
Stack<string> colonels; // create a stack of string objects

template<class T> void simple(T t) { cout << t << ‘\n’; }
simple(2);      // generate void simple(int)
simple(“two”);  // generate void simple(const char*)
```
일단 stack이 특정한 type으로 생성이 된다면, 해당 type의 ordinary object로 사용할 수 있다.


### Non-Type Arguments
Array temlate을 예시로 Non-Type argument를 어떻게 받을 수 있는지 살펴보겠다.
```c++
template <class T, int n>   // Type argument: T, argument: n
class ArrayTP
{
private:
    T ar[n];
public:
    ArrayTP() {}
    explicit ArrayTP(const T& v);
    virtual ~ArrayTP() {}
    virtual T& operator[](int i);
    virtual T operator[](int i) const;
};
template<class T, int n>
ArrayTP<T,n>::ArrayTP(const T& v)
{
    for(int i = 0; i < n; i++)
    ar[i] = v;
}

ArrayTP<double, 12> eggweights;
```
위 코드에서 컴파일러는 double eggweights[12]와 동일하게 대체한다.
이때, integer parameter(n)은 반드시 컴파일 타임에 결정되는 상수여야 한다. 상수이기만 한다면 integer type, enumeration type, reference, pointer 무엇이든 상관 없다. 그러나 altered value나 address를 받을 수는 없다(n++, &n).
이를 non-type 혹은 expression argument라고도 부른다.

### Template Versatility
### Using More Than One Type Parameter
### Default Type Template Parameters
### Explicit Specializations
```c++
template<class T> class Test
{
public:
    Test() { cout << "General template object\n"; }
};

template<> class Test<int>
{
public:
    Test() { cout << "Specialized template object for int\n"; }
};

int main()
{
    Test<int> a;    // Specialized template object for int
    Test<char> b;   // General template object
    Test<float> c;  // General template object
    return 0;
}
```

### Partial Specialization

### Member Templates
C++에서 class 안에 class를 정의할 수 있다. 
마찬가지로, template class 안에도 template class와 template function을 정의할 수 있다.
```c++
template<typename T>
class A {
private:
    template<typename V>
    class B { ... };
    B<int> q;
    B<T> m;

    template<typename U> U func(U a, T b) { ... }
    // ...
};
```

## Template Aliases

## Questions?
**Q1.**    <br>
**A1.** 

**Q2.**      <br>
**A2.** 

<!-- Links -->
[students]: