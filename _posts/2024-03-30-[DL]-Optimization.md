---
layout: post
title: "[DL] 2. Optimization for Training Deep Models"
category: study
tags: [ai]
---

> [Deep Learning]을 정리하겠다.

딥러닝에서의 최적화 문제는 모델의 파라미터를 조정하여 cost function, J(θ)를 최소화하는 것을 말한다.
본 챕터에서는 학습을 위해 쓰이는 최적화가 pure 최적화와 얼마나 다른지, 무슨 난제들이 있는지, 어떤 최적화 전략들이 실제로 쓰이고 있는지 알아보겠다.
<!--more-->
## 8.1 How Learning Differs from Pure Optimization

먼저 학습(learning)의 정의를 짚고 넘어가자.
> A commputer program is said to learn from experience E with respect to some class of tasks T and performance measure P,
if its performance at tasks in T, as measured by P, improves with experience E [Mitchell, 1977]

딥러닝에서의 최적화는 성과(P)를 직접 평가하기 어렵기 떄문에, 비용함수(J)를 대신 최소화함으로써 성과를 개선한다.
실제 데이터가 아닌 한정된 훈련 샘플만으로 risk(기대 일반화 오차)를 최소화해야하기 때문이다. 이때 가능한 방법 중 하나는 훈련 샘플에 대한 기대손실, 즉 empirical risk를 최소화하는 것이다. 그러나 경험적 위험도 최소화는 훈련 샘플을 그대로 외워버리는 큰 모델에서 과적합 문제를 야기할 가능성이 있다.
또한, loss function을 효율적으로 최적화하는 것이 현실적으로 불가능하기도 하다. 계산비용이 입력 차원의 지수 단위이기 때문이다. 이런 상황에서 진짜 loss function이 아니라 surrogate(대리) loss function을 최적화한다.

한편, 학습 데이터 전체에 대해 정확한 최적화를 도출하는 것보다, 일부 표본들을 이용해 도출한 추정값을 통계적으로 사용하기도 한다.
훈련 데이터 전체를 사용하는 알고리즘을 batch 혹은 deterministic 경사 하강법이라고 부르고, 한 번에 한 샘플만 사용하는 알고리즘을 stochastic(확률적) 혹은 online 방법이라고 부른다.
실제로 쓰이는 최적화 알고리즘은 그 중간인 minibatch stochastic이라고 불린다.

## 8.2 Challenges in Neural Network Optimization
최적화가 잘 이루어지기 위해서는 선형함수이자 볼록함수여야하고, local optima에 빠지지 않도록 주의를 기울여야 한다.
그렇다고 볼록함수의 최적화가 그저 쉽기만 한 것은 아니다.
대표적으로 불량조건 문제와 local minimum 문제가 있다. 

## 8.3 Basic Algorithms
기본적으로 최적화는 경사 하강법 알고리즘을 토대로 발전했다.
먼저 stochastic gradient descent(SGD)은 훈련 데이터에서 독립적으로 추출한 minibatch의 평균 기울기로부터 전체 훈련 데이터의 기울기의 추정량을 구한다. batch gradient descent와 다르게 minibatch가 곧 noise로 동작할 수 있기 때문에 learning rate를 점차 줄이도록 수식이 수정되었다. 이로 인해, 학습 속도가 감소한다는 단점이 있다.

학습 속도를 보완하기 위해 Momentum(운동량) 방법이 고안되었다. 기울기에 비례하여 속도에 가중치를 주어 가파른 부분을 빠르게, 낮은 둔덕을 쉽게 넘어갈 수 있다.
동일한 과정에서 기울기 갱신을 속도 적용 이후에 하면 Nestrov Momentum이 된다. 하강 속도가 다소 빨리지되, 수렴 속도에는 큰 차이가 없었다.

## 8.4 Parameter Initialization Strategies
이러한 반복 알고리즘을 통해 수렴하기 위해서는 고차원 공간 속에서의 시작점 위치도 중요하게 작용한다. 초기화 전략에 따라 수렴이 실패할 수도, 비용이 커질 수도, 학습이 느려질 수도 있다.
그러나 어떤 시작점이 좋은 것인지에 대한 연구는 아직 진행 중이다. 
밝혀진 것 중 하나는 각 매개변수가 서로 다르게 초기화되어 다양하게 학습하도록 허용하는 것이 좋다. 따라서 대부분의 경우, 가우스 분포나 정규분포에서 랜덤으로 고른 값으로 초기화한다.

