---
layout: post
title: "[Circuit] 2. 회로 해석 규칙들"
category: study
tags: hw
---

> 2024SS HGU 회로이론 강의, [뽕교수]의 회로이론 강의
# 해석 규칙들
## Ohm's Law
- Registor : 전하의 이동을 방해하는 소자.

전류($$i = \frac{dq}{dt}$$)의 통과를 방해하기 때문에 에너지($$v=\frac{dw}{dq}$$)를 필요로 한다.
즉, 전류와 저항이 클수록, 전압이 강화된다.
강화되는 정도에 따라 선형/비선형 저항체로 나뉜다.
선형 저항체의 경우, 전압은 전류에 대해 비례상수 R(저항값)로 1차 비례한다. 이때, 수식은 **$$V=IR$$**을 따르며, 저항의 단위는 Ω(Ohm)이다.

<!--more-->



## Questions
**Q1.** 저항은 물리량인가요, 소자인가요? <br>
**A1.** 소자라고 하면 (V = IR)이라는 물리량들의 수식으로 표현되기 떄문에 아니고, 물리량이라고 하기엔 "저항 2개를 직렬연결하면.." 이라는 표현 때문에 소자라고 볼 수 있다.
때문에 보다 정확한 표현은 '저항체(Registor)'라는 전하의 이동을 방해하는 소자와 '저항값(Resistance)'라는 물리량으로 나뉜다. 그러나 둘 모두 저항이라는 표현으로 통칭되는 사례가 잦으니 문맥에 따라 파악해야 한다.


<!-- Links -->
[뽕교수]: https://youtube.com/playlist?list=PL4mqT4nB0TyA4K1BcxGJTP3izKWlN_7Eh&si=OQAmnGDBhNtx30PH