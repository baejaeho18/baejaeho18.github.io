---
layout: post
title: "[DL] 5. Practical Methodology and Applications"
category: study
tags: [ai]
---

> [Deep Learning]을 정리하겠다.

# 11. Practical Methodology
지금까지 CNN, RNN 등 어떤 알고리즘이 있고, 어떻게 동작하는지 알아보았다.
이제 주어진 과제에 맞는 알고리즘을 선택하는 방법, 성능 평가하는 방법, 개선하는 방법에 무엇이 있고 어떻게 판단하는지 알아보겠다.
알고리즘을 올바르게 사용하는 방법론(methodology)의 간단한 예시는 다음과 같다.
1) 문제에 기반해 오차측정법과 목표오차측도를 결정
2) 성과추정을 포함한 end-to-end pipeline 확립
3) 단계별 개선효과 확인 수단 마련
4) 추가적인 데이터수집, 초매개변수 조정, 알고리즘 수정 등을 반복해서 시도
<!--more-->
## 11.1 Performance Metrics
첫 단계로 오차측정법과 목표오차를 결정한다. 모든 개발과정을 평가하는 기초이기 때문이다.

우선 목표로 하는 성과를 정해보자. 현실의 시스템은 본질적으로 확률적이기 때문에 베이즈 오차(최소오류율)은 달성가능한 최대 목표이다. 최소 목표는 소비자가 안전하다고 느끼는 오류율 혹은 이전 벤치마크 결과일 것이다.
현실적인 목표 오류율이 정해졌으면, 성과 측정 방법을 정해야 한다. 성과 측도는 일반적으로 정확도(accuracy), 정밀도(precision), 재현율(recall), f1-score 등이 있다.

## 11.2 Default Baseline Models
성과 측도와 목표가 정해졌다면, end-to-end 시스템을 가능한 빨리 제작하는 것이 좋다. 이때 사용할 알고리즘은 상황별로 다르다.
단순한 예측 문제라면 로지스틱 회귀와 같은 통계 모델을 사용하면 된다. 그러나 인식 혹은 번역 같은 AI-complete 문제라면 심층학습모델을 사용해야할 것이다.

먼저, 데이터의 구조에 따라서 크게 나뉜다. 고정 크기의 벡터로 supervised 학습을 한다면 FFNN(Fully-connected neural network)으로 시작한다. 입력이 2차원 이미지와 같은 일반적인 위상 구조라면 CNN이 유용하다. 입력이나 출력이 순차열이라면 LSTM이나 GRU 같은 게이트 제어 순환망이 좋다.

최적화 알고리즘으로는 운동량과 학습속도감쇠가 적용된 SGD(Stochastic Gradient Descent)가 흔히 쓰인다. Adam 역시 좋은 선택이다. 만약 최적화에 문제가 있다면 입력 데이터의 분포를 안정화시키는 batch-normalization을 시도해보자.

Regularization 역시 훈련데이터가 충분히 많지 않은 이상, 거의 언제나 좋은 선택이다. 대부분의 경우 early-stopping은 사용한다. dropout 역시 구현하기도 쉽고, 적용하기도 쉬운 좋은 수단이다. 과적합을 방지하는 또다른 수단인 batch-normalization은 noise를 통계추정에서 활용하여 dropout을 대체할 수 있다.

비지도 학습을 진행할 것인지, 지도 학습을 진행할 것인지 역시 문제의 domain에 따라 다르다. natural-language processing 같은 영역은 비지도 학습이 유용한 반면, computer vision과 같은 분야는 그렇지 않다. 따라서 비지도 학습이 유용한 영역이거나 풀어야 하는 과제가 비지도 과제일 경우에만 비지도 학습을 먼저 적용하는 것이 좋다. 그렇지 않은 경우, 지도학습을 사용한 모델이 과적합을 일으키면 비지도 학습을 추가해도 늦지 않다.

