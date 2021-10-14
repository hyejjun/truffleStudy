var Fruitshop = artifacts.require("./Fruitshop.sol");

module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(Fruitshop);
};
