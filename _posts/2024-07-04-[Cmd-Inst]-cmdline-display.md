---
layout: post
title: "[Cmd Inst] 쉘 프롬프트에서 긴 경로 축약하는 방법"
category: study
tags: [instructions]
---

쉘 프롬프트에서 디렉토리를 타고타고타고 들어가다보면 $ 앞이 끝없이 길어질 때가 있다.
```script
bjho@BJH:/mnt/c/Users/bjh17/Projects$ cd code
bjho@BJH:/mnt/c/Users/bjh17/Projects/code$ cd 0-Education/
bjho@BJH:/mnt/c/Users/bjh17/Projects/code/0-Education$ cd SystemProgramming/
bjho@BJH:/mnt/c/Users/bjh17/Projects/code/0-Education/SystemProgramming$ ls
Dive-into-Systems-ch3
bjho@BJH:/mnt/c/Users/bjh17/Projects/code/0-Education/SystemProgramming$ cd
 Dive-into-Systems-ch3/
bjho@BJH:/mnt/c/Users/bjh17/Projects/code/0-Education/SystemProgramming/Dive-into-Systems-ch3$ ls
a.exe  badprog.c  segfault.c
```
프롬프토 형식을 담당하는 PS1 환경변수롤 조작하여 저 긴 거를 줄여보도록 하겠다.
```script
bjho@BJH:/mnt/c/Users/bjh17/Projects/code/0-Education/SystemProgramming/Dive-into-Systems-ch3$ export PS1='\u@\h:\W$ '
bjho@BJH:/Dive-into-Systems-ch3$ export PS1='$(basename `pwd`)$ '
Dive-into-Systems-ch3$ 
```
여기서 \W는 현재 디렉토리의 이름만 표시하며, \u는 사용자 이름, \h는 호스트 이름을 나타낸다.

그런데, 위의 예시에서는 잘 드러나지 않았지만 기존에는 $ 앞부분이 뒷부분의 입력부와 다른 색상이어서 명확하게 구분이 되었는데 바꾼 후로는 동일하게 하얀글자로 표기된다.

이런 불편함은 참을 수 없지.
이스케이프 시퀀스를 사용하여 색상을 추가하였다.
```script
Dive-into-Systems-ch3$ export PS1='\[\e[34m\]\W\[\e[0m\]$ '
```
\[\e[34m\]는 파란색 텍스트를 의미하고, \[\e[0m\]는 색상을 초기화한다.

물론, 나중에는 본래대로 되돌리고 싶어할 수 있다.
그때를 대비하여 모든 경로를 출력하도록 하는 명령어를 아래 남겨두겠다.
```script
export PS1='\u@\h:\w\$ '
```
\w는 현재 작업 디렉토리 전체 경로를 의미한다.

끝!!