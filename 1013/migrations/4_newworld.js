const newworld = artifacts.require("newworld");

module.exports = function (deployer) {
  deployer.deploy(newworld);
};