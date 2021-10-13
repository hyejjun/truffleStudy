pragma solidity ^0.8.0;

contract hello{
    string value;
    constructor(){
        value = "hello world";  // memory에 공간 확보하고 넣음
    }
    function get() public view returns(string memory){
        return value;
    }
}

// 컴파일 하기 : solcjs --bin --abi .\hello.sol 안되면 앞에 npx