## 11.3 Determining Whether to Gather More Data
알고리즘을 적용한 end-to-end 시스템이 만들어졌다면, 설정했던 성과 측도로 평가한다. train set에 대한 성능이 나쁘다면 layer나 hidden-unit들을 추가하여 모델의 크기를 키우는 것이 좋다. hyperparameter를 조정하여 학습 알고리즘을 개선하는 것도 방법이다. 앞의 방법들이 큰 성과가 없다면, 훈련 데이터의 품질이 문제일 수 있다.

train set에 대한 성능은 괜찮지만, test set이 이에 못미친다면 대부분의 경우 추가적인 데이터 수집으로 해결된다. 더 많은 데이터는 곧 더 좋은 성능이다. log 척도로 훈련집합 크기와 일반화 오차 관계를 함수로 표현하면 유용하다. 그러나 의료와 같은 영역에서는 추가 데이터 수집이 불가능하거나 비용이 너무 클 수 있다. 이 경우에는 모델의 크기를 줄이거나 regularization을 개선하는 것이다. regularization은 weight-decay-coefficients와 같은 hyperparameter를 조정하거나 dropout과 같은 전략을 추가하여 개선할 수 있다.

## 11.4 Selecting Hyperparameters
성능을 개선하기 위해 추가 데이터 수집 외에도 hyperparameter를 조정하는 방안이 존재한다. 초매개변수는 사람이 직접 수동으로 조정할 수도 있고, 어떤 알고리즘을 이용해 자동으로 조정하게할 수도 있다. 수동으로 하려면 각 초매개변수가 어떤 작용을 하고, 어떻게 모델이 잘 일반화되는지 이해해야 한다. 자동으로 하면 대신 계산 비용이 훨씬 커진다.

### 11.4.1 Manual Hyperparameter Tuning
우선 hyperparameter와 training error, generalization error, 계산 자원(메모리와 실행시간) 간의 관계를 이해해야 한다. 잠시 [effective capacity]에 대해 알아보고 오자. 일반적으로 정해진 계산 자원 안에서, 일반화 오차가 최소가 되는 초매개변수를 찾는다. 대부분의 경우, 이러한 초매개변수는 모델의 수용력(capacity)를 증가시킨다.

가장 중요한 초매개변수 중 하나는 learning rate이다. learning rate가 주어진 최적화 문제에 가장 최적일 때, effective capacity가 최대가 된다. learning rate가 너무 크면(적어도 2배 이상) 훈련오차를 오히려 증가시킬 수 있다[LeCun, 1998a]. 반대로 너무 작으면 훈련 오차가 큰 지점에 붙잡힐 수도 있다.

이외의 초매개변수를 조정할 때는 훈련오차와 일반화오차 모두 관찰하여 과적합을 일으키지 않는지 확인할 필요가 있다. 훈련오차가 크다면 regularization을 적용하거나, 최적화 알고리즘을 수정하거나, 모델의 크기를 키워 capacity를 증가시켜야한다. 비용은 증가할 수 밖에 없다.
일반화 오차가 크다면 dropout이나 weight-decay를 추가하는 등의 방법으로 regularization-hypherparameter을 조율하여 모델의 유효 수용력을 낮추면 된다. 그러나 일반화 오차가 줄어드는 것보다 훈련 오차가 증가하는 것이 더 빨라서는 안된다. 최적은 두 오차가 적절히 절충되어야한다.

명심해야할 것은, 초매개변수의 조정은 test error(train error + generalization error)을 줄인다는 목표 하에 이루어져야 한다는 것이다. 비용을 생각하지 않는다면 training set과 model capacity를 계속 증가시키는 것은 언제나 옳다. capacity를 줄이는 regularization은 하나의 수단일 뿐이다.

### 11.4.2 Automatic Hyperparameter Optimization Algorithms
SVM이나 로지스틱 회귀가 흔히 쓰이는 이유 중 하나는 수동 조정할 매개변수가 한두개 뿐이기 때문이다. 수동 조율이 유용한 경우는 기존 연구 경험에서 얻은 좋은 값이나 경향을 알고 있을 때이다. 그렇지 않은 수많은 경우에 자동 조율은 충분히 유용하다. 좋은 hyperparameter를 얻는 과정 역시 일종의 최적화이기 때문이다. 다만 학습 알고리즘의 각 초매개변수를 최적화하는 2차 초매개변수를 조정해야한다는 문제가 존재한다. 2차 초매개변수를 조정하는 것이 1차 초매개변수를 조정하는 것보다 용이할 때 선택할 수 있는 방안이다.

