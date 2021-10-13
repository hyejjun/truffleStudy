const hello = artifacts.require("hello");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("hello",()=> {
  it("hello function call", async ()=> {
    let instance = await hello.deployed()
    let result = await instance.helloworld()
    console.log(result)
    return result
  });
});
