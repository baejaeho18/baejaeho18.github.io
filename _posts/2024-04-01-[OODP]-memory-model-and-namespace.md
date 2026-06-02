---
layout: post
title: "[OODP] 6. Memory Models and Namespaces"
category: study
tags: [oodp]
---

> POSTECH OODP Lecture at 24SS

# Memory Model
## Separate Compilation

C++은 실행시키기 위해 compiler와 linker 두 단계를 거친다.
함수는 여러 파일에 나뉘어서(선언부, 정의부) 작성될 수 있는데, 그중 한 파일만 수정할 수 있다.
이런 경우 나눠진 여러 파일들 전체를 컴파일하지 않고, 수정된 몇몇 파일만 컴파일 한 후, 다른 파일들의 이전 컴파일 결과들과 link하면 빠르게 실행시킬 수 있다.

- main.cpp : 함수가 실행되는 곳이다. 필요한 함수들을 호출한다.
- func.h : 함수들이 선언되는 곳이다. 여러 파일에서 사용되는 function prototypes과 inline functions, structure declarations, class declarations, template declarations 그리고 symbolic constants가 존재한다.
이러한 정보들은 컴파일러에게 어떻게 함수를 다루고, 변수를 생성할지 알려줄 뿐, 실제로 생성하지는 않는다.
- func.cpp : 함수들이 정의되는 곳이다. func.h에서 선언된 함수들을 실제로 구현한다.
<!--more-->
## Storage Duration, Scope, and Linkage

C++ uses three seperate schemes for storing data
1) Automatic storage duration : Local variables으로 stack 영역에 할당된다. 프로그램이 실행되면서 함수나 block 안에서 정의되어 할당된 메모리다. function이나 block을 떠나면 자동으로 해제된다.
2) Static storage duration : 함수 밖이나 **static** keyword로 정의된 변수. 프로그램이 실행되는 동안 유지된다.
3) Dynamic storage duration : **new** 연산자로 할당된 메모리. **delete** 연산자로 해제되거나 프로그램 종료까지 유지

본 소챕터에서는 세가지 Static Storage의 형태를 살펴보겠다.
### External Linkage
Global variables는 external linkage를 가지고 있다.

C++에는 'one definition rule'이 있다. variable definition은 단 한번만 가능하다는 법칙이다.
함수 선언에는 2개의 절차가 있는데, defining declaration(simply, definition)과 referencing declaration(simply declaration) 중 첫번째 절차가 위 법칙에 해당한다.
**external** 키워드로 여러 파일에서 하나의 변수를 사용할 수 있다. 함수의 prototype처럼 다른 곳에서 해당 변수가 이미 정의되어있다고 알려주는 셈이다.
만약 extern 키워드와 함께 초기화를 하면, extern 키워드는 무시된다.

그런데, 위 법칙이 동일한 이름의 변수를 만들 수 없다는 뜻은 아니다.
광역변수와 동일한 이름의 지역변수는 해당 지역에서 우선순위를 가진다.
[]

### Internal linkage
Static variable을 **static** 키워드를 붙여 정의한다.
선언한 파일에서만 사용하고 싶을 때 사용된다.
[]

### No Linkage
마찬가지로 **static** 키워드를 사용하되 특정 block 안에서만 유효하도록 정의할 수 있다.
그렇다고 block 밖으로 나가면 해제되는 것은 아니니 주의해야한다.

[]

## Function and Linkage
동일한 이름과 signiture의 함수가 여러개 있다면 link 에러가 발생한다.
그러나 함수 앞에 **static** 키워드를 붙이면, 해당 파일에서만 동작한다.


# Namespace
지금까지는 표준 라이브러리만 사용해왔지만, 큰 프로젝트를 다루려면 다양한 라이브러리를 다뤄야 한다.
그 중에서는 분명 동일한 함수명을 가진 라이브러리들도 있을 것이다.
Name collision은 compile error를 유발하는 큰 문제다.
이러한 상황에서 namespace는 identifier의 범위를 정의해준다.

``` c++
// image.h
namespace Image {
    ...
    image* load(const char* filename);
    ...
}
// audio.h
namespace Audio {
    ...
    audio* load(const char* filename);
    ...
}
// main.cpp
#include <image.h>
#include <audio.h>
int main()
{
    Image::image* img = Image::load("image.jpg");
}
```

Namespace를 정의하기 위해서는 **namespace**를 키워드로 block을 만들어준다.

어떤 namespace를 사용할 것인지 명시하는 방법은 여러가지가 있다.
1) Scope resolution operator: 사용할 identifier의 namespace를 명시하기 위해서는 **::**를 키워드로 한다.
2) directive: 특정 block의 모든 identifier에 적용하기 위해서는 **using namespace ___** directive를 사용한다.
3) declaration: 특정 identifier의 namespace를 명시하려면 **using {namespace}::{identifier}**을 사용한다.
``` c++
using Audio::audio;
using Image::image;
audio *aud;
image *img;
aud = Audo::load("...");
```

## Questions?
**Q1.** '#ifndef #define #endif'가 #progma once과 동일한가?  <br>
**A1.** 동일하다. 그러나 #progma once는 많은 컴파일러에서 지원해주지만 엄밀히 말하면 표준은 아니다.

**Q2.**      <br>
**A2.** 


<!-- Links -->
