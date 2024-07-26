import React from 'react';
import { Modal } from '@mui/material';
import styles from './styles.module.scss';

const NftItem = ({ setModal, close, makeAnOffer, invest, later }) => {
  return (
    <Modal
      keepMounted
      open={setModal}
      onClose={close}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <main>
        <div className={styles.main_modal}>
          <div>
            <div className={styles.buttons}>
              <div className={styles.buttons__primary_bg}>
                <div onClick={() => { makeAnOffer(); close(); }} className={styles.buttons__primary}>
                  <div className={styles.buttons__text}>Make Offer</div>
                </div>
              </div>
              <div className={styles.buttons__primary_divider}>
                <div className={styles.divider_inner}></div>
              </div>
              <div className={styles.buttons__invest_bg}>
                <div onClick={() => { invest(); close(); }} className={styles.buttons__invest}>
                  <div className={styles.buttons__text}>Invest</div>
                </div>
              </div>
            </div>
            <div>
              <div className={styles.buttons__secondary_bg}>
                <div
                  className={styles.buttons__secondary}
                  onClick={e => {
                    later(e);
                    close(); // Ensure the modal closes
                  }}
                >
                  <div className={styles.buttons__text}>
                    <u>maybe later</u>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Modal>
  );
};

export default NftItem;
