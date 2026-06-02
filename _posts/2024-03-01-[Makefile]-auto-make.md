---
layout: post
title: "[Makefile] bmake: before make"
description: >
  Makefile auto-generator in specific file path.
category: project
tags: [scripts]
---

장담컨데, Makefile을 만드는 것은 정말 귀찮고 지루한 일이다.
동시에 단 하나라도 실수가 있으면 프로젝트 빌드 자동화에 커다란 누가 생긴다.
물론, visual studio라는 편리한 프레임워크가 존재하지만 간단한 코드들의 경우 가볍게 작성하고 실행시키고 싶을 때가 있지 않은가?
절대 visual studio 솔루션 관리가 귀찮아서 그런 것은 아니다. ㅎㅎ

<!--more-->

### bmake.bat(or sh) 생성
우선 목표는, 파일 경로를 input으로 받으면 해당 파일 혹은 디렉토리 밑에 있는 파일들을 모두 포함하는 Makefile을 만드는 것이다.
지금 단계에서는 cpp 파일만 존재한다고 가정한다.

Batch Script (Windows):
```sh
@echo off
REM Usage: bmake.bat <path>

set "path=%1"

REM Generate Makefile
    echo CC = g++ > Makefile
    echo CFLAGS = -std=c++11 -Wall >> Makefile
    echo. >> Makefile
    echo SRCS =$(wildcard *.cpp) >> Makefile
    echo. >> Makefile
    echo OBJS = $(SRCS:.cpp=.o) >> Makefile
    echo. >> Makefile
    echo TARGET = output.exe >> Makefile
    echo. >> Makefile
    echo all: $(TARGET) >> Makefile
    echo. >> Makefile
    echo $(TARGET): $(OBJS) >> Makefile
    echo.	$(CC) $(CFLAGS) -o $@ $^^ >> Makefile
    echo. >> Makefile
    echo %%.o: %%.cpp >> Makefile
    echo.	$(CC) $(CFLAGS) -c -o $@ $^< >> Makefile
    echo. >> Makefile
    echo clean: >> Makefile
    echo.	del $(OBJS) $(TARGET) >> Makefile

echo Makefile generated successfully!
```

이제 실행하고, "Makefile generated successfully!"라는 글자가 뜨길 기다려보자.
```bash
PS C:\Users\bjh17\Projects\code\0-Education\oodp\complex_calculator> .\bmake.bat .
Makefile generated successfully!
```

### Makefile Test
생성이 잘 되었다면, make 명령어를 실행하면 된다. 
아! window에서는 GNU make를 [다운로드](https://gnuwin32.sourceforge.net/packages/make.htm) 받아야 make 명령어가 실행된다. setup을 다운로드 받은 후, 환경변수에 'C:\Program Files (x86)\GnuWin32\bin'를 추가해주자.
```bash
PS C:\Users\bjh17> make -v
GNU Make 3.81
Copyright (C) 2006  Free Software Foundation, Inc.
This is free software; see the source for copying conditions.
There is NO warranty; not even for MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.

This program built for i386-pc-mingw32
```
위처럼 버전을 확인할 수 있다면 된다. 만약 잘되지 않았다면 [window에서 make 설치하는 블로그](https://jiurinie.tistory.com/80)를 참고해보라.

그런데.. make 명령어를 실행하니 오류가 뜬다.
```bash
makefile:9: *** 분리기호 이(가) 빠졌음.  멈춤.
makefile:9: *** 분리기호  (8개의 공백 말고 탭을 쓰려고 한 것 아니었습니까?)이(가) 빠졌음.  멈춤.
```
이 오류가 왜 발생했는지 찾아보자.
[make 오픈소스](https://github.com/pololu/make/blob/master/po/ko.po)를 찾아갔다.
둘러보니 read.c:1027~1029를 확인하면 알 수 있을 것 같다.
```C
fatal (fstart, _("missing separator%s"),
      (cmd_prefix == '\t' && !strneq(line, "        ", 8))
      ? "" : _(" (did you mean TAB instead of 8 spaces?)"));
```
Makefile의 구분자(seperator)는 TAB을 사용해야하는데, 본 Makefile은 space로 공간을 차지했다는 뜻이다.
그렇다면 bmake.bat이 TAB 대신 "    "를 사용한 것이 문제가 된 것 같다.
```bash
PS C:\Users\bjh17\Projects\code\0-Education\oodp\complex_calculator> make
g++ -std=c++11 -Wall -c -o complex_calculator.o complex_calculator.cpp
g++ -std=c++11 -Wall -o output.exe complex_calculator.o
```
space 4개 대신 TAB을 넣어주니 잘 작동한다.
만들어진 Makefile은 다음과 같다.
```Makefile
CC = g++
CFLAGS = -std=c++11 -Wall
# 파일 목록을 직접 지정하거나, 다른 방법으로 파일 목록을 가져와서 지정합니다.
SRCS = $(wildcard *.cpp)
# .cpp 파일들을 .o 파일들로 변환합니다.
OBJS = $(SRCS:.cpp=.o)
# 최종적으로 만들어질 실행 파일입니다.
TARGET = output.exe
all: $(TARGET)
# 실행 파일 생성 규칙입니다.
$(TARGET): $(OBJS)
	$(CC) $(CFLAGS) -o $@ $^
# .cpp 파일들을 .o 파일로 컴파일하는 규칙입니다.
# 여기서 $< 는 현재 타겟의 첫 번째 의존성을 나타냅니다.
%.o: %.cpp
	$(CC) $(CFLAGS) -c -o $@ $<
# clean 타겟: 생성된 오브젝트 파일과 실행 파일을 삭제합니다.
clean:
	del $(OBJS) $(TARGET)
```

### 환경변수에 추가
자, 마지막 단계이다.
bmake.bat이 잘 작동하는 것을 확인했으니, 이 명령어가 내 로컬 어디서나 작동하도록 만들어야겠다. 내가 필요할 떄마다 이 bat 파일을 복사해와야하면 뭐하러 사서 고생을 했겠는가?

bmake.bat을 C:\Users\bjh17\Projects\code\1-scripts\bmake 디렉토리로 이동시킨 후, 해당 경로를 시스템환경변수에 추가해주었다.
이제 로컬 어디서나 'bmake.bat {path}'를 입력하면 동작한다.

만들어진 bmake.bat은 [github](https://github.com/baejaeho18/code/blob/main/1-scripts/bmake/bmake.bat)에서 확인할 수 있다. 앞으로는 여러가지 헤더파일과 외부 라이브러리, asset 등을 고려하는 Makefile을 만들도록 개량하겠다.
