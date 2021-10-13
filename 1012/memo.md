하나의 블록체인 서버(데몬)가 필요하다.
가나쉬 cli 로 데몬 만들었음
-> account(주소)와 이더가 들어가 있음

데이터를 어떻게 쌓을까??

스마트 컨트랙트라는 코드를 통해서 블록에 데이터를 저장하게 되는 것.

저장한 공간에 주소가 생긴다.

데몬에 돌아가는 서버와 html 을 연결짓는 라이브러리가 존재한다.
그게 바로 web3 이다.
얘는 js 코드 안에서 작동을 한다.

그러면 데이터를 가져와서 html 에 뿌릴 수 있게 된다.

사진 1~2

--------------------------------

# 투표앱
가나쉬

블럭에 데이터를 어떻게 저장할까

* 솔리디티
1. 후보자를 초기화
2. 후보자 투표 기능
3. 후보자 정보 가져오기

구현하고 빌드해서 블럭에 배포(실행 시킨다는것)를 한다.
처음 배포할 때 이외에는 쓰지 않음
코드를 작성한 것.
컴파일 하면 두개의 파일이 나오는데 이것들을 블럭에 저장한다. (안에 내용들이 다 담겨 있음)

* 블럭
abi 에 기능들이 다 저장이 됨
주소값도 영수증처럼 생김.

* web3
이 저장한 내용을 웹에다가 출력해야한다.
이때 쓰는게 바로 web3 이다.
사실 web3 는 따로 빠져있는게 아니라 html 페이지 안에 존재하는거임
얘가 가나쉬에 접근해서 접속한다. 

블럭에서 주소값에 대한 내용도 가져와야 한다.

살짝 어려운 부분은 web3 랑 가나쉬랑 연결하는 부분..?

사진 3


# 투표를 하면?

투표를 하면 블럭이 생기는게 아니라 블럭 안에 body내용에 추가가 되는것.
DB 처럼 body 에 내용을 쌓는것.
혜준 : 1
이 내용이 2로 변하는게 아니라 
혜준 : 1
혜준 : 1
혜준 : 1
이렇게 계속 쌓인다.

* 트렌젝션은 블럭이 생성됨

----------------------------

# 마이닝 - 채굴

-------------------------

블럭이 생성되는 시점
[server.js]
post ('/mineBlock',(req,res)=>{
    bc.mineBlock
})

[block.js]
function mineBlock(){

}

솔리디티 언어로 작성한걸 배포했을 때
블럭이 생성된다.

block hash !== 주소

주소는 블록생성 안하고 newAccount [계정명]해도 생겼다
-> 사용자를 정의해주는 행위
returns(address)
계정 == address
이 address 를 갖고 body에서

a = 000001  100
b = 000002  100
c = 000003  100

body : {
    a to b 50
    b to c 30
    c to a 10
}

a = 100-50+10=60
b = 100+50-30=120
c = 100+30-10=120
            -------
            300

이 전체 내용을 읽어서 총 합을 보여준다.

data 폴더를 만들었었는데 거기에 내용이 쌓이는 거다.
그걸 지우면 getBalance 하면 다시 처음부터 0 이 나온다.

-------------------------------

# 투표앱
1. 솔리디티 코드 작성
2. 솔리디티 코드 컴파일
3. 컴파일 결과를 배포   = 블럭에 내용을 추가한다.
4. 컴파일 결과를 js 코드로 내용을 불러올 수 있는지 테스트
5. html 에서 js web3 를 활용해서 내용을 불러온다.

터미널 켜고 (가나쉬 / 작업공간 총 두개 열어줌)

# 가나쉬 터미널
$ ganache-cli --host 0.0.0.0

# 솔리디티 코드 작성
Voting.sol 생성


mapping(string => uint) public voteReceived;
// 객체
/*
    let voteReceived = {
        ingoo1 : 0,
        ingoo2 : 0,
        ingoo3 : 0,
        [string]  [uint]
    }
    접근하는 방법 voteReceived.ingoo1 / voteReceieved[ingoo1]
    여기서 ingoo1 라는 값에 숫자를 +1 해주면 됨
    voteReceieved[ingoo1] = voteReceieved[ingoo1] + 1;
*/

이렇게 선언하고 사용할때는 함수에서

function voteForCandidate(string memory _candidate) public{
    voteReceived[_candidate] += 1;
}

---------------------

memory 는 파일에 저장하지 않겠다
storage 파일에 저장하겠다.

-----------------------------
# 예외처리 ; 문자열 비교

1. js ver
arr = ['ingoo1','ingoo2','ingoo3']
searchText = 'ingoo4'

function check(searchText){
    // 완전탐색 - 모든 배열을 다 검사한다는.
    let result = arr.map((v,k)=>{
        if(searchText == v){
            return true;
        }
        return false;
    })
    return result;

    혹은
    for(let i=0; i<arr.length; i++){
        if(arr[i] == searchText){
            return true;
        }
    }
    return false;
}

2. sol ver
객체 지향적 사고... 생각이 완료되어야 작성 할 수 있음...

// 예외처리 String 비교
function validCandidate(string memory _candidate) view public returns(bool){
    // string 끼리 비교가 안되니까
    // string to byte 로 바꿔주고
    // keccake256() 매서드 안에 byte 값 넣기

    for(uint i=0; i < candidateList.length; i++){
        if(keccak256(bytes(candidateList[i])) == keccak25(bytes(_candidate))){
            return true;
        }
    }
    return false;
}


# 솔리디티 컴파일 해보기
abi, bin 파일 두개가 나옴

solcjs --abi --bin [파일명]
안되면 앞에 npx