## 8.5 Algorithms with Adaptive Learning Rates
특히 초기화하기 어려운 hipher parameter 중 하나가 learning rate이다. 
지금까지도 learning rate는 학습 과정에서 자동으로 적응하는 방식이 연구되고 있다.
1) AdaGrad : 누적된 모든 기울기에 반비례하여 learning rate를 적응시킨다. 
2) RMSProp : 기울기 누적 대신 exponentially weighted moving average를 사용한다. 비블록 함수에서도 잘 작동하는 유효한 최적화 방법이다.
3) Adam(Adaptive moments) : RMSProp + Momentum

아직은 최적화 알고리즘 중 무엇 하나가 두드러지진 않기 때문에, 실무자가 얼마나 알고리즘을 잘 쓰느냐(초매개변수 조정)가 더 중요하다.

## 8.6 Approximate Second-Order Methods
지금까지는 1차 미분만을 사용한 알고리즘을 소개했다.
Newton's Method는 2차 미분 계수를 사용하는 taylor series를 사용해 헤세 행렬을 도출하여 더 빠르고 정확하게 최적화를 수행한다..
이 방법은 볼록하고 2차 도함수(Hessian)이 positive definite일 때, 가장 수렴 속도가 빠르다.
그러나 헤세 행렬 계산을 매번 반복하기 때문에 비용이 크며, 목적함수가 위의 조건을 만족할 때만 수렴이 보장된다.

헤세 행렬 정보를 사용하되, 비용을 낯춘 Conjugate Gradients는 이전의 gradients(경사법)과는 달리 최적점으로 나가가는 경로가 이전 경로와 수직으로 설정되는 것이 아니라, 켤레(conjugate, 공액) 관계인 방향으로 설정된다.

BFGS(Broyden-Fletcher-Goldfarb-Shanno) 알고리즘은 보다 뉴턴법을 근사한다. 해세 행렬의 근사치를 업데이트하며 최적화를 수행하여 역행렬 계산 비용을 회피하였다.

## 8.7 Optimization Strategies and Meta-Algorithms
Batch Normalization은 각 층의 입력을 평균과 분산으로 정규화 후, 조정해가며 학습을 안정시키고 속도를 높인다.
Coordinate Descent는 독립적인 변수 그룹들을 순차적으로 일부는 고정, 일부는 최적화해가는 방식이다.
Polyack Average는 시계열 데이터에 적합하며 시간 가중치를 고려해 이동평균을 계산한다. Supervised Pretraining은 사전에 학습된 모델을 사용해 초기 가중치를 설정한다. 학습 과정을 더 효율적으로 만드는 Curriculum Learning은 점차 난이도가 높은 데이터르 학습하는 방식이다.이들은 모두 빠른 수렴을 위한 최적화 전략들이다.


## Questions
**Q1.** minibatch stochastic 방법을 사용하면 지난 챕터에서 배운 data augmentation과 상충되어 효과가 떨어지지 않을까?  <br>
**A1.** 

**Q2.** minibatch에서 무작위로 섞는게 비용이 크다는 것은 이해가 가는데, 단순히 한번 뒤섞으면 경험적으로 부작용이 잘 보이지 않는다는게 왜 그런지 직관적으로 이해가 가지 않습니다. 이해를 도울만한 어떠한 예시가 있을까요? <br> 
**A2.** 

**Q3.** 예전 강의에서 말씀해주신 local minimun이면 충분하다 라는 말씀이 8.2.2에서 다시 나왔는데, local minimun이 왜 충분한 것인지 사실 잘 와닿지 않습니다.  <br>
**A3.**




<!-- Links -->
[Deep Learning]: https://github.com/baejaeho18/MyLibrary/blob/main/Machine%20Learning/deeplearningbook.pdf
[Mitchell, 1977]: https://www.cin.ufpe.br/~cavmj/Machine%20-%20Learning%20-%20Tom%20Mitchell.pdf