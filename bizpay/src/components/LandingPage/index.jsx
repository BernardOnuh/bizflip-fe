import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic'
import Image from 'next/image';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Categories } from '../constants/filter.constants';
import Footer from '../Footer/footer';
import styles from './styles.module.scss';
import SwipeCard from './swipe';
import LearnMore from '../LearnMore';

const YouTube = dynamic(() => import('react-youtube'), { ssr: false })
const LandingPage = () => {
  const router = useRouter();
  const [windowSize, setWindowSize] = useState({ innerWidth: 0, innerHeight: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowSize());
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleViewCategory = id => {
    router.push('/explore');
  };

  const renderCategoryCard = (key, icon) => (
    <div
      className={styles.categoryCard}
      key={key}
      onClick={() => handleViewCategory(key)}
    >
      <div className={styles.cardIconWrapper2}>
        <Image
          src={icon}
          alt={`Category ${key}`}
          layout="responsive"
          width={300}
          height={200}
          objectFit="contain"
        />
      </div>
    </div>
  );

  const onPlayerReady = event => {
    if (event?.target?.pauseVideo) {
      event.target.pauseVideo();
    }
  };

  const opts = {
    height: windowSize.innerWidth > 800 ? '460' : `${windowSize.innerWidth * 0.8}`,
    width: windowSize.innerWidth > 800 ? '800' : `${windowSize.innerWidth}`,
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.head}>
          <h1>Explore, collect & sell</h1>
          <div className={styles.player_yt}>
            <YouTube
              videoId="tn0aS4VE1Qw"
              opts={opts}
              onReady={onPlayerReady}
            />
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.mainLeft}>
            <div
              className={styles.title}
              style={{ color: '#FFF' }}
            >
              {`Buy and Sell Profitable Assets on the Blockchain`}
            </div>
            <div className={styles.ctaGroup}>
              <Link href="/explore" className={styles.exploreButton}>Explore</Link>
              <Link href="/create" className={styles.createButton}>Create</Link>
            </div>
          </div>
          <div
            className={styles.card}
            style={{ background: 'transparent', boxShadow: 'none' }}
          >
            <SwipeCard />
          </div>
          <div className={styles.learnMoreArea}>
            <Link href="/about" className={styles.learnMoreButton}>
              <PlayCircleOutlineIcon />
              Learn More about Bizflip
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.about}>
        <div className={styles.aboutInner}>
          <div className={styles.aboutTitle}>Browse by category</div>
          <div className={styles.categories}>
            {Categories.map(cat =>
              renderCategoryCard(cat.id, cat.icon)
            )}
          </div>
        </div>
      </div>
      <div className={styles.aboutdatamain}>
        <div className={styles.aboutdata}>
          <div
            className={styles.title}
            style={{ color: '#FFF' }}
          >
            {`We Give You the Power to Buy and Sell Securely, All Within One Marketplace`}
          </div>
          <br />
          <div className={styles.bodyText}>
            <strong>
              As the globalized economy becomes increasingly digital, more and
              more transactions are moving online. This has led to the rise of
              blockchain technology as a way to transparently conduct business.
              For buyers and sellers, this means that there is a new way to
              trade without having to worry about the security or privacy of the
              process.
              <br />
              <br />
              Bizflip is at the forefront of the blockchain economy. It’s
              convenient, it’s fast – and it’s also the only all-in-one platform
              you need to exchange goods. In a nutshell, we are the best
              peer-to-peer marketplace for the transfer of profitable assets. We
              are committed to providing an efficient and honest system for our
              users to do business with each other.
              <br />
              <br />
              Our goal is to make it simple to trade without third parties,
              saving you time and cash. With Bizflip, you can buy, sell or trade
              any asset, anywhere in the world, safely and transparently.
              <br />
              <br />
            </strong>
          </div>
          <Link href="/our-service" className={styles.exploreButton}>How it Works</Link>
        </div>
        <div>
          <LearnMore />
        </div>
      </div>
      <Footer />
    </div>
  );
};

function getWindowSize() {
  if (typeof window !== 'undefined') {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }
  return { innerWidth: 0, innerHeight: 0 };
}

export default LandingPage;
