pragma solidity ^0.8.0;

contract Voting {
    // 후보자들 초기화 - 생성자

    string[] public candidateList; // 전역변수
    mapping(string => uint256) public voteReceived;     // 투표 개수

    constructor(string[] memory _candidateNames) public {
        // 블럭에 내용저장할때 인자값 하나 넘기겠다는.
        candidateList = _candidateNames;
    }

    // 각 후보자에게 투표기능을 만든다.
    function voteForCandidate(string memory _candidate) public {
        voteReceived[_candidate] += 1;
    }

    // 후보자명을 넣어주면 결과값으로 투표 수를 받을 수 있게
    // 후보자들의 각 투표수 -> 반환만 하니까 view 로 작성
    function totalVotesFor(string memory _candidate) view public returns(uint){
        return voteReceived[_candidate];
    }

    // 예외처리 String 비교
    function validCandidate(string memory _candidate) view public returns(bool){
        // string 끼리 비교가 안되니까
        // string to byte 로 바꿔주고
        // keccake256() 매서드 안에 byte 값 넣기

        for(uint i=0; i < candidateList.length; i++){
            if(keccak256(bytes(candidateList[i])) == keccak256(bytes(_candidate))){
                return true;
            }
        }
        return false;
    }

}