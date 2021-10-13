const HelloToken = artifacts.require("HelloToken");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
// contract("HelloToken", function (/* accounts */) {
//   it("should assert true", async function () {
//     await HelloToken.deployed();
//     return assert.isTrue(true);
//   });
// });

contract("HelloToken",()=>{
  it("hello function call",async()=>{
    // abi, bytecode 적었던 부분 함축해서 이렇게 적는다.
    let instance = await HelloToken.deployed()    // 배포된 내용을 instance 에 담고
    let result = await instance.hello()
    console.log(`콘소로그 === `,result);
    return result
  })
})

contract("HelloToken",()=>{
  it("hello function call2",async()=>{
    // abi, bytecode 적었던 부분 함축해서 이렇게 적는다.
    let instance = await HelloToken.deployed()    // 배포된 내용을 instance 에 담고
    let result = await instance.hell()
    console.log(`콘소로그 === `,result);
    return result
  })
})