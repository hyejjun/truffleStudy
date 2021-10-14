import React, { Component, useReducer } from "react";
import FruitshopContract from "./contracts/Fruitshop.json";
import getWeb3 from "./getWeb3";
import { useState, useEffect } from "react";

import "./App.css";

const App = () => {
  const [myApple,setMyApple] = useState(0)
  let initalState = {web3:null, instance:null, account:null}
  const [state, dispatch] = useReducer(reducer,initalState)

  function reducer(state,action){
    switch(action.type){
      case "INIT":
        let {web3,instance,account} = action
        return{
          ...state,
          web3,
          instance,
          account
        }
    }
  }

  const buyApple = async () =>{
    //instance 값 가져와야 함
    let {instance, account, web3} = state;
    await instance.buyApple({
      from : account,
      value : web3.utils.toWei("10","ether"),    //wei
      gas : 90000,
    })
    setMyApple(prev => prev+1)  // 블록에 있는 내용을 가져와서 뿌리는걸로 수정해보기 + 숫자 조정해보기
  }

  const sellApple = async () =>{
    let {instance, account, web3} = state
    await instance.sellApple(web3.utils.toWei("10","ether"),{
      from : account,
      gas : 90000,
    })
    setMyApple(0)
  }

  const getApple = async (instance)=>{
    if(instance == null) return
    let result = await instance.getMyApple()
    setMyApple(result.toNumber())
  }

  const getweb = async ()=>{
    const contract = require("@truffle/contract")

    let web3 = await getWeb3()
    let fruitshop = contract(FruitshopContract)
    fruitshop.setProvider(web3.currentProvider)

    let instance = await fruitshop.deployed()
    // 계정(address) 가져오기
    let accounts = await web3.eth.getAccounts()

    let InitActions = {
      type : 'INIT',
      web3,
      instance,
      account:accounts[0]
    }
    dispatch(InitActions)

    getApple(instance)

    // 내 계정 : 0xE6BE9186bC5f7Dbc5862F3bdC87AD9c3B042acBD
    // 콘솔로그 : ['0xE6BE9186bC5f7Dbc5862F3bdC87AD9c3B042acBD']
    
    // console.log(accounts);
    // console.log(instance);

    // instance.sellApple()
    // instance.buyApple()

    // 현재 내가 갖고 있는 사과를 리턴해주는 함수를 만든다.
  }

  // componentDidMount Web3 가져와서 메타마스크 연결 할거임
  useEffect(()=>{
    getweb()
  },[])

  return(
    <div>
      <h1>사과 가격 : 10 ETH</h1>
      <button onClick={()=>buyApple()}>BUY</button>
      <p>내가 가지고 있는 사과 : {myApple}</p>
      <button onClick={()=>sellApple()}>SELL (판매 가격은 : {myApple * 10} ETH)</button>
    </div>
  )
}


export default App;
