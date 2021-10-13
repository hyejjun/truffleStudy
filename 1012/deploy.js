const Web3 = require('web3')
const fs = require('fs')

const ABI = JSON.parse(fs.readFileSync('./Voting_sol_Voting.abi').toString())
const BYTECODE = fs.readFileSync('./Voting_sol_Voting.bin').toString()

const web3 = new Web3('http://localhost:8545')

/*
// 블럭 생성할 때 솔리디티 컴파일한 abi 파일을 인자값에 넣음
const deployContract = new web3.eth.Contract(ABI)   // ABI 는 객체가 되어야함 그래서 JSON parse

deployContract.deploy({
    //배포를 할때 byte 값을 넣음
    data : BYTECODE,
    arguments : [['ingoo1','ingoo2','ingoo3'].map(name=>web3.utils.asciiToHex(name))]
    // 배포할 때는 string 값을 못넣음 그래서 이거를 16진수 값으로 바꿔줄거임
    
    // 배포를 할때 인자값을 넣어주는거임.
})
.send({
    from : '0xc0130920344A4f84b20AD8F458274b00D577BBc1',     // 공개키 - 얘가 주체 Voting.js 코드 전체를 올린다.
    gas : 6721975,
})
.then(newContract=>{
    console.log(newContract.options.address)        // Voting 코드 올린 곳의 주소
})
*/

// 주소는 Contract created: 여기로
// 해당 블럭 (Voting 코드 올린 곳)의 주소에 접속해야 한다.
// const contract = new web3.eth.Contract(ABI,'0xc5f4eea08888836d8947b3f724510c3a73e86151')    

// // send : 누군가 투표한다 : 우리 기준으로는 주소 10개에 해당하는 녀석들만 투표가 가능하게한다. 여기서는 투표자가 누구인가 (이거는 2번 공개주소로함)
// contract.methods.voteForCandidate('ingoo1').send({from:'0x36eB10bAa364188DD13968a547260f96824E142F'})

// contract.methods.totalVotesFor('ingoo1').call().then(data=>{
//     // ingoo1 에 대한 총 투표수를 반환하는 녀석
//     console.log(data)
// })


