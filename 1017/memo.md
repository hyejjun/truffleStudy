# 토큰 만들기

1. 하드 코딩으로 만드는것
ERC 20 에 대한 규격 그대로 만드는 행위

2. 스마트 컨트랙트 라이브러리 활용해서 만드는 경우


솔리디티 언어로만 한번 작성해보고, 내일 오픈제플린로 만드는걸 해볼 것이다.
코드의 의미는 동일...하다고 봐야한다.

코드작성은 리믹스로 할것

-------------------------

메타마스크랑 가나쉬 연결
계정 2개 연결해놓기


https://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.4.26+commit.4563c3fc.js



OOP

let arr =[]
for (i=0; i<= arr.lenhgt; i++){

}
이게 오타가 났는데 어디있는지를 모름
실행이 되고 여기 부분에서 안되는...
근데 OOP는 실행조차 안됨.



IngToken.sol

생성하고

OOP 는 항상 선언하고 시작함

interface

매수 매도 
먼저 함수로 정의를 한다

function 매수(){}

function 매도(){}


query 문이 들어간다면

1. 로그인한 사람의 현금 잔액을 알고싶다.

/**************************
* write : ingoo date : 2021-06-08
* comment : 로그인한 사람의 잔액을 구하는 함수
**************************/
function 잔액확인(){};
-> 팀원 모두가 알 수 있음

function is검증체결(){};

이렇게 함수를 먼저 정의해서 하는게 interface 라고 한다.


js 에는 이런게 없어서
typescript 가 나왔다.


pragma solidity ^0.8.0;

interface ERC20{
    // 총 함수 6개
    function totalSupply() external view returns(uint256);
}

external - 가시성에 대해 검색

이렇게 interface 를 작성한 이유는?

총 토큰을 반환해주는 함수 - contract address에 있는..

interface만 보고 어떤 함수를 써야 할지 알 수 있는게 큰 장점이다.


// 해당 오너가 보유한 토큰
function balanceOf(address _owner) external view returns(uint256);

// 내용을 보낼때 사용하는 함수 - 
function transfer(address _to, uint256 _value) external returns(bool);

transfer
- 보내는 사람은 msg.sender
- 받는 사람과 얼만큼 보낼지를 인자값으로 받음
- returns 는 필요 없지만 솔리디티의 약속대로 bool 값을 반환해주어 주소값이 틀린 경우를 대비한다.

A -> contract -> B

# 얘는 다이렉트로 보내는함수
function transferFrom(address _from, address _to, uint256 _value) external returns(bool);


# 한도에 대한 내용을 지정해줌
function approve(address _spender, uint256 _value) external returns(bool);

A - 스마트컨트렉트-> B
  - 스마트컨트렉트-> C

100ETH 각각 보내고 싶음
하지먄 A의 잔액은 100ETH 뿐
돈 모자라서 안됨

getBalance 총 잔액
사용 가능액 변수로 따로 빼놔야함

- 맨 위에 event 설정
event Transfer(address _from, address _to, uint256 _value);

-------------------------

// 실 구현 코드. - 깔끔하게 작성
function transfer(address _to, uint256 _value) public returns(bool){
    로직...
}

--------------------------

# 상속
js 에서는
class avante extends car {
    super car.name
}

class car {
    this.name = "아반떼"
}

솔리디티에서는
contract StandardToken is ERC20{
     
}

-------------------

토큰의 기능적인 부분만 구현할 것
contract StandardToken is ERC20{}

함수를 다 써야함.. 안그러면 오류가 안없어짐
사진 2

상속받았는데 함수를 쓰지 않았으니 오류가 난거임


contract StandardToken is ERC20{
    mapping(address => uint256) balances;
     
    function totalSupply() external view returns(uint256){}
    
    function balanceOf(address _owner) external view returns(uint256){}
    
    function transfer(address _to, uint256 _value) external returns(bool){}
    
    function transferFrom(address _from, address _to, uint256 _value) external returns(bool){}

    function approve(address _spender, uint256 _value) external returns(bool){}
}

이런식으로 강제적으로 다 써줘야 함

-------------------
balanceOf 부터 구현해보자
function balanceOf(address _owner) external view returns(uint256){
    return balances[_owner];
}

오류 나면 external 앞에 override 붙여주면 된다.
버전이 높아서 나는 오류일듯

-> override 는 얘가 진짜 사용할 함수라고 붙여주는거임

그래서 지금 모든 함수에 override를 붙여주었다.

--------------

transfer 함수
owner 입장에서 to 로 보낼건데

owner : 보낼 사람
to : 받는 사람

owner 가 10ETH 가 있다고 할때,
현재 _value 가 11ETH 면
보낼 수 없다.

