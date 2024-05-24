# 3장 타입스크립트 기초: 변수와 함수의 타입 정의

> **3.1 변수에 타입을 정의하는 방법**

- 변수 이름 뒤에 콜론(:)을 붙여서 해당 변수의 타입을 정의
- 콜론을 타입 표기(type annotation)이라고 함
- ```jsx
  // js
  var name = "captain";
  ```
- ```tsx
  // ts
  var name: string = "captain";
  ```

> **3.2 기본 타입**

- 주요 데이터 타입
  - string
  - number
  - boolean
  - object
  - array
    - ```tsx
      // array를 선언하는 두가지 방법
      var companies: Array<string> = ["네이버", "삼성"];
      var companies: string[] = ["네이버", "삼성"];
      ```
  - tuple
    - 배열 길이가 고정되고 각 요소 타입이 정의된 배열
    - ```tsx
      // array를 선언하는 두가지 방법
      var items: [string, number] = ["hi", 11];
      ```
  - any
  - null
  - undefined

> **3.3 함수에 타입을 정의하는 방법**

- 함수의 타입 정의 : 파라미터와 반환값

  - ```tsx
    function sayWord(word: string): string {
      return word;
    }
    ```

> **3.4 타입스크립트 함수의 인자 특징**

- 타입스크립트에서 인자의 개수가 다르면 에러가 발생함

> **3.5 옵셔널 파라미터**

- 파라미터의 개수만큼 인자를 넘기고 싶지 않을 때
  - ```tsx
    function sayMyName(firstName: string, lastName?: string): string {
      return "my name : " + firstName + " " + lastName;
    }
    ```