### 11.4.3 Grid Search
hyperparameter가 셋 이하일 때, 흔히 grid search를 이용한다.
격자 검색은 각각의 초매개변수가 가질 수 있는 값들의 집합을 설정한 후, 곱집합에 속하는 모든 조합에 대해 훈련을 실행한다. 각 초매개변수가 가질 수 있는 값은 보수적으로 가장 큰 값과 가장 작은 값, 중간의 log 값들로 본다. 예를 들어, hidden-units의 개수로 가능한 값을 {50, 100, 200, 500, 1000, 2000}으로 설정할 수 있다.
격자검색의 문제점은 초매개변수의 개수(m)와 각 초매개변수의 가능한 최대값(n)에 지수적으로 계산 비용($$O(n^m)$$)이 증가한다는 것이다. 

### 11.4.4 Random Search
무작위 검색에서는 사용자가 초매개변수 조합들에 대한 하나의 확률분포를 지정한다. 흔히 uniform 또는 log-uniform 분포가 쓰인다. 지정된 분포에 따라 무작위로 초매개변수 조합들을 추출해 훈련을 실행한다. 성능에 큰 영향이 없는 초매개변수들이 많을 때, grid-search보다 지수적으로 더 효울적이다.

## 11.5 Debugging Strategies
성능 개선 방법으로 데이터 추가 수집과 초매개변수 조정이 있다는 것을 알아보았다. 그런데 성능이 낮은 이유가 알고리즘일 수도 있다. 학습 알고리즘 자체의 결함일 수도 있고, 구현 과정에서 버그가 있을 수도 있다.
다음과 신경망 디버깅 전략들이 존재한다. 
1) 모델의 동작을 시각화한다.
2) 최악의 실수를 시각화한다.
3) train/test error을 이용해 추론한다.
4) 작은 데이터로 시험한다.
5) 코드 상의 역전파 미분이 실제 미분된 수치와 일치하는지 확인한다.

# 12. Applications
딥러닝이 computer vision, speech recognition, natural language processing과 같은 상용 서비스에 실제로 적용되는 방법을 소개한다. 공통적으로 요구되는 대규모 십층 학습과 각 과제 영역에 필요한 특수화에 대해서 설명하겠다.

## 12.1 Large-Scale Deep Learning
딥러닝의 본질은 단순한 개별 feature가 매우 많이 연결되면 지능적으로 변한다는 것이다. 즉, 고성능 하드웨어와 이를 제어하는 소프트웨어가 필수적이다.
현재 대부분의 신경망은 단순한 병렬 연산에 특화된 GPU에 의존한다. CPU에 비해 branching 능력이 부족하지만 병렬성과 메모리 대역폭이 크기 때문에 커다란 유효값을 가진 행렬 연산에 적합하다. NVIDEA가 지원하는 CUDA 언어는 범용 GPU를 제어하는데 특화되어 있다. 그러나 GPU 코드는 기존 프로그래밍 언어들과 퍽 다르기 떄문에, 합성곱이나 행렬 연산과 같은 고성능 연산을 지원하는 TensorFlow나 Torch 등의 라이브러리를 사용하는 것도 좋은 선택이다.

## 12.2 Computer Vision
대부분의 computer vision은 object recognition 혹은 detection을 폭표로 한다.
보통 이미지 파일은 이미 픽셀 단위로 정규화되어 있기 때문에, 동일한 채널 크기로 통일하는 전처리를 수행한다. 흑백(0,1)과 컬러(0-255) 이미지가 섞이지 않도록 하는 것이다.
CNN은 가변 크기의 이미지를 입력 받아, pooling 크기를 조절하여 출력 크기를 일정하게 유지하기 때문에 이미지의 크기를 전처리할 필요는 거의 없다.
dataset argumentation 역시 훈련 데이터에만 적용 가능한 전처리의 일종으로 보아도 좋다.

