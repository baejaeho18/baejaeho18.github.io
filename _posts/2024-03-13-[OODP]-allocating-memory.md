---
layout: post
title: "[OODP] 2. Compound Types(4)"
category: study
tags: [oodp]
---

> POSTECH OODP Lecture at 24SS

### Allocating Memory with new

``` c++
short months[12];   // creates array of 12 short
```

할당하는 크기는 반드시 정수형 상수여야 한다(변수여서는 안된다).
물론, compile time에는 실제로 얼마나 메모리가 필요할지 모를 수도 있다. 그 경우에는 dynamic memory allocation을 활용한다.

``` c++
int num_students;
cin >> num students;
int student_scores[num_students];   // invalid

int *student_score = new int[num_sutdents];
student_score[0] = 100;
student_score[1] = 50;
// ...
```

* new operator : dynamically allocates a memory space and returns its address
<!--more-->
![new_allocator](/assets/img/2024-03-13/new_allocator.png)

new를 사용한 예제는 [use_new.cpp]에서 볼 수 있다.

* delete operator : deallocates momory allocated by the **new** operator.

```c++
int *ps = new int;
delete ps;
delete ps;      // not okay now

int jugs = 5;
int *p1 = &jugs;
delete p1;      // not allowed
```

new가 아닌 ordinary variables로 선언된 메모리는 delete로 해제할 수 없다.

만약 delete를 하지 않으면, Heap 영역에서 메모리가 계속 할당되어 있어 가용가능한 메모리가 부족해져 out-of-memory error가 발생한다. 이를 **Memory Leak**(메모리 누수)라고 부른다.

* Dynamic Arrays : An array that is created in runtime <br>
size를 선언할 때, 변수를 사용할 수 있다.

``` c++
int *psome = new int[n_elems];  // 메모리 공간 크기 = sizeof(int) * n_elems
```

[array_new.cpp]를 참고하라.

* Dynamic Structures : 마찬가지로 structure를 new로 할당할 수 있다.


### C/C++ Program Memory Layout
![memory_layout](/assets/img/2024-03-13/memory_layout.png)

## Array Alternatives
### String Class
C++ standard libarary에서 지원한다.
**#include <string>** 헤더파일로 지원되며, 이는 **<cstring>**과는 전혀 다르다. **std** namespace에 포함되어 있다.

String Class는 구 char array보다 기능적으로 상위호환이다.
* =, +, cin, cout과 같은 연산자 등을 편리하게 사용할 수 있고,
* array 방식으로 index를 통해 개별 문자에도 접근할 수 있으며,
* strcpy, strcat, strlen, getline과 같은 함수를 지원해둔다.


### Vector Template Class 
**String** class와 유사하다. vector 객체의 크기는 runtime 중에 정할 수 있다. 또한 새로운 데이터를 끝이나 중간에 추가할 수 있다.

동적할당을 신경쓰지 않고, 초기화 할 때 크기를 가변적으로 정할 수 있다.

일반 Arrays와 Vector Object, Array Object를 비교한 코드는 [vector.cpp]에 있다.

## Questions?
**Q1.** new와 malloc의 어떤 차이가 있을까? <br>
**A1.** 둘 모두 heap 영역에 memory를 잡아주는 동적할당하는데 쓰인다. new는 생성자를 자동으로 호출한다. 즉, 객체를 자동으로 초기화해준다. 다만 malloc은 realloc 같은 함수로 간편하게 재할당 할 수 있는 것에 반해, new는 반드시 삭제 후 재할당해야 한다.

**Q2.** argument list 같은 것들은 stack에 할당되나요, heap에 할당되나요? <br>
**A2.**

**Q3.** 그럼 vector Template class는 내부가 linked list로 구현되어 있는 건가요? 또, Template은 헤더에 실제 구현도 넣게 되어 있던데, vector 헤더 파일도 그렇게 구성되어 있나요? <br>
**A3.** 

**Q4.** delete와 같이 할당 해제하면, 해당 메모리의 값들이 reset되는 건가요, 아니면 값을 그대로 두되 할당 여부에 대한 flag 값만 바뀌는 건가요? <br>
**A4.**


<!-- Links -->
[use_new.cpp]: https://github.com/baejaeho18/code/blob/main/0-Education/cpp/DataTypes/CompoundTypes/use_new.cpp
[array_new.cpp]: https://github.com/baejaeho18/code/blob/main/0-Education/cpp/DataTypes/CompoundTypes/array_new.cpp

[mixtypes.cpp]: https://github.com/baejaeho18/code/blob/main/0-Education/cpp/DataTypes/CompoundTypes/mixtypes.cpp

[vector.cpp]: https://github.com/baejaeho18/code/blob/main/0-Education/cpp/DataTypes/CompoundTypes/vector.cpp