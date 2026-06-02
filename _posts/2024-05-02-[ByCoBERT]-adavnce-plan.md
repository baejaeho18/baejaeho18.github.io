---
layout: post
title: "[ByCoBERT] 1. Advance Plan"
category: project
tags: [bycobert]
---

# Progress Report

ByCoBERT의 전신인 DexBERT는 애초에 class 단위 보안취약점 검출을 위한 도구였음. 이를 프로젝트 단위로 예측하도록 코드를 수정한 것이 현재의 ByCoBERT임. 수정한 이유는 보안 취약점 여부가 라벨링된 데이터셋을 직접 만드는 과정에서 프로젝트 단위로 밖에 라벨링하지 못했기 때문임. 그럼에도 ByCoBERT는 비록 작은 데이터셋이지만 OWASP의 class-level 보안 취약점 예측에서도 아래 그림처럼 무작위 이상의 예측 성능을 보였음. 

따라서, class 단위로 취약점 여부를 라벨링한 충분히 큰 데이터셋을 확보한다면 유의미한 결과를 얻을 수 있을거라고 판단됨. 그러한 데이터셋을 확보하기 위해 2가지 방법을 고안함.


첫째, 기존에 사용된 600개 프로젝트의 데이터셋에 프로젝트 단위로 라벨링된 취약점을 class 단위로 다시 라벨링한다. 600개 프로젝트에는 총 300개의 취약한 프로젝트가 존재한다. 프로젝트 명과 버전을 담은 목록이 httpstest_300_300/vul300List.csv다. 그중 일부의 mvnrepo 링크를 담은 목록은 mvn-crawler/vulList.csv이다. 그 중 임의의 링크, https://mvnrepository.com/artifact/org.owasp.antisamy/antisamy/1.5.3로 들어가면 다음과 같은 화면이 뜬다.

이중 Direct vulnerabilities에 속한 CVE가 존재하는 class 들을 라벨링할 것이다. 저 CVE 중 아무 버튼을 클릭해 들어가면 아래와 같은 화면이 뜬다.

다시 한번 NVD 링크를 클릭해 들어가면 아래와 같이 뜬다.

이 CVE는 최근 발견된 CVE라서 어떻게 고쳐야하는지 해당 페이지에서는 확인하기 어렵다. 이런 경우에는 발품을 팔아야할 것 같은데, 어떤 class가 문제인지 어떻게 파악해야할지 방법을 찾고 있다. 이외에도 REJECT된 CVE 등 다른 예외들도 있어서 크롤링 이후 따로 확인해야할 CVE들이 많을 수 있겠다.
다른 CVE 예시로 들어가보겠다. 상기와 동일한 방식으로 CVE 링크를 타고 들어가니 아래와 같은 화면이 뜬다.

이제 아래 Reference 링크들 중에 특정한 패턴(~/github.com/~/commit/~)에 일치하는 링크를 찾아 들어간다.

어떤 파일이 수정되었는지 확인할 수 있다. 동명의 class 파일에 CVE가 존재했다고 라벨링한다.
위의 절차를 자동화한 툴을 만들면 비교적 빠르게 class 단위 라벨링을 마칠 수 있다. 
코드를 짜고, 위에서 보인 몇몇 예외들을 발품 팔아 라벨링하고, 정리하는데 1주일 가량을 잡으면 될 것 같다. 크롤러의 설계는 다음과 같다.
1) 300개 프로젝트의 direct CVE를 목록화
2) 각 CVE에 대한 사이트로 이동: https://cve.mitre.org/cgi-bin/cvename.cgi?name={cve_id}
3) github 커밋 패턴의 url로 이동: ~/github.com/~/commit/~ 
4) 수정된 파일 목록 크롤링: ~/~.java
5) 600개 프로젝트의 class 단위로 취약점 여부를 라벨링
6) 결과 파일: vul_project(project, version, cve_id, cve_cite), cve_related_class(cve_id, class_name, github_url), labeled_class_600(project, version, class, label)


두번째 방법은 Juliet의 class들을 활용하는 것이다. juliet에서 기존의 파일들을 clean과 vul로 분리한다고 가정했을 때, bad / good / goodB2G,goodG2B 버전의 파일들을 얻을 수 있다. good2들을 어떻게 배정해야할지는 고민된다. 한편, Juliet은 CWE를 기반으로 만들어져있다는 것도 고려해야한다.


6주(+3일) 가량의 시간이 주어지는데 어떻게 진도를 나아갈지 대강의 목표를 설정해보았다. 각 실험은 약 4일이 소요될 것이라고 가정한다.
* 1주차 : class 단위 라벨링 및 문서작업
* 2주차 : pretrain4ByCoBERT.py 토크나이징 알고리즘을 project 단위에서 class 단위로 수정 및 정상동작 확인
* 3주차 : 실험1	/ 실험2
* 4주차 : 실험3	/ 실험4
* 5주차 : 실험5	/ 실험6
* 6주차 : 결과 정리 및 후속 연구를 위한 문서작업
* 7주차 : video 및 발표 준비(DL_final)

6번 정도의 재실험 기회를 가지는 것이 목표이다. 어떤 조건들을 바꿔가며 실험하게 될지는 아직은 감이 잡히진 않는다. 그러나 바로 좋은 성과가 나올거라 기대하기보단, 충분한 여유를 두어 재실험할 시간을 마련하는 것이 좋을 것 같다.


<!--links-->