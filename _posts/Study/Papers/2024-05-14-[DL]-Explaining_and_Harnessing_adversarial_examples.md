---
layout: post
title: "[DL] EXPLAINING AND HARNESSING ADVERSARIAL EXAMPLES"
category: study
tags: ai paper
---

> [논문]

## Abstract
심층학습망은 일반적인 적대적 예제에도 취약하다.
적대적 예제란, 입력 데이터에 작은 노이즈를 추가하는 것이다. 이는 모델의 오분류를 유도하여 모델을 취약화시킨다.
이전에는 비선형성과 과적합에 의해 발생하는 현상인줄 알았으나, 오히려 선형성에 의한 것으로 보인다. 이는 몇몇 사례에서만 나타나는 예외가 아닌, 동일한 데이터셋에 대해 여러 모델들이 일관적으로 오류를 나타내기 때문이다.
따라서 드롭아웃, 사전훈련, 평탄화와 같은 일반적인 정규화 전략으로는 적대적 예제에 대처하기 어렵다.
적대적 예제의 예시와 원리를 파악하여 데이터셋의 취약성을 낮추는 것을 목표로 한다.

적대적 변형에 저항하기 위해서는 오히려 비선형적으로(어렵게) 훈련되는 모델을 설계해야 한다는 어려운 균형상태에 놓인다.
LSTM, maxout network, softmax 등 선형성에 기반해 쉽게 최적화되는 접근들에서 취약성이 드러났다.
합성곱 신경망에서도 데이터셋에 대한 작은 회전만으로도 적대적 예제가 생성된다.

물론, 얕은 계층의 근사치라면 모를까 심층 신경망에서도 적대적 예제에 취약하다는 것이 의문스러울 수 있다.
충분히 많은 특징을 잡을 경우 적대적 자극에 저항할 수 있으리라 생각되기 때문이다.
그러나 지금까지 설계된 지도학습 전략들은 적대적 사례를 전혀 고려하지 않았다는 점을 알아야 한다.
가능한 대처방법으로 모델이 특정 정밀도 이하의 특징 변화에 둔감하도록 정규화하는 것은 어떨까? 임의의 노이즈를 추가하거나 샘플링 지점을 늘리는 것이 그 예이다.
그러나 이러한 방식은 썩 유용하지 않았다.

한편, 적대적 예제가 서로 다른 훈련세트나 모델에서 사용되었을 때도, 매우 정확한 위치에서 발생한다는 것에 착안한 방법이 존재한다.
선형적 관점에서 보았을 때, 적대적 예제는 넓은 저차원 공간에서 연속적으로 발생해야한다.
이는 선형분류기가 일반화시키는 문제와 해결방법이 유사하다.
이 가설을 증명하기 위하여 MP-DBM 모델이 설계되었다. 그러나 해당 모델 역시 여전히 적대적 예제에 취약하였다.

결론적으로, 모델이 너무 선형적이기에 오류가 포함된 데이터셋에 취약한 것이 적대적 예제 현상이다.
이를 해결하기 위해 고안된 적대적 훈련은 dropout보다 더 나은 정규화 효과를 보였다.
최적화가 어려운, 근사은닉층으로 이루어진 심층 신경망이 적대적 예제에 대한 저항력이 있는 것으로 보인다. RBF 네트워크가 그 예이다.

<!-- Links -->
[논문]: https://arxiv.org/abs/1412.6572