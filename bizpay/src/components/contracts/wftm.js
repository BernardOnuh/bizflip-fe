import { useContract, useProvider, useAccount, useNetwork } from 'wagmi';
import { WFTM_ABI } from './abi';
import { calculateGasMargin, getHigherGWEI } from '../utils';

const WFTM_ADDRESS = {
  1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // Mainnet
  250: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83', // Fantom
  4002: '0xf1277d1Ed8AD466beddF92ef448A132661956621', // Fantom Testnet
  3: '0xc778417e063141139fce010982780140aa0cd5ab', // Ropsten
  5: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6', // Görli
};

export const useWFTMContract = () => {
  const { chain } = useNetwork(); // Get the current chain from wagmi
  const { address } = useAccount();
  const provider = useProvider();

  const wftmAddress = WFTM_ADDRESS[chain?.id];

  const { data: contract } = useContract({
    addressOrName: wftmAddress,
    contractInterface: WFTM_ABI,
    signerOrProvider: provider,
  });

  const getWFTMBalance = async (address) => {
    if (!contract) return;
    return await contract.balanceOf(address);
  };

  const wrapFTM = async (value) => {
    if (!contract || !address) return;
    
    const options = {
      value,
      gasPrice: getHigherGWEI(),
    };

    const gasEstimate = await contract.estimateGas.deposit(options);
    options.gasLimit = calculateGasMargin(gasEstimate);

    return await contract.deposit(options);
  };

  const unwrapFTM = async (value) => {
    if (!contract) return;

    const options = {
      gasPrice: getHigherGWEI(),
    };

    return await contract.withdraw(value, options);
  };

  const getAllowance = async (owner, spender) => {
    if (!contract) return;
    return await contract.allowance(owner, spender);
  };

  const approve = async (address, value) => {
    if (!contract) return;

    const tx = await contract.approve(
      address,
      ethers.constants.MaxUint256 || value
    );
    await tx.wait();
  };

  return {
    wftmAddress,
    getWFTMBalance,
    wrapFTM,
    unwrapFTM,
    getAllowance,
    approve,
  };
};
