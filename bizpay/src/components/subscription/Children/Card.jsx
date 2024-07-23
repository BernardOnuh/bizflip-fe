import React from 'react';
import styles from './styles.module.scss';

const Card = ({ data, setActive, activediv }) => {
  const handleClick = () => {
    setActive(data.id);
  };

  return (
    <div
      className={`${styles.card_main} ${
        activediv === data.id ? styles.active_div : ''
      }`}
      onClick={handleClick}
    >
      <div className={styles.plan_status}>
        <div>{data.Plan_status}</div>
      </div>
      <div className={styles.total_month}>
        <span className={styles.month}>{data.Total_month}</span>
        <div>months</div>
      </div>
      <div className={styles.monthly_price}>
        <span className={styles.price}>${data.Monthly_price}</span>
        <span>/{data.days}</span>
      </div>
      <div className={styles.save}>
        <span>{data.Saving}</span>
      </div>
      <div className={styles.total_price}>
        <span>${data.Total_price}</span>
      </div>
    </div>
  );
};

export default Card;
