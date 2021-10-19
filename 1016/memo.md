# 블록체인 네트워크

노드 = 컴퓨터 한대
노드들이 서로 연결되어있는 상태

이 하나의 노드에 들어가는 데이터 정보를 담는 형태를 어떻게 구현했는지


* 블럭 생성할 때
Block {
    header : {

    }
    body : {

    }
}

하나의 노드에는 여러 블럭이 담겨있다.

사진 1
=> 여기까지가 js 영역이였다.

# 이더리움을 하면서 새로 추가 된 부분이 있다.

Block body 영역에 채워지는 부분에 대한 추가 설명이 필요하다.

- Transaction 에 대한 내용이 들어간다.

nonce       :   일련번호; 계정(EOA)에 종속되어있음 (tx count = nonce); transaction 에 대한 index 값
recipient   :   
value       :   금액에 대한 내용 [wei] / 이더리움의 가격
gasprice    :   가스 가격
gaslimit    :   가스 한도
input       :   data 영역 - 내용이 입력되는 공간
to          :   누구에게 보낼거냐? EOA 계정을 적어주면 된다.
from        :   누가 보냈는지
v, r, s     :   ECDSA 서명 구성요소 - 역할 중요. - 서명을 위한 내용

이 내용들은 객체로 담겨있다.

사진 2

# EVM
- 컴퓨터 위에 운영체제를 하나 더 깐다는..
가상 머신...도커

내 컴 맥이든 윈도우든.. 그대로 카피해서 (이미지 파일 만들어서) 리눅스에 설치하면 똑같은 환경 되도록

실서버와 테스트를 환경이 일치하게 하는게 도커


# EVM 의 역할 
: 솔리디티 언어로 작성된 바이트 코드(byte code)를 해석 해주는 녀석이다. - 최소단위의 컴퓨터,,

그럼 EVM 이 주는 data도 컴퓨터만 이해할 수 있다.
ABI 는 interface 로.. 데이터 담는 공간이고 여기 안에 넣어서 데이터를 보겠다는것.

사진 3, 4

# ABI
application binary interface

백   => 프론트
    json

bytecode -> evm -> (컴퓨터만 이해할 수 있는 코드) -> abi 

알맞는 곳에 넣어주고 처리해주는 공간

기계어로 되어있는 것을 abi 에 넣어주면 해석하고 해석한 내용을 담는 공간



# tx (2가지)
contract account
-> code 가 담긴 transaction
돈을 보내고 받는거가 목적이 아니라 code를 담았다.

contract 와 돈 입출력 -> 그래서 2가지


---------------

우리가 했던건 V,R,S 를 생성 하는 3가지를 했던 것이다. (서명하는 방법 3가지)

--------------

메타마스크

사용자가 존재. (브라우저에 접속한 개개인)

메타마스크에 비밀키를 입력하므로써 메마를 사용함

그럼 메마가 블체 네트워크에 요청을 보내서 
내용에 있는 정보를 getBalance 이더의 개수를 응답받고 메마에는 100 이더가 보일 수 있도록한다.

rpc 통신,,

메마는 블체랑 소통할 때는 rpc 를 사용함

web3도 마찬가지로 rpc를 사용한다.
-> web3로도 요청이 가능하다는 뜻

터미널 curl 도 요청이 가능

총 3가지 요청이 가능하다는...

-----------------

# 블체 네트워크는 API 명령어들이 존재한다.

getBalance
getAccounts
transaction 관련 API


rpc 로 transaction 을 보냈을 때
nonce, value, gasprice, gaslimit, to
이런걸 채워서 보내면 transaction 데이터 생성됨

꼭 필요한건 v, r, s : 개인키 가지고 조작해서 만든다.

터미널에서 직접 작성해보면 이해가 빠를 듯..

금요일에 했던것.

# 서명의 종류

1. metamask
2. web3를 활용하여 트랜젝션 내용을 만들고 v,r,s 내용은 메타마스크를 통해서 생성함
3. Backend web3를 활용하여 전부 다 만들고 트랜젝션을 발생시킴

------------

EVM 에 내용이 저장되어있음..
사진 5

내 해당 주소에 100 이더라는 것을 알아야 한다,,

계정이라는 것을 더 알아봐야 한다..

# 계정

# Account 종류

EOA 
: 기본적인 지갑 기능을 함 => 공인 인증서 잇는 계좌번호
개인키를 가지고 통제할 수 있는 계좌
다른 계정에 이더를 보낼 수 있는 계정
메시지도 보낼 수 있는 계정


CONTRACT Account 
: EOA 기능  +  code 저장한 계정
함수들을 저장하는 공간

(EVM 은 변수에 있는 값을 저장하는곳)

# account
공개키 (public key)
개인키 (private key)

