const newworld = artifacts.require("newworld");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("newworld", () => {
  it("newhello function call", async () => {
    let instance = await newworld.deployed();
    let result = await instance.newworld()
    return result
  });
});
