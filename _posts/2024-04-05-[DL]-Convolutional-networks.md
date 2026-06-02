---
layout: post
title: "[DL] 3. Convolutional Networks"
category: study
tags: [ai]
---

> [Deep Learning]을 정리하겠다.

# 9. Convolutional Networks

합성곱망(convolutional networks; LeCun, 1989) 또는 합성곱 신경망(convolutional neural network, CNN)은 격자 형태(grid-like topology)로 배열된 데이터를 처리하는 데 특화된 신경망이다. 어떤 CNN 구조가 어떤 상황에 좋은지보다, 어떻게 CNN이 구성되는지 위주로 정리하겠다.

## 9.1 The Convolution Operation
두 함수를 합성곱 (f*g)(x)할 때, 첫 인수(f)를 입력이라고 부르고, 둘째 인수를 kernel이라고 부른다. 출력 결과를 feature map이라고도 부른다.
합성곱은 단순한 덧셈 혹은 곱셈 하나가 아니라, 확률곱의 합산처럼 생각하면 조금 이해하기 편하다.
![two_random_convol](/assets/img/2024-04-08/two_random_convol.png)

예를 들어, $$(1,2,3)*(4,5,6) = (4, 1*5+2*4, 1*6+2*5+3*4, 2*6+3*5, 3*6) = (4, 13, 28, 27, 18)$$ 이 되는 것이다.

```python
np.convolve((1,2,3), (4,5,6))   # array([4, 13, 28, 27, 18])
```

위의 배열합성곱은 정확히 동일하게 다항식의 곱에서 찾아볼 수 있다.
![polynomial_multiplication](/assets/img/2024-04-08/polynomial_multiplication.png)

즉, 두 배열을 계수로 하는 두 다항식의 곱에서 계수를 추출한 것과 동일하다.

위의 합성곱 개념을 딥러닝에서 활용할 때, kernel에는 확률밀도함수를 넣는다. 
kernel을 이동평균으로 해석하면, 원본 데이터을 smoothing한 효과가 난다. 이는 시계열 데이터나, 시각 데이터에 적용될 수 있다.

## 9.2 Motivation
합성곱 신경망이 유용한 까닭은 다음 세가지 이유로 설명할 수 있다.
1) sparse interaction : 본래 각 계층에서 필요한 연산의 크기는 (input\*output)이다. 그러나 작은 kernel만으로 원하는 feature을 추출할 수 있을 떄, 필요한 연산의 크기는 (kernel\*output)뿐이다. 물론 해당 계층에서는 직접적으로 연결되지 않은 노드를 학습할 수 없지만, 보다 심층에서는 간접적으로 영향을 받을 수 있다. 이를 보장하기 위해 간격(stride)을 주거나 pooling 구조로 합성곱망을 구성한다.
2) parameter sharing : 모든 입력에 동일한 kernel이 사용된다. 계산비용과 메모리 비용 모두 획기적으로 감소한다.
3) equivariant representations : 입력이 다소 변하더라도 동일한 출력을 보장하는 개념이다. 예컨데, CNN은 이미지의 위치를 이동시켜도 원하는 feature을 동일하게 잡아낸다. 단, 회전한 경우에는 불가능하다.

## 9.3 Pooling
pooling은 합성곱의 결과로 도출된 활성화 값을 이웃 출력들의 요약통계량(summary statistics)로 대체한다. 일반적으로 max, average, $$L^2&& Norm, weighted average 등이 쓰인다.
pooling을 통해 입력의 작은 변화에 대해 특징이 불변(invariant)하도록 할 수 있다. 
더불어 계산비용을 낮추고, 과적합을 방지해 일반화 성능을 향상시키는 효과가 있다.

## 9.4 Convolution and Pooling as an Infinitely Strong Prior
Infinitely Strong Prior(무한히 강한 사전확률분포)란 일부 매개변수에 0을 할당하여 절대로 영향을 끼치지 못하게 강요하는 분포이다. 확률밀도가 얼마나 조밀한지 곧, 분산과 반리례하는 척도가 strong과 weak이다.
합성곱 신경망과 pooling은 고정된 kernel과만 상호작용하기 때문에 무한히 강한 사전분포라고 볼 수 있다. 

