import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Styles from './Styles.module.scss';
import Link from 'next/link';
import ReactCardFlip from 'react-card-flip';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StarRateIcon from '@mui/icons-material/StarRate';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import ReplayIcon from '@mui/icons-material/Replay';
import Footer from '../Footer/footer';
import OfferModal from '../OfferModal';
import NftItem from '../NftItem';
import BackCard from '../nftswipe/backCard';
import Subscription from '../subscription';
import doxImage from '../../../public/images/imgs/doxxed.png';

const FAV_NFT = [];

function HomePage() {
  const router = useRouter();
  const { query } = router;
  const [tokens, setTokens] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);
  const [open, setOpen] = useState(false);
  const [premium, setPremium] = useState(false);
  const [type, setType] = useState('');
  const [offerModalVisible, setOfferModalVisible] = useState(false);

  // Dummy data
  const dummyTokens = [
    { id: 1, imageURL: 'https://via.placeholder.com/150', name: 'Token 1', owner: 'owner1' },
    { id: 2, imageURL: 'https://via.placeholder.com/150', name: 'Token 2', owner: 'owner2' },
    // Add more tokens as needed
  ];

  useEffect(() => {
    // Simulate API call
    setTokens(dummyTokens);
  }, []);

  const handleMakeOfferModal = () => {
    // Placeholder for email check
    setOfferModalVisible(true);
  };

  const handleMakeOffer = async () => {
    // Placeholder for offer logic
    setOfferModalVisible(false);
  };

  const handleClose = () => setOpen(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped(prevState => !prevState);
  };

  return (
    <>
      {premium ? (
        <Subscription />
      ) : (
        <>
          <div className={Styles.main_swiper}>
            <div className={Styles.swiper}>
              {tokens.map((token) => (
                <div
                  key={token.id}
                  onClick={handleClick}
                  className={Styles.cardContainer}
                >
                  <ReactCardFlip isFlipped={isFlipped} className={Styles.swipecard}>
                    <div className={Styles.card}>
                      <img src={token.imageURL} alt="img" className={Styles.frontimg} />
                      <h1 className={Styles.frontName}>{token.name}</h1>
                      <div className={Styles.doxx}>
                        <img src={doxImage} alt="img" className={Styles.doxImage} />
                      </div>
                    </div>
                    <div className={Styles.card}>
                      <BackCard token={token} />
                    </div>
                  </ReactCardFlip>
                </div>
              ))}
            </div>

            <div className={Styles.reletive}>
              <div className={Styles.button}>
                <div className={Styles.swipeButtons}>
                  <IconButton className={Styles.swipeButtons_repeat}>
                    <ReplayIcon fontSize="large" />
                  </IconButton>
                  <IconButton className={Styles.swipeButtons_left}>
                    <CloseIcon fontSize="large" />
                  </IconButton>
                  <Link href="/favourite" legacyBehavior>
                    <a>
                      <IconButton className={Styles.swipeButtons_star}>
                        <StarRateIcon fontSize="large" />
                      </IconButton>
                    </a>
                  </Link>
                  <IconButton className={Styles.swipeButtons_right}>
                    <FavoriteIcon fontSize="large" />
                  </IconButton>
                  <Link href="/subscription" legacyBehavior>
                    <a>
                      <IconButton className={Styles.swipeButtons_lightning}>
                        <FlashOnIcon fontSize="large" />
                      </IconButton>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <NftItem
            setModal={open}
            close={handleClose}
            makeAnOffer={handleMakeOfferModal}
            invest={handleMakeOfferModal}
          />
          <OfferModal
            visible={offerModalVisible}
            onClose={() => setOfferModalVisible(false)}
            onMakeOffer={handleMakeOffer}
            type={type}
          />
          <Footer />
        </>
      )}
    </>
  );
}

export default HomePage;
