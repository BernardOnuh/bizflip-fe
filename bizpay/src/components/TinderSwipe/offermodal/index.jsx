import { Modal } from '@mui/material';
import React from 'react';
import styles from './styles.module.scss';
// import CloseIcon from '@mui/icons-material/Close';

const OfferModal = ({ setModal, close, makeAnOffer }) => {
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
          <div className={styles.buttons}>
            <div className={styles.buttons__secondary_bg}>
              <div
                className={styles.buttons__secondary}
                onClick={() => {
                  close();
                }}
              >  
                <div className={styles.buttons__text}>Later</div>
              </div>
            </div>
            <div className={styles.buttons__primary_bg}>
              <div onClick={makeAnOffer} className={styles.buttons__primary}>
                <div className={styles.buttons__text}>Make an Offer</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Modal>
  );
};

export default OfferModal;
