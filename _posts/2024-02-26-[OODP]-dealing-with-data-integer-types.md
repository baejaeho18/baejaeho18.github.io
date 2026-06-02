---
layout: post
title: "[OODP] 1. Dealing with Data(1)"
category: study
tags: [oodp]
---

> POSTECH OODP Lecture at 24SS
Fundamental Types

# Variables
> Programs typically need to store information. <br>
To store an item, the program must keep track of 3 fundamental properties

1. 어떤 type의 정보를 저장할 것인가?
2. 어디(memory)에 저장할 것인가?
3. 어떤 value를 저장할 것인가?

```C++
int barincount = 5;
```
1. integer 타입으로 저장된다.
2. braincount는 정보가 저장된 memory location을 가리키는 데 사용된다.
3. braincount는 5라는 value를 뜻한다.
 
<!--more-->

## Names for Variables
> Naming Rules

- Alphabetic characters(a-Z), numeric digits(0-9) and underscore(_).
- 첫 글자는 numeric digit일 수 없다
- 대소문자는 구분된다
- C++ keyword(reserved name)은 사용할 수 없다
- 길이 제한은 없다
- Avoid names beginning with underscore character, e.g., _variable, __Variable.
    - 하나 혹은 두 underscroe(_) 뒤에 붙는 대문자 이름은 compiler에 예약되어 있다
    - 하나의 underscore로 시작하는 이름은 global identifier로 예약되어 있다.
    > Names beginning with two underscore characters or with an underscore character followed by an uppercase letter are reserved for use by the implementation, i.e., compiler. Names beginning with a single underscore character are reserved for use as global identifiers by the implementation.

## Data Types
* Fundamental types
    - Integers
    - Floating-point numbers
* Compound types
    - Build on the basic types
    - Arrays, strings, pointers, structures

### Integer Types
> Numbers with no fractional part, e.g., 2, 98, -5286, 0 

![integer-types](/assets/img/2024-02-26/integer-types.png) <br>
16-bit의 short integer type은 -32,768 ~ +32,767의 값을 표현할 수 있다. ($$2^{16} = 65536$$)
여러가지 type이 존재하는 이유는 불필요한 memory space의 낭비를 막기 위해서이다. 각 Type의 크기를 확인하는 코드는 [limits.cpp]를 참고하면 된다.

C++ 표준에서 type마다 고정된 크기를 두지 않은 것은 system마다 **natural data size**가 다르기 때문이다. natural size란 컴퓨터가 가장 효과적으로 다룰 수 있는 크기를 말한다. 예를 들어, IBM은 가장 natural한 16-bits를 int로 맞췄었다.<br>
Integer type의 표준은 **int**이고, 음수를 표현할 일이 없으면 unsigned을, 보다 넓은 범위를 다루고 싶다면 long이나 long long을, 보다 좁은 범위를 다룬다면 short나 심지어 char를 사용할 수 있다.

만약 변수 type의 가능한 범위를 넘어서는 값을 할당한다면 overflow/underflow가 발생한다.
![over-underflow](/assets/img/2024-02-26/over-underflow.png)
실제 사례를 [exceed.cpp]에서 확인할 수 있다.

* Integer Literals

10진수 뿐만 아니라, 16진수와 8진수로도 표현할 수 있다.
```C++
int chest = 42;     // decimal integer literal (42)
int waist = 0x42;   // hexadecimal integer literal starts with '0x' (66)
int inseam = 042;   // octal integer literal starts with '0' (34)
```
hexadecimal은 0~9, A-F로 표현된다. 0xF(or 0xf, 0XF, 0Xf)는 15, 0xFF는 255(1 byte)이다. 2 digits이 1 byte라는 사실은 low-level system programming에서 무척 편리하게 사용된다. <br>
```C++
cout << dec; // manipulator for changing number base
cout << "chest = " << chest << " (decimal for 42)" << endl;
cout << hex; // manipulator for changing number base
cout << "waist = " << waist << " (hexadecimal for 42)" << endl;
cout << oct; // manipulator for changing number base
cout << "inseam = " << inseam << " (octal for 42)" << endl;

// Output:
// chesct = 42 (defimal for 42) 
// waist = 2a (hexadecimal for 42)
// inseam = 52 (octal for 42)
```
위 코드들은 [hexoct.cpp]에 구현되어 있다.