-- EOA 계정
Nonce : tx Count (특정계정에 트랜재션이 몇 번 일어났는가)
value : 100 ETH -> 100 * 10^18 wei

-- CA 계정
contract code : ABI 내용들이 들어간다.
storage : 파일 데이터들 


계정 > CA > EOA


# 계정별로 이더가 줄어들고 늘어나는건 어떻게 처리?

DB

id             pw         value
web7722       1234          10
test1         1234          20



public        private     value
0x2254        1234          10
0x5485        1234          20



* transaction
to          from            value       date
web7722     test1           10          2021-09-06
0x2254      0x5485


그럼 이 코드를 누가 처리해주나?

일단 서명 과정이 필요하다.

크롬에 접속해서 메마 실행하고 보내는 사람 주소 받는 사람 주소 금액 적어서 보내면
가스가 얼만큼인데 보내냐 ? 하고 확인 누르는 순간

이 내용을 가지고 transaction 이 만들어 진다.

nonce, gas price, gas limit, value, vrs... 이런 값들이 만들어 진다는 것...
이런 값을 매마가 만들어서 블체 네트워크에게 보내준다.


그러면 
test1       20      -10
web7722     10      -10

select value from user where userid='web7722'       -> rpc 를 통해서 가져올 수 있다.

0

보안에 대한 기능이 좀 더 추가된것.

블록체인의 특징은.. 보안(hash 함수만 사용을 잘 하면) + 탈중앙

---------------------------------------

# 오늘의 목표 : 나만의 토큰 만들기

내일까지는 테스트 이더만들어오기

1. 솔리디티 언어로 작성한다
> 특정 변수에 숫자를 입력한다.

RPC -> getBalance.. Transaction..

> http://remix.ethereum.org

ganache 실행하고
metamask 지갑 주소 가져올 수 있도록 해준다.

-------------------------------------


> http://remix.ethereum.org
페이지에 들어가서
MinimumVialbeToken.sol 생성하고

# 간단한 토큰 만들기


pragma solidity ^0.4.16;

contract MinimumVialbeToken {
    mapping(address => uint256) public balanceOf;       
    // balanceOf 라는 변수에 mapping으로 선언해준다. 해당 address 값을 넣으면 int 가 나오도록
    
    constructor()public {}

    // 초기값을 설정하는 함수    
    function MinimumVialbeTokens(uint256 initialSupply) public{
        balanceOf[msg.sender] = initialSupply;
    }
    
    // 보낸다.
    function transfer(address _to, uint256 _value) public {
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
    }
}

이렇게 작성한다.

컴파일
사진 6 7


배포를 하려면? 어떤 계정의 gas 를 써서 올려야 하는데


토큰은 변수고

토큰계약주소
토큰 기호
토큰 10진수는 18 로 하기


----------------------------
# 채굴
# gas 의 개념


채굴은 왜 하는걸까? - 이더를 먹기 위해서

그럼 블록체인 시스템은 왜 채굴이라는 시스템을 만들었을까??
네트워크를 구성하기 위해서

내 node 가 하나밖에 없다면 블체로서 효과가 없다
node 가 최소 10개는 있어야 탈 중앙이 된다..
그럼 이걸 돌리는 사람에게 혜택을 줘야 한다. 그게 이더로 준다.

코인 보상 발행 숫자를 처음엔 크게 하고 점점 줄여나감 (반감기)

총 발행수.. 를 만들고
보상 이더를 줄임...
총 발행수가 2100만개다. 수수료는 소멸되는데..?


tx 에는 수수료가 붙어있음
블럭 바디에 수수료도 같이 받음

채굴한 사람한테 수수료가 들어옴

그래서 수수료는 소멸되는게 아니다.

블록을 채굴할때, 네트워크가 주는 기본적인 이더와 트랜젝션에 대한 가스 사용 이더를 같이 받는다.
보상 = 이더 + 수수료


# gas 측정 원리
tx 는 300개 까지.

보상 받는 사람 입장에서 높은 수수료를 낸 사람거를 받고 싶음

블럭에 대해서 보상을 찾은 사람한테 주고 네트워크를 통해 전달하게 됨

서명을 하면 임시공간인 transaction pool 이라는 공간에 먼저 들어가게 되고 
거기에 transaction 내용이 쌓인다.
높은 수수료를 가진 사람들만 block body 영역에 들어가게 된다.

블럭이 빨리 생성되는 이유 : 수수료를 높게 낸 사람


--------------------
사진 12

# Gas   !=    ETH
gas 는 어떤 박스에 물을 채우는 것이다..
구매 수량

# Gas price
단가

# Gas limit
내 자산

이더리움 = gas * gas price (wei)


연산의 횟수마다 gas 양이 늘어난다...


gas 는 EVM을 통해서 코드를 연산한 횟수

