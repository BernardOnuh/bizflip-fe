import { useCallback } from 'react';
import { useSigner } from 'wagmi';
import { createContract } from 'viem';

const useContract = () => {
  const { data: signer } = useSigner();

  // Function to load a contract using viem
  const loadContract = useCallback(async (address, abi) => {
    if (!signer) {
      throw new Error('Signer not available');
    }
    const contract = createContract({
      address,
      abi,
      signerOrProvider: signer,
    });
    return contract;
  }, [signer]);

  // Function to get the account balance
  const getAccountBalance = useCallback(async (address) => {
    if (!signer) return '0'; // Adjust this if you need to use a different approach for balance
    try {
      const balance = await signer.getBalance(address);
      return balance.toString(); // Format or process the balance as needed
    } catch (error) {
      console.error('Error fetching account balance:', error);
      return '0'; // Return a default value or handle the error as appropriate
    }
  }, [signer]);

  return { loadContract, getAccountBalance };
};

export default useContract;
