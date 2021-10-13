//가나쉬 연결을 해야함
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

// 브라우저에서 쓰는 js 에서는 fs 가 안되기때문에 그냥 텍스트로 작성
const ABI = JSON.parse(`[{"inputs":[{"internalType":"string[]","name":"_candidateNames","type":"string[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"candidateList","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_candidate","type":"string"}],"name":"totalVotesFor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_candidate","type":"string"}],"name":"validCandidate","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_candidate","type":"string"}],"name":"voteForCandidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"voteReceived","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]`)

// deployAddress : 배포했던 주소값
const deployAddress = `0xc5f4eea08888836d8947b3f724510c3a73e86151`

let VotingContract = new web3.eth.Contract(ABI, deployAddress)

let candidates = { "ingoo1": "candidate1", "ingoo2": "candidate2", "ingoo3": "candidate3" }

// page load 되면 init 함수 실행
window.addEventListener('DOMContentLoaded', init)
async function init() {
    let candidateNames = Object.keys(candidates) // key 값만 빼와서 배열에 담아준다 => ['ingoo1','ingoo2','ingoo3']
    for (let i = 0; i < candidateNames.length; i++) {   // 3
        let name = candidateNames[i]    // ingoo1

        //candidate1 값을 가져오고 싶다면?
        // candidates[name]    // candidates.ingoo1 과 같은 문법이므로 - 뽑아온 이유는 element 에서 id 값 선택 위해서

        const nameElement = document.querySelector(`#${candidates[name]}`)
        nameElement.innerHTML = name
        // 여기까지 작성하고 브라우져로 확인

        const countElement = document.querySelector(`#candidateCount${i + 1}`)
        countElement.innerHTML = await VotingContract.methods.totalVotesFor(name).call()
    }

    // await VotingContract.methods.voteForCandidate('ingoo1').send({ from: '0x36eB10bAa364188DD13968a547260f96824E142F' })
    // VotingContract.methods.totalVotesFor('ingoo1').call().then(data => {
    //     console.log(data)
    // })
}

// 페이지 로드됐을때 하는게 아니니까 init 함수 밖에다 써주고 
let btn = document.querySelector(`#btn`)
btn.addEventListener('click',btnEvent)

async function btnEvent(){
    let candidateName = document.querySelector('#candidateName').value
    await VotingContract.methods.voteForCandidate(candidateName).send({ from: '0x36eB10bAa364188DD13968a547260f96824E142F' })
    
    let candidateCount = await VotingContract.methods.totalVotesFor(candidateName).call()
    
    let number = candidateName.charAt(candidateName.length-1)
    let countElement = document.querySelector(`#candidateCount${number}`)
    countElement.innerHTML = candidateCount
}