## 9.5 Variants of the Basic Convolution Function
지금까지 표준적인 이산합성곱 연산을 수학적 관점으로 알아보았다.
그러나 딥러닝에서 실제로 쓰이는 합성곱 함수는 수식이 다소 다르다.
먼저, 각 계층에서 각기 다른 feature를 추출하는 여러 합성곱이 병렬로 연산된다.
둘째로, 계산 비용을 줄이기 위해 정해진 stride만큼 뛰어넘으면서 출력하는 하향표본화(downsampling)가 있다.

## 9.6 Structured Outputs
합성곱의 결과로 특정 값 하나가 아닌 tensor로 출력할 수 있다. 다차원 구조적 객체인 tensor는 

## 9.7 Data Types
입력과 출력의 크기를 가변적으로 할 수 있다는 것도 합성곱 신경망의 장점이다.
예를 들어, width와 height가 다른 여러 이미지들이 있을 때, 동일한 kernel을 사용해도 합성곱 알고리즘을 실행하는데 전혀 문제가 없다.
다만 고정된 크기의 출력을 산출하고 싶다면, pooling이나 stride를 조정해야하긴 할 것이다.
다만, 위의 예시처럼 입력의 크기가 달라도 처리할 수 있는 것은 관측값의 종류는 동일할 때만 가능하다.

## 9.8 Efficient Convolution Algorithms
합성곱 연산을 그대로 하는 것보다, 퓨리에-역퓨리에 변환으로 계산하는 것이 훨씬 빠르다.

## 9.9 Random or Unsupervised Features
CNN에서 계산 비용이 가장 많이 드는 부분은 합성곱이 아닌, 도출된 feature의 학습이다.
지도 학습을 위해 경사하강법을 수행하려면, 신경망 전체에 대한 순전파와 역전파가 이뤄져야 하기 때문이다.
따라서 지도 학습을 하지 않고 합성곱 kernel을 수정하는 전략이 연구되었다.
일반적으로는 연구자가 직접 kernel을 수정하고 했다.
놀랍게도 무작위로 kernel을 초기화할 때도 잘 동작하곤 한다.
또, 신경망 전체가 아닌 각 층마다 greedy 방식으로 훈련하는 방법도 있다. 
그러나 이러한 방식은 데이터가 적고 계산 능력이 낮던 과거에 필요했던 전략으로, 현재는 대부분 완전한 지도학습을 통해 학습한다.

## 9.10 The Neuroscientific Basis for Convolutional Networks
CNN 역시 뇌과학에서 대단히 많은 영감을 받았다.
시각이 받아들이는 정보를 1차 시각피질에서 처리하는데, 이는 단순세포와 복합세포로 이루어져 있다. 각각 activation과 pooling에 영향을 주었다.
또한, equivariant representations 개념 역시 '할머니 세포'에서 영향을 받았다.
그러나 우리 뇌가 이미지를 받아들이는 방식보다 한참 낮은 수준에서 CNN은 동작한다. 아직도 발전할 여지가 많다.

## 9.11 Convolutional Networks and the History of Deep Learning
그럼에도 CNN은 딥러닝 영역에서 가장 대표적인 모형이다.
실제로 딥러닝을 수행할 수 있기 전에도 역전파로 학습을 성공한 최초의 딥러닝 모델이다. grid-like topology의 데이터들에 적합하고, 입력이나 출력의 가변크기를 보장한다는 장점이 있다. 이는 2차원 이미지에 특히 유용하다.
1차원 자료들에 유용한 순환신경망은 어떻게 구성되어 있는지 다음 챕터에서 살펴보겠다.


## Questions
**Q1.** I don't understand why random filters work so well in 9.9. Is there a hypothesis that explains this?  <br>
**A1.** 

**Q2.** While the attention strategy mentioned in 9.10 was successfully accepted in natural language processing, why did it not work well in visual models? <br> 
**A2.** 

**Q3.**   <br>
**A3.**




<!-- Links -->
[Deep Learning]: https://github.com/baejaeho18/MyLibrary/blob/main/Machine%20Learning/deeplearningbook.pdf