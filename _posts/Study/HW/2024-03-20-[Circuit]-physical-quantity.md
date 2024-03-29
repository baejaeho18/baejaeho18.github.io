---
layout: post
title: "[Circuit] 0. 회로이론 목차"
category: study
tags: hw
---

> 2024SS HGU 회로이론 강의, [뽕교수]의 회로이론 강의
<!--more-->
# 1. 정의 정리
## 1.1 물리량
> 전하, 전류, 전압, 전력, 에너지
이들의 개념(정의)와 단위, 기호, 표시(계산)을 정리한다.

### 전하
Charge : 1개의 전자 = $$-1.602 * 10^{-19}$$ [C]
- $$6.24 * 10^{18}$$개의 전자 = -1 [C]
- 단위: [C] Coulomb
- 기호 : Q/q

### 전류
전류란 전하의 이동을 뜻한다.
- 기호 : I/i, intensity?
- 전류의 표시 : 기준방향을 화살표, 전류의 세기를 값으로 하여 표시한다.

두 수학적 정의가 존재하는데,
1) 시간에 대한 전하의 변화량
- $$i = dq/dt$$ [C/S = A(amphere)]
2) 단위시간에 도체의 단면을 통과하는 전하량
- $$I = Q/t$$
- $$Q(t,t0) = \sigma{t, t0}i dt$$

- 전류의 종류
    - 직류(dc: direct current) : 한쪽 방향으로만 흐르는 전류, 시간에 따라 값이 일정하다.
    ![ac](/assets/img/2024-03-16/ac.png)
    - 교류(ac: alternating current) : 시간에 따라 흐르는 방향이 변하는 전류, 정현파 형태의 전류를 일컫는다.
    ![dc](/assets/img/2024-03-16/dc.png)

전류의 두 정의는 직류일 때 동일하지만, 교류일 때는 1번 정의가 정확하다.


### 전압
전압이란 곧 전위차이다.
- $$v = dw/dq$$ [J/C = V(volt)]
- $$V = W/Q$$ : 전압이 일정할 경우

전압의 표시
- 부호 : 기준점(-)과 상대점(+)
- 값 : 전하의 크기
![voltage](/assets/img/2024-03-23/voltage.png)
위 사진은 동일한 상태를 가리킨다.


* 오류 4가지
    - 전압은 전기의 압력이다
    - 전압은 전류를 흐르게 하는 힘이다
    - 전류의 세기는 전압에 비례한다
    - 전류는 높은 전위에서 낮은 전위로 흐른다

### 전력과 전력량
전력은 에너지(전력량)가 소모되는 비율이다
- $$p = dw/dt$$ [J/s = W(watt)]
- $$P = \frac{W}{t}$$ : 전력이 일정할 경우

전력의 계산
- $$p = vi$$
![power](/assets/img/2024-03-23/power.png)


## 1.2 회로
회로(시스템)이란 주어진 목적을 위해, 정해진 방법에 따라 상호접속된 소자들의 모임이다.
그렇다면 '소자'란 무엇인가?
### 수동소자와 능동소자
에너지를 공급(w<0)하면 능동소자이고, 에너지를 소비(w<=0)하면 수동서자이다.
능동소자의 예로는 전원이 있고, 수동소자의 예로는 저항과 인덕터, 커페시터가 있다.
### 직류회로와 교류회로
능동소자(전원)의 종류에 따라 회로는 직류회로와 교류회로로 나뉜다.
### 정적회로와 동적회로
한편, 수동소자에 따라 정적회로와 동적회로로도 나뉜다.
![circuit](/assets/img/2024-03-23/circuit.png)

회로해석이란 위와 같은 회로에서 임의의 지점의 v, i, p, w를 구하는 것이다.
$$p = vi = \frac{dw}{dt}$$이므로, v와 i만 알면 두 값의 곲으로 p를, p의 적분으로 w를 구할 수 있다.

회로는 결국 상호접속된 소자들의 모임이기 때문에, 소자법칙과 연결법칙을 이해하면 간단하다.
소자법칙은 각 소자에서의 v와 i의 관계를 이해하는 것이다 : v = f(i)
연결법칙은 KCL, KVL, Mesh 등 연결관계를 이해하는 것이다.

### 직렬연결과 병렬연결
직렬연결이란 하나의 노드에 단지 2개의 소자만 연결된 것을 말한다. 
아래 그림에서 **b**만이 직렬연결이다.
![node](/assets/img/2024-03-23/node.png) <br>
병렬연결은 한 쌍의 노드에 둘 이상의 소자가 연결된 것을 말한다. 
위 그림에서 **c**와 **d** 사이에 연결된 두 저항이 있기 때문에 병렬연결이다.

## 1.3 전원
전원은 에너지를 발생시키는 장치이다.
전원의 종류는 1) 소자전압 혹은 소자전류가 일정하게 유지되는지(전압원과 전류원)와 2) 그 값이 회로와 무관한지(종속원과 독립원)로 분류되어 총 4가지로 나뉜다.

이제 각 전원(능동소자)에서의 v와 i의 관계식을 살펴보자.

### 독립전압원
전압원(전류와 관계없이 전압이 일정한 2단자 소자) + 독립원(소자전압값이 회로와 무관)
- v = 상수

### 독립전류원
전류원(전압과 관계없이 전류가 일정한 2단자 소자) + 독립원(소자전류값이 회로와 무관)
- i = 상수

### 종속전압원
전압원(전류와 관계없이 전압이 일정한 2단자 소자) + 종속원(소자 전압값은 회로의 다른 소자 전압값에 의해 결정)

종속전원의 종류
- VCVS
- VCCS
- CCVS
- CCCS


### 종속전류원
전류원(전압과 관계없이 전류가 일정한 2단자 소자) + 종속원(소자 전압값은 회로의 다른 소자 전압값에 의해 결정)


## Questions
**Q1.** 독립전압원이 교류전원일 경우 어떻게 되나요?


<!-- Links -->
[뽕교수]: https://youtube.com/playlist?list=PL4mqT4nB0TyA4K1BcxGJTP3izKWlN_7Eh&si=OQAmnGDBhNtx30PH