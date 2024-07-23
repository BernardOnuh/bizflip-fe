import React from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';

function BackCard({ token, setIsFlipped }) {
  // const isOwner = 1;
  // const handleClick = e => {
  //   e.preventDefault();
  //   setIsFlipped(prevState => !prevState);
  // };

  return (
    <>
      <div onClick={setIsFlipped} className={cx(styles.card, styles.back_card)}>
        <div className={styles.back_name}>Soon</div>
        <div>
          Revenue &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: SOon
        </div>
        <div>Net Income &nbsp;&nbsp;: {token?.netProfit}</div>
        <div>Asset Age &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Soon</div>
      </div>
    </>
  );
}

export default BackCard;
