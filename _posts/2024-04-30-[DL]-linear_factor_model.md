---
layout: post
title: "[DL] 5. Practical Methodology and Applications"
category: study
tags: [ai]
---

> [Deep Learning]을 정리하겠다.

# 13. Linear Factor Model
선형 인자 모델은 latent variable을 가진 가장 단순한 입력 확률 모형을 말한다.
latent variable은 관찰 가능한 변수들의 상호관계를 설명하기 위한 개념적인 변수이다.
입력 확률 모형은 주어진 입력에 대한 출력으로 확률 분포를 지원한다.
선형 인자 모델은 단순한 분포를 가진 explanatory factor를 도출할 수 있기 때문에 유용하다.
주로 mixture 모델이나, 커다란 deep probabilistic 모델, generative 모델을 구성하는데 사용된다.
일반적인 성형 인자 모델의 구조는 $$x=Wp(h) + b + noise$$ 이다.
위에 방정식에서 어떤 분포의 noise를 사용하는지, 어떤 사전분포 p(h)를 사용하는지에 따라 확률적 PCA, 인자분석, ICA 등으로 구별된다.
<!--more-->
## 13.1 Probabilistic PCA and Factor Analysis
인자 분석은 latent variable의 사전분포(h)로 단위 분산 가우스 분포를 사용한다.
이때, 관측변수(x)들이 조건부 독립이라고 가정한다.


## 13.2 Independent Component Analysis(ICA)
독립성분분석(ICA)에서 관측변수들은 독립적인 latent variable들의 선형 결합이다.
ICA에는 다양한 변형들이 존재하는데, p(h)만큼은 항상 비 가우스 분포이다. 이는 앞서 언급된 인자분석이나 확률적 PCA와 구별된다.

## 13.3 Slow Feature Analysis
SFA는 지체 원리(slowness princlple)에 기반하여 시간에 따라 느리게 변하는 혹은 불변하는 특징들을 학습하도록 정칙화한 선형 인자 모델이다. 지체 원리란 중요한 특징(feature)들은 다른 개별 특징들에 비해 느리게 변한다는 것이다.
이때 학습한 특징들은 서로 무관(decorrelated)하도록 한다.
SFA는 패턴 인식과 같은 분야에서 강점을 발휘한다.

## 13.4 Sparse Coding
희소 부호화는 입력의 특징을 잘 설명하는 최소한의 벡터를 찾는 것을 목표로 한다.

## 13.5 Manifold Interpretation of PCA
선형 인자 모델은 고차원 공간에서 낮은 차원의 구조로 데이터를 잘 표현할 수 있다는 점에서 다양체(manifold)를 학습한다고 볼 수 있다.
고차원 공간에서 펼쳐진 가우스 분포에서 짧은 방향의 분산을 잡음, 다른 큰 방향의 분산을 신호라고 볼 수 있다.
따라서 선형 인자 모델을 가장 단순한 형태의 생성형 모델이라고 볼 수 있다.

# 14. AutoEncoder
자가부호기(AutoEncoder)는 입력 표현을 출력 표현으로 복사하도록 훈련된 신경망 모델이다. 단순한 선형 복사라면 의미가 없다.
중요한 것은, 훈련 데이터와 비슷한 입력 표현에 대해 근사적으로 복사하도록 설계되었다는 점이다.
이를 통해, 데이터의 중요한 특징들을 파악할 수 있다.

## 14.1 Undercomplete Autoncoders
자가부호기가 입력을 복사하는 방법을 학습함으로써 유용한 특징들을 포착할 수 있게 되었다.
전통적인 encoding 방법은 입력 차원보다 낮은 차원으로 부호화하는 것이다. 이를 과소완전(undercomplete)라고 부른다.
이 모델의 학습은 평균제곱오차와 같은 손실함수(L)을 최소화함으로써 이루어진다.

## 14.2 Regularized Autoencoders
그러나 AutoEncoder의 수용력(capacity)가 너무 높아진다면 유용한 특징을 배우지 못하고 입력을 출력으로 복사하기만 할 수 있다.
정칙화된 AutoEncoder는 encoder과 decoder를 얕고 작게하고, 손실 함수를 조정하여 수용력을 제한한다.
손실함수를 조정한는 방법에는 다음과 같은 예시가 있다.
1) 희소 자동부호기(Sparse AE)
2) 잡음제거 자동부호기(Denoising AE)
3) 축약 자동부호기(Contractive AE)

## 14.3 Representational Power, Layer Size and Depth
지금까지는 encoder와 decoder를 단층으로 학습시켰다. 각 층은 그 자체로 순방향 신경망이기 때문에 심층으로 개선할 수 있다.
일반적으로, 얕은 AE들의 stack을 greedy하게 사전훈련하여 심층 AE를 구현한다.

## 14.4 Stochastic Encoders and Decoders
마찬가지로 순방향 신경망인 AE는 손실함수와 출력 단위들을 사용할 수 있다.


## 14.5 Denoising Autoencoders
잡음 제거 자동부호기(DAE)는 손상된 자료를 입력으로 받았을 때, 손상되지 않은 original 자료를 출력하도록 훈련되었다. 

## 14.6 Learning Manifolds with Autoencoders

## 14.7 Contractive Autoencoders
축약 자동부호기(CAE)는 DAE처럼 입력의 변동들에 저항한다. 다른 점은 DAE는 재구축 함수가 작고 유한한 크기의 변동에 저항하고, CAE는 특징 추출함수가 무한소 크기의 변동에 저항한다.
입력 변동에 저항하는 과정에서 입력에서의 neighborhood를 출력에서 더 작은 이웃 영역으로 사상(축약)시킨다.

## 14.8 Predictive Sparse Decomposition
예측 희소 분해(PSD)는 sparse coding과 매개변수적 자동부호기를 합친 것이다.

## 14.9 Applications of Autoencoders
AE는 차원 축소과제에 유용 하다고 밝혀졌다. 차원 축소는 분류과제, 정보 검색 과제 등에 활용된다.

## Questions
**Q1.** 14.2에서 추가적인 성질을 가진 손실함수를 사용한다고 하는데, 어떻게 손실함수를 구성하는지 추가적인 설명이 필요합니다. <br>
**A1.** 

**Q2.**  <br> 
**A2.** 

**Q3.**   <br>
**A3.**




<!-- Links -->
[Deep Learning]: https://github.com/baejaeho18/MyLibrary/blob/main/Machine%20Learning/deeplearningbook.pdf
[effective capacity]: https://munjeongkang.github.io/ANN2/
[LeCun, 1998a]: http://vision.stanford.edu/cs598_spring07/papers/Lecun98.pdf
[Deng&Yu, 2014]: https://nowpublishers.com/article/Details/SIG-039
[Graves, 2013]: https://arxiv.org/pdf/1308.0850.pdf