* The char Type : Characters and Small Integers

char type은 1 Byte, 즉 8-bits 크기의 변수이다. 따라서 $$2^8$$개의 정수(-128~127)를 표현할 수 있다. 예컨데, ASCII로 알파벳 'M'은 숫자 77로 저장된다. 변수를 호출하면, 저장된 숫자 77은 type에 맞춰져 'M'으로 반환된다. 그러나 실제로 저장되는 것은 1-byte integer이기 때문에, integer operation을 적용하라 수 있다.
```C++
char ch = 'M';  // assign ASCII code for M to ch
int i = ch; // store same code in an int
cout << ch << i << ch + 1 << endl;
// output
// M 77 N
```
보다 다양한 사례가 [chartype.cpp]에 있다.

* The bool Type

Bool은 a boolean value(true or false)를 표현한다. 
Bool 타입이 소개되기 전까지, zero/nonzero number가 false/true로 사용되었다. 이는 아직까지도 유효하다.
```C++
bool is_ready = true;

int ans = true; // ans assigned 1
int promise = false;    // promise assigned 0

// Both in C and C++, nonzero numbers are interpreted as true
if ( 32 ) {
    cout << "True" << endl;
}
else {
    cout << "False" << endl;
}
// output
// True

bool start = -100;  // start assigned true
bool stop = 0;  // stop assigned false
```

* The sizeof Operator

data type들의 size는 system에 따라 다르다. 특정한 data type의 크기를 확인할 때 sizeof을 사용한다.
```C++
// sizeof operator yields size of type or of variable
// sizeof(type_name)
// sizeof(variable_name)
sizeof(int)
sizeof(n_short)
sizeof(n_long)
sizeof(n_llong)
```
자세한 코드는 [limits.cpp]에서 확인할 수 있다.


### How C++ Decides What Type a Constan Is?
변수는 선언하면서 type을 명확히 지정할 수 있다.
선언되지 않은 상수들은 정수형일 때 int type으로 자동으로 저장되지만, suffix를 활용하여 type을 명시할 수 있다. 만약 데이터의 값이 너무 커서 int형으로 저장할 수 없는 경우 차례로 unsigned, long, lon long으로 저장된다. 또한, 상수가 실수형일 경우에는 자동으로 double type으로 저장된다.
``` c++
cout << "Years = " << 1942 << endl;
cout << "Years = " << 1942U << endl;    // u or U
cout << "Years = " << 1942L << endl;    // l or L
cout << "Years = " << 1942Lu << endl;   // ul, uL, UL, Ul, lu, Lu, lU, LU
cout << "Years = " << 1942LL << endl;   // ll or LL
cout << "Years = " << 1942ULL << endl;  // ull, Ull, uLL, ULL
```
위와 아래에서 상수와 관련된 코드들은 [const.cpp]에 존재한다.

* #define Statement
소스코드 안에 숫자들이 많아질수록 의미를 파악하기가 어렵다. 코드 안의 숫자가 무엇을 의미하는지 고민해야하기 때문이다.
이때 **#define** 문을 사용해서 symbolic constants를 정의할 수 있다. symbolic constant는 변수처럼 이름을 가지고 있는 상수이다.
``` C++
#define NUM_WHEELS_PER_CAR  4
#define PI                  3.141592

int area = PI * radius * radius;
```
#define 문은 preprocessor directive이다. 마치 editor의 '전체 바꾸기(ctrl+h)'와 같은 역할을 한다. 코드 상의 위치와 관계없이 동작하지만, 일반적으로 파일의 시작에 둔다.

정의한 define 문이 상수가 아닌 연산식일 경우, 의도하지 않은 동작을 방지하기 위해 '( )'로 묶을 것을 권고한다.
``` C++
#define NUM_LEGS_PER_CAT    2+2
#define NUM_LEGS_PER_DOG    (2+2)
```

