import React, { useState } from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';
import { IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import StarRateIcon from '@mui/icons-material/StarRate';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import NftItem from './Nftitem'; // Ensure correct import
import Link from 'next/link';
import { useRouter } from 'next/router';
import OfferModal from '../OfferModal';
import SwipeCard from './SwipeCard';

const FAV_NFT = [];

const NFTSwipe = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedNft, setSelectedNft] = useState(null);
  const [modalType, setModalType] = useState(''); // New state for managing the modal type
  const [offerPlacing, setOfferPlacing] = useState(false);
  const [type, setType] = useState('');
  const [offerModalVisible, setOfferModalVisible] = useState(false);
  const handleClose = () => setOpen(false); // Ensure the modal closes

  const handleMakeOfferModal = () => {
      setOfferModalVisible(true);
  };

  const makeAnOffer = async () => {
    setType('offer');
    handleMakeOfferModal();
    handleClose();
  };

  const invest = async () => {
    setType('invest');
    handleMakeOfferModal();
    handleClose();
  };

  const data = [
    {
      name: 'DeGod #477',
      url: 'https://metadata.degods.com/g/476-dead.png',
      age: 25,
      description: 'A unique NFT with stunning artwork.',
    },
    {
      name: 'DeGod #578',
      url: 'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://metadata.degods.com/g/578-dead.png',
      age: 30,
      description: 'An amazing NFT from the DeGods collection.',
    },
    {
      name: 'DeGod #3474',
      url: 'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://metadata.degods.com/g/3474-dead.png',
      age: 22,
      description: 'A valuable NFT with a rich history.',
    },
    {
      name: 'Board Ape - #1146',
      url: 'https://i.seadn.io/gae/c_Q3RSFYxq_mBn6xRxAMZ7ByQDRsokyui7WOncKqklQd4AbzcDlXbZzNihFmGxpYEmvhEg5YUpZ8Fb6_bnxnBmpshocVjxRmfyjkh7E?auto=format&w=512',
      age: 28,
      description: 'A rare NFT from the Board Ape collection.',
    },
  ];


  const handleLater = e => {
    console.log('handleLater', e.currentTarget);
  };

  const handleSwipeRight = (nft) => {
    setSelectedNft(nft);
    setOpen(true); // Ensure the modal opens
  };

  return (
    <div className={styles.body}>
      <div className={cx(styles.swipeContainer, 'flex', 'items-center', 'justify-center')}>
        {data.map((person) => (
          <SwipeCard
            key={person.name}
            name={person.name}
            url={person.url}
            age={person.age}
            description={person.description}
            onSwipeRight={() => handleSwipeRight(person)}
          />
        ))}
      </div>
      <div className={cx(styles.button)}>
        <div className={styles.swipeButtons}>
          <IconButton className={styles.swipeButtons_repeat}>
            <ReplayIcon fontSize="large" />
          </IconButton>
          <IconButton className={styles.swipeButtons_left}>
            <CloseIcon fontSize="large" />
          </IconButton>
          <Link href="/favourite" passHref>
            <IconButton
              className={cx(styles.swipeButtons_star, styles.menuLink, styles.link)}
              style={{ color: '#fff' }}
              onClick={() => setModalType('offer')}
            >
              <StarRateIcon fontSize="large" />
            </IconButton>
          </Link>
          <IconButton
            className={styles.swipeButtons_right}
            onClick={() => setModalType('invest')}
          >
            <FavoriteIcon fontSize="large" />
          </IconButton>
          <Link href="/subscription" passHref>
            <IconButton className={styles.swipeButtons_lightning}>
              <FlashOnIcon fontSize="large" />
            </IconButton>
          </Link>
        </div>
        <OfferModal
            visible={offerModalVisible}
            onClose={() => setOfferModalVisible(false)}
           // onMakeOffer={handleMakeOffer}
            confirming={offerPlacing}
            type={type}
            //totalSupply={tokenType.current === 1155 ? maxSupply() : null}
            //offers={selectedToken && selectedToken.offers}
            //escrowOffer={selectedToken && selectedToken.escrowOffer}
            //account={account}
          />
        <NftItem
          setModal={open}
          close={handleClose}
          makeAnOffer={makeAnOffer}
          invest={invest}
          later={handleLater}
        />
      </div>
    </div>
  );
};

export default NFTSwipe;
