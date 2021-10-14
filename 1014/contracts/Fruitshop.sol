// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/*
  1. 보낸 사람의 계정에서 사과를 총 몇개 갖고 있는가
  2. 사과를 구매했을 시, 해당 계정(주소)에 사과를 추가함
  3. 사과를 판매시 내가 갖고 있는 사과 * 사과 구매 가격 만큼 토큰을 반환해주고
    사과를 0개로 바꿔준다.
  4. 내 사과를 반환해주는 함수
*/

contract Fruitshop {
  mapping(address=>uint) myApple;  // 주소별로 사과를 저장할 수 있도록 mapping으로 선언
  constructor() public {
  }

  function buyApple() payable public{
    // msg.sender : contract를 요청한 사람의 주소를 담고 있는 내장 객체
    myApple[msg.sender]++;      // 초기화 값이 0 인데 이거를 1로 만들어줌
  }

  function getMyApple() public view returns(uint){
    return myApple[msg.sender];
  }

  function sellApple(uint _applePrice) payable external{
    uint totalPrice = (myApple[msg.sender] * _applePrice);
                      // 내가 갖고 있는 사과 * 가격
    myApple[msg.sender] = 0;    // 사과 0으로 초기화
    msg.sender.transfer(totalPrice);    // 환볼 느낌
  }
}

/*
  truffle version 해보면 해석기는 ver 5 이다.
  근데 vscode 는 ver 8 이라서 여기서 나는 오류가 해설할때는 안날 수 있다.

  solcjs --version
  이건 vscode ver
*/