# truffle 에서 react 사용하기

$ truffle unbox react


clinet : React 프레임워크가 설치된 공간

이 형태가 create-react-app : cra 가 설치된 폴더로 나온다.

src/App.js
에 보면 기본적으로 web3 가 구현된것을 확인 할 수 있다.

class 로 구현되어있는것만 함수형으로 바꿔서 쓴다고 생각하면 된다.


Compile:              truffle compile
Migrate:              truffle migrate
Test contracts:       truffle test
Test dapp:            cd client && npm test
Run dev server:       cd client && npm run start
Build for production: cd client && npm run build


# 실행하기
cd clinet
npm run start

에러가 발생이 됨..

Failed to compile.

./src/App.js
Module not found: Can't resolve './contracts/SimpleStorage.json' in 'D:\Blockchain_html\211013\client\src'

현재까지는 솔리디티 코드가 배포와 컴파일이 진행이 안되어있기 때문이다.


1. 내가 어떤 데몬을 돌릴것인가?

truffle-config.js 에
networks : {
    development : {
        host : "127.0.0.1",
        port : 7545,
        network_id : "*",
    },
...
}

이 부분을 추가한다.


2. solidity 컴파일하기
$ truffle compile
그럼 contracts 폴더 안에 있는애들이 다 컴파일됨

build 라는 폴더가 없는데..?
이게 client > src > contracts 로 변경됨
여기 안에 .json 파일들이 생성됨

migrations 폴더 안에 

3. solidity 배포하기
truffle migrate

4. react 실행하기
npm run start

그럼 크롬에 창이 뜨는데 거기서 확인 누르고하면 된다.


컴파일 배포, 작성을 여러번 해보기...

