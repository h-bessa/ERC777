const QlayToken = artifacts.require('QlayToken');

require('@openzeppelin/test-helpers/configure')({ provider: web3.currentProvider, environment: 'truffle' });

const { singletons } = require('@openzeppelin/test-helpers');

module.exports = async function (deployer, network, accounts) {
  const name = "QlayToken"
  const symbol = "MIM"
  const totalSupply = 351234
   if (network === 'development') {
     // In a test environment an ERC777 token requires deploying an ERC1820 registry
     await singletons.ERC1820Registry(accounts[0]);
   }

  await deployer.deploy(QlayToken, name, symbol, totalSupply, []);
};