import React from 'react';
import cx from 'classnames';
import Image from 'next/image'; // For handling images in Next.js
import { Button } from '@mui/material'; // Use MUI Button for consistency
import styles from './styles.module.scss'; // Ensure this path is correct

// Use MUI icons or import SVGs as React components if available
import CloseIcon from '@mui/icons-material/Close'; // MUI Close Icon

const Modal = ({
  visible,
  title,
  onClose,
  children,
  submitDisabled,
  submitLabel,
  onSubmit,
  small,
}) => {
  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className={cx(styles.container, visible ? styles.visible : null)}>
      <div
        className={cx(styles.modal, small && styles.small)}
        onClick={handleClick}
      >
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <div className={styles.closeButton} onClick={onClose}>
            <CloseIcon />
          </div>
        </div>
        <div className={styles.body}>{children}</div>
        {submitLabel && (
          <div className={styles.footer}>
            <Button
              variant="contained"
              color="primary"
              disabled={submitDisabled}
              onClick={onSubmit}
              className={cx(
                styles.submitButton,
                submitDisabled && styles.disabled
              )}
            >
              {submitLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
