# Dapp 을 만들거임
# Dapp -> truffle -> React

# Dapp

# Truffle

# React 에서 deploy (배포)한 Smart Contract 내용을 가져오는 행위를 어떻게 작업했었는지 이미지 그려봐야함

# 배포한 컨트랙트 내용을 가져올 때 web3를 사용했다는 점


web3 에서 메타마스크에게 연결하는 방법
: 코드로 구현할 필요가 없음
truffle 이 알아서 해줌.

react unbox 하면 
src > getWeb3.js 가 있는데 이걸 나중에 호출해서 사용할거임

Promise 객체를 반환해줌

window.ethereum 이 어케 되는걸까?? - 메타마스크 설치되어있는 크롬에서만 나오는..
즉 if(window.ethereum) 는 브라우져에 메타마스크가 있는지를 확인하는 것이다.


-------------

# Truffle
작업 공간까지 디렉토리 이동하고
$ npm install -g truffle

1. $ truffle unbox react
2. $ ganache 실행 후 메타마스크에 계정 연결 (100ETH)
3. truffle-config.js 파일 설정하기
development : {
  host : "127.0.0.1",
  port : 7545,
  network_id : "*",
},
추가 (메타마스크 바라보게)

4. 내가 배포할 contract 코드를 작성하기
    (아직은 생략함)

5. contract 를 작성했다고 가정하고 contract code를 compile 한다
$ truffle compile

client > src > contracts 안에 .json 파일들이 생성됨

json 파일안에 abi bytecode 들이 다 들어가있다.

6. migration 작업
contract 내용을 배포하기
$ truffle migrate

gas 가 발생하여 100ETH 에서 빠져나갔다. 99.99ETH 가 됨
transactions 탭에도 내용을 확인 할 수 있음

7. react 실행하기
$ cd client && npm run start



-----------
[인젝티드 web3 / injected web3]
user -> client 가 web3 통해서 접근 -> 메타마스크 중 어떤 계정과 연결

우리는 가나쉬 / 100ETH 갖고 있는 계정과 연결함

그럼 이 메타마스크는 수많은 블체가 연결되어있는 하나의 노드와 rpc 통신을 할 수 있음

네트워크와 통신이 되어야 지갑의 기능을 할 수 있음..

---------------
src > App.js
컴파일을 진행하면 생기는 .json 파일을 import 해온다.
-> 두가지 값을 가져옴

state 상태...

componentDidMount
= useEffect [] 와 같은거임


rpc 통신
const accounts = await web3.eth.getAccounts();
=> 10개의 계정들이 나옴

const networkId = await web3.eth.net.getId();
=> 우리는 networkId "*" 로 함.. 5777 임 


const deployedNetwork = SimpleStorageContract.networks[networkId];

SimpleStorageContract.json 파일에서

"networks": {
    "5777": {
      "events": {},
      "links": {},
      "address": "0xF3833bB61AF21BFEC9324Ea7a62Ef8d5622DB4D9",
      "transactionHash": "0xfee2c7d25811e46a5488d5cef188300564d6daf8ad83c4ed5244e9fbd6f9a840"
    }
},

이 부분을 넣은건데..


const instance = new web3.eth.Contract(
    SimpleStorageContract.abi,      // abi 값을 넣어준거임
    deployedNetwork && deployedNetwork.address,     // 위에 주소값을 넣는다.
);


---------------------
생략했던 4번 원하는 contract code 작성하기를 해보자

clinet > src > contracts  안에 있는 두 json 파일 다 지우기

contracts > SimpleStorage.sol 지우기
migrations > 2_ 어쩌구 지우기

$ truffle create contract Fruitshop
-> contracts 폴더 안에 .sol 파일 생김


$ truffle create migration Fruitshop
-> migrations 폴더 안에 js 파일 생김

[숫자_fruitshop.js]
var Fruitshop = artifacts.require("./Fruitshop.sol");

module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(Fruitshop);
};

이렇게 작성해줌


그 다음에 Fruitshop.sol 로 와서

1. 보낸 사람의 계정에서 사과를 총 몇개 갖고 있는가

mapping(address=>uint) myApple;  
// 주소별로 사과를 저장할 수 있도록 mapping으로 선언


2. 사과를 구매했을 시, 해당 계정(주소)에 사과를 추가해주는 코드 작성

function buyApple() public{
  // msg.sender : contract를 요청한 사람의 주소를 담고 있는 내장 객체
  myApple[msg.sender]++;      // 초기화 값이 0 인데 이거를 1로 만들어줌
}


3. 사과를 판매시 내가 갖고 있는 사과 * 사과 구매 가격 만큼 토큰을 반환 해주고 사과를 0개로 바꿔준다.

function sellApple(uint _applePrice) payable public{
  uint totalPrice = (myApple[msg.sender] * _applePrice);
                    // 내가 갖고 있는 사과 * 가격
  myApple[msg.sender] = 0;    // 사과 0으로 초기화
  msg.sender.transfer(totalPrice);    // 환볼 느낌
}

payable : 토큰 거래가 가능한 함수라는 뜻


4. 내 사과를 반환해주는 함수
function getMyApple() public view returns(uint){
  return myApple[msg.sender];
}

-----------------
이제 compile / migrate 하면 됨
$ truffle compile
client > public >src > Fruitshop.json 이 생성됨

$ truffle migrate
migrations > 숫자_fruitshop.js 생성됨

App.js 에 와서
import 부분 중에 SimpleStorage 가 존재하지 않으니 npm run start 가 되지않을 것이다.

