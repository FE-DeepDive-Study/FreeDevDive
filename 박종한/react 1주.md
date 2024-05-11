## 2장 정리

- **key props를 왜 써야하는가?**

  - 리액트 파이버에서 current와 workInProgress 트리를 구분하기위해 필요한 값
  - key가 없다면 단순히 파이버 내부의 sibling 인덱스만을 기준으로 판단하게 됨

- **렌더와 커밋**
  - 렌더 단계
    - 컴포넌트를 렌더링하고 변경 사항을 계산하는 모든 작업
    - type, props, key를 비교하여 가상 DOM을 비교하는 과정을 거쳐 변경이 필요한 컴포넌트를 체크
  - 커밋 단계
    - 렌더 단계의 변경 사항을 실제 DOM에 적용해 사용자에게 보여주는 과정
    - 변경 사항이 없다면 생략될 수 있음
  - 부모 요소가 렌더링 되었으면 자식도 렌더링 됨

# 3장 리액트 훅 깊게 살펴보기

## 3.1 리액트의 모든 훅 파헤치기

- useState

  - 함수 컴포넌트 내부에서 상태를 정의
  - 상태를 관리
  - ```tsx
    // 함수 내부에서 자체적으로 변수를 사용해 상태값을 관리하는 예제
    const Code190 = () => {
      let state = "hello";

      const handleButtonClick = () => {
        state = "hi";
      };
      return (
        <div>
          <h1>{state}</h1>
          <button onClick={handleButtonClick}>hi</button>
        </div>
      );
    };

    export default Code190;
    ```

    - return 함수를 실행한 다음, 이 실행 결과를 이전의 리액트 트리와 비교해 리렌더링이 필요한 부분만 업데이트
    - 위 코드는 리렌더링을 발생시키기 위한 조건을 충족하지 못함
    - > React 함수형 컴포넌트에서 리렌더링이 발생하는 조건
      >
      > - Props, State, Context의 값이 변경
      > - 부모 컴포넌트가 리렌더링되면 자식 컴포넌트도 함께 리렌더링
      > - forceUpdate 함수를 사용하여 강제로 리렌더링

  -

  ```tsx
  // useState 반환값의 두 번째 원소를 실행하는 예제
  import { useState } from "react";

  const Code191 = () => {
    const [, triggerRender] = useState();

    let state = "hello";

    const handleButtonClick = () => {
      state = "hi";
      triggerRender();
    };
    return (
      <div>
        <h1>{state}</h1>
        <button onClick={handleButtonClick}>hi</button>
      </div>
    );
  };

  export default Code191;
  ```

  - state를 업데이트를 했지만, 새롭게 실행되는 함수에서 state를 매번 hello로 초기화하므로 렌더링 되지 않음

  - 리액트에서는 클로저를 사용하여 useState를 구현
  - 게으른 초기화
    - useState에 인수로 특정한 값을 넘기는 함수를 넣어서 사용
    - 비용이 많이드는 함수를 쓸 때 사용
    - 리액트에서 렌더링이 실행될 때마다 함수 컴포넌트의 함수가 다시 실행되기 때문에, useState의 값도 재실행된다
    - useState에 함수를 넣으면 최초 렌더링 이후에는 실행되지 않음
    - **Q. 왜 함수는 재실행되지 않는지?**

- useEffect

  - 애플리케이션 내 컴포넌트의 여러 값들을 활용해 동기적으로 부수 효과를 만드는 메커니즘
  - 두개의 인수 (콜백, 의존성 배열)
  - 의존성 배열의 값이 바뀌면 콜백함수가 실행됨
  - 빈 배열을 넣으면 컴포넌트가 마운트될 때만 실행
  - **Q.클린업 함수?, 언마운트?**
  - useEffect가 의존성 배열이 변경된 것을 어떻게 알까?
    > 렌더링할 때마다 의존성에 있는 값을 보면서 이 의존성의 값이 이전과 다른게 하나라도 있으면 부수 효과를 실행
  - 클린업 함수의 목적
    > 이전 상태를 청소해주는 개념
  - 의존성 배열
    > 빈 배열, 값이 없음, 사용자가 원하는 값  
    > 빈 배열 : 최초 렌더링에만 실행  
    > 값이 없음 : 렌더링할 때마다 실행
    > 값이 없는 useEffect를 쓰는 이유
    >
    > - 클라이언트 사이드에서 실행되는 것을 보장
    > - 컴포넌트 렌더링이 완료된 이후에 실행되는 것을 보장
  - useEffect를 사용할 때 주의할 점
    - useEffect의 첫번째 인수에 함수명을 부여하라
    - 거대한 useEffect를 만들지 마라
    - 불필요한 외부 함수를 만들지 마라

