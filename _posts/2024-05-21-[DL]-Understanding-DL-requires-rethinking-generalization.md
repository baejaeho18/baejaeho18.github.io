---
layout: post
title: "[DL] Understanding deep learning requires rethinking generalization"
category: study
tags: [ai, paper]
---

> [논문]

## Background
우리는 모델이 좋은 [Representation]을 학습하는 것이 중요하다는 것을 배웠습니다.
잘 학습된 모델은 처음 접하는 표현도 새로운 카테고리로 잘 인지(구분)한다는 것은 중요한 지점입니다.
동시에, DL이 noise에 취약하다는 사실도 배웠습니다.
아주 작은 noise만 더해도 완벽하게 오분류한다는 사실이 [Adversarial] 논문에서 잘 드러납니다.
따라서, 지나치게 잘 학습된 모델이 실용화되기 위해서는 overfitting을 막아주는 기법들이 필요합니다.
즉, **Generalization Error**을 줄여주는 기법들이 발전해온 것입니다.
조금만 더 자세히 이야기해보면 Explicit Regularization에는 weight decay, dropout, data augmentation 등이 있고, Implicit Regularization에는 early stopping, batch normalization, sgd 등이 있습니다.
- Weight Decay(L2 Norm) : 모든 가중치에 대해 손실의 도함수를 취하고, 학습율에 따라 업데이트하는 것이 기본이지만, 각 개별 가중치가 강해질 경우 추가적인 punishment를 통해 자제시키는 기법
- Dropout : 계층의 임의의 뉴런들을 mask하여 특정 노드들의 영향이 강해지는 것을 방해하는 기법
- Data Augmentation : 입력 데이터를 도메인에 맞게 변화시키는 기법이다. (Domain specific transformations of the input data)

본 논문은 이러한 Generalization 기법이 정말로 가치가 있는지 확인합니다.

## Method
데이터셋을 일부로 왜곡(noise)시켜 학습시켜보았습니다.
라벨을 부분적으로 왜곡하기도 하고, 랜덤으로 매기기도 했습니다.
또한 pixel들을 섞거나 임의의 픽셀을 집어 넣기도 했습니다.
정규화를 포함하거나 포함하지 않고 동일한 모델과 데이터셋을 학습시켜보기도 했습니다.
사용된 정규화 기법에는 Data augmentation, weight decay, drop-out이 있었습니다.

## Result
어떤 방식을 취해도 학습시간에 차이가 있을 뿐, train error는 0으로 수렴합니다.
이는 모델이 'learning'이 아니라 'memorizing' 한다는 것을 뜻합니다.

## Finding
정규화는 분명 accuracy 그래프에서 noise를 줄여 smoothing한 양상을 보입니다. 
또한 weight decay나 dropout보다 data augmentation이 유용하며, early stopping과 batch normalization이 generalization에 약간 도움을 주는 것은 맞습니다.
그러나 정규화가 적용되지 않았을 때도, 비슷한 성능을 유지합니다.
오히려 어떤 정규화를 사용하느냐보다, 어떤 모델을 사용하느냐가 훨씬 중요해보입니다.

문제는 CNN 모델이 학습을 넘어서 암기(memorize)하기 충분한 capacity를 가진 것으로 보인다는 점입니다.
본 연구는 정규화가 일반화에 필수적이지 않다는 사실을 밝혔습니다.

이곳은 즉독정리용 공간이기 때문에, 정확한 정보는 [Slides]로 가야한다.

 

<!-- Links -->
[논문]: https://arxiv.org/abs/1611.03530
[Representation]: https://baejaeho18.github.io/study/DL-representative-learing.html
[Adversarial]: https://baejaeho18.github.io/study/DL-Explaining_and_Harnessing_adversarial_examples.html
[Slides]: https://docs.google.com/presentation/d/1xcbFpkXQFZedyOXFfaphjMl-3s75PaqodLpuuq8LNus/edit?usp=sharing