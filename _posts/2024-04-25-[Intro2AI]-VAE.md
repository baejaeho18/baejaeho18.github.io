---
layout: post
title: "[AI] 5. Variational AutoEncoder"
category: study
tags: [ai]
---

### Variational AutoEncoder
Encoder는 입력을 다른 형태(representation)으로 변환한다고 AE에서 알았다.
VAE는 latent space에 고정된 벡터로 encode하는 것이 아니라, **distribution**으로 encode한다.



## GAN: Generative Adversarial Network
decoder(generator)가 실제적인 fake images를 생성한다. 
생성된 이미지를 descriminator가 실제 mnist 이미지에 기반해 구별한다.
서로 상호작용하면서 generator는 점차 실제 이미지에 가깝게 가짜 이미지를 생성하고, 이를 descriminator는 다시 학습한다.
![gan]()

<!-- Links -->
[예제 코드]: https://github.com/baejaeho18/code/blob/main/0-Education/intro2AI/ch8-VAE/VAE.ipynb