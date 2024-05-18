# 4장 서버 사이드 렌더링

## 4.1 서버 사이드 렌더링이란?

### 4.1.1 싱글 페이지 애플리케이션의 세상

- **싱글 페이지 애플리케이션**
  - 렌더링과 라우팅에 필요한 대부분의 기능을 서버가 아닌 브라우저의 자바스크립트에 의존하는 방식
  - 페이지 전환을 위한 모든 작업이 history.pushState와 history.replaceState로 이루어짐
  - 필요한 <body/> 내부의 내용을 모두 자바스크립트 코드로 삽입한 이후에 렌더링 함
  - 렌더링에 필요한 정보만 HTTP 요청으로 가져와서 <body/> 내부에 DOM을 추가, 수정 삭제하는 방법으로 페이지가 전환됨

### 4.1.2 서버 사이드 렌더링이란?

- 최초에 사용자에게 보여줄 페이지를 서버에서 렌더링해 빠르게 사용자에게 화면을 제공하는 방식
- 웹페이지가 점점 느려지는 상황에 대한 문제의식을 개선
- 차이는 렌더링의 책임을 어디에 두느냐

- **장점**

  - 최초 페이지 진입이 비교적 빠르다
  - 검색 엔진과 SNS 공유 등 메타데이터 제공이 쉽다
  - 누적 레이아웃 이동(Cumulative Layout Shift)이 적다
    - 페이지를 보여준 후 뒤늦게 화면이 로딩되는 현상
  - 사용자의 디바이스 성능에 비교적 자유롭다
  - 보안에 좀 더 안전하다

- **단점**
  - 소스코드를 작성할 때 항상 서버를 고려해야 한다
    - 서버에서 실행될 가능성이 있으면 브라우저 전역 객체인 window 또는 sessionStorage에 대한 접근을 최소화
  - 적절한 서버가 구축돼 있어야 한다
  - 서비스 지연에 따른 문제

### 4.1.3 SPA와 SSR을 모두 알아야 하는 이유

- 서버 사이드 렌더링 역시 만능이 아님
  - 우선순위에 따라 SPA가 더 효율적일 수 있다

## 4-2 서버 사이드 렌더링을 위한 리액트 API 살펴보기

- 리액트는 리액트 앱을 서버에서 렌더링할 수 있는 API를 제공
- react-dom/server.js

### 4.2.1 renderToString

- 최초의 페이지를 HTML로 먼저 렌더링
- 렌더링은 루트 컴포넌트인 `<div id="root"/>`에서 수행
- 훅과 이벤트 핸들러는 결과물에 포함되지 않음
- data-reactroot : 리액트 컴포넌트의 루트 엘리먼트가 무엇인지 식별하는 역할

### 4.2.2 renderToStaticMarkup

- renderToString과 유사하지만 리액트에서만 사용하는 추가적인 DOM 속성을 만들지 않음

### 4.2.3 renderToNodeStream

- 완전히 Node.js 환경에 의존하는 API
- ReadableStream의 결과물 타입
  - 큰 크기의 데이터를 청크 단위로 분리해 순차적으로 처리하기 위함

### 4.2.4 renderToStaticNodeStream

- renderToNodeStream과 유사하지만 react 속성이 제공되지 않음

### 4.2.5 hyderate

- renderToString과 renderToNodeStream으로 생성된 콘텐츠에 자바스크립트 핸들러나 이벤트를 붙이는 역할
- HTML에 이벤트와 핸들러를 붙여 완전한 웹페이지 결과물을 만든다
- render 함수와 유사함
- hydrate가 서버에 제공해준 HTML이 클라이언트의 결과물과 같을 것이라는 가정하에 실행됨

### 4.2.6 서버 사이드 렌더링 예제 프로젝트

- **placeholder**는 서버에서 리액트 컴포넌트를 기반으로 만든 HTML 코드를 삽입하는 자리
- unpkg는 npm 라이브러리를 CDN으로 제공하는 웹서비스
- browser.js는 클라이언트 리액트 앱 코드를 번들링했을 때 제공되는 리액트 자바스크립트 코드
- webpack.config.js
  - entry

## 4.3 Next.js 톺아보기

### 4.3.1 Next.js란?

### 4.3.2 Next.js 시작하기

- package.json
  - 프로젝트 구동에 필요한 명령어 및 의존성을 포함