------------------------

이 부분을 고쳐보자

App 컴포넌트 다 지우고

import FruitshopContract from "./contracts/Fruitshop.json";
이렇게 바꿔준다.


함수형 컴포넌트를 만든다

const App = () => {
  return(
    <div>
      <h1>사과 가격 : 10 ETH</h1>
      <button>BUY</button>
      <p>내가 가지고 있는 사과 : 0</p>
      <button>SELL (판매 가격은 : {0 * 10} ETH)</button>
    </div>
  )
}

이게 잘 되는 지 확인

clinet 안에서
$ npm run start

잘 됨

const [myApple,setMyApple] = useState(0)
const buyApple = () =>{
  setMyApple(prev => prev+1)
}
const sellApple = () =>{
  setMyApple(0)
}
return(
  <div>
    <h1>사과 가격 : 10 ETH</h1>
    <button onClick={()=>buyApple()}>BUY</button>
    <p>내가 가지고 있는 사과 : {myApple}</p>
    <button onClick={()=>sellApple()}>SELL (판매 가격은 : {myApple * 10} ETH)</button>
  </div>
)

-------------

// componentDidMount Web3 가져와서 메타마스크 연결 할거임
useEffect(()=>{

},[])

이 부분 추가함

--------------------------

getWeb3 가져오는거 해보자

import getWeb3 from "./getWeb3";

얘의 return 값은 Promise 객체임 그래서 받을때
then 아니면 async await 로 받아야 함


const getweb = async ()=>{
  let web3 = await getWeb3()
  console.log(web3);
}

// componentDidMount Web3 가져와서 메타마스크 연결 할거임
useEffect(()=>{
  getweb()
},[])

사진 3


--------------
8. @truffle/contract 설치 및 사용
$ npm install @truffle/contract
디렉토리가 client 안에 들어가 있는거 확인하고 npm install 해야 한다.

@truffle/contract 검색해보면
이쪽 코드를 한번 잘 봐야 한다.

npm install 로 사용한다.
contract 쓸때는 객체를 담을건데

사용하는 이유
연결 및 사용이 간단해졌다..

이거랑 비슷한게 fetch axios 인데
우리가 기존에 fetch 가 있음에도 axios 를 썼던 이유는 
axios 가 좀 더 편하니까.

이것도 얘를 쓰면서 코드가 깔끔하게 나오기 때문에 
@truffle/contract 를 사용한다고 보면 된다.

const contract = require("@truffle/contract")
  const getweb = async ()=>{
    let web3 = await getWeb3()
    contract(FruitshopContract)
}

이렇게 사용하면 json 파일 안에 해당 내용들이 다 들어가게 된다.

그리고 거기에 대한 결과 값을


const getweb = async ()=>{
const contract = require("@truffle/contract")

  let web3 = await getWeb3()
  let fruitshop = contract(FruitshopContract)
  fruitshop.setProvider(web3.currentProvider)
  let instance = await fruitshop.deployed()
  console.log(instance);
}


# 주소 가져오기
// 계정(address) 가져오기
let accounts = await web3.eth.getAccounts()



let instance = await fruitshop.deployed()
얘는 지역변수라서 상태저장을 해야함
reducer 를 사용해서 위에 함수에서도 얘를 사용할 수 있게 하자


# instance, address, web3 상태에 저장하기

let initalState = {web3:null, instance:null, account:null}
const [state, dispatch] = useReducer(reducer,initalState)

function reducer(state,action){
  switch(action.type){
    case "INIT":
      let {web3,instance,account} = action
      return{
        ...state,
        web3,
        instance,
        account
      }
  }
}

-----------

let InitActions = {
  type : 'INIT',
  web3,
  instance,
  accounts:accounts[0]
}
dispatch(InitActions)


상태값 들어가있나 확인하고 사진 4

----------------

const buyApple 부분 작업


  function buyApple() payable public{
    // msg.sender : contract를 요청한 사람의 주소를 담고 있는 내장 객체
    myApple[msg.sender]++;      // 초기화 값이 0 인데 이거를 1로 만들어줌
  }

payable 붙여주고

json 파일 날리고

truffle compile
truffle migrate
npm run start

하고 
구매 누르면 거래 발생하고 확인 누르면 이더 빠져나감

그럼 이 빠진 이더는 어디로 가는가?

0x3f16e8389b9fA7d51dE9470d96B17a7CA51d87b3

이 주소로 간다...
이게 무슨 주소일까??
배포하고 나온 결과물의 주소
코드가 올라간 곳의 주소 (코드가 담긴 위치)

--------------------------------

근데 새로고침하면 없어짐ㅜㅜ
근데 실제로 내가 이더를 주고 산건데...

이 부분을 고쳐주자

App.js


getweb 부분. useEffect 부분을 보자


현재 내가 갖고 있는 사과를 리턴해주는 함수를 만든다.

const getApple = async ()=>{
  if(instance == null) return
  let result = await instance.getMyApple()
  setMyApple(result.toNumber())
}

getweb 안에서

getApple(instance)


buyApple 안에서 
let {instance, account, web3} = state;
    await instance.buyApple({
      from : account,
      value : web3.utils.toWei("10","ether"),    //wei
      gas : 90000,
})

----------------

sellApple 하기

-------
파는게 안됐는데 Fruitshop.sol
function sellApple(uint _applePrice) payable external{
이렇게 external로 바꿔주고 다시 빌드하니까 됨