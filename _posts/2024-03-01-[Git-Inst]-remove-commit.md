---
layout: post
title: "[Git Inst] 작성한 커밋 삭제하기"
category: study
tags: [instructions]
---

커밋할 파일을 잘못 선택하거나 메시지를 잘못 작성하여 커밋을 날리고 다시 만들고 싶을 경우, 커밋을 삭제할 수 있다.
<!--more-->
```bash
PS C:\Users\bjh17\Projects\code> git add *
PS C:\Users\bjh17\Projects\code> git commit -m "feat: oodp complex-calculator init"
[main 2ab403c] feat: oodp complex-calculator init
 4 files changed, 177 insertions(+)
 create mode 100644 0-Education/oodp/bmake.bat
 create mode 100644 0-Education/oodp/complex_calculator/Makefile
 create mode 100644 0-Education/oodp/complex_calculator/complex_calculator.cpp
 create mode 100644 1-scripts/bmake/bmake.bat
PS C:\Users\bjh17\Projects\code> git reset HEAD~1
PS C:\Users\bjh17\Projects\code> git add .\0-Education\*
PS C:\Users\bjh17\Projects\code> git commit -m "feat: oodp complex-calculator init"
[main 5e880fd] feat: oodp complex-calculator init
 3 files changed, 149 insertions(+)
 create mode 100644 0-Education/oodp/bmake.bat
 create mode 100644 0-Education/oodp/complex_calculator/Makefile
 create mode 100644 0-Education/oodp/complex_calculator/complex_calculator.cpp
PS C:\Users\bjh17\Projects\code> git push origin main
To https://github.com/baejaeho18/code.git
```

커밋할 파일 범위를 "*" 에서 "0-Education/*"으로 수정하고자 한다.
"HEAD~1"로 가장 최신 커밋을 지정하여 reset 명령어로 날려버린 후, 다시 커밋&푸시하는 장면이다.

자, 그럼 자연스럽게 드는 의문이 두가지이다.

### Questions
**Q1.** 이미 push한 커밋을 삭제할 수 있는가?
**A1.** 물론이다. 정확히 똑같은 순서를 지키면 된다. reset -> add -> commit -> push 다만 push 할 때 --force를 넣어줘야한다. 당연히 협업 중이라면 충돌나지 않도록 신중히 사용하라.

**Q2.** 가장 최신 커밋이 아니라 과거의 커밋을 삭제할 수는 있을 것 같다. 그렇다면 해당 커밋에서의 변경사항들은 어떻게 처리되는가? 다음 커밋에 통합되는가?
**A2.** HEAD~1이 아닌 삭제하려는 커밋의 hash를 넣으면 삭제가능하다. 다만 그 이후의 변경사항들을 모두 다시 커밋해야하는 모양이다. 특정한 변경내역을 삭제하는 것이 아닌, 삭제할 변경내용 이전으로 reset하는 것에 가깝기 때문이다. 내가 생각하던 '삭제'와는 조금 거리가 있었다.

<!-- Links -->
