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
import OfferModal from './offermodal';
import Subscription from '../subscription';
import ReactCardFlip from 'react-card-flip';
import BackCard from './backCard';
import { useRouter } from 'next/router';
import Footer from '../Footer/footer';
// Import your dataset here
import data from './data'; // Adjust the path based on your file structure

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
  const [dataState, setData] = useState(data); // Set the initial state to your dataset
  const fav = que_res?.fav;
  const minValue = que_res?.minValue;
  const maxValue = que_res?.maxValue;
  const [count] = useState(0);
  const [Premium] = useState(false);

  useEffect(() => {
    // Using the imported dataset directly
    setData(data);
  }, [fav, minValue, maxValue]);

  const makeAnOffer = async () => {
    if (id === '') return;
    FAV_NFT.push({
      _name: name,
      _url: url,
    });

    handleClose();
    setName('');
    setUrl('');
  };

  const flipref = useRef(null);

  let Time;
  useEffect(() => {
    Time = setTimeout(() => {
      flipref.current.classList.remove(styles.hintFlipCard);
      console.log(flipref.current.classList);
    }, 2500);

    return () => {
      if (Time) clearTimeout(Time);
    };
  }, []);

  const handleClick = (e, index, val) => {
    e.preventDefault();
    const newData = [
      ...dataState.slice(0, index),
      { ...dataState[index], isFlipped: val },
      ...dataState.slice(index + 1),
    ];
    setData(newData);
  };

  return (
    <div className={styles.container}>
      {Premium ? (
        <Subscription />
      ) : (
        <>
          <div className={styles.body}>
            <div className={styles.tinderCards}>
              {dataState.length > 0 &&
                dataState.map((character, index) => (
                  <div
                    key={index} // Use index as key
                    className={styles.swipe}
                    onMouseDown={e => {
                      e.preventDefault();
                      console.log(e);
                    }}
                    id="swipearea"
                  >
                    <ReactCardFlip
                      isFlipped={character.isFlipped}
                      flipSpeedBackToFront={0.4}
                    >
                      <div
                        style={{
                          backgroundImage: `url(${character.url})`, // Use url for background image
                        }}
                        ref={flipref}
                        className={cx(styles.card)}
                        onMouseUp={e => {
                          e.preventDefault();
                          handleClick(e, index, true);
                        }}
                      >
                        <div className={styles.like} ref={likeref}></div>
                        <div className={styles.nope} ref={noperef}></div>
                        <h1 style={{ color: '#fff' }}>{character.name}</h1> {/* Display character name */}
                      </div>
                      <BackCard
                        count={count}
                        character={character}
                        setIsFlipped={e => {
                          e.preventDefault();
                          handleClick(e, index, false);
                        }}
                      />
                    </ReactCardFlip>
                  </div>
                ))}
            </div>
            <div className={styles.reletive}>
              <div className={cx(styles.button)}>
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
          </div>
          <OfferModal
            setModal={open}
            close={handleClose}
            makeAnOffer={makeAnOffer}
          />
          <Footer />
        </>
      )}
    </div>
  );
};

export default NFTSwipe;