+ value > 0 일때도 추가


function transfer(address _to, uint256 _value) override external returns(bool){
    // owner -> to
    if(balances[msg.sender] >= _value && _value>0){
        // true
        balances[msg.sender] -= _value;         // 보내는 사람 코인 value 만큼 빼고
        balances[_to] += _value;                // 받는 사람 코인 value 만큼 올리고
        emit Transfer(msg.sender, _to, _value); // event 날리고
        return true;
    } else {
        // fasle
        return false;
    }
}

# emit 부분 -> 이벤트 사용 목적 (기능적으로는 안써도 되는데 나중에 프론트에서 쓸 수 있기 때문에...)
emit Transfer(msg.sender, _to, _value);
-> 웹소켓과 같은 느낌이라고 보면 된다

이벤트 등록했고

이 내용을 누구에게나 볼 수 있도록 다 던진거임
프론트 단에서 쓸 수 있기 때문...

------------------------

transfer 는 최소기능

----------------------------

function transferFrom(address _from, address _to, uint256 _value) override external returns(bool){
    if(balances[_from] >= _value && _value>0){
        balances[_from] -= _value;
        balances[_to] += _value;
        emit Transfer(_from,_to,_value);
        return true;
    }else{
        return false;
    }        
}

---------------------------
# 6번째 함수

토큰 소유자가 인출 가능한 금액 (사용가능한 금액을 반환하는 함수)
function allowance(address _owner, address _spender) external view returns(uint256);


contract 안에서 
allowed 변수 선언 필요함

mapping(address => mapping(address=>uint256)) allowed;

-> 이중배열이라고 생각하면 된다.

allowed[_from][_to] = 50eth;

범위를 지정하는 느낌..?


그래서
transferFrom
부분에

allowed[_from][_to] -= _value;
이 한줄이 추가된다.

function allowance(address _owner, address _spender) external view returns(uint256){
    return allowed[_owner][ _spender];
}

--------------------

# approve
값을 보내면 사용중인 코인으로 지정 해놓을 것

거래소 만들때

예약 order
채결 transaction

현금 100만원

order 60만원

현금 - order = 남은잔액 40만원

채결 안되었더라도 40만원 밖에 못쓰는 상황

현금 보유량 - 예약 총 금액 = 사용 가능 금액

사용하고 싶다면 예약을 취소해야하는 상황임

예약된 내역을 저장하는 공간

function approve(address _spender, uint256 _value) override external returns(bool){
    // 예약된 내역을 저장하는 공간
    allowed[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
}

IngToken1.sol
=> 최소 기능만 작업해 놓은 상태

---------------------------------
# IngToken 생성

contract IngToken is StandardToken{}


배포 할때 이 내용들을 넣어서 

배포할때만

내가 IngToken 에서 선언하지 않은 함수를 실행할때 익명함수로..
솔리디티 기본 문법에 내장되어 있는 함수


// 내가 IngToken 에서 선언하지 않은 함수를 실행할때 익명함수로..
function(){}

내가 갖고 있는 양 >= 요구하는 양

----------------------------

function approveAndCall(address _sender, uint256 _value, bytes memory _extraData) public returns(bool){
        
    }

_extraData 얘는 abi 파일이라고 보면 된다..
이 함수를 실행하는 목적

내용을 전달할때 

사용가능한 금액을 만들겠다...
함수...


abi 객체를 받을 수 있는 형태의 무언가..


_spender.call(abi.encodeWithSignature(,,,,))

인자값
1. 함수
function : "receiveApproval(address,uint256,address,bytes)"

3. msg.sender = 이 함수를 호출 시킨 사람 주소

3. _value 이더 수량

4. address : 받는사람 address(this)

5. byte : _extraData

그럼 call 이라는 함수가 실행 되었을 때

결과물이 object (bool, bytes) 값을 두개를 반환해줌

(bool success, bytes memory data) = _spender.call(abi.encodeWithSignature("receiveApproval(address,uint256,address,bytes)",msg.sender,_value,address(this),_extraData));     
// 보낸사람으로부터 함수를 실행하겠다 abi형태로 인코딩 하겠다



안에 돌아가는 구조가 이렇게 되어 있구나~ 
정도만 알아두면 된다.

컴파일 하고 이더리움 네트워크에 배포하고
CA 주소를 얻어오자.

바에서 세번째 클릭

Injected Web3

contract
IngToken 선택

Deploy

하고 가나쉬에 들어가서

CREATED CONTRACT ADDRESS
0x4Cc1e711C928c8109B2730CB478BBb75b1bEe473


이 부분 가져옴

Import tokens 해서 
저 주소 붙여넣기 하면 10 ING 이 생겼다







