import { useChainId } from 'wagmi';
import iconWFTM from '../../../public/images/imgs/wftm.png';
import iconUSDT from '../../../public/images/imgs/usdt.png';
import iconUSDC from '../../../public/images/imgs/usdc.png';
import iconDAI from '../../../public/images/imgs/dai.png';

// Define your token data
const Tokens = {
  1: [  // Chain ID for Ethereum Mainnet
    {
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      name: 'Wrapped Ethereum',
      symbol: 'WETH',
      decimals: 18,
      icon: iconWFTM,
    },
    {
      address: '0x049d68029688eabf473097a2fc38ef61633a3c7a',
      name: 'Tether USD',
      symbol: 'fUSDT',
      decimals: 6,
      icon: iconUSDT,
    },
    {
      address: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      icon: iconUSDC,
    },
    {
      address: '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E',
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      decimals: 18,
      icon: iconDAI,
    },
  ],
  250: [  // Chain ID for Fantom Mainnet
    {
      address: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
      name: 'Wrapped Fantom',
      symbol: 'WFTM',
      decimals: 18,
      icon: iconWFTM,
    },
    {
      address: '0x049d68029688eabf473097a2fc38ef61633a3c7a',
      name: 'Tether USD',
      symbol: 'fUSDT',
      decimals: 6,
      icon: iconUSDT,
    },
    {
      address: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      icon: iconUSDC,
    },
    {
      address: '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E',
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      decimals: 18,
      icon: iconDAI,
    },
  ],
  // Add other chain token data as needed
};

export default function useTokens() {
  const chainId = useChainId(); // Use useChainId to get the current chain ID

  const tokens = Tokens[chainId] || [];

  const getTokenByAddress = addr => {
    const address =
      !addr ||
      addr === '0x0000000000000000000000000000000000000000' ||
      addr === 'eth'
        ? ''
        : addr;
    return tokens.find(tk => tk.address.toLowerCase() === address.toLowerCase());
  };

  return { getTokenByAddress, tokens };
}