* The const Qualifier
> const type name = value;
그러나 **#define**문은 과거에 symbolic constants를 정의하던 방식이다. const는 symbolic constants를 정의하는 새로운, 더 나은 방법이다.

const는 #define에 비해 여러가지 장점이 있다. const는 type을 명시할 수 있고, 적용 범위를 조절할 수 있다. 또한, #define 처럼 미리 상수를 정의해두는 것이 아니라, Runtime 도중에 값을 할당할 수 있다. 또한 arrays, structures, classes와 같은 정교한(elaborate) 타입들로도 사용될 수 있다.
```C++
#define ONE = 1     // Traditional C style
                    // No explicitly specified type
                    // Uppercase for all letters
                    // Can use ONE outside of this block
const long Two = 2; // New to C++
                    // Uppercase for the 1st letter
                    // Allows to limit the scope of a const
const int Some_const

Some_const = i * 2; // create constants in the runtime

const Position origin = {0,0};
```

## Questions?
**Q1.** 구글 C++ style guide를 보았을 때, member 변수에는 underscore(_)를 사용하도록 권장하던데 상관없을까요? <br>
**A1.** class 멤버변수 앞에 underscore를 붙여야한다는 것은 전혀 아니다. 그래야할 이유가 없다. 다만 underscore를 앞에 쓰지 말라는 것은 컴파일러의 예약어와 겹칠 수도 있기 때문이다. 그런데 멤버변수는 별도로 implementation되기 때문에 사용해도 무방하다. <br>
 **+** [구글 C++ Convention]를 확인해본 결과, class 멤버변수에 underscore를 붙이는 것을 권장하는 것은 앞이 아니라 뒤였다. 우문에 현답이었다..

**Q2.** char가 정수까지 표현할 수 있다고 했는데, int로 type을 다시 선언해줘야 출력할 수 있다면 정수를 저정한다고 표현할 수 있나요? <br>
**A2.** 실제로 메모리에 저장되는 것은 정수가 맞지만, 이를 사람 눈에 보이게 표현될 때, type에 맞게 출력되는 것이다.

**Q3.** variable과 constant, literal의 용어가 헷갈리는데, 정확한 정의와 쓰임의 차이가 뭘까요? <br>
**A3.** Variable(변수)는 데이터를 저장하고 참조하기 위한 이름이 부여된 메모리 공간으로, 프로그램이 실행되는 동안 저장한 값이 변경될 수 있다. 한편, Constant는 프로그램에서 변경되지 않는 값이다. 보통 가독성을 높이기 위해 사용된다. Literal은 코드에서 고정된 데이터 표현으로, 상수일 수도 있고, 변수에 할당될 수도 있다. 예를 들어, 5, 3.24L, 'a', "Hello" 등이 literal이다. <br>
보다 자세한 설명을 위해서는 컴파일러 중 parser의 역할을 이해해야한다. parser는 코드를 Reserved Keyword, Identifier, Literal, Operator, special character, comment 등으로 분류하여 읽는다.

<!-- Links -->
[구글 C++ Convention]: https://torbjorn.tistory.com/257
[limits.cpp]: https://github.com/baejaeho18/code/blob/main/0-Education/cpp/DataTypes/FundamentalTypes/limits/limits.cpp
[exceed.cpp]: https://github.com/baejaeho18/code/blob/main/0-Education/cpp/DataTypes/FundamentalTypes/limits/exceed.cpp
[hexoct.cpp]: https://github.com/baejaeho18/code/blob/main/0-Education/cpp/DataTypes/FundamentalTypes/hexoct.cpp
[const.cpp]: https://github.com/baejaeho18/code/blob/main/0-Education/cpp/DataTypes/FundamentalTypes/const.cpp
[chartype.cpp]: https://github.com/baejaeho18/code/blob/main/0-Education/cpp/DataTypes/FundamentalTypes/chartype.cpp