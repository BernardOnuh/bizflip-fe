import React from 'react';
import styles from './styles.module.scss';

const LearnMore = () => {
  return (
    <div className={styles.root} id="learnmore">
      <div className={styles.learnmoreContent}>
        <h1 className={styles.learnmoreTitle}>Meet Bizflip</h1>
        <div className={styles.bodyText}>
          Bizflip is a web3 based marketplace for asset acquisition. We are
          creating a community where users can tap/swipe on assets they are
          interested in acquiring or investing in. That includes assets in
          eccomerce, brick and mortar, hybrid dapps.. Etc. What do we mean by
          assets? simply put: entities of value, In most cases generating
          revenue. We support Bitcoin (BTC), Ethereum (ETH), and other
          cryptocurrencies. Additionally we have integrated escrow api services
          so you can choose to complete your transaction onsite or through
          escrow. We are in the begining stages of our journey to service our
          users as best as possible, if there is something you wish we offered
          or have feedback in general..don’t hesitate to reach out via email or
          join our community and contribute. Stay tuned, we will reveal many
          awesome new features in the future.
        </div>

        <h2>A Decentralized Platform</h2>
        <div className={styles.bodyText}>
          Our marketplace supports tamper-proof transactions. With our
          easy-to-use tap & swipe tech, acquiring or investing in assets is
          swift and fun. We’ve integrated asset contracts and “safe” contracts
          into the transactional process so you can have a legally binding
          document showcasing exactly what a seller or buyer is offering prior
          to committing to the acquisition. Whether you want to invest into
          someone`s asset or acquire, it`s never been faster, safer or easier to
          see exactly what the marketplace is offering and make an informed
          decision effectively. You never know when you`ll find the next hidden
          gem.
          <br></br>
          <br></br>
          Secure and Private
          <br></br>
          <br></br>
        </div>
        <div className={styles.bodyText}>
          Get authentication on every transaction. All deals are secured via
          blockchain, making them safe and shielding them from hacks. We take
          the guarding of your assets seriously, employing multiple levels of
          verification. We put your privacy first.
        </div>
        <br></br>
      </div>
    </div>
  );
};

export default LearnMore;
