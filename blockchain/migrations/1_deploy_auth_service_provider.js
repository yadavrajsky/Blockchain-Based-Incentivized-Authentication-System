const AuthenticationServiceProvider = artifacts.require("AuthenticationServiceProvider");

module.exports = function(deployer) {
  deployer.deploy(AuthenticationServiceProvider);
};