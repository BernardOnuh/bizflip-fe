import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';
import { IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import StarRateIcon from '@mui/icons-material/StarRate';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import OfferModal from './offermodal';
import Footer from '../Footer/footer';
import SwipeCard from './SwipeCard';

const FAV_NFT = [];

const NFTSwipe = () => {
  const router = useRouter();
  const que_res = router.query;
  const likeref = useRef('');
  const noperef = useRef('');
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [id] = useState('');
  const handleClose = () => setOpen(false);
  const fav = que_res?.fav;
  const minValue = que_res?.minValue;
  const maxValue = que_res?.maxValue;
  const [count] = useState(0);
  const [Premium] = useState(false);

  const makeAnOffer = async () => {
    FAV_NFT.push({
      _name: name,
      _url: url,
    });

    // await addToLikeNft(account, id); // Ensure this function is defined
    handleClose();
    setName('');
    setUrl('');
    router.push({
      pathname: '/favourite',
      state: FAV_NFT,
    });
  };

  const handleFavClick = (e) => {
    e.preventDefault(); // Prevent the default link behavior
    setOpen(true); // Open the modal
  };

  const data = [
    {
      name: 'DeGod #477',
      url: 'https://metadata.degods.com/g/476-dead.png',
      age: 25,
      description: 'A unique NFT with stunning artwork.'
    },
    {
      name: 'DeGod #578',
      url: 'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://metadata.degods.com/g/578-dead.png',
      age: 30,
      description: 'An amazing NFT from the DeGods collection.'
    },
    {
      name: 'DeGod #3474',
      url: 'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://metadata.degods.com/g/3474-dead.png',
      age: 22,
      description: 'A valuable NFT with a rich history.'
    },
    {
      name: 'Board Ape - #1146',
      url: 'https://i.seadn.io/gae/c_Q3RSFYxq_mBn6xRxAMZ7ByQDRsokyui7WOncKqklQd4AbzcDlXbZzNihFmGxpYEmvhEg5YUpZ8Fb6_bnxnBmpshocVjxRmfyjkh7E?auto=format&w=512',
      age: 28,
      description: 'A rare NFT from the Board Ape collection.'
    },
    // Add more data objects here with age and description
  ];

  return (
    <div className={styles.body}>
      <div className={cx(styles.swipeContainer, 'flex', 'items-center', 'justify-center')}>
        {data.map((person) => (
          <SwipeCard key={person.name} name={person.name} url={person.url} age={person.age} description={person.description} />
        ))}
      </div>
      <div className={cx(styles.button)} >
        <div className={styles.swipeButtons}>
          <IconButton className={styles.swipeButtons_repeat}>
            <ReplayIcon fontSize="large" />
          </IconButton>
          <IconButton className={styles.swipeButtons_left}>
            <CloseIcon fontSize="large" />
          </IconButton>
          <a
            href="/favourite"
            className={cx(styles.menuLink, styles.link)}
            style={{ color: '#fff' }}
            onClick={handleFavClick} // Add click handler
          >
            <IconButton className={styles.swipeButtons_star}>
              <StarRateIcon fontSize="large" />
            </IconButton>
          </a>
          <IconButton
            className={styles.swipeButtons_right}
            onClick={() => setOpen(true)} // Open modal when favorite button is clicked
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
          setModal={open}
          close={handleClose}
          makeAnOffer={makeAnOffer}
        />
      </div>
    </div>
  );
};

export default NFTSwipe;
