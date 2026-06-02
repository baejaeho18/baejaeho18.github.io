---
layout: post
title: "[OODP] 2. Compound Types(1)"
category: study
tags: [oodp]
---

> POSTECH OODP Lecture at 24SS

## Compound Types
- Built on basic types.
- Arrays, strings, pointers, structures

<!--more-->

### Array
> A data form that can hold several values, all of one type

```c++
int cards[4] = {3, 6, 8, 10};
int hand[4];
hand[4] = {5,6,7,9};
hand = {5,6,7,9};   // invalid
hand = cards;       // invalid

float hotelTips[5] = {5.0f, 2.5f};
unsigned int counts[10] = {};

short things[] = {1,3,5,6};
```
- Format: typeName arrayName[arraySize];
- arraySize: integer constant, cannot be a variable <br>
    arraySize에 벗어나는 index를 참고하면 runtime error가 발생한다. index는 0부터 시작한다.
- Initialization Rules for Arrays
    - 초기화는 array를 정의할 때만 가능하다. 다른 array를 그대로 할당하는 것도 불가능하다.
    - 초기화 시, 정해진 크기보다 적은 값만을 할당할 수 있다. 컴파일러는 미할당된 값들에 0을 넣어준다.
    - size를 명확히 정해주지 않아도 된다. 컴파일러에 의해 자동으로 결정된다.

보다 상세한 예제는 [array.cpp]에서 확인할 수 있다.


### Strings
> A series of characters stored in consecutive bytes of memory

- C-style string: stores a string in an array of **char**
    - string의 끝을 뜻하는 Null-character('\0')을 반드시 넣어줘야함.
    - C++에서는 string literals 사이에 whitespace(spaces, tabs, and newlines)만 존재한다면 자동으로 합쳐준다.
``` c++
char charr[20];
cout << "Length of string in charr before input: "
    << strlen(charr) << endl;
// 27, 102, 107, ... : random number
```
초기화되지 않은 array의 크기는 선언한 array의 크기보다 클 수 있다. 이는 strlen() 함수가 null character를 찾을 때까지 세기 때문이다. 테스트해보고 싶다면 [str_arith.cpp]를 확인해보자.

- string class library는 후에 다시 정리하겠다.



## Questions?
**Q1.** Array에서 size를 const로 선언한 값으로 정할 수 있는가? <br>
**A1.** 물론이다. [string.cpp]과 [cinstr.cpp]에서 예시를 확인할 수 있다.



<!-- Links -->
[array.cpp]: https://github.com/baejaeho18/code/blob/main/0-Education/cpp/DataTypes/CompoundTypes/array.cpp
[str_arith.cpp]: https://github.com/baejaeho18/code/blob/main/0-Education/cpp/DataTypes/CompoundTypes/str_arith.cpp
[string.cpp]: https://github.com/baejaeho18/code/blob/main/0-Education/cpp/DataTypes/CompoundTypes/string.cpp
[cinstr.cpp]: https://github.com/baejaeho18/code/blob/main/0-Education/cpp/DataTypes/CompoundTypes/cinstr.cpp