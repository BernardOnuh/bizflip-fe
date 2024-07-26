import React, { useState } from 'react';
import cx from 'classnames';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import styles from './styles.module.scss';

const Panel = ({ title, icon: Icon, expanded, fixed, responsive, children }) => {
  const [open, setOpen] = useState(!!expanded || !!fixed);

  const handleOpen = () => {
    if (!fixed) {
      setOpen(!open);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={handleOpen}>
        <div className={styles.titleWrapper}>
          {Icon && <Icon className={styles.titleIcon} />}
          <span className={styles.title}>{title}</span>
        </div>
        {!fixed &&
          (open ? (
            <ExpandLessIcon className={styles.icon} />
          ) : (
            <ExpandMoreIcon className={styles.icon} />
          ))}
      </div>
      <div
        className={cx(
          styles.body,
          open ? styles.open : null,
          responsive && styles.responsive
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Panel;
