# 5장 리액트와 상태 관리 라이브러리

## 5.1 상태 관리는 왜 필요한가?

- 상태
  - 어떠한 의미를 지닌 값
  - UI
  - URL
  - 폼(form)
  - 서버에서 가져온 값
- 상태 관리 패턴
  - Flux
    - 단방향
    - Action -> Dispatcher -> Model -> View
  - Elm
    - 웹페이지를 선언적으로 작성하기 위한 언어
  - Context API와 useContext
    - 전역 상태를 하위 컴포넌트에 주입할 수 있는 API
  - 훅의 탄생, 그리고 React Query와 SWR

## 5-2 리액트 훅으로 시작하는 상태 관리

> **useState와 useReducer**

- useState를 통해서 상태관리 hook을 재사용 가능하게 작성 가능
- ```tsx
  function useCounter(init: number){
    const [ count, setCount ] = useState(init)

    function increase = () => {
      setCount(prev => prev + 1)
    }
    return { counter, increase}
  }
  ```

- 전역적으로는 사용 불가능함

> **useState의 상태를 바깥으로 분리하기**  
> **useState와 Context를 동시에 사용해 보기**  
> **상태 관리 라이브러리 Recoil, Jotai, Zustand 살펴보기**

- Recoil과 Jotai는 Context와 Provider, 훅을 기반으로 가능한 작은 상태를 효율적으로 관리하는데 초점을 둠
- Zustand는 리덕스와 비슷하게 하나의 큰 스토어를 기반으로 상태를 관리하는 라이브러리
-
