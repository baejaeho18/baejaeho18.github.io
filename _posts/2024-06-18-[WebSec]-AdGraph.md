---
layout: post
title: "[WebSec] AdGraph"
category: study
tags: [ai, paper]
---

> [논문]

## Introduction
광고와 트레킹은 여러가지 불안을 유발합니다.
프라이버시, 보안, 웹페이지 성능, 불편한 사용경험 등입니다.
이에 따라, 브라우저 공급자와 사용자 모두 특정 유형의 콘텐츠를 차단하는 content blocking에 대한 요구가 증대되고 있습니다.
저 같은 경우 adblock과 brave를 사용해보았습니다

그렇다면 이러한 광고와 트레킹을 어떻게 막고 있었을까?
자바스크립트 코드나 URL의 패턴을 기반으로 rule을 만들어 filter list로 거른다.
그러나 새로운 침해에 대응하기에는 오래 걸리는 반면, 오래된 침해방식은 곧 유효하지 않습니다.
실제로 제가 복무했던 해군사이버작전센터는 유해 ip와 해킹메일을 black list 룰로 차단했는데, 주기적으로 과거 차단 목록을 검토하고 없애주어야 했습니다.

그러나 더 큰 문제는 도메인을 바꾸거나 first-party에서의 침해, javascript를 적절히 난독화하는 전형적인 회피 수단에도 쉽게 뚫린다는 것입니다.
이에 따라 machine learning을 활용한 blocking도 연구되었으나 여전히 scalability와 accuracy 문제들이 있습니다.



<!-- Links -->
[논문]: https://arxiv.org/abs/1805.09155