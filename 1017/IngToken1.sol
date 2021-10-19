pragma solidity ^0.8.0;

// OOP

interface ERC20{
    event Transfer(address _from, address _to, uint256 _value);
    event Approval(address _from, address _to, uint256 _value);
    
    // 총 토큰
    function totalSupply() external view returns(uint256);
    
    // 해당 오너가 보유한 토큰
    function balanceOf(address _owner) external view returns(uint256);
    
    // 내용을 보낼때 사용하는 함수
    function transfer(address _to, uint256 _value) external returns(bool);
    
    // 얘는 다이렉트로 보내는함수
    function transferFrom(address _from, address _to, uint256 _value) external returns(bool);

    // 한도에 대한 내용을 지정해줌
    function approve(address _spender, uint256 _value) external returns(bool);
    
    // 토큰 소유자가 인출 가능한 금액 (사용가능한 금액을 반환하는 함수)
    function allowance(address _owner, address _spender) external view returns(uint256);
}


contract StandardToken is ERC20{
    mapping(address => uint256) balances;
    mapping(address => mapping(address=>uint256)) allowed;
     
    function totalSupply() override external view returns(uint256){}
    
    function balanceOf(address _owner) override external view returns(uint256){
        return balances[_owner];
    }
    
    function transfer(address _to, uint256 _value) override external returns(bool){
        // owner -> to
        if(balances[msg.sender] >= _value && _value>0){
            // true
            balances[msg.sender] -= _value;
            balances[_to] += _value;
            emit Transfer(msg.sender, _to, _value);
            return true;
        } else {
            // fasle
            return false;
        }
    }
    
    function transferFrom(address _from, address _to, uint256 _value) override external returns(bool){
        if(balances[_from] >= _value && _value>0){
            balances[_from] -= _value;
            balances[_to] += _value;
            allowed[_from][_to] -= _value;
            emit Transfer(_from,_to,_value);
            return true;
        }else{
            return false;
        }        
    }

    function approve(address _spender, uint256 _value) override external returns(bool){
        // 예약된 내역을 저장하는 공간
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    
    function allowance(address _owner, address _spender) external view returns(uint256){
        return allowed[_owner][ _spender];
    }
}


/***********추가됨*********** */
contract IngToken is StandardToken{
    string public name;     // token name
    uint8 public decimals;  // 소수점 18 wei 위해서
    string public symbol;   // ETH ITK 토큰의단위
    string public version;  // 1.0.0 
    uint256 public uintsOneEthCanbuy;   // 1 ETH 에 살 수 있는 ING의 양
    uint256 public totalEthInWei;       // 이더를 보관하는 공간 
    address public fundWallet;      // 이 코드를 실행한 사람의 주소/ 소유자의 이더를 저장하는 공간 
    
    // 배포할때만 실행되는
    constructor() payable public{
        name = "IngToken";
        decimals = 18;
        symbol = "ING";
        uintsOneEthCanbuy = 100;
        fundWallet = msg.sender; 
        balances[msg.sender] = 10000000000000000000;
    }
    
    // 2가지 함수
    // fallback
    // approveAndCall
    
    fallback() external payable{
        totalEthInWei = totalEthInWei + msg.value;      // msg.value = 내가 갖고있는 토큰 수 
        uint256 amount = msg.value * uintsOneEthCanbuy;
        require(balances[fundWallet] >= amount);        // 내가 갖고 있는 양 >= 요구하는 양
        
        // 내가 갖고 있는 코인 감소시키고 이더를 갖고 있는 사람한테는 코인 수 만큼 증가시킴
        balances[fundWallet] -= amount;     
        balances[msg.sender] += amount;
        
        emit Transfer(fundWallet, msg.sender, amount);
        
        // 이더를 받으면 내 코인 주고 이더는 내 지갑에 넣기
        payable(fundWallet).transfer(msg.value);
    }

    /***********추가됨************ */
    function approveAndCall(address _spender, uint256 _value, bytes memory _extraData) public returns(bool){
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        
        /*
        "receiveApproval(address,uint256,address,bytes)"
        msg.sender
        _value
        address(this)
        _extraData
        */
        
        // 인자값 5개
        //abi.encodeWithSignature(,,,,)
        
        (bool success, bytes memory data) = _spender.call(abi.encodeWithSignature("receiveApproval(address,uint256,address,bytes)",msg.sender,_value,address(this),_extraData));     
        require(success, "call failed");
        return true;
    }
}





















