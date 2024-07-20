import React, { useEffect } from 'react';
import Image from 'next/image';
import Footer from '../Footer/footer';
import styles from './styles.module.scss';
import roadmap from '../../../public/images/imgs/roadmap.png';

const RoadmapPage = () => {
  useEffect(() => {
    // Any additional side effects or initializations if necessary
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <div className={styles.main}>
          <Image src={roadmap} alt="Roadmap" className={styles.roadmap} />
          {/* 
          If you want to uncomment the roadmap list, make sure to adjust styles and content accordingly
          <div className={styles.mainLeft}>
            <div className={styles.title} style={{ color: '#FFF' }}>{`Roadmap`}</div>
            <br />
            <div className={styles.roadmapList}>
              <div className={styles.roadmapItem}>
                <div className={styles.roadmapLeft}>Beta Marketplace Launch</div>
                <div className={styles.roadmapRight}>Ax Listings</div>
              </div>
              <div className={styles.roadmapItem}>
                <div className={styles.roadmapLeft}>Token Launch</div>
                <div className={styles.roadmapRight}>Staking</div>
              </div>
              <div className={styles.roadmapItem}>
                <div className={styles.roadmapLeft}>Coingecko Listing</div>
                <div className={styles.roadmapRight}>White Paper</div>
              </div>
              <div className={styles.roadmapItem}>
                <div className={styles.roadmapLeft}>MCListing</div>
                <div className={styles.roadmapRight}>25k Holders</div>
              </div>
              <div className={styles.roadmapItem}>
                <div className={styles.roadmapLeft}>PressMedia</div>
                <div className={styles.roadmapRight}>Discord Launch</div>
              </div>
              <div className={styles.roadmapItem}>
                <div className={styles.roadmapLeft}>Certik Audit</div>
                <div className={styles.roadmapRight}>Regional Telegraph Launch</div>
              </div>
              <div className={styles.roadmapItem}>
                <div className={styles.roadmapLeft}>V1.0 Marketplace Launch</div>
                <div className={styles.roadmapRight}>Initial Token Utilities reveal</div>
              </div>
              <div className={styles.roadmapItem}>
                <div className={styles.roadmapLeft}>1k Token holders</div>
                <div className={styles.roadmapRight}>Social Platform addition to marketplace</div>
              </div>
              <div className={styles.roadmapItem}>
                <div className={styles.roadmapLeft}>10M MC</div>
                <div className={styles.roadmapRight}>500M MC</div>
              </div>
              <div className={styles.roadmapItem}>
                <div className={styles.roadmapLeft}>10K Token holders</div>
                <div className={styles.roadmapRight}>500M MC</div>
              </div>
              <div className={styles.roadmapItem}>
                <div className={styles.roadmapLeft}>10K Token holders</div>
                <div className={styles.roadmapRight}>500M MC</div>
              </div>
            </div>
          </div>
          */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RoadmapPage;
