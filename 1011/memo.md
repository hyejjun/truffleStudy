smart contract 간단하게 만들어보기

실제 구동시켜서 해보는것을 할 것이다.

이더리움 계열 할때,

스마트 컨트랙트라는게 뭔지..
= 코드 실행 (솔리디티) / 스크립트 실행

가나쉬까지는 사용을 해볼 것이다.

가나쉬 : 메인넷 테스트넷 없이 로컬에서 간단히 돌리는것.
알트코인의 데몬을 간단하게 만든다.(이더리움)
+ 테스트용 100 이더가 채워져있는 10개의 주소가 주어진다. 총 1000개

그럼 데몬은 뭔가?
p2p 기능.. 나와 다른 사람이 서로 데이터 공유를 했어야 했다.
가나쉬도 p2p 기능이 있는데 혼자서만 사용 가능..

이더리움을 공부하는데 있어서
rpc 통신을 할 수 있는 데몬을 간단하게 설치해서 사용할 수 있고
데몬을 통해서 솔리디티 언어로 작성한 스마트 컨트랙트를 해볼것이다.

흐름을 잘 이해해야 한다...!!
p2p 란 무엇인가 rpc 통신은 무엇인가 데몬은 무엇인가?

주말동안 배운 솔리디티 언어도 잘해야한다.
mapping web3


----------------------------------
스마트 컨트랙트를 위한 세팅

# Setting

nodejs 환경에서 세팅이 가능하다.

Truffle
Ganashe

를 node js 환경에서 설치가 가능하다.

1. npm install -g truffle
2. npm install -g ganache-cli
3. npm install web3


# web3 란 무엇인가??
역할이 무엇인가? 솔리디티의 문법을 해석한 녀석을 요청할 수 있도록
=> rpc 통신을 쉽게 구현할 수 있게 도와주는 라이브러리이다.

ex) 알트코인 rpc 통신을 하려면
[server 측 내용]
express 를 설치하고
request 를 설치하고
request 에 rpc 통신을 했던 내용을 넣어줘서 응답을 받아서 처리함.

[client react, next, html 페이지] 에서 rpc 통신을 한다고 하면,

예를 들어 (사진 1)
거래소에서 join 을 했다고 하면
Next 에서 Server 측으로 요청을 보낸다.
그러면 Server -> Demon 에 요청을 보낸다. 응답을 받아서 다시 Next 에 보낸다.


web 3 사용시
사진 2 가 되어 서버가 없어지게 된다.

네트워크 요청은 대부분 비동기 통신이다.
Promise 객체에 대해 좀 더 이해할 수 있는 능력이 필요하다.

오늘은 간단하게 특정 js 파일에서 데몬에게 바로 요청을 보내는 것을 할 것이다.


# npm install -g ganache-cli
-g :  global 설치 : node js 환경이 아니더라도 사용하겠다?

# npm install -g truffle

web 설치는
# npm init
# npm install web3


# 설치되었는지 확인하는 법
truffle version
ganache-cli --host 0.0.0.0
(npx ganache-cli --host 0.0.0.0)



가나슈는 데몬 즉 서버인것이다.
뭔가 구동이 되어야 하므로 터미널을 하나 새로 열고
여기서 구동시킨다.
$ ganache-cli --host 0.0.0.0


# 가스 (gas)
이더리움의 스마트 컨트랙트를 배포하고 실행할 때 사용되는 수수료이다.
hello 라는 글자를 0x44109F218cc5E294a86f0B9F744Cb2eDB88B7BDE 이 주소값에 보내겠다고 해도 수수료를 지불해야 한다.

연산 O(n) 의 횟수에 따라 gas 를 지불하게 된다.

block{
    block header{
        nonce : 
        merkelroot : 
        priviousHash : 
        ...
    }

    blcok body {
        data : ["hello"]
    }
}


# 가스 가격 (gas price)

Gas Price
==================
20000000000

스마트 컨트랙트를 발생할 때, 이것을 작성한 사람이 설정하는 가스 가격이다.


# 가스 한도 (gas limit)
1200 만원 수수료가 1.5 이더 => 수수료가 너무 큰데?
그래서 한도를 정할 수 있다. (최대 수수료)

