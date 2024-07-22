import { useContract } from 'wagmi';
import { ERC20_CONTRACT_ABI, ERC721_CONTRACT_ABI, ERC1155_CONTRACT_ABI } from './abi';

// Replace `useContract` with `wagmi`'s `useContract`
export const useNFTContract = () => {
  // Function to get a contract instance
  const getContract = (address, abi) => {
    return useContract({
      addressOrName: address,
      contractInterface: abi,
    });
  };

  const getERC20Contract = async (address) => {
    return getContract(address, ERC20_CONTRACT_ABI);
  };

  const getERC721Contract = async (address) => {
    return getContract(address, ERC721_CONTRACT_ABI);
  };

  const getERC1155Contract = async (address) => {
    return getContract(address, ERC1155_CONTRACT_ABI);
  };

  return { getERC20Contract, getERC721Contract, getERC1155Contract };
};
