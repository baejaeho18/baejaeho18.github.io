---
layout: post
title: "[Circuit] 2. 회로 해석 규칙들"
category: study
tags: [hw]
---

> 2024SS HGU 회로이론 강의, [뽕교수]의 회로이론 강의

# Resistive Circuit
## Ohm's Law
### Registor
전하의 이동을 방해하는 소자. 가장 간단한 형태의 Passive 소자이다.
Passive 소자란, 에너지를 생성하지 못하고 소모만 하는 소자를 말한다.

전류($$i = \frac{dq}{dt}$$)의 통과를 방해하기 때문에 에너지($$v=\frac{dw}{dq}$$)를 필요로 한다.
즉, 전류와 저항이 클수록, 전압이 강화된다.
강화되는 정도에 따라 선형/비선형 저항체로 나뉜다.
선형 저항체의 경우, 전압은 전류에 대해 비례상수 R(저항값)로 1차 비례한다. 
### Ohm's Law
V-I 관계가 근사적으로 선형인 경우, 옴의 법칙은 유효하다.
전압과 전류, 저항값의 관계는 **$$V=IR$$**을 따르며, 저항의 단위는 Ω(Ohm)이다.
<!--more-->
### Conductance
저항과는 반대되는 전도도(Conductance)라는 개념이 있다. 전도도(G)는 저항(R)과 반비례한다. $$G=1/R$$
### Special Resistor Values
1) R = 0: 완전도체(short, 단락)     => V = 0
2) G = 0: 완전부도체(open, 개방)    => i = 0
### 전력과 저항값
> 전력계산식: P=Vi

* 저항체인 경우: V = Ri => $$p = Ri^2 = V^2/R$$

그렇다면 전력은 저항값에 비례하기도 하고, 반비례하기도 할까? 아니다. 저항값(R)은 상수이다.
전력이 비례하는 것은 전류(i) 혹은 전압(V)의 제곱이다.
전력(Watt)의 단위는 W이다.
 
## Kirchhoff's Law
두 가지 형태의 기초 보존(conservation) 법칙이 존재한다.
전류 보존 법칙(KCL)과 전압 보존 법칙(KVL)이다.

> Charge/Energy cannot be created nor destoryed

우선 회로의 구성요소들을 알아보자.
* node : 소자들이 모이는 점
* branch : 두 노드를 잇는 component(element)
* loop : 동일한 node를 두 번 방문하지 않는 closed path

### KCL
각 노드는 여러 소자(component)에 연결되어 있지만, 그 자체로는 charge를 잡고 있지 않다.
따라서 node에 들어오는 전체 전류량과 나가는 전체 전류량은 동일하다.
### KVL
하나의 loop에서 생성된 에너지의 합과 소모된 에너지의 합은 동일하다.
그렇지 않다면 회로는 무한한 에너지를 소모하거나 생성하게 될 것이다.
### Independent Equations
회로에서 N개의 node와 B개의 branch가 있을 때,
독립된 KCL 연산식의 개수는 (N-1)개이고,
독립된 KVL 연산식의 개수는 (B-(N-1))개이다.


## Analyze Circuit
앞에서 배운 KCL과 KVL만으로도 회로를 해석할 수 있다는 것을 간단히 실습해보겠다.
### Single Loop
단일 loop에서 여러 전류원(current source)를 붙이는 것은 불가능하다. 그러나 여러 전압원(voltage source)를 붙이는 것은 얼마든지 가능하다. KVL을 사용하면 각 소자의 전압을 알 수 있다.
마찬가지로 여러 resistor들을 붙이는 것도 가능하다. resistor이 직렬로 연결되어 있다면 $$R_sum = R1 + R2 + ... + Rn$$과 같다.

### Resistor Combination
저항들이 직렬(series) 혹은 병렬(parallel)로 연결되어 있을 때, 복잡한 회로를 간단하게 해석하는 방법을 배운다.

* Series

두 개의 Resistor가 연결되어 있을 때, 두 저항의 합은 다음과 같다.
$$R_sum = R1 + R2$$
이때, 각 저항에 걸리는 전압은 다음과 같다.
$$V_r2 = V * \frac{R2}{R1+R2}$$, $$V_r1 = V * \frac{R1}{R1+R2}$$
전류는 동일하다.

* Parallel

두 개의 Resistor가 연결되어 있을 때, 두 저항의 합은 다음과 같다.
$$R_sum = \frac{R1*R2}{R1+R2}$$
이때, 각 저항에 흐르는 전류는 다음과 같다.
$$I_r2 = \frac{R1}{R1+R2} * i$$, $$I_r1 = \frac{R2}{R1+R2} * i$$
전압은 동일하다.

### Wye-Delta Transformation
직렬도 병렬도 아닌 저항의 조합을 간단히 하는 방법을 배운다.
delta 형태의 회로를 Y 형태로 변환하면 회로 계산이 매우 간단해진다.
* delta to Y : 분자를 이웃한 두 소자를 곱으로 한다.

$$R_a = \frac{R1*R2}{R1+R2+R3}$$, 
$$R_b = \frac{R2*R3}{R1+R2+R3}$$,
$$R_c = \frac{R1*R3}{R1+R2+R3}$$

* Y to delta : 반대 방향을 분모로 한다.

$$R1 = \frac{R_a*R_b + R_b*R_c + R_c*R_a}{R_b}$$, 
$$R2 = \frac{R_a*R_b + R_b*R_c + R_c*R_a}{R_c}$$, 
$$R3 = \frac{R_a*R_b + R_b*R_c + R_c*R_a}{R_q}$$,

## Dependent Source
전압이 전류와 비례하여 들어간다.
$$ V = aI $$라는 간단한 연산만 추가하면 문제 없다.

## Questions
**Q1.** 저항은 물리량인가요, 소자인가요? <br>
**A1.** 소자라고 하면 (V = IR)이라는 물리량들의 수식으로 표현되기 떄문에 아니고, 물리량이라고 하기엔 "저항 2개를 직렬연결하면.." 이라는 표현 때문에 소자라고 볼 수 있다.
때문에 보다 정확한 표현은 '저항체(Registor)'라는 전하의 이동을 방해하는 소자와 '저항값(Resistance)'라는 물리량으로 나뉜다. 그러나 둘 모두 저항이라는 표현으로 통칭되는 사례가 잦으니 문맥에 따라 파악해야 한다.


<!-- Links -->
[뽕교수]: https://youtube.com/playlist?list=PL4mqT4nB0TyA4K1BcxGJTP3izKWlN_7Eh&si=OQAmnGDBhNtx30PH