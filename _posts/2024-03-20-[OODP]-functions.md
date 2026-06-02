---
layout: post
title: "[OODP] 5. Functions: C++ Programming Modules"
category: study
tags: [oodp]
---

> POSTECH OODP Lecture at 24SS

C++에서 function을 사용하려면 세가지 조건을 만족해야 한다.
- Provide a function **definition** : describe the actions the function performs
- Provide a function **prototype** : interface which specifies the return type, name and arguments
- **Call** the function
<!--more-->
실제로 C++ 표준 라이브러리들은 C++ Compiler를 설치했다면, 이미 컴파일된 object 파일의 형태로 저장되어 있을 것이다.
import하는 헤더파일에 prototype이, a(ubuntu)나 lib(msvc)를 확장자로 하는 object file에 definition이 저장되어 있다.
```bash
$: ls /usr/lib/gcc/x86_64-linux-gnu/7
cc1 crtoffloadtable.o libbacktrace.a libgomp.so libmpx.so libsupc++.a
cc1plus crtprec32.o libcc1.so libgomp.spec libmpx.spec libtsan.a
collect2 crtprec64.o libcilkrts.a libitm.a libmpxwrappers.a libtsan.so
crtbegin.o crtprec80.o libcilkrts.so libitm.so libmpxwrappers.so libubsan.a
...
```

## Function ProtoType
컴파일러는 prototype에 근거하여 return value를 저장할 공간을 만들고, 선언된 argument와 실제 argument 개수와 type을 비교한다. 만약 다르다면, 가능한 범위 내에서 올바른 type으로 바꿔준다.
C에서는 int형 argument에 double형 값을 넣으면, 64-bits 중 첫 16-bits만 읽어 오류를 초래할 수 있다.
그러나 C++은 arithmetic type이라면 자동으로 type conversion을 실행한다. 물론 언제나 가능한 것은 아니다. 소수점 이하의 작은 수는 단순히 날리면 되지만, 8.33E27처럼 int형의 범위를 초과하는 값일 경우 올바르게 변환되지 않는다. 이런 경우, compiler는 'possible data loss'를 경고한다.
이러한 과정을 **static type checking**이라고 부른다.

### Function Arguents
- Passing by value(call by value) : argument로부터 callee의 변수값을 복사해 사용한다.

``` c++
double cube(double x) {
    x = x * x * x;
    return x;
}
```

- Passing by reference(call by reference) : callee가 argument와 동일한 변수를 사용한다.

``` c++
// Mimicking call by reference using pointers
void multiply2(int *p) {
    *p *= 2;
}
```

pointer를 call by value로 봐야하는지 call by reference로 봐야하는지는 학부생 수준에서 많이들 헷갈려한다. 
사실 pointer 역시 주소라는 값을 복수하는 것이기 때문에, call by value로 봐야한다. ~~여백이 부족하니 적지 않겠다~~
포인터에 조금 더 알아보고 싶은 분은 [포인터]를 참고하셔도 좋을 것 같다.

C++에서는 call by reference를 '&' 연산자를 활용해서 구현하는데, 이는 다음 강의에서 정리하겠다.

## Functions and Arrays

``` c++
int cookies[10];

cout << "cookies:" << cookies << endl;
cout << "&cookies[0]:" << &cookies[0] << endl;
cout << "&cookies:" << &cookies << endl;
```
위의 출력이 어떻게 이뤄질지 알고 있는가?
헷갈린다면, 'Compound Type'을 다시 정주행하시라.
중요한 것은, function에서 array를 넘겨 받을 때 주소로 받고, 이 주소는 'arr[]'여도 되고 '* arr'여도 된다는 것이다.
적어도 function prototype의 header에서만은 두 표현은 완전히 동일하다.
이 표현을 통해 call by value가 array 내용 전체가 아닌, single address로 이루어져 cost of time and memory가 감소한다.

[arrfun.cpp], [strgfun.cpp]

그러나 호출된 함수가 호출한 함수의 원본값을 사용하기 때문에 data corruption이 발생할 위험이 있다.
이러한 상황을 막기 위해 **const** modifier가 C++에서 제공된다.

### Pointers and const

[constptr.cpp]



## Questions?
**Q1.** 왜 포인터를 call by reference로 볼 수 없는거야? 그렇다면 진짜 call by reference는 어떤 것이야?<br>
**A1.** 포인터 자체가 주소를 저장하는 변수이다. 따라서 엄밀히 말하면 'call by reference(참조)'라기 보다는 'call by address(주소)'라고 할 수 있다. 포인터를 통한 간접 참조(indirect reference)라고도 부를 수 있겠다.

**Q2.** 함수의 return type에는 어떤 것이 올 수 있나요? <br>
**A2.** array를 제외한 모든 type이 올 수 있다. integers, floating-point numbers, pointer and even structures and objects! 그러나 흥미롭게도, structure이나 object 내의 array는 반환되지만 array 자체는 반환될 수 없다. <br>
**+** why? 반환된 배열을 해제할 적절한 시기나 방법을 알 수가 없음.

<!-- Links -->
[포인터]: https://handhp1.tistory.com/47

[arrfun.cpp]:
[strgfun.cpp]:
[constptr.cpp]:
[arr_func_ptr.cpp]: 