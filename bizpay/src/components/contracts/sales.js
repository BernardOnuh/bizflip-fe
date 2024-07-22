import { useAccount } from 'wagmi';
import { BigNumber } from 'viem';
import { calculateGasMargin, getHigherGWEI } from '../utils';
import { Contracts } from '../constants/networks';
import { SALES_CONTRACT_ABI } from './abi';

// Define chain IDs for wagmi
const CHAIN_ID_MAINNET = 1; // Mainnet chain ID
const CHAIN_ID_GÖRLI = 5;   // Görli testnet chain ID

export const useSalesContract = () => {
  const { chain } = useAccount(); // Get the current chain from wagmi

  // Define the chain ID based on environment
  const CHAIN_ID = chain?.id === CHAIN_ID_MAINNET ? CHAIN_ID_MAINNET : CHAIN_ID_GÖRLI;

  // Hook to get a contract instance


  const buyItemETH = async (nftAddress, tokenId, owner, value, from) => {
    const contract = getSalesContract();
    const args = [nftAddress, tokenId, owner];

    const options = {
      value: BigNumber.from(value),
      from,
      gasPrice: getHigherGWEI(),
    };

    try {
      const gasEstimate = await contract.estimateGas.buyItem(...args, options);
      options.gasLimit = calculateGasMargin(gasEstimate);
      return await contract.buyItem(...args, options);
    } catch (error) {
      console.error('Error buying item with ETH:', error);
      throw error;
    }
  };

  const buyItemERC20 = async (nftAddress, tokenId, payToken, owner) => {
    const contract = getSalesContract();
    const options = {
      gasPrice: getHigherGWEI(),
    };

    try {
      return await contract.buyItemERC20(nftAddress, tokenId, payToken, owner, options);
    } catch (error) {
      console.error('Error buying item with ERC20:', error);
      throw error;
    }
  };

  const cancelListing = async (nftAddress, tokenId) => {
    const contract = getSalesContract();
    const options = {
      gasPrice: getHigherGWEI(),
    };

    try {
      const tx = await contract.cancelListing(nftAddress, tokenId, options);
      await tx.wait();
    } catch (error) {
      console.error('Error canceling listing:', error);
      throw error;
    }
  };

  const listItem = async (
    nftAddress,
    tokenId,
    quantity,
    payToken,
    pricePerItem,
    startingTime
  ) => {
    const contract = getSalesContract();
    const options = {
      gasPrice: getHigherGWEI(),
    };

    try {
      return await contract.listItem(
        nftAddress,
        tokenId,
        quantity,
        payToken,
        pricePerItem,
        startingTime,
        options
      );
    } catch (error) {
      console.error('Error listing item:', error);
      throw error;
    }
  };

  const updateListing = async (
    nftAddress,
    tokenId,
    payToken,
    newPrice
  ) => {
    const contract = getSalesContract();
    const options = {
      gasPrice: getHigherGWEI(),
    };

    try {
      return await contract.updateListing(
        nftAddress,
        tokenId,
        payToken,
        newPrice,
        options
      );
    } catch (error) {
      console.error('Error updating listing:', error);
      throw error;
    }
  };

  const createOffer = async (
    nftAddress,
    tokenId,
    payToken,
    quantity,
    pricePerItem,
    deadline,
    type
  ) => {
    const contract = getSalesContract();
    const options = {
      gasPrice: getHigherGWEI(),
    };

    try {
      if (type === 'invest') {
        return await contract.createInvest(
          nftAddress,
          tokenId,
          payToken,
          quantity,
          pricePerItem,
          deadline,
          options
        );
      } else {
        return await contract.createOffer(
          nftAddress,
          tokenId,
          payToken,
          quantity,
          pricePerItem,
          deadline,
          options
        );
      }
    } catch (error) {
      console.error('Error creating offer:', error);
      throw error;
    }
  };

  const cancelOffer = async (nftAddress, tokenId) => {
    const contract = getSalesContract();
    const options = {
      gasPrice: getHigherGWEI(),
    };

    try {
      return await contract.cancelOffer(nftAddress, tokenId, options);
    } catch (error) {
      console.error('Error canceling offer:', error);
      throw error;
    }
  };

  const acceptOffer = async (nftAddress, tokenId, creator) => {
    const contract = getSalesContract();
    const options = {
      gasPrice: getHigherGWEI(),
    };

    try {
      return await contract.acceptOffer(nftAddress, tokenId, creator, options);
    } catch (error) {
      console.error('Error accepting offer:', error);
      throw error;
    }
  };

  const registerRoyalty = async (nftAddress, tokenId, royalty) => {
    const contract = getSalesContract();
    const options = {
      gasPrice: getHigherGWEI(),
    };

    try {
      return await contract.registerRoyalty(
        nftAddress,
        tokenId,
        royalty,
        options
      );
    } catch (error) {
      console.error('Error registering royalty:', error);
      throw error;
    }
  };

  const getCollectionRoyalty = async (nftAddress) => {
    const contract = getSalesContract();
    try {
      return await contract.collectionRoyalties(nftAddress);
    } catch (error) {
      console.error('Error getting collection royalty:', error);
      throw error;
    }
  };

  return {
    getSalesContract,
    buyItemETH,
    buyItemERC20,
    cancelListing,
    listItem,
    updateListing,
    createOffer,
    cancelOffer,
    acceptOffer,
    registerRoyalty,
    getCollectionRoyalty,
  };
};
