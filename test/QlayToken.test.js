// Based on https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/test/examples/SimpleToken.test.js
const { expectEvent, singletons, constants } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;

require('chai').should();

const QlayToken = artifacts.require('QlayToken');

contract('QlayToken', function ([_, registryFunder, creator, operator]) {
  const _name = "QlayToken"
  const _symbol = "MIM"
  const _totalSupply = 351234
  const _defaultOperators = []

  beforeEach(async function () {
    this.erc1820 = await singletons.ERC1820Registry(registryFunder);
    this.token = await QlayToken.new(_name, _symbol, _totalSupply, _defaultOperators);
  });

  describe('token attributes', function(){
    it('has a name', async function () {
      const name = await this.token.name()
      name.should.equal(_name);
    });

    it('has a symbol', async function () {
      (await this.token.symbol()).should.equal(_symbol);
    });

    it('assigns the initial total supply to the creator', async function () {
      const totalSupply = await this.token.totalSupply();
      const creatorBalance = await this.token.balanceOf(creator);

      creatorBalance.should.be.bignumber.equal(totalSupply);

      await expectEvent.inConstruction(this.token, 'Transfer', {
        from: ZERO_ADDRESS,
        to: creator,
        value: totalSupply,
      });
    });

    // it('allows operator burn', async function () {
    //   const creatorBalance = await this.token.balanceOf(creator);
    //   const data = web3.utils.sha3('Simple777Data');
    //   const operatorData = web3.utils.sha3('Simple777OperatorData');

    //   await this.token.authorizeOperator(operator, { from: creator });
    //   await this.token.operatorBurn(creator, creatorBalance, data, operatorData, { from: operator });
    //   (await this.token.balanceOf(creator)).should.be.bignumber.equal("0");

    // });
    
  });

});