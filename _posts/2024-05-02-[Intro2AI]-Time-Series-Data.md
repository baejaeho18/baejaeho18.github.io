---
layout: post
title: "[AI] 6. Time-Series Data"
category: study
tags: [ai]
---

# Time-Series Data
시계열은 chrononlogical 순서에 따라 정량적으로 관찰된 집합이다.
다른 말로, 시간 순서로 배열된 데이터의 수열이다. 일정 시간 간격의 데이터의 순차열이다.
일반적으로 x축에 시간, y축에 관찰한 값으로 표현한다.

### Time-Series Components
* Trend : 긴 시간에 걸친 평균적 변화
* Seasonal : 정해진 간격에 따라 나타나는 패턴으로 frequency라고도 불린다.
* Cyclic : 고정되지 않은 간격에서 나타나는 패턴으로 보통 seasonal보다 길다.
* Irregular

### Time-Series Property
* Stationary : 시간과 독립적으로 관찰되는 데이터
* Non-stationary : 평균과 분산이 시간에 따라 변화하는 모델이다. differencing 기법을 사용해 Stationary로 변환할 수 있다.

## Autocorrelation Function(ACF)
시계열 분석을 위해 사용되는 함수이다.
* Correlation

* lag-n correlation : 최신값과 n step 전의 값 간의 correlation을 계산

모든 n에 대한 lag-n를 도출하는 것이 ACF의 역할이다.



## Basic Decomposition

## Time-Series Data Prediction


<!-- Links -->
[예제 코드]: https://github.com/baejaeho18/code/blob/main/0-Education/intro2AI/ch8-VAE/VAE.ipynb