Gas Limit
==================
6721975


# 가나쉬 데몬 실행중
Listening on 0.0.0.0:8545

알트코인이였다면
getbalance 계정명

rpc 통신을 통해서 특정 주소에 있는 이더리움 개수를 구할 수 있다.
여기서는 api 를 어떻게 만들었냐면
0.0.0.0:8545 eth_getBalance
이렇게 하면 된다 rpc 통신 100ETH 나옴.

curl "쉘 스크립트"
쉘이라는 단어는 Linux 에서 사용가능한것.

1. eth_accounts
2. eth_getBalance [주소값] => 특정 주소에 있는 eth 확인

wsl 켜고

curl -X POST -d '' http://127.0.0.1:8545
사진 4

curl -X POST -d '{"jsonrpc":"2.0","method":"eth_accounts"}' http://127.0.0.1:8545
사진 5 - 계정확인

curl -X POST -d '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x44109F218cc5E294a86f0B9F744Cb2eDB88B7BDE"]}' http://127.0.0.1:8545
사진6 - getBalance
{"jsonrpc":"2.0","result":"0x56bc75e2d63100000"}


# 이제부터 단위 개념을 배워보자
"result":"0x56bc75e2d63100000"
16진수인데 10진수로 변환하면
사진 7

100,000,000,000,000,000,000 [wei]= 100[ETH]

1 ETH = 10^18 wei
라고 할 수 있다.


rpc 통신을 curl 하지 않고
web3 라이브러리를 통해서 js 코드로 작성해서 해보자

example.js 생성

const Web3 = require('web3')
let connection = new Web3('http://127.0.0.1:8545')

node example.js 해보면 암것도 안됨

connection.eth.getAccounts()    // rpc 통신 요청 - promise 로 하면 됨
.then(data=>{
    console.log(data);
})

이 부분을 추가하고 다시 node example.js 하면
아까와 같은 결과 값을 얻을 수 있다. (사진 8)



//eth_getBalance
connection.eth.getBalance('0x44109F218cc5E294a86f0B9F744Cb2eDB88B7BDE')
.then(data=>{
    console.log(data);
    // 16진수 return 이 아니라 10진수로 return 해줌
})

하면 node example 

100000000000000000000 [wei]

-> 10진수로 리턴해준다는..


------------
# web3
rpc 통신하는 부분인데
이전에는 request 를 통해서 작업을 했었다.
web 3 개념은 진짜 중요하다!!!!!!!!!!


# 스마트 컨트랙트를 작성해보자
스마트 컨트랙트 = 코드를 실행시킨다.
어떤 코드를 실행시키는 걸까??
-> 솔리디티 코드를 rpc 통신을 통해서 실행시키는 것이다.

솔리디티 코드와 js 코드가 두개가 존재하는 것인데
솔리디티를 실행시키려면 어떻게 해야 하나??
컴파일 과정을 해야한다.
hello.sol -> 컴파일 -> 두가지 파일 생성됨 (abi, bin 파일 생성됨)

# abi = application binary interface
런타임시 (실행시) 바이너리 코드와 데이터 실행시키기 위한 JSON 파일

# bin
바이너리 파일로 결과물을 준다.
03505595623032953206395263556230653565635286

이 두가지 파일을 가지고 실행시키면 원하는 값을 얻을 수 있다.

코드를 실행시키는 키 값이라고 생각하면 되겠다.


1. 솔리디티 코드를 작성
-> vscode 에서 작성하면 됨.

2. 솔리디티 코드를 컴파일 한다.
-> 컴파일 도구 필요 ; 
#  npm install -g solc
# 확인하기
solcjs --version

0.8.9+commit.e5eed63a.Emscripten.clang

# 실행하는 방법
solc --abi --bin [파일명]

# 파일 생성
hello.sol

특정 변수의 내용을 넣고
함수안에서 특정 변수를 호출해보자

contract hello{
    string value;
    constructor(){
        value = "hello world";  // memory에 공간 확보하고 넣음
    }
    function get() public view returns(string memory){
        return value;
    }
}


1. 왜 여기는 returns 에 s 가 붙냐? - 이건 약속임

