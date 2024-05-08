---
layout: post
title: "[EIP] 필기 1일차"
category: study
tags: eip
---

필기 시험 날짜는 2024년 5월 9일(목)이다.
너무 늦게 공부를 시작했나 싶긴 하지만, 남은 이틀 동안 최대한 빠르게 많이 훑어보고 시험장에 들어가보자.
공부 재료는 역시나 [시나공]이다. 오늘 처음 회원가입하고 써보는데 무료로 많은 자료와 기출문제들이 있어서 이틀 동안 소화하기 알맞을 것 같다.

목표는 1일차에 쉬운 1,2,3과목에 대해 개념 훑어보기를 끝내고 확인차 기출을 풀어보는 것이다.
2일차 목표는 4과목을 기출 3회 정도 돌려보고, 5과목은 정리하면서 이해하기. 기출도 2회 정도는 풀 수 있으면 좋겠다.

## 1. 소프트웨어 설계
그럼, 1과목부터 시작!
소프트웨어 공학은 아쉽게도 학부 과정에서 듣지 못해서 조금 시간이 걸릴 수도 있을 것 같다. 
소프트웨어 공학은 소프트웨어의 위험(risk)를 관리하기 위해 연구된 학문을 말한다.
품질 및 생상성 향상을 위해 여러가지 방법론과 도구, 관리 기법들이 만들어졌다.
가장 기본적인 원칙은 지속적인 검증과 기록이다.

개발 방법론의 바탕이 되는 스프트웨어 생명 주기는 소프트웨어 정의, 운용, 유지보수 등의 과정을 단계별로 나뉜다. 각 단계들과 그 산출물로 **생명 주기 모형**(혹은 프로세스 모형)이 표현된다. 
* 폭포수(Waterfall) 모형 : 각 개발 단계를 철저히 검증 및 결과물을 산출한 후, 다음 단계를 진행하는 선형 순차적 모형이다. <br>
(타당성검토 -> 계획 -> 요구분석 -> 설계 -> 구현 -> 시험 -> 유지보수)
* 나선형(Spiral) 모형 : 여러번 개발 과정을 거쳐 점진적으로 개발해 위험을 최소화한다.<br>
(계획수립 -> 위험분석 -> 개발/검증 -> 고객 평가) -> (계획수립 ...)
* 애자일(Agile) 모형 : 고객과의 소통에 초점을 맞춰 요구사항 변화에 유연하게 대응하도록 일정한 주기를 반복한다.
(ex: Scrum, XP, Kanban, Lean, Crystal, ASD, FDD, DSDM, DAD 등)

Agile 개발은 프로세스나 도구보다는 협엽과 상호작용에 더 가치를 둔다. 문서보다 SW에, 계획보다 변화에 반응하는 것에 집중한다.
스크럼 개발 프로세스의 경우, 매일 회의에서 모든 요구사항이 담긴 백로그를 기반으로 단기 일정을 수립하고 테스팅을 수행한다. 이 과정을 스프린트(sprint)라고 부른다.
XP(eXtrem Programming)의 경우 수시로 발생하는 요구사항에 대응하기 위해 짧고 반복적인 개발 주기로 개발 생산성을 높인다. small releases를 반복하면서 단순한 설계를 CI(지속적 통합)하여 design refactoring(improvement)한다. 이를 위해, 구현보다 테스트 케이스를 먼저 작성하고 자동화된 테스팅 도구를 사용하는 **TDD**를 사용한다.

요구사항은 소프트웨어가 제공하는 **서비스**(기능)에 대한 설명과 정상적으로 운영되기 위해 필요한 **제약조건**(비기능) 등을 말한다.
이러한 요구사항을 도출(elicitation), 분석(analysis), 명세(specification), 검증(validation)하는 활동을 요구사항 개발 프로세스라고 부른다.
산출물인 요구사항 명세는 수학적 표기법을 따르는 **정형 명세 기법**이나 자연어/다이어그램으로 이루어진 **비정형 명세 기법**으로 작성된다.
명세화를 위해서 요구사항을 분석할 때, UML, DFD(자료흐름도), DD(자료사전), ERD(개체관계도) 등의 도구를 사용한다.
UML(Unified Modeling Language)는 개발자와 고객/사용자의 의사소통을 위해 표준화한 객체지향 모델링 언어이다. 사물과 관계(연관/집합/포함/일반화/의존/실체화)로 객체지향 시스템 구조를 다이어그램으로 작성할 수 있다.
DFD(Data Flow Diagram)은 데이터의 흐름과 변환 과정, 기능을 다이어그램으로 기술하여 자료흐름그래프/버블차트라고도 불린다.
DD(Data Dictionary)는 DFD의 자료를 설명한 메타데이터를 기록한다.
요구사항 분석을 자동화한 도구로는 SADT, SREM, PSL/PSA, TAGS 등이 있다.


모듈을 통합하려면 먼저 현행시스템을 이해해야 한다. 시스템의 기능과 구성, 인터페이스를 파악하는 것이 먼저이고, 설계와 소프트웨어의 구성을 명시한 후, 하드웨어와 네트워크 구성을 작성해야한다.
반드시 파악해야할 시스템에는 OS, DBMS, WAS 등이 있다.
**OS**는 하드웨어와 사용자 간의 인터페이스로 응용 프로그램이 동작하는 환경을 제공한다. Windows, UNIX, Linux, MacOS, iOS, Android 등이 있다.
**DBMS**는 데이터베이스와 사용자 간의 인터페이스로, 정보를 생성하고 관리한다. 모든 응용 프로그램이 데이터를 공유하도록, 파일 시스템의 종속성과 중복성 문제를 해결한 시스템이다. Oracle, MySQL, SQLite, MongoDB, Redis 등이 있다.
**WAS**는 정적인 웹서버와 달리, 사용자의 요구에 동적으로 대응하기 위해 사용되는 미들웨어이다. 데이터 접근, 세션 관리, 트랜잭션 관리 등을 주로 데이터베이스와 연동하여 수행한다. Tomcat 등이 있다.

* Diagram : 사물과 관계를 가시화된 도형으로 표현한다.
    - 구조적(structural) diagram : class, object, component, deployment, ...
    - 기능적(behavioral) diagram
        - use-case : 사용자(actor) 관점의 기능
        - sequence : 시간순으로 상호 작용하는 과정 with 메시지
        - communication, state, activity, interaction overview, timing, ...

* UI : 사용자 인터페이스는 만족도에 가장 큰 영향을 끼쳐 변경이 가장 잦다.
크게 CommandLI, GraphicalUI, NaturalUI, VoiceUI, OrganicUI 등으로 나뉜다.
UI 설계 도구에는 Wireframe, Mockup, Story-Board, Prototype, Use-case 등이 있다.

실사용자 입장에서 사용하기 쉽고, 오류파악이 쉽도록 검증해야 한다. 이를 위해 기능성, 신뢰성, 사용성, 효율성, 유지보수성, 이식성 등의 품질 요구사항이 존재한다.



## 2. 소프트웨어 개발
38 스프트웨어 개발에서 설계는 크게 상위 설계와 하위 설계로 구분된다.


## 3. 데이터베이스 구축
89 DBMS는


## 4. 프로그래밍 언어 활용
229 데이터 전환

## 5. 정보시스템 구축 관리
282 운영체제 


<!-- Links -->
[시나공]: https://www.sinagong.co.kr/pds