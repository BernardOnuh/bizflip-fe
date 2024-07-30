/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import 'react-datetime/css/react-datetime.css';
import PriceInput from '../PriceInput'; 

import Modal from '../Modal'; 
import styles from '../Modal/common.module.scss';
import InputError from '../InputError'; 

const RewardPointsModal = ({ point, visible, onClose }) => {
  const [price, setPrice] = useState('');
  const [pointWorth, setPointWorth] = useState(0);
  const [totalPointWorth, setTotalPointWorth] = useState(0);
  const [inputError, setInputError] = useState(null);

  const getWorthFromPoint = (point) => {
    console.log('point', point);
    setTotalPointWorth(100);
  };

  useEffect(() => {
    getWorthFromPoint(point);
  }, [point]);

  useEffect(() => {
    setPointWorth(price / 100);
  }, [price]);

  return (
    <Modal
      visible={visible}
      title="Redeem Reward Points"
      onClose={onClose}
      submitDisabled={false}
      submitLabel={'Redeem Points'}
      onSubmit={() => null}
    >
      <div className={styles.pointCards}>
        <div className={styles.pointCard}>
          <h4>Total Reward Points</h4>
          <h2>{point}</h2>
        </div>
        <div className={styles.pointCard}>
          <h4>Points Worth</h4>
          <h2>${totalPointWorth}</h2>
        </div>
      </div>
      <div className={styles.formGroup}>
        <div className={styles.formLabel}>Price Worth: ${pointWorth}</div>
        <div className={styles.formInputCont}>
          <PriceInput
            className={styles.formInput}
            placeholder="0.00"
            decimals={0}
            value={'' + price}
            onChange={setPrice}
            disabled={false}
            onInputError={setInputError}
          />
        </div>
        <InputError text={inputError} />
      </div>
    </Modal>
  );
};

export default RewardPointsModal;
