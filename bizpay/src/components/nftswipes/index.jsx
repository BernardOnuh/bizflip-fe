import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Styles from './Styles.module.scss';
import { useRouter } from 'next/router';
// import data from './data';
import ReactCardFlip from 'react-card-flip';
// import { useApi } from 'api';
// import { useNFTContract, useBundleSalesContract, useSalesContract } from 'contracts';
// import toast from 'react-hot-toast';
import Header from 'components/header';
import cx from 'classnames';
// import { Contracts } from 'constants/networks';
// import { ethers } from 'ethers';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import StarRateIcon from '@mui/icons-material/StarRate';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import ReplayIcon from '@mui/icons-material/Replay';
// import ModalActions from 'actions/modal.actions';
import Footer from 'components/footer';
import OfferModal from 'components/OfferModal';
// import { formatError } from 'utils';
// import showToast from 'utils/toast';
import NftItem from './NftItem';
// import { useWeb3React } from '@web3-react/core';
import BackCard from 'pages/nftswipe/backCard';
import Subscription from 'pages/subscription';
import doxImage from 'assets/imgs/doxxed.png';

const FAV_NFT = [];

function Index() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(state => state.Auth);
  const tokenType = useRef();
  const { account, chainId } = {}; // Removed Web3 context
  const location = {}; // Removed Web3 context
  const que_res = location.state;
  const [startPoint, setStartPoint] = useState({ x: null, y: null });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [tokens, setTokens] = useState();
  const [isFlipped, setIsFlipped] = useState(false);
  const [holders, setHolders] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [open, setOpen] = useState(false);
  const [doxxed, setDoxxed] = useState([]);
  const [premium, setPremium] = useState(false);
  const [type, setType] = useState('');
  const handleClose = () => setOpen(false);
  // const { fetchNFTdata, getDoxxed, makeEscrowOffer } = useApi();
  // const { authToken } = useSelector(state => state.ConnectWallet);
  const [offerPlacing, setOfferPlacing] = useState(false);
  const [offerModalVisible, setOfferModalVisible] = useState(false);

  const swipeCount = 3;
  // const { getERC20Contract } = useNFTContract();
  // const { createBundleOffer } = useBundleSalesContract();
  // const { createOffer } = useSalesContract();
  let fav = [];
  if (que_res) {
    fav = que_res?._types.map(item => {
      return item.value;
    });
  }
  const minValue = que_res?._min;
  const maxValue = que_res?._max;
  const faithQuestion = que_res?._res;
  // const card = useRef();

  useEffect(() => {
    if (account && authToken) {
      fetchDoxxedStatus(account, authToken);
      fetchNFT(authToken);
      setHolders([]);
    }
  }, [account, authToken]);

  const maxSupply = useCallback(() => {
    let supply = 0;
    holders.map(holder => {
      if (
        holder.address.toLowerCase() !== account?.toLowerCase() &&
        holder.supply > supply
      ) {
        supply = holder.supply;
      }
    });
    return supply;
  }, [holders]);

  async function fetchDoxxedStatus(account, authToken) {
    const res = await getDoxxed(account, authToken);
    if (res) {
      const doxes = res.doxes.map(value => value.account.toLowerCase());
      setDoxxed(doxes);
    }
  }

  async function fetchNFT(authToken) {
    if (fav.length > 0 && minValue && maxValue && faithQuestion) {
      const res = await fetchNFTdata(
        fav,
        minValue,
        maxValue,
        account,
        authToken
      );
      setTokens(res.data.map(ele => ({ ...ele, isFlipped: false })));
    } else {
      router.push('/');
    }
  }

  const handleMakeOfferModal = () => {
    if (!user?.email) {
      // showToast('info', 'Please add your Email and Name in Account Settings.');
    } else {
      setOfferModalVisible(true);
    }
  };

  const handleMakeOffer = async (
    token,
    _price,
    quantity,
    endTime,
    tokenPrice,
    isEscrow
  ) => {
    try {
      if (isEscrow === true) {
        const { contractAddress, tokenID } = selectedToken;
        setOfferPlacing(true);
        const res = await makeEscrowOffer(
          contractAddress,
          tokenPrice,
          account,
          tokenID,
          endTime.getTime(),
          authToken
        );
        const { status } = res;
        if (status === 'success') {
          // showToast('success', 'Escrow Offer is created');
        } else {
          // showToast('info', 'You already submitted your offer.');
        }
        setOfferPlacing(false);
        setOfferModalVisible(false);
      } else {
        const { contractAddress, tokenID, items } = selectedToken;
        setOfferPlacing(true);
        const price = ethers.utils.parseUnits(_price, token.decimals);
        const deadline = Math.floor(endTime.getTime() / 1000);
        const amount = price.mul(quantity);
        // const erc20 = await getERC20Contract(token.address);
        // const balance = await erc20.balanceOf(account);
        // if (balance.lt(amount)) {
        //   const toastId = showToast(
        //     'error',
        //     `Insufficient ${token.symbol} Balance!`,
        //     token.symbol === 'WETH'
        //       ? 'You can wrap ETH in the WETH station.'
        //       : `You can exchange ${token.symbol} on other exchange site.`,
        //     () => {
        //       toast.dismiss(toastId);
        //       setOfferModalVisible(false);
        //       if (token.symbol === 'WETH') {
        //         dispatch(ModalActions.showWFTMModal());
        //       }
        //     }
        //   );
        //   setOfferPlacing(false);
        //   return;
        // }

        if (items) {
          // const allowance = await erc20.allowance(
          //   account,
          //   Contracts[chainId].bundleSales
          // );
          // if (allowance.lt(amount)) {
          //   const tx = await erc20.approve(
          //     Contracts[chainId].bundleSales,
          //     amount
          //   );
          //   await tx.wait();
          // }

          const tx = await createBundleOffer(
            items ? selectedToken._id : null,
            token.address,
            price,
            ethers.BigNumber.from(deadline)
          );

          await tx.wait();
        } else {
          // const allowance = await erc20.allowance(
          //   account,
          //   Contracts[chainId].sales
          // );
          // if (allowance.lt(amount)) {
          //   const tx = await erc20.approve(
          //     Contracts[chainId].sales,
          //     ethers.constants.MaxUint256
          //   );
          //   await tx.wait();
          // }
          const tx = await createOffer(
            contractAddress,
            ethers.BigNumber.from(tokenID),
            token.address,
            ethers.BigNumber.from(quantity),
            price,
            ethers.BigNumber.from(deadline),
            type
          );

          await tx.wait();
        }

        setOfferModalVisible(false);
      }
    } catch (e) {
      // showToast('error', formatError(e));
      console.log(e);
    } finally {
      setOfferPlacing(false);
    }
  };

  const makeAnOffer = async () => {
    if (account === '') return;
    setType('offer');
    handleMakeOfferModal();
    handleClose();
  };

  const invest = async () => {
    if (account === '') return;
    setType('invest');
    handleMakeOfferModal();
    handleClose();
  };

  const handleLater = e => {
    console.log('Later');
  };

  const handleSwipe = (e, offset) => {
    const touches = e.changedTouches[0];
    const deltaX = touches.clientX - startPoint.x;
    const deltaY = touches.clientY - startPoint.y;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) < offset.x) return;
      if (deltaX > 0) {
        if (tokens && tokens.length) {
          const index = tokens.findIndex(t => t._id === selectedToken._id);
          if (index !== tokens.length - 1) {
            setSelectedToken(tokens[index + 1]);
          } else {
            // End of the array
            setSelectedToken(tokens[0]);
          }
        }
      } else {
        if (tokens && tokens.length) {
          const index = tokens.findIndex(t => t._id === selectedToken._id);
          if (index !== 0) {
            setSelectedToken(tokens[index - 1]);
          } else {
            // Start of the array
            setSelectedToken(tokens[tokens.length - 1]);
          }
        }
      }
    }
    setStartPoint({ x: null, y: null });
  };

  const handleStart = e => {
    const touches = e.touches[0];
    setStartPoint({ x: touches.clientX, y: touches.clientY });
  };

  const handleEnd = e => {
    handleSwipe(e, offset);
  };

  const handleTouchStart = e => {
    handleStart(e);
  };

  const handleTouchEnd = e => {
    handleEnd(e);
  };

  const handleMouseStart = e => {
    setStartPoint({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnd = e => {
    handleSwipe(e, offset);
  };

  return (
    <>
      <Header />
      <div className={Styles.container}>
        <div className={cx(Styles.card_container)}>
          {tokens && tokens.length ? (
            tokens.map((token, index) => (
              <ReactCardFlip
                key={index}
                isFlipped={token.isFlipped}
                flipDirection="horizontal"
              >
                <NftItem
                  key="front"
                  token={token}
                  onClick={() => {
                    const newTokens = tokens.map(t =>
                      t._id === token._id ? { ...t, isFlipped: !t.isFlipped } : t
                    );
                    setTokens(newTokens);
                  }}
                  handleTouchStart={handleTouchStart}
                  handleTouchEnd={handleTouchEnd}
                  handleMouseStart={handleMouseStart}
                  handleMouseEnd={handleMouseEnd}
                />
                <BackCard
                  key="back"
                  token={token}
                  makeAnOffer={makeAnOffer}
                  invest={invest}
                  handleLater={handleLater}
                />
              </ReactCardFlip>
            ))
          ) : (
            <div className={Styles.no_data}>No Data Found</div>
          )}
        </div>
        {open && (
          <OfferModal
            token={selectedToken}
            handleClose={handleClose}
            handleMakeOffer={handleMakeOffer}
            offerPlacing={offerPlacing}
          />
        )}
      </div>
      <Footer />
    </>
  );
}

export default Index;
