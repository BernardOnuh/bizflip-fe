import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import Image from 'next/image';
import gesture from '../../../public/images/imgs/gesture.png';
import swipe from '../../../public/images/imgs/swipe.png';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Chat from '../Footer/Chatbox/chat';
import Footer from '../Footer/footer';

const Hero = () => {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      fetchData(address);
    }
  }, [isConnected, address]);

  async function fetchData(account) {
    // const res = await getDox(account);
    // if (res.dox) {
    //   router.replace('/qna');
    // }
  }

  const handleClick = () => {
    openConnectModal();
  };

  return (
    <div className={styles.container}>
      {isClient && isConnected ? (
        <div className={styles.body}>
          <div className={styles.main}>
            <div className={styles.title}>
              Would you like to verify & dox your profile and become more trusted?
            </div>
            <div className={styles.btn_group}>
              <Link href="/dox" passHref>
                <button className={styles.dox_btn}>Dox</button>
              </Link>
              <Link href="/qna" passHref>
                <button className={styles.dox_btn}>Maybe later</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.body}>
          <div className={styles.main}>
            <div className={styles.title_area}>
              <Image src={gesture} alt="logo" className={styles.title_logo} />
              <p className={styles.connct_title}>Tap & Swipe</p>
              <Image src={swipe} alt="logo" className={styles.title_logo} />
            </div>
            <div className={styles.connect_btn}>
              <button onClick={handleClick}>Connect Wallet</button>
            </div>
          </div>
        </div>
      )}
      <Chat/>
      <Footer/>
    </div>
  );
};

export default Hero;
