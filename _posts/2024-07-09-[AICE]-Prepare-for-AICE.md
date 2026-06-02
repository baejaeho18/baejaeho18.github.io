---
layout: post
title: "[AICE] Prepare for AICE Associate"
category: study
tags: [ai]
---

> KT에서 주관하는 AICE(AI Certificate for Everyone, 구 AIFB) 자격증 취득을 위해 준비하며 정리한 내용이다.

## AICE
참고한 도서는 [시나공 AICE Associate]이다.
본 책의 Index는 다음과 같다.

> ch1. AI 작업환경 구성
ch2. 데이터 획득
ch3. 데이터 구조 확인
ch4. 기초 데이터
ch5. 데이터 이해
ch6. 데이터 전처리
ch7. AI 모델링 필수 개념 이해
ch8. 지도학습으로 AI 모델링
ch9. 비지도학습으로 AI 모델링
ch10. 모델 성능 향상
ch11. 실습 - 렌탈고객 해지 여부 예측
ch11.1 데이터 처리
ch11.2 데이터 이해
ch11.3 데이터 전처리
ch11.4 모델링과 평가

앞으로 3일에 걸쳐 예제를 쭉 따라가며 실습 및 개념 복습하겠다.
토요일(7/13)까지 3일 남은 만큼, 하루에 챕터 3개 정도 진도를 나가면 되겠다.

그럼, 시작하자.

### ch1. AI 작업환경 구성
일반적으로 Jupyter나 Colab을 주로 사용한다.
그러나 AICE는 시험을 위해 독자적인 AIDU 도구를 제공한다.
[AICE 홈페이지] > AICE 실습 > 나의 프로젝트

### ch2. 데이터 획득
라이브러리 설치를 위한 명령어는 다음과 같다.
```python
!pip install <library>
import <library> as <alias>
```
주로 사용하는 라이브러리는 2가지이다.
1) [numpy] : n차원 배열 객체인 **ndarray**를 처리함
```py
np.array()
```
2) [pandas] : 1차원 배열인 **Series**, 행(row)과 열(column)으로 구성된 2차원 테이블인 **DataFrame**을 처리함
```py
pd.Series()
pd.DataFrame()
pd.to_csv()
pd.read_csv('', index_col=, usecols=, encoding=)
pd.crosstab(index=, columns=)
```

위의 내용은 [샘플코드]에서 확인할 수 있다.

<!-- Links -->
[시나공 AICE Associate]: https://www.yes24.com/Product/Goods/119826720
[AICE 홈페이지]: https://aice.study/main
[numpy]: https://numpy.org/doc/stable/reference/index.html
[pandas]: https://pandas.pydata.org/pandas-docs/stable/
[샘플코드]: https://github.com/baejaeho18/code/blob/main/0-Education/AICE/ch2-Store_Data/AICE_ch2.ipynb