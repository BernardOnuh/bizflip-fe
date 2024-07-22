import { useProvider } from 'wagmi';
import { providers } from 'viem';

const useWalletUtils = () => {
  const provider = useProvider();

  const checkBalance = async (address) => {
    if (!provider) {
      throw new Error('Provider not found');
    }
    const balance = await provider.getBalance(address);
    return balance.toString(); // Convert balance to string if needed
  };

  return {
    checkBalance,
  };
};

export default useWalletUtils;
