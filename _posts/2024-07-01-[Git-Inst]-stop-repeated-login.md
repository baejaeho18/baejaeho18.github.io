---
layout: post
title: "[GIT Inst] push할 때마다 username/password 입력 안하는 방법"
category: study
tags: [instructions]
---

본래 사용하던 환경이 아닐 경우, 귀찮은 일들을 해야한다.
라이브러리 설치 받고, 도구들 다운 받고, 업데이트하고.. git login도 다시 해줘야한다.

그중 push 할 때마다, username과 password(keychain)을 입력하지 않게하는 방법을 정리하겠다.
먼저, keychain은 github.com의 setting/developer_setting에서 token-generate로 얻는다는 것을 잊지말자.

시작!
```script
git config --global user.name "github_id"
git config --global user.email "github_email"
git config credential.helper store --global
```
여기까지가 기본 세팅이다.
한번은 push하면서 username, password를 입력해야하니, push를 해주자.
```script
git push origin main
username :
password : 
git config credential.helper store --global
```
입력을 완료했다면, 이제 원격으로 push해도 id와 pwd를 안쳐도 된다.

끝!!

<!-- Links -->
