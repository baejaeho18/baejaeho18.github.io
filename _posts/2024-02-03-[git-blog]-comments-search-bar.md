---
layout: post
title: "[GithubBlog] 1. 댓글 및 검색창 추가"
category: project
tags: [githubblog]
---

> 주어진 템플릿만으로는 맘에 들지 않아서 댓글 기능과 게시물 검색 기능을 추가해봤다.

<!--more-->

# 1.1 댓글 기능 추가하기
댓글 기능은 Utterances 오픈소스를 활용했다.
Utterances는 Github의 Issue 기능을 사용해 댓글을 생성한다. 각 게시글마다 이슈가 하나씩 매핑이 되고, 게시글에 댓글을 달면 해당 이슈에 댓글이 달린다. 댓글창은 ifame으로 동작하며, Github의 Markdown 문법을 그대로 사용 가능하다.
또한 방문자가 Github 계정이 있다면 별도의 가입이나 로그인 절차 없이도 댓글을 작성할 수 있다.

가장 먼저, Issue를 저장할 [Github Repository](https://github.com/baejaeho18/blog-comments-repo.git)를 Public으로 생성한다. Private으로 생성한다면, 다른 사람들이 Issue에 연동된 댓글을 볼 수 없다.

[Uttenrace Gihub App](https://github.com/apps/utterances)에 접속해 설치한다. install 버튼만 누르면 된다.
Repository access에서 앞서 생성한 Repository와 연결하도록 세팅한다.

마지막으로 [Utterances 공식 홈페이지](https://utteranc.es/)에서 스크립트 코드를 생성 및 복사한다.
Configure 란에서 세팅해야할 항목은 다음과 같다.
* Profile/Repository
* Post <-> Issue Mapping
* Issue Label(optional)
* Theme

# 1.2 검색창 추가
> 원하는 게시물을 검색하는 창을 만들려고 한다.

Jekyll에서 지원해주는 [템플릿](
https://github.com/jekylltools/jekyll-tipue-search)을 사용하겠다.

1. 위 링크에서 다운로드 받은 search.html 파일을 root/search.html에 복사한다.
2. assets/tiquesearch 디렉토리를 root/assets/tiquesearch에 복사한다. 
3. _config.yml 파일에 아래 코드를 추가한다.
```js
tipue_search:
     include:
         pages: false
         collections: []
     exclude:
         files: [search.html, index.html, tags.html]
         categories: []
         tags: []
```
4. _includes/head.html 파일에 아래 코드를 추가한다.

```js
<!-- tipuesearch -->
<link rel="stylesheet" href="/assets/tipuesearch/css/tipuesearch.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="/assets/tipuesearch/tipuesearch_content.js"></script>
<script src="/assets/tipuesearch/tipuesearch_set.js"></script>
<script src="/assets/tipuesearch/tipuesearch.min.js"></script>
```

5. search.html 파일의 tiquesearch 함수에 다음 parameter를 추가한다.

```js
{
  'wholeWords' : false,
  'showTime'   : false,
  'minimumLength' : 1
}
```

6. 검색창을 넣을 위치의 파일에 다음 코드를 추가한다.

```html
<form action="/search">
   <div class="tipue_search_left">
     <img src="/assets/tipuesearch/search.png" class="tipue_search_icon">
   </div>
   <div class="tipue_search_right">
     <input type="text" name="q" id="tipue_search_input" pattern=".{1,}" title="At least 1 characters" required></div>
   <div style="clear: both;"></div>
 </form>
```

7. assets\tipuesearch\css\tipuesearch.css 파일에서 css 값들을 조정한다.