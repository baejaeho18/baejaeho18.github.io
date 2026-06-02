---
layout: post
title: "[ByCoBERT] 0. Advance Plan Overview"
category: project
tags: [bycobert]
---

## Overview
### 목적
ByCoBERT가 class 단위로 보안 취약점을 예측하도록 훈련시키고 결과 정리

### 근거
OWASP라는 작은 class-level labeled dataset을 사용했을 때 0.6 정도의 결과를 확인하여 가능성이 있다고 보았음. [KIISE_JOK ByCoBERT] 

### 데이터셋
class 단위 라벨링된 Java project들
* 1안 : 캡스톤2에서 사용한 mvnrepo의 project들 [mvnCrawler/test_300_300] 
* 2안 : Java_Juliet_1.3의 class들을 취약한 파일과 안전한 파일로 분리 [BKJ-Juliet]

### 알고리즘
기존 ByCoBERT에서 project 단위로 분할한 것을 class 단위로 분할하도록 수정 [ByCoBERT/pretrainByteBERT.py]

### 결과
class 단위로 confusion matrix 표현하기

### 주요 일정
* 5/1 프로젝트 시작
* 5/7 Proposal 제출
* 6/14 발표(video) 제출
* 총 45일(6주)

<!--links-->