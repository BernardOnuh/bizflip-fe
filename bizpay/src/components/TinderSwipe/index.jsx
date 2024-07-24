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

  const data = [
    {
      name: 'Board Ape - #1146',
      url: 'https://i.seadn.io/gae/c_Q3RSFYxq_mBn6xRxAMZ7ByQDRsokyui7WOncKqklQd4AbzcDlXbZzNihFmGxpYEmvhEg5YUpZ8Fb6_bnxnBmpshocVjxRmfyjkh7E?auto=format&w=512',
    },
    {
      name: 'Donald Trump',
      url: 'https://i.seadn.io/gae/cQdJa-b13yPX_t2myOP-yTWsnivLyw2TjOebOuEmScctikEcnVJLbvUXtrb10bUdNDtYf3PKIA7zjNVXYWNdRAhDiByu3ukE0l-gkQ?auto=format&w=512',
    },
    {
      name: 'Miley Cyrus',
      url: 'https://i.seadn.io/gcs/files/c1d278fe80b429823c38dee3babafb9f.png?w=500&auto=format',
    },
    {
      name: '459',
      url: 'https://i.seadn.io/gae/-tibTrEXBCbLNfUxVsvqpsgLMB-mYtywZSywY1oQrFF-obqwn1JJPyNqUBWrBR2IwFuWBVxu2O0YYJVdz3Jk4FZ_pYVn0zYjccSOfQ?w=500&auto=format',
    },
    {
      name: 'DeGod #578',
      url: 'https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://metadata.degods.com/g/578-dead.png',
    },
  ];

  return (
    <div className={styles.body}>
      <div className={cx(styles.swipeContainer, 'flex', 'items-center', 'justify-center')}>
        {data.map((person) => (
          <SwipeCard key={person.name} name={person.name} url={person.url} />
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
        <Link href="/favourite" passHref>
            <IconButton className={styles.swipeButtons_star}>
            <StarRateIcon fontSize="large" />
            </IconButton>
        </Link>
        <IconButton className={styles.swipeButtons_right}>
            <FavoriteIcon fontSize="large" />
        </IconButton>
        <Link href="/subscription" passHref>
            <IconButton className={styles.swipeButtons_lightning}>
            <FlashOnIcon fontSize="large" />
            </IconButton>
        </Link>
        </div>
</div>
    </div>
  );
};

export default NFTSwipe;
