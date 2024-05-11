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
    >
