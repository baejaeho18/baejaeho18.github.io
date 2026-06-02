---
layout: post
title: "[GIT Inst] forked 레포지토리의 커밋을 잔디에 반영하기(fork-bare, mirror-push)"
category: study
tags: [instructions]
---

종종 예전 오픈소스를 용도에 맞게 커스텀할 필요가 있다.
그런데 이러한 커밋들은 PR을 받아주지 않으면 내 잔디에 반영이 되지 않네?
그래서 이미 fork했던 레포지토리의 커밋 기록을 그대로 살리면서 내 레포지토리로 옮기는 방법을 찾아봤다.

우선, 이미 fork했던 레포지토리를 복제 용도로 clone 받는다.
```script
git clone --bare https://github.com/user_id/forked_repository.git
cd forked_repository.git
```
이 레포지토리에서 새로 만들었던 내 레포지토리로 mirror-push(복제)한다.
참고로, 해당 레포지토리는 백업 용도라 추가적인 commit을 만들 수는 없다.
```script
git push --miror https://github.com/user_id/my_new_repository
```

새 레포지토리에 잘 반영이 되었다.
새로 만들어진 레포지토리에서 추가적인 작업을 하려면, 일반적인 상황처럼 clone 받고 수행하면 된다.
```script
git clone https://github.com/user_id/my_new_repository
```

<!-- Links -->
