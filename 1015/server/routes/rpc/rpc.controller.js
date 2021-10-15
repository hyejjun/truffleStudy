const {GANACHE} = require('./eth.config')
const Web3 = require('web3')        // web3 가져오고
const web3 = new Web3(GANACHE)      // web3 실행시킴 가나쉬의 도메인 주소 'http://localhost:7545' 얘랑연결시킴
const abi = require('../../../client/src/contracts/SimpleStorage.json').abi;
const address = require('../../../client/src/contracts/SimpleStorage.json').networks["5777"].address
const ethTx = require('ethereumjs-tx').Transaction

const set = async (req,res) =>{
    const {from,val} = req.body
    //transaction 객체 만들어서 응답

    const instance = await new web3.eth.Contract(abi,address)   // data를 만들기 위해 가져옴
    // 인스턴스 값으로 함수호출이 가능한가? => 가능
    const data = await instance.methods.set(val).encodeABI()

    // console.log('data', data);
    // console.log(`to hex`, web3.utils.toHex(30000));

    let txObject = {
        from,
        to : address, //contract address
        data, // 인코드 해서 보냄 -> 컴퓨터가 알아들을 수 있게
        gasLimit: web3.utils.toHex(30000),  // [wei]->hex로 변환
        gasPrice: web3.utils.toHex(web3.utils.toWei('20','gwei'))          // wei -> hex
    }

    res.json({
        success : true,
        rawTx : txObject
    })
}

const setTx = async (req,res)=>{
    const {from,val} = req.body

    const instance = await new web3.eth.Contract(abi,address)   // data를 만들기 위해 가져옴
    const data = await instance.methods.set(val).encodeABI()
    const txCount = await web3.eth.getTransactionCount(from)         // 누구의 TX COUNT 를 가져올거냐 ? from 을 가져와야함

    console.log(txCount);
    let txObject = {
        nonce: web3.utils.toHex(txCount),
        from,
        to : address, //contract address
        data, // 인코드 해서 보냄 -> 컴퓨터가 알아들을 수 있게
        gasLimit: web3.utils.toHex(30000),  // [wei]->hex로 변환
        gasPrice: web3.utils.toHex(web3.utils.toWei('20','gwei'))          // wei -> hex
    }

    // 서명 완료
    // 서명을 하려면 필요한 값 -> 개인키

    // sendSignedTransaction() // 인자값으로 비밀키가 들어간 내용이 들어감

    const tx = new ethTx(txObject)

    const privateKey = Buffer.from('48b2befc3f28b6b5e902e1e4ce560348da152c56d734b2d5d9bea95805836589','hex')  // 비밀키를 넣어준다. - 가나쉬를 새로 만들면 여기도 바꿔주기
    tx.sign(privateKey)       // 개인키값 
    const serializedTx = tx.serialize()
    // console.log(serializedTx.toString('hex'));

    const txhash = await web3.eth.sendSignedTransaction(`0x`+serializedTx.toString('hex'))

    res.json({
        success : true,
        txhash
    })
}

module.exports={
    set,
    setTx
}