터미널 작업공간에서
$ solcjs --abi --bin Voting.sol
하면 파일 두개가 생성됨


# 스마트 컨트랙트 배포하기
web3 라이브러리 활용해서 
deploy 사용했던 부분

deploy.js 파일 만들기
- web3 라이브러리 가져오고
- 현재 사용하고 있는 블록체인 서버에 연결 = 가나쉬
- 배포 작업 위해 Contract 매서드를 사용해서 블럭 생성
- 결과 값을 배포하기(deploy) 매서드

이런 배포는 트러플로 구현이 되어있음.
우리는 솔리디티 코드만 작성하면 됨..
그 내용을 모르고 하는것과 직접 구현하는게 다르기 때문에



-----------
// 배포할 때는 string 값을 못넣음 그래서 이거를 16진수 값으로 바꿔줄거임
['ingoo1','ingoo2','ingoo3'].map(name=>{
    return web3.utils.asciiToHex(name)
})


[['ingoo1','ingoo2','ingoo3'].map(name=>web3.utils.asciiToHex(name))]
대괄호 없으면 return 생략 가능 (문법)

이 deploy.js 가 솔리디티코드를 블럭으로 생성하는..


----------
npm init
npm i web3

$ node .\deploy.js
0xc5f4EeA08888836D8947B3f724510c3A73E86151

가나쉬
사진 5
--------------
잠깐 주석처리 하고
컴파일 결과 배포까지는 된거고

js 로 불러오는거 해봐야함


// 해당 블럭 주소에 접속해야 한다.
const contract = new web3.eth.Contract(ABI,'0xc5f4eea08888836d8947b3f724510c3a73e86151')

// send : 누군가 투표한다 : 우리 기준으로는 주소 10개에 해당하는 녀석들만 투표가 가능하게한다.
contract.methods.voteForCandidate('ingoo1').send({from:'0x36eB10bAa364188DD13968a547260f96824E142F'})

contract.methods.totalVotesFor('ingoo1').call().then(data=>{
    console.log(data)
})


node deploy 
계속 해보면 숫자 카운팅이 늘어난다.


----------------------
* 잘 모르는 부분

매핑: mapping ( 자료형 => 자료형 ) 접근제한자 매핑명;
키 - 값 저장소.

첫번째 자료형이 키. 두번째 자료형이 값. 

-------------------

data 가 body 에 쌓이는게 아니라
블럭이 생성되면서 body 내용이 채워진다.
데이터 저장이 필요할때 블럭이 생성된다.
마이닝, 트랜젝션 (거래)

---------------
index.html 생성
index.js 생성해서 연결한뒤
크롬에 네트워크 탭에서 연결됐는지 확인

-----------------------------------
# 만약 가나쉬를 껐으면?
어케해야할까??
다시 세팅을 해줘야 할것들이 있다!

가나쉬는 변수에 저장해놓은거기 때문에
다시 켜면 리셋된 상태에서 시작해야 한다.

배포부터 시작해야함
deploy.js
에서 deployContract.delploy 부분을 다시 해주되 
주소값이 달라졌으니까 그 부분을 바꿔서 해주면 된다.

그러면 
Contract created 가 새로 나옴

그럼 저 주소를 index.js 에서 
deployAddress 를 이 값으로 변경해준다.

그리고 await send 에서도 투표자의 주소를 새로운것으로 변경해주면 된다.
---------------

index.js 에서
let candidates = {"ingoo1":"candidate1","ingoo2":"candidate2","ingoo3":"candidate3"}

let candidateNames = Object.keys(candidates) // key 값만 빼와서 배열에 담아준다 => ['ingoo1','ingoo2','ingoo3']
    for(let i=0; i < candidateNames.length; i++){   // 3
        let name = candidateNames[i]    // ingoo1
        
        //candidate1 값을 가져오고 싶다면?
        // candidates[name]    // candidates.ingoo1 과 같은 문법이므로 - 뽑아온 이유는 element 에서 id 값 선택 위해서

        const nameElement = document.querySelector(`#${candidates[name]}`)
        nameElement.innerHTML = name
        // 여기까지 작성하고 브라우져로 확인
    }

------------------
이제 html 에서 cadidateCount 부분에 숫자를 채워줄거임

totalVotesFor를 사용할거임
const countElement = document.querySelector(`#candidateCount${i+1}`)
countElement.innerHTML = await VotingContract.methods.totalVotesFor('ingoo1').call()

------------------------

input box에 ingoo1 하면 투표 +1 되고 다시 값 받아와서 화면에 뿌려주는

----------------------
# 메타마스크
= 지갑
지갑의 종류가 크게 2가지로 나눠져있다

핫 월렛 : 온라인 지갑
콜드 월렛 : 오프라인 지갑

메타마스크는 핫 월렛이다.

수탁형 지갑     : 거래소에 저장된 지갑. 제 3자에 의해서 보관되는 지갑
비수탁형 지갑   : 본인이 직접 관리하는 지갑

메타마스크는 비수탁형 지갑이다.

그렇다면 지갑의 역할은 무엇인가?
돈 보관

여기서의 지갑은 주소를 보관하는 공간이다.
가나쉬에 있던 10개의 주소들..
왜 필요할까?? - 코인마다 지갑이 다르기 때문...
그래서 이런 것들을 저장하기 위해 나온게 메타마스크...

주소 보관 + 해당 주소 내용을 조회할 수도 있다.
해당 주소의 코인을 볼 수 있게 해준다.
혹은 다른 주소로 코인을 보낼 수 도 있다.

계좌 같은 느낌이다.


