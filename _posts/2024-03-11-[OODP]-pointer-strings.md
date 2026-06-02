---
layout: post
title: "[OODP] 2. Compound Types(3)"
category: study
tags: [oodp]
---

> POSTECH OODP Lecture at 24SS

## Compound Types
- Built on basic types.
- Arrays, strings, pointers, structures

### Pointers
> Variable that holds the address of a value in Linear memory model

Linear memory model은 **flat memory model**이라고 불리기도 한다.

프로그램 기준에서 memory는 continuous memory addresses를 가진 것처럼 보이기 때문이다. 이것은 실제 physical addresses와는 다르다.
<!--more-->

![memory-appearance](/assets/img/2024-03-06/memory-appearance.png)

모든 variable은 특정한 메모리 위치에 할당된다. 예를 들어, 4-byte integer는 1000~1003에 할당된다.

![memory-variable](/assets/img/2024-03-06/memory-variable.png)

이떄 저장되는 방식에는 2가지가 있다. 
Big endian은 큰 숫자가 먼저 온다. Little endian은 큰 숫자가 나중에 온다.

각 변수의 address는 address operator(&)를 사용해 얻을 수 있다.

```c++
// 1000~1003번지
int variable = 0x12345678;
cout << &variable << endl;  // 1000
```

값의 위치를 저장하는 변수인 Pointer의 선언은 다음과 같다.
다만, 보통 type보다는 변수명에 붙여 쓰는 것은 아래 ptr2는 포인터지만, e는 char 변수이기 때문이다.

```c++
// typename * pointer_name;
int val;
int *ptr = &val;    // pointer to integer initialized to &val
char *ptr2, e;      // while ptr2 is a pointer to char, e is a char variable;
```

좀 더 다양한 예시가 [address.cpp]에 마련되어 있다.

- Dereferencing Operator(*) :
**\*pointer**는 pointer에 저장된 위치에 담긴 값을 기리킨다.

```c++
*ptr = 100;     // equivalent to 'val = 100;'
cout << *ptr << endl;   // 100
cout << val << endl;    // 100
val = 500;
cout << *ptr << endl;   // 500
cout << val << endl;    // 500
```

- 포인터의 크기는 가리키는 값의 type과 관계 없이 동일하다. 시스템의 memory address의 크기에 의해 결정된다. (32-bit:4GB -> 4, 64-bit:16TB -> 8)

```c++
cout << sizeof(char) << ", " << sizeof(char*) << endl;      // 1, 8
cout << sizeof(int) << ", " << sizeof(int*) << endl;        // 4, 8
cout << sizeof(double) << ", " << sizeof(double*) << endl;  // 8, 8

int *ptr1 = (int*)100;
int n1 = 10, m1 = 5;
ptr1 = ptr1 + n1; // ptr = 100 + sizeof(int) * n (4*n bytes) ➔ 140
ptr1 = ptr1 - m1; // ptr = ptr - sizeof(int) * m (4*m bytes) ➔ 120

double *ptr2 = (double*)100;
int n2 = 10, m2 = 5;
ptr2 = ptr2 + n2; // ptr = 100 + sizeof(double) * n (8*n bytes) ➔ 180
ptr2 = ptr2 - m2; // ptr = ptr - sizeof(double) * m (8*m bytes) ➔ 140
```

- Pointer Arithmetic and Pointer to Array
> Pointers are especially useful to handle arrays

```c++
double wages[3] = {10000., 20000., 30000. };
short stacks[3] = {3, 2, 1};

// These two statements work the same way
double *pw = wages;     
short *ps = &stacks[0];

// These three statements work the same way
cout << stacks[0] << ", " << stacks[1] << endl;
cout << *stacks << ", " << *(stacks + 1) << endl;
cout << *ps << ", " << *(ps+1) << endl;        
```

    * name of array = the address of the first element

```c++
*(ps+2) = 5;    // ps+2 == (the addr in ps) + 2*sizeof(short)
                // which is the addr of stacks[2]
ps[2] = 5;      // equivalent to *(ps+2) = 5
```
    * pointer arithmetic with dereferencing operator allow to access an element of an array

### Strings
> A series of characters stored in consecutive bytes of memory

- C-style string: stores a string in an array of **char**
> We can use pointers to strings in the same way as using pointer to array

    - string의 끝을 뜻하는 Null-character('\0')을 반드시 넣어줘야함.
    - C++에서는 string literals 사이에 whitespace(spaces, tabs, and newlines)만 존재한다면 자동으로 합쳐준다.

- string class library
> We can also use string functions of C++ standard libraries using pointers

```c++
// Name of char array(animal)은 constant이지만, str은 변수로 인식됨
char animal[5] = "bear"; // animal holds bear
char buff[20];
char *str = animal; // str points to the 1st element of animal

animal = &buf   // not allowed  : const는 바뀌지 않음
str = &buf      // okay

int len1 = strlen(animal);
int len2 = strlen(str);
strcpy(buff, animal);
strcpy(buff, str);
cout << animal << endl;
cout << str << endl;
```



## Questions?
**Q1.** Pointer에 저장된 값(ptr)는 특정 변수의 주소(&var)이고, Pointer가 역참조 값(*ptr)은 변수의 값(var)이라면, 왜 초기화할 떄 'int *ptr = &val;'라고 쓰는가?  <br>
**A1.** 'int *ptr = &val;'은 'int *ptr; ptr = &val;'을 한 줄로 축약하기 위한 약속이다.

**Q2.** 그런데 왜 '역참조'라는 명칭을 쓰는 건가? <br>
**A2.** 참조라는 용어는 현재 상태에 대한 근거가 외부에 있을 때 사용한다. dereferencing operator(*)는 현재 메모리에 담긴 값을 가리키는 연산자다. '변수값(상태)'이 '메모리 위치(근거)'를 참조하는 것과 반대로, 메모리 위치에서 변수값을 가져오는 역참조 과정을 수행한다.



<!-- Links -->
[address.cpp]: https://github.com/baejaeho18/code/blob/main/0-Education/cpp/DataTypes/CompoundTypes/address.cpp

[ptr_arith.cpp]: https://github.com/baejaeho18/code/blob/main/0-Education/cpp/DataTypes/CompoundTypes/ptr_arith.cpp
[ptr_string.cpp]: https://github.com/baejaeho18/code/blob/main/0-Education/cpp/DataTypes/CompoundTypes/ptr_string.cpp
[ptr_structure.cpp]: https://github.com/baejaeho18/code/blob/main/0-Education/cpp/DataTypes/CompoundTypes/ptr_structure.cpp
