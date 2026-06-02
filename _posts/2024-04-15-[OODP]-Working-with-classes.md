---
layout: post
title: "[OODP] 8. Working with Classes"
category: study
tags: [oodp]
---

> POSTECH OODP Lecture at 24SS


### Overloading the << Operator
본래 **<<**는 bit shift operator지만, ostream class는 << 연산자를 overload 했다.

```c++
cout << 1 << 2.0 << "three" << endl;

cout << a << b;
(cout.operator<<(a)).operator<<(b);
operator<< (operator<<(cout, a), b);
```
<!--more-->
개발자가 직접 << 연산자를 overloading 할 수도 있다.
일단 overload하면, cout을 비롯한 다른 **ostream** 객체에서도 사용할 수 있다.
```c++
class Complex
{
private:
    double real, imag;
public:
    friend ostream &operator<<(ostream &os, const Complex&x) {
        os << x.real << "+" << x.imag << "i";
        return os;
    }
}

Complex  c = a * 3.0 + b * b;
cout << c << endl;

ofstream f_out("test.txt");
f_out << "File output: " << c << endl;
```

### Overloading the Unary - Operator

## Automatic Comversions and Type Casts for Classes
C++이 built-in types들 간의 conversion을 어떻게 다루는지 확인해보자.
```c++
// Automatic type conversion
long count = 8;     // int value 8 converted to type long
double time = 11;   // int value 11 converted to type double
int side = 3.33;    // double value 3.33 converted to type int 3

// Type cast
int *p = 10;            // invalid. 10 is not an address. no automatic type conversion
int *p = (int *) 10;    // int 10 is converted to an address using a type cast
```

C++이 user-defined types의 conversion을 어떻게 다루는지 확인해보자.
```c++
class Complex
{
private:
    double real, imag;
public:
    Complex() {}
    Complex(double r, double i = 0.0) { real = r; imag = i; }
    // ...
};

int main()
{
    Complex c;
    c = 100.;   // c = Complex(100.); => c = Complex(100., 0.);
    cout << c << endl;
    return 0;
}
```
Complex의 생성자가 하나의 argument를 가진 것으로 인식해 automatic type conversion이 발생했다.
무척 편리하지만, 예상치 못한 부작용이 발생할 수 있다.
automatic conversion을 막기 위해서는 'explicit'을 사용해야한다.
```c++
class Complex
{
    // ...
    explicit Complex(double r, double i = 0.0) { real = r; image = i; }
    // ...
};

Complex x;      // create a Complex number object
x = 15.2;       // not valid if Complex(double r) is declared as explicit
x = Complex(15.2);      // ok, an explicit conversion
x = Complex(15.2, 3.0); // x = 15.2 + 3.0i
x = (Complex)15.2;      // ok, old form for explicit typecast
```
이제 우리는 int(x)와 같은 표현이 class object의 생성자를 호출하여 typecast를 고정한다는 것을 알 수 있다.

지금까지 native type의 값을 생성자를 사용하여 user-defined type으로 convert하는 방법을 살펴보았다. 그 반대도 알아보자.

```c++
Complex x(10.0, 2.0);
double y = x;
```
위 코드는 당연히 오류가 발생한다. double은 native type이기 때문에 class constructor가 존재하지 않기 때문이다.
대신, 이 코드를 동작하게 하려면 operator overloading이 필요하다. 이를 **conversion function**이라고 부른다.

```c++
class Complex
{
    // ...
public:
    operator double() const { return real; }
    // ...
};

Complex c(100., 3.);
double x = c;
// equivalent to 
// x = c.operator double();
// x = (double)c;
// x = double(c);
```
만약 type conversion은 허용하지만, automatic type conversion은 방지하고 싶다면 위와 마찬가지로 **explicit**을 사용하면 된다.
```c++
explicit operator double() const { return real; }

Complex x(100.0, 3.0);
double y = x;       // invalid
double y = double(x);   // yes
double y = (double)x;   // yes
double y = x.operator double(); // ?
```

## Questions?
**Q1.** nonmember function이 뭔가요? <br>
**A1.** 

**Q2.**      <br>
**A2.** 


<!-- Links -->