- useMemo

  - 비용이 큰 연산에 대한 결과를 저장해 두고, 이 저장된 값을 반환하는 훅
  - (어떠한 값을 반환하는 생성 함수, 해당 함수가 의존하는 값의 배열)
  - 의존성 배열의 값이 변경되지 않았으면 함수를 재실행하지 않고 이전 값을 반환

- useCallback

  - 인수로 넘겨받은 콜백 자체를 기억함
  - 특정 함수를 새로 만들지 않고 다시 재사용함

- useRef

  - useState와 동일하게 컴포넌트 내부에서 렌더링이 일어나도 변경 가능한 상태값을 저장한다는 공통점이 있다.
  - useState와 구별되는 큰 차이점 두가지
    > useRef는 반환값인 객체 내부에 있는 current로 값에 접근 또는 변경할 수 있다.  
    > useRef는 그 값이 변하더라도 렌더링을 발생시키지 않는다.
  - useRef가 필요한 이유?
    > 원하는 시점의 값을 렌더링에 영향을 미치지 않고 보관해둘 때 사용

- useContext

  - Context
    - props 내려주기를 극복하기 위해 등장한 개념
  - 함수 컴포넌트에서 Context를 사용할 수 있게 해줌
  - 주의할 점
    - > 컴포넌트 재활용이 어려워진다.  
      > 컨텍스트가 미치는 범위를 최대한 좁게 만들어야 함

- useReducer

  - useState의 심화 버전
  - ```tsx
    [state, dispatcher] = useReducer(reducer, initialState, init);
    ```
    - state : 현재 useReducer가 가지고 있는 값
    - dispatcher : state를 업데이트하는 함수, action을 넘겨준다.
    - reducer : action을 정의하는 함수
    - initialState : userReducer의 초기값
    - init : 초기값을 지연해서 생성시키고 싶을 때 사용하는 함수
  - state 값을 변경하는 시나리오를 제한적으로 두고 이에 대한 변경을 빠르게 확인하게끔 하는게 목적
  - 성격이 비슷한 state를 여러개 묶어 useReducer로 관리하는 편이 효율적임

- useImperativeHandle
- useLayoutEffect
  - 함수의 시그니처가 useEffect와 동일하나, 모든 DOM의 변경 후에 동기적으로 발생한다.
  - 실행 순서
    - 1. 리액트가 DOM을 업데이트
    - 2. useLayoutEffect를 실행
    - 3. 브라우저에 변경 사항을 반영
    - 4. useEffect를 실행
  - 언제 사용?
    - DOM은 계산됐지만 이것이 화면에 반영되기 전에 하고 싶은 작업이 있을 때 사용
    - 애니메이션, 스크롤 위치 제어
- useDebugValue
- 훅의 규칙
  - rules-of-hooks
  - 최상위에서만 훅을 호출해야 한다. 반복문이나 조건문, 중첩된 함수 내에서 실행할 수 없다.
  - 리액트 함수 컴포넌트, 사용자 정의 훅에서만 훅을 호출할 수 있다.

## 3.2 사용자 정의 훅과 고차 컴포넌트 중 무엇을 써야 할까?

- 사용자 정의 훅
  - 서로 다른 컴포넌트 내부에서 같은 로직을 공유하고자 할 때 주로 사용되는 것
  - use로 시작하는 함수이름
- 고차 컴포넌트
  - 컴포넌트 자체의 로직을 재사용하기 위한 방법
  - React.memo
    - props의 변화가 없음에도 컴포넌트의 렌더링을 방지하기 위해 만들어짐
- 사용자 정의 훅 vs 고차 컴포넌트
  - 사용자 정의 훅이 필요할 때
    - useEffect, useState와 같이 리액트에서 제공하는 훅으로만 공통 로직을 격리할 수 있을 때 사용
    - 컴포넌트 내부에 미치는 영향을 최소화 할 수 있음
  - 고차 컴포넌트가 필요할 때
    - 사용자 정의 혹은 컴포넌트가 반환하는 렌더링 결과물에까지 영향을 줘야할 때
    -