## 12.3 Speech Recognition
ASR(자동 음성 인식)은 자연어 발화(utterance)의 음향 신호를, 단어 순차열로 사상한다.
본래 음향 특징들과 음소들의 연관 관계를 모델화한 GMM(가우스 혼합 모델)과 음소들의 순차열을 모델화한 HMM(은닉 마르코프 모델)의 조합이 오랫동안 쓰여왔다. 그러나 GMM의 역할을 비지도 사전 훈련 기법인 RMB(제한 볼츠만 기계)이 대체하며 딥러닝의 성능이 기존의 GMM-HMM 시스템을 추월하였다[Deng&Yu, 2014]. 
현재에는 CNN이나 LSTM으로 HMM을 대체하여 딥러닝만으로 end-to-end ASR 시스템을 구축하는 것을 목표로 하고 있다[Graves, 2013].

## 12.4 Natural Language Processing
대표적인 NLP 과제는 기계 번역이다. 일반적으로, NLP모델은 단어들의 순차열을 입력으로 받는 것이 유용하다. 그러나 가능한 단어들의 개수가 크기 때문에, 단어 기반 언어 모델은 반드시 차원수가 극도로 많은 희소 이산 공간에서 동작한다. 이러한 공간을 비용 및 통계적 과점에서 효율적으로 작동하게하는 전략이 NLP의 핵심이다.

### 12.4.1 n-grams
자연어의 sequence of token들에 대해 하나의 확률분포를 정의한다. 항상 이산적인 개체인 토큰은 단어, 문자 혹은 바이트일 수 있다. n-gram은 고정 길이 n개의 토큰들로 이루어진 하나의 순차열을 일컫는다.

### 12.4.2 Neural Language Model
NLM은 주로 RNN이나 embedding을 사용하여 문장이나 문서이 다음 단어를 예측/생성하는 모델이다. 문장의 문맥을 고려하여 단어의 확률 분포를 학습하여, 이전 단어들에 따라 다음 단어를 예츨하는 데 뛰어나다.

### 12.4.3 High-dimensional Output

### 12.4.4 n-gram and NLM
NLM의 문맥파악능력과 n-gram의 통계적 접근 방식을 결합한 일정의 ensemble 전략이다.

### 12.4.5 Machine Translation

## 12.5 Other Applications
추천 서비스와 질의응답 서비스가 주된 응용분야로 떠오르고 있다.

## Questions
**Q1.** 11.2에서 "Batch normalization also sometimes reduces generalization error and allows dropout to be omitted, due to the noise in the estimate of the statistics used to normalize each variable."가 어떻게 그런 것인지 잘 이해가 안갑니다. 둘 다 과적합을 방지해서 일반화 오차를 줄이기 때문에 배치정규화를 사용하면 dropout을 생략해도 된다는 말일까요? <br>
**A1.** Yes. Batch normalization은 정규화 효과 외에도 noise 효과도 가지고 있다. 따라서 noise 주입을 목적으로 하는 dropout 정규화 전략을 사용할 필요 없다. 다만, 이후 transformer에서는 layer normalization을 쓰는데, 이것은 noise 효과가 없기 떄문에 다시 dropout을 쓰기도 한다.

**Q2.** 딥러닝이 아닌 머신러닝도 gpu가 필수적인가요?  <br> 
**A2.** No. 대부분의 머신러닝 연산은 통계분포와 행렬연산을 필수적으로 쓰는 딥러닝에 비해 비교적 간단한 모델이기 때문에 cpu만으로도 충분하다. 물론 gpu를 쓰면 빠르지만, 필수까지는 아니다.

**Q3.**   <br>
**A3.**




<!-- Links -->
[Deep Learning]: https://github.com/baejaeho18/MyLibrary/blob/main/Machine%20Learning/deeplearningbook.pdf
[effective capacity]: https://munjeongkang.github.io/ANN2/
[LeCun, 1998a]: http://vision.stanford.edu/cs598_spring07/papers/Lecun98.pdf
[Deng&Yu, 2014]: https://nowpublishers.com/article/Details/SIG-039
[Graves, 2013]: https://arxiv.org/pdf/1308.0850.pdf