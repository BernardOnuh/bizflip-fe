import React, { useState } from 'react';
import cx from 'classnames';
import { makeStyles } from '@mui/styles';
import FilterWrapper from '../FilterWrapper';

const useStyles = makeStyles(() => ({
  body: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '8px',
  },
  formControl: {
    width: '100%',
    height: 40,
    boxSizing: 'border-box',
    borderRadius: 10,
    border: '1px solid #A2A2AD',
    cursor: 'pointer',
    margin: '0 !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: '400',
    color: '#121223',
    backgroundColor: '#FFF',
  },
  selected: {
    backgroundColor: '#1969FF',
    color: '#FFF',
    fontWeight: 700,
    border: 0,
  },
}));

const ExploreStatus = () => {
  const classes = useStyles();
  const [status, setStatus] = useState({
    statusBuyNow: false,
    statusHasBids: false,
    statusHasOffers: false,
    statusOnAuction: false,
  });

  const handleStatusChange = (field) => {
    setStatus((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <FilterWrapper title="Status" classes={{ body: classes.body }}>
      <div
        className={cx(
          classes.formControl,
          status.statusBuyNow ? classes.selected : null
        )}
        onClick={() => handleStatusChange('statusBuyNow')}
      >
        Buy Now
      </div>
      <div
        className={cx(
          classes.formControl,
          status.statusHasBids ? classes.selected : null
        )}
        onClick={() => handleStatusChange('statusHasBids')}
      >
        Has Bids
      </div>
      <div
        className={cx(
          classes.formControl,
          status.statusHasOffers ? classes.selected : null
        )}
        onClick={() => handleStatusChange('statusHasOffers')}
      >
        Has Offers
      </div>
      <div
        className={cx(
          classes.formControl,
          status.statusOnAuction ? classes.selected : null
        )}
        onClick={() => handleStatusChange('statusOnAuction')}
      >
        On Auction
      </div>
    </FilterWrapper>
  );
};

export default ExploreStatus;
