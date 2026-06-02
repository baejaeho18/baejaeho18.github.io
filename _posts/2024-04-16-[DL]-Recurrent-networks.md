---
layout: post
title: "[DL] 4. Sequence Modeling: Recurrent and Recursive Nets"
category: study
tags: [ai]
---

> [Deep Learning]을 정리하겠다.

# 10. Sequence Modeling

순환신경망(recurrent neural networks, RNN)은 순서가 있는 일련의 값들, 즉 순차열(sequence)을 처리하도록 특화된 신경망이다. grid 형태에 특화된 CNN처럼, 가변 길이의 입력을 받을 수 있다. 각 순환(cycle)마다 어떻게 입출력 크기를 조정하고, 가중치를 공유/수정하는지 알아보겠다.
[Graves, 2012]

## 10.1 Unfolding Computational Graphs
RNN 모델을 입출력 연산이나 손실함수를 계산 그래프로 표현할 때, 순환/재귀를 통해 반복구조가 나타난다. 이를 수식으로 표현하면 점화식(reurrence formula)로 나타난다.
이는 모든 시간단계(cycle)에서 동일한 전이 함수와 동일한 매개변수를 적용한다는 의미이다.

## 10.2 Recurrent Neural Networks
동일한 함수와 매개변수를 반복구조에 적용시킬 때, 각 cycle 간의 연결을 조직하는 두가지 방법이 존재한다.
1) 은닉 대 은닉 순환 연결 : 일정한 cycle이 지난 후의 출력이 곧 RNN의 출력이다. 훈련 비용이 높다는 단점이 있다.
2) 출력 대 은닉 순환 연결 : 출력 단위에서 누락된 정보로 인해 표현력이 약하다. 대신 각 cycle을 병렬화할 수 있다.
위의 방법들처럼 각 cycle마다 출력을 산출하지 않고, 오직 하나의 출력만을 산출하는 방법도 존재한다.
3) 은닉 간 순환 연결을 통해 하나의 출력을 산출 : 중간 cycle에서 출력을 산출하지 않기 때문에 자연히 은닉층 간의 연결만이 가능하다.

## 10.3 Bidirectional RNNS
양방향 순환 신경망은 현재의 값을 이해하기 위해 미래의 값도 알아야하는 특수한 응용 사례를 위하여 고안되었다. 음성 인식 과제에서의 연음법칙이 그 예시가 될 수 있겠다.
입력 sequence의 시작 부분부터 나아가는 시간순 RNN과 마지막부터 돌아오는 역시간순 RNN이 결합되어, 이전 자료와 다음 자료를 모두 의존하되 현재 시점 근처의 자료에 가장 민감하도록 구현되었다.


## 10.4 Encoder-Decoder Sequence-to-Sequence Architectures
한편, 가변 길이의 입력 순차열을 가변 길이의 출력 순차열로 사상할 필요가 있다. 입력과 출력의 길이가 서로 다른 데이터가 대부분이기 때문이다.
RNN은 1) Encoder-Decoder와 2) sequence-to-sequence 두 가지 구조를 채택할 수 있다.

## 10.5 Deep Recurrent Networks
RNN의 각 cycle은 크게 세가지 연산을 수행한다.
1) 입력에서 은닉 상태
2) 현재 cycle 은닉 상태에서 다음 cycle의 은닉상태
3) 은닉 상태에서 출력
이들은 각각 MLP에서 층 하나로 표현되는 행렬 변환과 같은 연산을 수행한다. 따라서 각 연산을 하나의 층이 아닌 여러 층으로 바꾼다면 보다 깊은 신경망을 만들 수 있다.

## 10.6 Recursive Neural Networks
재귀 신경망은 순환신경망의 응용 중 하나이다. 사슬 형태의 RNN와 다르게 tree 형태로 구성되어 있다.
재귀 신경망의장점은 계산 비용이 입력 sequence 길이에 비례(O(r))하는 RNN과 달리 O(log r)이라는 것이다.
문제는 어떤 형태의 tree를 사용해야하는지 정해져있지 않다는 것이다.
가장 단순한 균형이진트리나, 구문분석기가 산출하는 parse tree 혹은 모델이 직접 적합한 트리 구조를 추론하도록 제안되어 왔다.

## 10.7 The ChaLong-Term Dependencies
여러 단계에 걸쳐서 전파되는 기울기가 소멸하거나 폭발하는 장기의존성 문제는 주로 단기 상호작용에 주어지는 가중치보다 지수적으로 작은 가중치들이 장기 상호작용에 주어질 때 발생한다.
단기적으로 아주 작은 변동에 장기적인 패턴이 가려지기 때문이다.
이를 해결하기 위해 고안된 접근방식들을 앞으로 살펴보겠다.

## 10.8 Echo State Networks
신경망이 출력 가중치들만 학습하도록 고안된 방식이다. 


## 10.9 Leaky Units and Other Strategies for Multiple Time Scales
여러 시간 단위(time scale)에서 작동하도록 모델을 구성하는 것이다.
모델의 일부는 조밀한(fine-grained) 단위에서 세부사항들을 처리하고, 또 다른 일부는 성긴(coarse) 시간 단위에서 정보가 잘 전달되도록 동작하는 것이다.
이를 위해 서로 다른 시간 상수를 가진 leaky unit이 고안되었다.

## 10.10 The Long Short-Term Memory and Other Gated RNNs
실제 응용에서 가장 효과적인 순차열 모델은 게이트 제어 RNN(gated RNN)이다. LSTM이나 gated recurrent unit 등이 이에 속한다.
leaky unit과 같은 가중치들이 cycle을 돌면서 모델에 의해 최적화된다.
예컨데, LSTM은 gate 역할을 하는 은닉층이 자기 자신의 가중치를 제어하여 time sacle을 동적으로 변하게 한다. 

## 10.11 Optimization for Long-Term Dependencies
확률적 경사하강법을 적용한 LSTM은 최적화하기 좋은 모델을 설계하는 것이 강력한 최적화 알고리즘을 설계하는 것보다 훨씬 쉽다는 경험법칙을 충족하는 예이기도 하다.

## 10.12 Explicit Memory
이제 신경망은 암묵지 영역에서 꽤 잘 동작하는 것 같다. 그러나 오히려 명시적인 사실(fact)를 잘 기억하지 목한다. 이는 인간의 작업기억(working memory)에 해당하는 구조가 부재하기 때문이다.
명시적 기억 부재를 보완하기 위해 attention 매커니즘과 같은 전략이 발견되었다.

## Questions
**Q1.** 10.2에서 소개된 세가지 구조를 충분히 이해하지 못했습니다. 은닉-은닉 연결이 강력한 이유와 출력-은닉 연결이 병렬화가 가능한 이유를 모르겠습니다.<br>
**A1.** 

**Q2.**  <br> 
**A2.** 

**Q3.**   <br>
**A3.**




<!-- Links -->
[Deep Learning]: https://github.com/baejaeho18/MyLibrary/blob/main/Machine%20Learning/deeplearningbook.pdf
[Graves, 2012]: https://www.cs.toronto.edu/~graves/preprint.pdf