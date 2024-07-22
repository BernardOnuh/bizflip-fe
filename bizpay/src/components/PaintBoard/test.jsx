/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useHistory } from 'react-router';
import cx from 'classnames';
import { ClipLoader } from 'react-spinners';
import { useAccount, useProvider, useSigner, useNetwork } from 'wagmi';
import { createWalletClient, custom, fetchBalance, parseEther, signMessage, getNetwork } from 'viem';
import { useDropzone } from 'react-dropzone';
import Skeleton from 'react-loading-skeleton';
import Select from 'react-dropdown-select';
import axios from 'axios';

import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { Stepper, Step, StepLabel, Switch } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import BootstrapTooltip from '../BootstrapTooltip';
import PriceInput from '../PriceInput';
import {
  calculateGasMargin,
  formatError,
  getHigherGWEI,
  getRandomIPFS,
} from '../utils';
import showToast from '../utils/toast';
import WalletUtils from '../utils/wallet';
import useContract from '../utils/sc.interaction';
import { useSalesContract } from '../contracts';

import styles from './styles.module.scss';

const accept = ['image/*'];

const mintSteps = [
  'Uploading to IPFS',
  'Create your NFT',
  'Confirming the Transaction',
];

const FEE_ABI = [
  {
    inputs: [],
    name: 'platformFee',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

const SINGLE_NFT_ABI = [
  {
    inputs: [
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'string', name: '_tokenUri', type: 'string' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
];

const MULTI_NFT_ABI = [
  {
    inputs: [
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'uint256', name: '_supply', type: 'uint256' },
      { internalType: 'string', name: '_uri', type: 'string' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
];

const PurpleSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    color: '#1969FF',
    '&.Mui-checked': {
      color: '#1969FF',
      '& + .MuiSwitch-track': {
        backgroundColor: '#1969FFAA',
      },
    },
  },
  '& .MuiSwitch-track': {
    backgroundColor: theme.palette.grey[400],
  },
}));

const PaintBoard = () => {
  const history = useHistory();
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const client = createWalletClient({ provider, custom });

  const explorerUrl = 'YOUR_EXPLORER_URL';
  const apiUrl = 'YOUR_API_URL';
  const fetchMintableCollections = async (authToken) => {
    const response = await axios.get(`${apiUrl}/collections`, {
      headers: {
        'x-auth-token': authToken,
      },
    });
    return response.data;
  };
  const getNonce = async (address, authToken) => {
    const response = await axios.get(`${apiUrl}/nonce/${address}`, {
      headers: {
        'x-auth-token': authToken,
      },
    });
    return response.data;
  };
  const addUnlockableContent = async (data, authToken) => {
    const response = await axios.post(`${apiUrl}/unlockable-content`, data, {
      headers: {
        'x-auth-token': authToken,
      },
    });
    return response.data;
  };
  const checkBan = async (address, authToken) => {
    const response = await axios.get(`${apiUrl}/ban-check/${address}`, {
      headers: {
        'x-auth-token': authToken,
      },
    });
    return response.data;
  };

  const { registerRoyalty } = useSalesContract();
  const { loadContract } = useContract();

  const imageRef = useRef();

  const [selected, setSelected] = useState([]);
  const [collections, setCollections] = useState([]);
  const [nft, setNft] = useState();
  const [type, setType] = useState();
  const [image, setImage] = useState(null);
  const [fee, setFee] = useState(null);

  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [description, setDescription] = useState('');
  const [royalty, setRoyalty] = useState('');
  const [xtra, setXtra] = useState('');
  const [supply, setSupply] = useState(0);
  const [hasUnlockableContent, setHasUnlockableContent] = useState(false);
  const [unlockableContent, setUnlockableContent] = useState('');
  const [nftType, setNftType] = useState('');
  const [revenue, setRevenue] = useState(0);
  const [age, setAge] = useState('');
  const [netProfit, setNetProfit] = useState('');

  const [currentMintingStep, setCurrentMintingStep] = useState(0);
  const [isMinting, setIsMinting] = useState(false);

  const [lastMintedTnxId, setLastMintedTnxId] = useState('');

  const authToken = ''; // Replace with appropriate logic to get the authToken

  const getFee = async () => {
    setFee(null);

    try {
      const contract = await loadContract(nft, FEE_ABI);
      const _fee = await contract.platformFee();
      setFee(parseFloat(_fee.toString()) / 10 ** 18);
    } catch {
      setFee(0);
    }
  };

  const getCollections = async () => {
    try {
      const data = await fetchMintableCollections(authToken);
      setCollections(data);
      if (data.length) {
        setSelected([data[0]]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (authToken) {
      getCollections();
    }
  }, [authToken]);

  useEffect(() => {
    if (!nft) return;

    getFee();
  }, [nft]);

  const onDrop = useCallback(acceptedFiles => {
    setImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: accept.join(', '),
    multiple: false,
    onDrop,
    maxSize: 15728640,
  });

  const removeImage = () => {
    setImage(null);
    if (imageRef.current) {
      imageRef.current.value = '';
    }
  };

  const imageToBase64 = () => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = err => {
        reject(err);
      };
    });
  };

  const validateMetadata = () => {
    return name !== '' && address !== '' && image;
  };

  const resetMintingStatus = () => {
    setTimeout(() => {
      setIsMinting(false);
      setCurrentMintingStep(0);
    }, 1000);
  };

  const mintNFT = async () => {
    if (!address) {
      showToast('info', 'Connect your wallet first');
      return;
    }
    const { id: chainId } = await getNetwork();

    if (chainId !== 1 && chainId !== 5) { // 1 = Mainnet, 5 = Goerli
      showToast('info', 'You are not connected to Ethereum Network');
      return;
    }

    const balance = await fetchBalance({ address });

    if (balance < fee) {
      showToast(
        'custom',
        `Your balance should be at least ${fee} ETH to mint an NFT`
      );
      return;
    }

    let isBanned = await checkBan(address, authToken);

    if (isBanned) {
      showToast('error', 'You are banned from minting');
      return;
    }

    setLastMintedTnxId('');
    // show stepper
    setIsMinting(true);
    if (!validateMetadata()) {
      resetMintingStatus();
      return;
    }

    let signature;
    let addr;

    if (hasUnlockableContent && unlockableContent.length > 0) {
      const { data: nonce } = await getNonce(address, authToken);
      try {
        const msg = `Approve Signature on ${nonce}`;
        const signedMessage = await signMessage({
          account: address,
          message: msg,
        });
        signature = signedMessage;
        addr = address;
      } catch (error) {
        showToast('error', 'Failed to sign the message');
        resetMintingStatus();
        return;
      }
    }

    let ipfsHash = '';

    setCurrentMintingStep(0);

    try {
      const base64 = await imageToBase64();
      const { data } = await axios.post(
        `${apiUrl}/ipfs`,
        { image: base64 },
        {
          headers: {
            'x-auth-token': authToken,
          },
        }
      );
      ipfsHash = data.ipfsHash;
      setCurrentMintingStep(1);
    } catch (err) {
      resetMintingStatus();
      console.log(err);
      return;
    }

    let txHash = '';

    try {
      const contract = await loadContract(nft, SINGLE_NFT_ABI);
      const response = await client.sendTransaction({
        to: nft,
        data: contract.interface.encodeFunctionData('mint', [
          address,
          `ipfs://${ipfsHash}`,
        ]),
        gasLimit: getHigherGWEI(21000),
        gasPrice: parseEther('1.5', 'wei'),
      });
      txHash = response.transactionHash;
      setCurrentMintingStep(2);
    } catch (err) {
      resetMintingStatus();
      console.log(err);
      return;
    }

    setLastMintedTnxId(txHash);

    showToast('success', 'Successfully minted');

    if (hasUnlockableContent && unlockableContent.length > 0) {
      const content = {
        unlockableContent,
        nftId: txHash,
        address: addr,
        signature,
      };

      await addUnlockableContent(content, authToken);
    }

    setIsMinting(false);
    setCurrentMintingStep(0);

    history.push('/collections');
  };

  return (
    <div className={styles.paintBoard}>
      {/* Rest of your component JSX */}
    </div>
  );
};

export default PaintBoard;
