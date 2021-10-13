pragma solidity ^0.8.0;

contract Vote {
    string[] public candidateList;
    mapping(string=>uint8) public votesReceived;
    mapping(address=>bool) votes;

    uint numVote;
    uint numCandidate;

    event sendMsg(string msg);

    constructor() public{}
    
    // 후보자 등록
    function registerCandidate(string memory _candidate) public {
        if(validCandidate(_candidate)){
            return;
        }

        candidateList.push(_candidate);
        votesReceived[_candidate] = 0;
    }

    // 투표기능
    function vote(string memory _candidate) public {
        if(vaildVote(msg.sender)){
            // emit sendMsg(bytes("이미 투표를 진행하셨습니다."))
            return;
        }

        votes[msg.sender] = true;
        votesReceived[_candidate] += 1;
    }

    // 투표자 중복체크
    function vaildVote(address _addr) public view returns(bool){
        return votes[_addr];
    }

    // 후보자 등록 중복체크
    function validCandidate(string memory _candidate) public view returns(bool){
        for(uint i=0; i<candidateList.length; i++){
            if(keccak256(bytes(_candidate)) == keccak256(bytes(candidateList[i]))){
                return true;
            }
           return false; 
        }
    }

    function getCandidate() public view returns(string[] memory){
        return candidateList;
    }
}