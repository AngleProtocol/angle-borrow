import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BigNumber } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import { contract, ethers } from 'hardhat';

import {
  OracleOPEURChainlinkOptimism,
  OracleOPEURChainlinkOptimism__factory,
  MockTreasury,
  MockTreasury__factory,
} from '../../typechain';
import { expect } from '../../test/utils/chai-setup';
import { ZERO_ADDRESS } from '../../test/utils/helpers';

contract('Oracles Chainlink', () => {
  let deployer: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;

  let oracleOP: OracleOPEURChainlinkOptimism;
  let stalePeriod: BigNumber;
  let treasury: MockTreasury;

  before(async () => {
    [deployer, alice, bob] = await ethers.getSigners();
    stalePeriod = BigNumber.from(86400 * 52);
    treasury = (await new MockTreasury__factory(deployer).deploy(
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
    )) as MockTreasury;
    oracleOP = await new OracleOPEURChainlinkOptimism__factory(deployer).deploy(stalePeriod, treasury.address);
  });

  describe('Oracle OP', () => {
    it('read', async () => {
      const receipt = await oracleOP.read();
      const gas = await oracleOP.estimateGas.read();
      console.log(gas.toString());
      console.log(receipt.toString());
    });
    it('initialization', async () => {
      expect(await oracleOP.OUTBASE()).to.be.equal(parseEther('1'));
      expect(await oracleOP.stalePeriod()).to.be.equal(stalePeriod);
      expect(await oracleOP.treasury()).to.be.equal(treasury.address);
    });
  });
});
