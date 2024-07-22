import {  useAccount, useProvider, useNetwork } from 'wagmi';
import { calculateGasMargin, getHigherGWEI } from '../utils';
import { Contracts } from '../constants/networks';
import { FACTORY_ABI } from './abi';

export const useFactoryContract = () => {
  const { chain } = useNetwork(); // Get the current chain from wagmi
  const { address } = useAccount();
  const provider = useProvider();
  
  // Define the chain ID based on wagmi's current chain
  const CHAIN_ID = chain?.id;


  const getFactoryContract = () =>
    getContract(Contracts[CHAIN_ID]?.factory);

  const getPrivateFactoryContract = () =>
    getContract(Contracts[CHAIN_ID]?.privateFactory);

  const getArtFactoryContract = () =>
    getContract(Contracts[CHAIN_ID]?.artFactory);

  const getPrivateArtFactoryContract = () =>
    getContract(Contracts[CHAIN_ID]?.privateArtFactory);

  const createNFTContract = async (contract, name, symbol, value, from) => {
    const args = [name, symbol];

    const contractInstance = getContract(contract.address);
    const gasEstimate = await contractInstance.estimateGas.createNFTContract(...args, {
      value,
      from,
      gasPrice: getHigherGWEI(),
    });
    const options = {
      value,
      from,
      gasLimit: calculateGasMargin(gasEstimate),
      gasPrice: getHigherGWEI(),
    };
    return await contractInstance.createNFTContract(...args, options);
  };

  return {
    getFactoryContract,
    getPrivateFactoryContract,
    getArtFactoryContract,
    getPrivateArtFactoryContract,
    createNFTContract,
  };
};