- next.config.js
  - Next.js 프로젝트의 환경 설정을 담당
  - reactStrictMode : 리액트 애플리케이션 내부에서 잠재적인 문제를 개발자에게 알리는 도구
  - swcMinify : 번들링과 컴파일을 더욱 빠르게 수행하는 옵션
- pages/\_app.tsx
  - 애플리케이션 페이지 전체를 초기화
  - 전역 에러 처리
  - 전역 css 선언
  - 공통 데이터 제공
- pages/\_document.tsx
  - 애플리케이션 HTML을 초기화
  - 서버에서 실행된다
  - CSS-in-JS 스타일을 서버에서 모아 HTML로 제공할 수 있음
- \_app.tsx와 \_document.tsx 차이점
  - app.tsx는 Next.js 초기화하는 파일, Next.js 설정과 관련된 코드를 모아둠
  - document.tsx는 HTML 설정과 관련된 코드르 추가하는 곳, 서버에서만 실행됨
- pages/\_error.tsx
  - 에러를 처리할 목적으로 생성
- pages/index.tsx
  - 웹사이트의 루트 주소
  - 파일 이름이 곧 라우팅이 된다
  - /pages/hello/[greeting].tsx : []의 의미는 여기에 어떠한 문자도 올 수 있다는 뜻
  - /pages/hi/[...props].tsx : /hi를 제외한 /hi 하위의 모든 주소가 여기로 온다. [...props] 값은 props라는 변수에 배열로 오게된다.
    - /hi/my/name/is : ['my', 'name', 'is']
    - string형
- 서버 라우팅과 클라이언트 라우팅의 차이
  - `<a>`와 `<Link>`의 차이
    - `<a>`는 페이지를 만드는데 필요한 모든 리소스를 처음부터 다 가져옴
    - `Link`는 클라이언트에서 필요한 자바스크립트만 불러온 후 라우팅하는 클라이언트 라우팅/렌더링 방식
  - 내부 페이지 이동 규칙
    - `<a>`대신 `<Link>`를 사용한다
    - window.location.push 대신 router.push를 사용한다
- getServerSideProps가 없으면 서버 사이드 렌더링이 필요없는 정적인 페이지로 분류됨
- /pages/api/hello.ts
  - /api 경로는 서버의 API를 정의하는 폴더
  - 이 주소는 서버 요청을 주고 받음

### 4.3.3 Data Fetching

- 서버 사이드 렌더링 지원을 위한 몇 가지 데이터 불러오기 전략
- getStaticPaths와 getStaticProps
  - 블로그, 게시판과 같이 사용자와 관계없이 정적으로 결정된 페이지를 보여주고자 할 때 사용되는 함수
  - getStaticProps와 getStaticPaths는 반드시 함께 있어야 사용할 수 있다.
  - getStaticPaths는 접근 가능한 주소를 정의
  - getStaticProps는 앞에서 정의한 페이지를 기준으로 해당 요청이 왔을 때 제공할 Props를 반환하는 함수
  - fallback 옵션
    - true : 빌드되기 전까지는 fallback 컴포넌트를 보여주고 빌드가 완료된 이후 해당 페이지를 보여줌
    - blocking : 빌드가 완료될 때까지 사용자를 기다리게 하는 옵션
- getServerSideProps
  - 사용했다면 페이지 진입 전에 수행됨
  - 응답값에 따라 루트 컴포넌트에 props를 반환할 수도, 다른 페이지로 리다이렉트시킬 수 있다
- getInitailProps
  - 서버와 클라이언트 모두에서 실행가능
  - 가급적이면 getStaticProps와 getServerSideProps를 사용하는 편이 좋다

### 4.3.4 스타일 적용하기

- 전역 스타일
  - \_app.tsx에서 필요한 스타일을 import
- 컴포넌트 레벨 CSS
- SCSS와 SASS
- CSS-in-JS

### 4.3.5 \_app.tsx 응용하기

- 사용자가 서비스에 처음 접근했을 때 하고 싶은 무언가를 처리할 수 있다

### 4.3.6 next.config.js 살펴보기

- basePath : 주소 접두사
- swcMinify : swc를 이용해 코드를 압축할지 여부
- poweredByHeader : 응답 헤더에 Next.js 정보를 제공
- redirects : 특정 주소를 다른 주소로 보내고 싶을 때 사용
- reactStricMode : 엄격 보드 설정