2. string 만 그냥 쓰면 오류남 - version up 되면서 생긴 부분
파일 시스템; 파일에 저장된 내용을 가져올거냐 
or 메모리에 저장된 내용을 가져올거냐?
    
3. 컴파일 하기 (사진 9)
$ solcjs --bin --abi .\hello.sol 안되면 앞에 npx

컴파일 되면
hello_sol_hello.abi 
hello_sol_hello.bin 이 만들어짐

[파일명]_[확장자]_[컨트랙트명]


4. 이 두가지 파일을 사용하고 web3를 통해서 (rpc 통신을 통해서) body 영역에 넣어주기

example.js

const contract = new connection.eth.Contract(ABI_CODE,ADDRESS)
이렇게 하는데 지금은 주소 안쓰니가 주소는 생략


// abi 파일에 있는거 복사해서 큰 따옴표 안에 넣어주면 됨
const ABI_CODE = '.abi 파일에 있는 애 복사'

const BYTECODE = '.bin 파일에 있는 애 복사'

const contract = new connection.eth.Contract(ABI_CODE)
여기 안에 인자값(ABI_CODE)은 string 이 아니라 json 이 되어야함

const ABI_CODE = JSON.parse('...')
이렇게 바꿔줌

// 배포 (코드 실행한다.) deploy
contract.deploy({
    data : BYTECODE
})
.send({
    from:'0x44109F218cc5E294a86f0B9F744Cb2eDB88B7BDE',      // 공개 키
    gas:'6721975'           //gas limit 값 넣음
})
코드 실행하면 무조건 gas(수수료) 가 발생함

그럼 누구한테 수수료 청구할지?
총 gas 비용이 필요

send 의 결과값이 promise 객체로 반환된다.

.then(data=>{
    console.log(data);
})

실행시키기
node example
하면 엄청나게 긴 객체가 나온다..




methods: {
   get: [Function: bound _createTxObject],
   '0x6d4ce63c': [Function: bound _createTxObject],
   'get()': [Function: bound _createTxObject]
},

이런 결과가 나오는데 get 에 접근해서 호출해야됨

.then(data=>{
    return data.methods.get().call()    
    // 얘도 결과가 promise 객체로 나옴
})
.then(result=>{
    console.log(result)
})

그럼 결과가 hello world 로 나옴 그림 10


---------------------

options: {
    address: [Getter/Setter],
    jsonInterface: [Getter/Setter],
    data: undefined,
    from: undefined,
    gasPrice: undefined,
    gas: undefined
  },

이렇게 나오는것도 있는데 여기서 address 를 찍어보자

.then(data=>{
    console.log(data.options.address); 
})

0x7aCC3Ef176203D1f818103B84cC5Bf8602a861C0
// 영수증

---------------------------

그리고 코드 실행을 하면 할수록 

//eth_getBalance
connection.eth.getBalance('0x44109F218cc5E294a86f0B9F744Cb2eDB88B7BDE')
.then(data=>{
    console.log(data);
})


이렇게 하면 getbalance 가 나오는데 계속 줄어들게 된다.
비용 소모 없이 

영수증에 있는 내용을 보고싶다면?
0x7aCC3Ef176203D1f818103B84cC5Bf8602a861C0

그래서 일단은 21~42 번째 주석처리하고

const helloContract = new connection.eth.Contract(ABI_CODE,'0x7aCC3Ef176203D1f818103B84cC5Bf8602a861C0')

helloContract.methods.get().call()
.then(data=>{
    console.log(data);
})

이렇게 작성하고 node example.js 하면 hello world 가 잘 뜨고
getbalance 부분에 숫자가 줄지 않는다.

추가 되어있던것을 가져다가 보는것.

deploy 는 배포 (body 에 내용 추가)
이거는 내용을 보여주는것.

// 스마트 컨트랙트 배포하기 라고 검색하면 관련 내용이 나올 듯



web3 를 통해서 스마트 콘트랙트를 자유자재로
스마트 콘트랙트 작성-> 솔리디티 언어 잘 작성

이더리움 배울때는 투표앱을 만드는게 가장 기본이 된다.