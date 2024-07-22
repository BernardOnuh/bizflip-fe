import { useContract } from 'wagmi'; // Import from wagmi
import { useContract as useViemContract } from 'viem'; // Import from viem

import { calculateGasMargin, getHigherGWEI } from '../utils';
import { Contracts } from '../constants/networks';

import { BUNDLE_SALES_CONTRACT_ABI } from './abi';

// Determine the chain
const isMainnet = process.env.NEXT_PUBLIC_ENV === 'MAINNET';
const ChainId = {
  MAINNET: 1,
  GÖRLI: 5,
};
const CHAIN = isMainnet ? ChainId.Mainnet : ChainId.GÖRLI;

// Hook to use Bundle Sales Contract
export const useBundleSalesContract = () => {
  // Initialize wagmi and viem contracts
  const { data: contract } = useViemContract({
    address: Contracts[CHAIN].bundleSales,
    abi: BUNDLE_SALES_CONTRACT_ABI,
  });

  const getBundleListing = async (owner, bundleID) => {
    const listing = await contract.getListing(owner, bundleID);
    const price = parseFloat(listing.price.toString()) / 10 ** 18;
    if (price > 0) {
      return {
        price,
        startingTime: parseInt(listing.startingTime.toString()),
      };
    }
    return null;
  };

  const buyBundleETH = async (bundleID, value) => {
    const options = {
      value,
      gasPrice: getHigherGWEI(),
    };
    const gasEstimate = await contract.estimateGas['buyItem(string)'](bundleID, options);
    options.gasLimit = calculateGasMargin(gasEstimate);
    return await contract['buyItem(string)'](bundleID, options);
  };

  const buyBundleERC20 = async (bundleID, payToken) => {
    return await contract['buyItem(string,address)'](bundleID, payToken);
  };

  const cancelBundleListing = async bundleID => {
    const tx = await contract.cancelListing(bundleID);
    await tx.wait();
  };

  const listBundle = async (
    bundleID,
    nftAddresses,
    tokenIds,
    quantities,
    payToken,
    price,
    startingTime
  ) => {
    return await contract.listItem(
      bundleID,
      nftAddresses,
      tokenIds,
      quantities,
      payToken,
      price,
      startingTime
    );
  };

  const updateBundleListing = async (bundleID, newPrice) => {
    return await contract.updateListing(bundleID, newPrice);
  };

  const createBundleOffer = async (bundleID, payToken, price, deadline) => {
    return await contract.createOffer(bundleID, payToken, price, deadline);
  };

  const cancelBundleOffer = async bundleID => {
    return await contract.cancelOffer(bundleID);
  };

  const acceptBundleOffer = async (bundleID, creator) => {
    return await contract.acceptOffer(bundleID, creator);
  };

  return {
    getBundleListing,
    buyBundleETH,
    buyBundleERC20,
    cancelBundleListing,
    listBundle,
    updateBundleListing,
    createBundleOffer,
    cancelBundleOffer,
    acceptBundleOffer,
  };
};
