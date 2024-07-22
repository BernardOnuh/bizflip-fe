import { useAccount, useProvider, useSigner as useWagmiSigner } from 'wagmi';

export * from './abi';
export * from './auctions';
export * from './sales';
export * from './bundleSales';
export * from './token';
export * from './wftm';
export * from './factory';

// Custom hook for using wagmi's signer
export const useSigner = () => {
  const { data: signer, isError, isLoading } = useWagmiSigner();

  if (isError) {
    console.error('Error getting signer:', isError);
    return null;
  }

  if (isLoading) {
    console.log('Loading signer...');
    return null;
  }

  return signer;
};

// For account and provider
export const useAccountInfo = () => {
  const { data: account, isError, isLoading } = useAccount();
  const provider = useProvider();

  if (isError) {
    console.error('Error getting account:', isError);
    return { account: null, provider };
  }

  if (isLoading) {
    console.log('Loading account...');
    return { account: null, provider };
  }

  return { account, provider };
};
