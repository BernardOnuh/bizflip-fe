import React, { useEffect } from 'react';
import Link from 'next/link';
import Footer from '../Footer/footer'
import styles from './styles.module.scss';

const HowToUsePage = () => {

  useEffect(() => {
    // Handle side effects if necessary
    // Remove or replace Redux actions if not used
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <div className={styles.main}>
          <div className={styles.mainLeft}>
            <div className={styles.title} style={{ color: '#FFF' }}>
              {`It’s Not Hard to Deal With Bizflip`}
            </div>
            <br />
            <div className={styles.subtitle}>Flip Assets</div>

            <div className={styles.bodyText}>
              If you`re looking to buy and sell websites, tokens, or products to
              serious buyers, we’re the platform for you. With global reach and
              top-quality listings, Bizflip has an excellent reputation. Here`s
              how to sell with us:
            </div>
            <ul className={styles.bodyText}>
              <li>
                Register for an account and verify your identity with your
                wallet
              </li>
              <li>
                Create a listing for your product or service. Include as much
                detail as possible, and be sure to set a realistic price.
              </li>
              <li>
                Next, promote your listing through social media and other
                channels. The more exposure your listing gets, the more likely
                you are to find a buyer.
              </li>
              <li>
                Finally, close the deal by negotiating with the buyer and
                agreeing on a price. Once the deal is finalized, you`ll receive
                your payment in the cryptocurrency of your choice.
              </li>
            </ul>

            <div className={styles.subtitle}>Buy Assets</div>
            <div className={styles.bodyText}>
              You won’t find another online marketplace where it’s so safe to
              buy. It can be done in just a few easy steps:
            </div>

            <ul className={styles.bodyText}>
              <li>
                As with selling, you`ll need to create an account and verify
                your identity
              </li>
              <li>
                Once you`re logged in, you can browse the listings or search for
                specific keywords.
              </li>
              <li>
                When you find an item you`re interested in, you can place a bid
                or make an offer. If the seller accepts your offer, the property
                is transferred to your blockchain wallet. And that`s it!{' '}
              </li>
            </ul>
            <Link href="/create">
              <a className={styles.exploreButton}>Join Now</a>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HowToUsePage;
