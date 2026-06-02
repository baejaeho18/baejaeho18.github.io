---
layout: post
title: "[CIMS] 2. 웹서버 구동하기(2)"
category: project
tags: [iot]
---

> CCTV 노드들의 상태와 실시간 영상 스트리밍을 위한 웹 인터페이스 구축

<!--more-->

# 2.4  설정하기
> 서버는 IntelliJ에서 spring boot를 사용해 코딩을 한 후, jar 파일을 라즈베리파이로 옮겨 구동하겠다.
[springboot Initalizer](https://start.spring.io/)

![springboot-initalizer](/assets/img/2024-02-16/springboot-initializer.png)

# 2.5 MapList 구현
목표 : CCTV 상태정보(배터리, 네트워크, 위치 등) 표기
    - 목록 혹은 지도 상에서 확인 가능
    - 지정클릭 시 현 실시간 영상 송출 지원

1. maplist에서 kakao map api를 사용해 지도와 cctv 아이콘을 렌더링한다.
// 2. 시작화면을 로그인 화면으로 바꾸고, 로그인/회원가입 기능을 추가한다.
3. cctv아이콘에서 상태 정보를 확인하는 event를 추가한다.
4. dashboard에서 선택된 cctv의 영상을 송출하도록 한다.
5. jar 파일로 build하고 라즈베리파이에서 구동되는 것을 확인한다.


# 2.6 Dashboard 구현
로컬에 저장된 영상을 띄우는 간단한 포맷만 만들어 두겠다. 이 부분은 너무나 바뀔 부분이 많아서..


앞으로의 목표는 다음과 같다.
- 