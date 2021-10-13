# 메타마스크
지갑
계정의 주소값을 저장해주는 녀석

계정
주소
지갑
을 구분 지을 줄 알아야함.

[주소]
해쉬로 생성되는 엄청나게 긴 값
두가지 타입이 있다.
- 공개(주소)키 => 20자리 가지고 있는 키     id
- 암호(개인)키 => 공개해서는 안되는 키      pw


[계정]
이름    계정
아이디  공개키
비번    암호키

- EOA 계정 
: 이더를 보낼 수 있는 계정
스마트 컨트랙트 트랜젝션을 보낼 수 있음

- 컨트랙트 계정
: 솔리디티 언어를 배포한 계정
deploy.{

}.send{
    from : '컨트랙트 계정'
}


[지갑]
계정을 총괄, 관리 하는 공간


# 메타마스크
우리는 지갑 중에 메타마스크를 사용할거고
개인이 보관하는 것이다.
온라인에 보관하는 핫 월렛이다.

만약 온라인에 보관했는데 이걸 잃어버렸다? 
시드키 라는게 존재함. -> 내가 지갑을 잃어버렸을 경우 사용하는 백업장치...

- 크롬 확장프로그램



# 메타마스크 설치하기

# 가나쉬도 다운받기


이더리움
가나쉬 테스트넷 메인넷

테스트넷도 너무 느리다. - 개발용으로는...

그래서 가나쉬를 쓴다.


가나쉬로 만들고 테스트넷에서 처리해보고 다음에 메인넷으로 올리는것.


가나쉬에서 생성되는 10개의 계정
그리고 그 안에 있는 0x 어쩌구... 이거는 공개키


# 메타마스크는 공개키와 개인키 중 어떤 값을 요구할까?
=> 개인키
왜 그럼 공개키는 넣지 않는걸까??

키를 만드는 과정을 모르기 때문
-> js 로 만들어봄

1. 개인키를 생성
keccak256() 을 통해서 개인키를 생성한다.

2. 개인키를 가지고 공개키를 생성한다.
   개인키를 갖고 있으면 공개키도 알 수 있다.
   but 공개키만 알면 개인키는 알 수 없다.
   
   개인키 해시 함수 사용해서 결과 값을 갖고 뒷 자리 20bit 만큼 잘라서 사용하는게 공개키

그래서 개인키만 필요한거임


크롬 메타마스크

가나시 계정생성
- 주소값 없는 상태임
내가 만든 주소는 메인., 테스트넷에서는 사용 불가임

맞춤형 rpc 로 들어가서


보내기 할때,
A->B
B 공개키로 보내면 된다.


어제 만든 투표 Dapp
가나쉬를 
HTTP://127.0.0.1:7545
여기로 연결하면 가나쉬로 확인 할 수 있다.

------------------------

# 트러플 truffle

Dapp 을 만들기 위한 프레임워크

1. 솔리디티 언어로 코딩한다.    -> 컴파일 bin, abi 만들고
2. 솔리디티를 배포한다. deploy.js -> transaction address
3. web3를 활용하여 프론트를 만든다. <- transaction address

이 작업을 간소화 하는게 truffle 이다.
배포 작업을 간소화한다.


# 프레임워크
디렉토리 구조가 있는 개발환경
디렉토리 만드는 과정
npm install -g truffle

터미널 켜고
$ truffle init

그러면 세가지의 폴더가 생긴다

1. contracts -> 솔리디티 작성하는 공간
2. migrations -> deploy 매서드가 사용되는 공간; 데몬에게 배포하는 행위를 하는 공간
3. test -> TDD 코드를 작성하는 공간

초기 생성된 파일은 건들면 안됨
truffle 이 자동적으로 해주는 코드들이다.


간단한 솔리디티 코드를 작성해보자

HelloToken

터미널에서 
$ truffle create contract HelloToken
그러면 contract 폴더 안에 HelloToken.sol 이 생성됨
그냥 마우스로 생성해도 똑같음

만약 truffle 명령어가 접근안된다면 앞에 npx 붙여서 해도됨

배포를 하려면 뭐가 필요한가?

이더리움 데몬의 좌표를 설정해줘야 함...
(메인넷 테스트넷 가나쉬??)
이거를 세팅해주는게 truffle-config.js 임

4. truffle-config.js
트러플 구동시 필요한 환경설정 파일

networks : {
    44~48 번째 줄 주석을 풀고
    포트 번호를 바꿔야함
}


RPC SERVER
HTTP://127.0.0.1:7545

이렇게 되어있었으므로 7545 로 변경해준다.

가나쉬 (데몬)
솔리디티 실행할 주소값을 적어줘야 한다.

컴파일
$ truffle compile
- build 폴더가 생성된다.

명령어 한줄에 contract 가 발생한다. (즉 배포를 할 수 있게 된다)
$ truffle migrate - 지금은 안됨

migrations 폴더 안에서
숫자_파일명

2_helloToken.js 생성

const HelloToken = artifacts.require("HelloToken.sol");

module.exports = function (deployer) {
  deployer.deploy(HelloToken);
};

$ truffle migrate

사진 12

가나쉬 logs 에서도 볼수 있고
이더도 빠진것을 확인 할 수 있다.

---------------------

# 테스트 코드 만들기

$ truffle create test HelloToken

그러면 test 폴더안에 hello_token.js 가 생성된다.
일단 전체 주석처리하고

contract("HelloToken",()=>{
  it("hello function call",()=>{
    
  })
})

it 은 
console.log("hello function call")
function aa(){

}

이거와 같다고 보면 된다.

비동기 통신..

deployed
사진 13


contract("HelloToken",()=>{
  it("hello function call",async()=>{
    // abi, bytecode 적었던 부분 함축해서 이렇게 적는다.
    let instance = await HelloToken.deployed()    // 배포된 내용을 instance 에 담고
    let result = await instance.hello()
    console.log(`콘소로그 === `,result);
    return result
  })
})

TDD
기획 테스트 개발

$ truffle test


여러개 적어서 할 수 도 잇음

컨트랙트 파일 두개 만들어도 되나??
$ truffle crate contract hello

$ truffle compile

3_hello.js 만들고
const Hello = artifacts.require("Hello");

module.exports = function (deployer) {
  deployer.deploy(Hello);
};



truffle migrate

truffle create test hello

truffle test



1. 솔리디티 파일 생성
truffle create contract [파일명]

contracts 폴더 안에 [파일명].sol 이 생김

```
function hello() public view returns(string memory){
    return "hello";
}
```

2. 솔리디티 파일 컴파일 하기
truffle compile

이후 build/contracts [파일명].json 생성되는것 확인하기

3. 마이그레이션 코드 작성하기

migrations 폴더 안에서 파일 생성
규칙은 [숫자]_[파일명].js

코드 작성

```
const [파일명] = artifacts.require("[파일명]");

module.exports = function (deployer) {
  deployer.deploy([파일명]);
};
```

이후
truffle migrate

4. 테스트 작업

파일 생성하기 
truffle create test [파일명]
이후 코드 작성하기

```
contract("HelloToken",()=>{
  it("hello function call",async()=>{
    // abi, bytecode 적었던 부분 함축해서 이렇게 적는다.
    let instance = await HelloToken.deployed()    // 배포된 내용을 instance 에 담고
    let result = await instance.hello()
    console.log(`콘소로그 === `,result);
    return result
  })
})
```
truffle test

컴파일 - 5ver
코드 버전 -8ver

그래서 문법규칙은 상위버전이라 빨간줄뜨는데 컴파일 될때가 있음
나중에 맞춰주기로 하자


------------------------

# contract 한것을 React 에서 써보기
