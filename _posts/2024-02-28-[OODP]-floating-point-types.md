---
layout: post
title: "[OODP] 1. Dealing with Data(2)"
category: study
tags: [oodp]
---

> POSTECH OODP Lecture at 24SS
Fundamental Types

## Data Types
* Fundamental types
    - Integers
    - Floating-point numbers
* Compound types
    - Build on the basic types
    - Arrays, strings, pointers, structures

<!--more-->

### Integer Types
> Numbers with no fractional part, e.g., 2, 98, -5286, 0

![integer-types](/assets/img/2024-02-26/integer-types.png) <br>
c++은 불필요한 memory space의 낭비를 막기 위해 여러가지 type이 존재한다. 이때, system마다 가장 효과적으로 다룰 수 있는 크기인 **natural data size**가 다르기 때문에, 각 type의 크기가 표준으로 고정되어 있지는 않다. <br>
Integer type의 표준은 **int**이고, 음수를 표현할 일 없으면 unsigned을, 보다 넓은 범위를 다루고 싶다면 long이나 long long을, 보다 좁은 범위를 다룬다면 short나 심지어 char를 사용하면 된다.
만약 변수 type의 가능한 범위를 넘어서는 값을 할당한다면 overflow/underflow가 발생한다.

### Floating-Point Numbers
> Floating-point types represent numbers with fractional parts<br>
E notation : $$3.45E6 == +3.45e+6 == 3.45 * 10^6$$

C++에는 3가지 floating-point type이 존재한다.
![floating-types](/assets/img/2024-02-28/floating-types.png)
floating-point constant는 default로 double로 인식된다.
float로 하고 싶다면 Suffix f(or F)를 붙이고, long double로 하고 싶다면 Suffix l(or L)을 붙이면 된다. 이때, 소문자 l을 숫자 1로 착각할 여지를 없애고자 대문자 L을 사용하도록 권고한다.
```c++
1.234f      // float
2.45E20F    // float
2.345324E28 // double
2.2L        // long double

float var = 2.34;   // warning: as it tries to assign a double constant to a float variable
float var2 = 2.34f; // To avoid warning, use the suffix
```

### Arithmetic Operators
* C++ Arithmetic Operators <br>
Addition(+), Subtraction(-), Multiplication(*), Division(/), Modulus(%)

위 연산자들을 사용하는 코드는 [float_arith.cpp]에서 볼 수 있다.

* Expressions and Assignment Operators
> Expression: any value or any valid combination of values and operators consitute an expression

아래와 같은 할당문은 가능하다.
``` c++
mids = (cook = 4) + 6;
x = y = z = 4;
x = (y = (z = 0));
```

* Increment/Decrement Operators <br>
한 식에 증감 연산자를 두 번 사용해서는 안된다. C++은 이러한 상황에서 무엇이 정확한 우선순위인지 정해두지 않았다. Compiler에 따라 다른 결과가 나올 수 있다.
``` c++
y = ++z; // z += 1, y = z
y = z--; // temp = z, z -= 1, y = temp

x = 2 * x++ * (3 - ++x);    // ambiguous!
```

* Bitwise Operators
> Operate on the bits of integer values

- shift(<<, >>), negation(~), AND(&), OR(|), XOR(^)

``` c++
unsigned char a = 13;
unsigned char b = 22;

unsigned char sl = a << 3;  // 
unsigned char sr = a >> 3;  // 
unsigned char neg = ~a;     // 242 (255-13)
unsigned char and = a & b;  // 4
unsigned char or = a | b;   // 31
unsigned char xor = a ^ b;  // 27
```
위의 코드는 [bitwise.cpp]에서 다시 확인할 수 있다.
실제 비트의 변화를 보고 싶다면 [bit_displayer.h]를 사용하면 된다.

* Type Conversions
> C++ provides automatic type conversion

변수나 상수의 type에 맞는 값을 할당해줘야하는데, 다른 값을 넣을 경우 compiler는 자동으로 type conversion을 실행한다.
컴파일러에 의해 발생하므로 data loss가 발생할 수 있기 때문에 'warning'으로 알려주면 주의해야 한다.
``` c++
int main()
{
    using namespace std;
    cout.setf(ios_base::fixed, ios_base::floatfield);
    float tree = 3; // int converted to float
    int guess = 3.9832; // double converted to int
    int debt = 7.2E12; // Too large number for int. result not defined in C++
    cout << "tree = " << tree << endl;
    cout << "guess = " << guess << endl;
    cout << "debt = " << debt << endl;
    return 0;
}
```

* Type Casting Operators
> 2 forms of syntax : (typename)value, typename(value)

한편, 개발자가 의도적으로 Type을 지정해줄 수도 있다.
``` c++
#include <iostream>
int main() {
    using namespace std;
    int auks, bats, coots;
    // the following statement adds the values as double,
    // then converts the results to int
    auks = 19.99 + 11.99;
    // these statements add values as int
    bats = (int)19.99 + (int)11.99; // old C syntax
    coots = int(19.99) + int(11.99); // new C++ syntax
    cout << "auks = " << auks << ", bats = " << bats;
    cout << ", coots = " << coots << endl;
    char ch = 'Z';
    cout << "The code for " << ch << " is "; // print as char
    cout << int(ch) << endl;
    return 0;
}
```

위의 코드들은 [init_cast.cpp]에서 확인할 수 있다.

## Questions?


<!-- Links -->
[float_arith.cpp]: https://github.com/baejaeho18/code/blob/main/0-Education/cpp/DataTypes/FundamentalTypes/float_arith.cpp
[init_cast.cpp]: https://github.com/baejaeho18/code/blob/main/0-Education/cpp/DataTypes/FundamentalTypes/init_cast.cpp

[bondini.cpp]: https://github.com/baejaeho18/code/blob/main/0-Education/cpp/DataTypes/FundamentalTypes/bondini.cpp

[bitwise.cpp]: https://github.com/baejaeho18/code/blob/main/0-Education/cpp/DataTypes/FundamentalTypes/bitwise.cpp
[bit_displayer.h]: https://github.com/baejaeho18/code/blob/main/0-Education/cpp/DataTypes/FundamentalTypes/bit_displayer.h