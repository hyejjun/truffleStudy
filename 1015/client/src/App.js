import React, { useState, useEffect, useReducer } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import axios from "axios"

import "./App.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      let { web3, Instance, account } = action
      return {
        ...state,
        web3,
        Instance,
        account
      }
  }
}

const INIT_ACTIONS = (web3, Instance, account) => {
  return{
    type : 'INIT',
    web3,
    Instance,
    account
  }
}

const App = () => {
  const initialState = {
    web3: null,
    Instance: null,
    account: null
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const [value, setValue] = useState(0)
  const [storage, setStorage] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleResult = (log,web3) => {
    // decodeLog 는 2개의 인자값이있다. 1. 데이터 형식 2. log.data
    // SimpleStorage.sol 의 event로 보내는거임
    const params = [
      {type:'string', name:'message'},
      {type:'uint256',name:'newVal'}
    ]
    const returnValues = web3.eth.abi.decodeLog(params,log.data)
    console.log(`returnValues : `,returnValues)
    setStorage(returnValues.newVal)
    setLoading(prev => !prev)
  }

  //직접서명
  const send = async () => {
    const {account, Instance} = state
    if (value > 0) {
      setLoading(prev => !prev)
      // 비동기적 처리
      // localhost:3001/rpc/setTx
      await Instance.set(value,{from:account})
    }
  }

  // DB 거치고 서명
  const sendAPI = async () => {
    const {web3, account} = state
    if (value > 0) {
      setLoading(prev => !prev)
      // 비동기적 처리
      // localhost:3001/rpc/set
      let result = await axios.post('http://localhost:3001/rpc/set',{from:account, val:value})
      
      console.log(result);
      if(result.data !== undefined && result.data.rawTx !== undefined && result.data.success === true){
        await web3.eth.sendTransaction(result.data.rawTx)
      }
    }
  }

  // Backend server 거치고 서명
  const sendTx = async() => {
    const {account} = state
    if (value > 0) {
      setLoading(prev => !prev)
      // 비동기적 처리
      await axios.post('http://localhost:3001/rpc/setTx',{from:account, val:value})
      // 프론트에서는 서버에 요청만 보내면 된다.
    }
  }

  const init = async () => {
    const contract = require('@truffle/contract')
    const web3 = await getWeb3()
    const [account] = await web3.eth.getAccounts()
    // const networkId = await web3.eth.net.getId()  //network id 값 가져올 수 있다.

    let simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(web3.currentProvider)

    const Instance = await simpleStorage.deployed()
    // console.log(Instance);
    dispatch(INIT_ACTIONS(web3,Instance,account))

    web3.eth.subscribe("logs",{address:Instance.address}) // 배포된 address
    .on('data', log =>{
      // console.log(log)
      handleResult(log,web3)
    })
    .on('error', err=>console.log(err))
  }
  useEffect(() => {
    init()
  }, [])

  const handleChange = e => {
    const val = e.target.value
    setValue(val)
  }

  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
      <div>
        <button onClick={send}>일반서명</button>
        <button onClick={sendAPI}>DB 거치고 서명</button>
        <button onClick={sendTx}>server 거치고 서명</button>
      </div>
      <div>
        {loading ? '로딩중' : storage}
      </div>
    </div>
  )
}


export default App;
