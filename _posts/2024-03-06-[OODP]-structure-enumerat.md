---
layout: post
title: "[OODP] 2. Compound Types(2)"
category: study
tags: [oodp]
---

> POSTECH OODP Lecture at 24SS

## Compound Types
- Built on basic types.
- Arrays, strings, pointers, structures

### Structures
> Allow developer to store all the related information of different user-definable types in a single place
<!--more-->

```c++
// structure declaration
struct inflatable
{
    char name[20];
    float volume;
    double price;
};

struct inflatable goose;    // keyword struct required in C
inflatable vincent;         // keyword struct not required in C++

struct numbers
{
    float v1;
    double v2;
} a, b;         // can directly declare variables here, too

struct
{
    string name;
    int age;
} ds, jy;       // also can omit type name
```

Structure의 각 member들은 membership operator(.)를 통해 접근 가능하다.
Structure의 초기화는 assignment operator(=)를 사용해 이루어진다.
Structure의 배열을 생성하는 것도 가능하다.  

다양한 예제를 확인하고 싶다면 [structure.cpp]를 참고하라.

### Enumberations
> An alternative to **const** for creating symbolic constants. Also lets you define new types but in a fairly restricted fashion

```C++
// Syntax:
enum spectrum {red, orange, yellow, green, blue, violet, indigo, ultraviolet};

spectrum band;
band = blue;    // valid
band = 2000;    // invalid, 2000 not an enumerator
band++;         // invalid
band = orange + red;    // invalid
band = 2;       // how about this?
```

열거형은 enumeration이라는 새로운 type을 만들어준다. 예를 들어, spectrum에 0-7의 symbolic constant integer가 할당된다. 순서대로 정수가 할당되는 것이 아니라 '='를 활용해 원하는 정수를 명시적으로 할당할 수 있다.

```c++
enum bits { one = 1, two = 2, four = 4, eight = 8};
int v = two;        // two converted to integer 2
cout << v << endl;  // 2
```

enum과 관련된 더 예제가 [enum.cpp]에 준비되어 있다.


## Questions?
**Q1.** Array는 assignment operator(=)를 사용해서 복사할 수 없지만, Structure는 '='를 사용해서 복사할 수 있다. 그렇다면 Structure 안에 있는 Array도 '='를 사용해서 그 Structure를 복사할 때 복사가 될까? 
**A1.** Yes. 어떤 operation을 통해 되는지 구현해보고 싶네.

**Q2.** 왜 Array는 Structure과 달리 assignment operator(=)를 사용할 수 없게 설계되었을까? 어떤 사상에 의해서일까?
**A2.** 

**Q3.** Enumerator에 일부만 정수를 할당한다면 나머지는 어떻게 할당될까? 만약 앞에서 자동으로 할당된 정수와 중복되는 값을 나중에 할당한다면 어떻게 될까?
**A3.** 


<!-- Links -->
[structure.cpp]: https://github.com/baejaeho18/code/blob/main/0-Education/cpp/DataTypes/CompoundTypes/structure.cpp
[enum.cpp]: https://github.com/baejaeho18/code/blob/main/0-Education/cpp/DataTypes/CompoundTypes/enum.cpp