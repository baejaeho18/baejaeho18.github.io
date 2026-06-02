---
layout: post
title: "[CIMS] 0. background research"
category: project
tags: [iot]
author: author1
comments: true
---

IoT 프로젝트로 CCTV 관제 서비스를 3명의 팀원들과 함께 구축하려고 한다.
cctv 노드와 게이트웨이, 웹서버를 라즈베리파이로 제작하고, cctv망은 WiFi-Halow를 사용한다. <br>
이를 위해 꽤 많은 HW부품들을 찾아서 구매해야했다. 감사하게도 고윤민 교수님을 통해 LINC 3.0 사업단의 지원을 받았다.

<!--more-->

커다란 목표는 다음과 같다.
( )

이를 진수형이 대강 구상도로 표현해줬다.
( )

세부적인 설계는 다음과 같은 논의점들을 통해 보완해나가겠다.
- halow 통신 : 어떻게 이뤄지며, 어떻게 일반 wifi 망과 연결할 것인가
- 영상 송수신 : rTMP, rGRP 등의 라이브러리를 사용할지 혹은 UDP/TCP 영역에서부터 아예 구축할 것인지
- 웹서비스 및 스토리지 : AWS와 같은 클라우드에 의존할 것인지, 라즈베리파이5와 SSD 카드로 직접 구동할 것인지



위의 논의들은 notion에서 보다 자세하게 살펴볼 수 있다.
https://www.notion.so/45fd551655d64ba48f1e2c373259d69d
또한 프로젝트 관리를 위한 github organization을 만들었다.
https://github.com/InternetOfTough