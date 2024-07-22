import { useSigner, useProvider } from 'wagmi';
import { prepareWriteContract, writeContract, readContract, fetchSigner } from 'viem';
import { AUCTION_CONTRACT_ABI } from './abi';

const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';
const ChainId = {
  MAINNET: 1,
  GÖRLI: 5,
};
const CHAIN = isMainnet ? ChainId.MAINNET : ChainId.GÖRLI;

const Contracts = {
  [ChainId.MAINNET]: {
    auction: '0xMainnetAuctionContractAddress',
  },
  [ChainId.GÖRLI]: {
    auction: '0xGorliAuctionContractAddress',
  },
};

const useAuctionContract = () => {
  const provider = useProvider();
  const { data: signer } = useSigner();

  const getAuctionContract = async () => {
    return new ethers.Contract(Contracts[CHAIN].auction, AUCTION_CONTRACT_ABI, signer || provider);
  };

  const getAuction = async (nftAddress, tokenId) => {
    const contract = await getAuctionContract();
    const res = await contract.getAuction(nftAddress, tokenId);
    const owner = res[0];
    const payToken = res[1];
    const reservePrice = res[2];
    const startTime = parseFloat(res[3].toString());
    const endTime = parseFloat(res[4].toString());
    const resulted = res[5];
    const minBid = res[6];
    return {
      owner,
      payToken,
      reservePrice,
      startTime,
      endTime,
      resulted,
      minBid,
    };
  };

  const cancelAuction = async (nftAddress, tokenId) => {
    const contract = await getAuctionContract();
    const tx = await prepareWriteContract({
      address: Contracts[CHAIN].auction,
      abi: AUCTION_CONTRACT_ABI,
      functionName: 'cancelAuction',
      args: [nftAddress, tokenId],
      overrides: {
        gasPrice: await provider.getGasPrice(),
      },
    });
    return await writeContract(tx);
  };

  const createAuction = async (
    nftAddress,
    tokenId,
    payToken,
    reservePrice,
    startTimestamp,
    endTimestamp,
    minBidReserve
  ) => {
    const contract = await getAuctionContract();
    const tx = await prepareWriteContract({
      address: Contracts[CHAIN].auction,
      abi: AUCTION_CONTRACT_ABI,
      functionName: 'createAuction',
      args: [nftAddress, tokenId, payToken, reservePrice, startTimestamp, minBidReserve, endTimestamp],
      overrides: {
        gasPrice: await provider.getGasPrice(),
      },
    });
    return await writeContract(tx);
  };

  const getHighestBidder = async (nftAddress, tokenId, tokenAddress) => {
    const contract = await getAuctionContract();
    const res = await readContract({
      address: Contracts[CHAIN].auction,
      abi: AUCTION_CONTRACT_ABI,
      functionName: 'getHighestBidder',
      args: [nftAddress, tokenId],
    });
    const bidder = res[0];
    let bid;

    if (
      tokenAddress.toLowerCase() === process.env.REACT_APP_USDC.toLowerCase() ||
      tokenAddress === process.env.REACT_APP_FUSDT
    ) {
      bid = parseFloat(res[1].toString()) / 1e6;
    } else {
      bid = parseFloat(res[1].toString()) / 1e18;
    }

    const lastBidTime = parseFloat(res[2].toString());

    return {
      bidder,
      bid,
      lastBidTime,
    };
  };

  const placeBid = async (nftAddress, tokenId, payToken, value, from) => {
    const contract = await getAuctionContract();
    let tx;

    if (payToken === '') {
      tx = await prepareWriteContract({
        address: Contracts[CHAIN].auction,
        abi: AUCTION_CONTRACT_ABI,
        functionName: 'placeBid',
        args: [nftAddress, tokenId],
        overrides: {
          value,
          from,
          gasPrice: await provider.getGasPrice(),
        },
      });
    } else {
      tx = await prepareWriteContract({
        address: Contracts[CHAIN].auction,
        abi: AUCTION_CONTRACT_ABI,
        functionName: 'placeBid',
        args: [nftAddress, tokenId, value],
        overrides: {
          gasPrice: await provider.getGasPrice(),
        },
      });
    }
    return await writeContract(tx);
  };

  const resultAuction = async (nftAddress, tokenId) => {
    const contract = await getAuctionContract();
    const tx = await prepareWriteContract({
      address: Contracts[CHAIN].auction,
      abi: AUCTION_CONTRACT_ABI,
      functionName: 'resultAuction',
      args: [nftAddress, tokenId],
      overrides: {
        gasPrice: await provider.getGasPrice(),
      },
    });
    return await writeContract(tx);
  };

  const updateAuctionStartTime = async (nftAddress, tokenId, startTime) => {
    const contract = await getAuctionContract();
    const tx = await prepareWriteContract({
      address: Contracts[CHAIN].auction,
      abi: AUCTION_CONTRACT_ABI,
      functionName: 'updateAuctionStartTime',
      args: [nftAddress, tokenId, startTime],
      overrides: {
        gasPrice: await provider.getGasPrice(),
      },
    });
    return await writeContract(tx);
  };

  const updateAuctionEndTime = async (nftAddress, tokenId, endTimestamp) => {
    const contract = await getAuctionContract();
    const tx = await prepareWriteContract({
      address: Contracts[CHAIN].auction,
      abi: AUCTION_CONTRACT_ABI,
      functionName: 'updateAuctionEndTime',
      args: [nftAddress, tokenId, endTimestamp],
      overrides: {
        gasPrice: await provider.getGasPrice(),
      },
    });
    return await writeContract(tx);
  };

  const updateAuctionReservePrice = async (nftAddress, tokenId, reservePrice) => {
    const contract = await getAuctionContract();
    const tx = await prepareWriteContract({
      address: Contracts[CHAIN].auction,
      abi: AUCTION_CONTRACT_ABI,
      functionName: 'updateAuctionReservePrice',
      args: [nftAddress, tokenId, reservePrice],
      overrides: {
        gasPrice: await provider.getGasPrice(),
      },
    });
    return await writeContract(tx);
  };

  const withdrawBid = async (nftAddress, tokenId) => {
    const contract = await getAuctionContract();
    const tx = await prepareWriteContract({
      address: Contracts[CHAIN].auction,
      abi: AUCTION_CONTRACT_ABI,
      functionName: 'withdrawBid',
      args: [nftAddress, tokenId],
      overrides: {
        gasPrice: await provider.getGasPrice(),
      },
    });
    return await writeContract(tx);
  };

  return {
    getAuctionContract,
    getAuction,
    cancelAuction,
    createAuction,
    getHighestBidder,
    placeBid,
    resultAuction,
    updateAuctionStartTime,
    updateAuctionEndTime,
    updateAuctionReservePrice,
    withdrawBid,
  };
};

export default useAuctionContract;
