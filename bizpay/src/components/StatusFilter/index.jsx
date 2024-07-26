import React, { useState } from 'react';
import cx from 'classnames';
import { styled } from '@mui/system';
import FilterWrapper from '../FilterWrapper';

const Body = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridGap: '8px',
});

const FormControl = styled('div')({
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
  '&.selected': {
    backgroundColor: '#1969FF',
    color: '#FFF',
    fontWeight: 700,
    border: 0,
  },
});

const ExploreStatus = () => {
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
    <FilterWrapper title="Status">
      <Body>
        <FormControl
          className={cx({ selected: status.statusBuyNow })}
          onClick={() => handleStatusChange('statusBuyNow')}
        >
          Buy Now
        </FormControl>
        <FormControl
          className={cx({ selected: status.statusHasBids })}
          onClick={() => handleStatusChange('statusHasBids')}
        >
          Has Bids
        </FormControl>
        <FormControl
          className={cx({ selected: status.statusHasOffers })}
          onClick={() => handleStatusChange('statusHasOffers')}
        >
          Has Offers
        </FormControl>
        <FormControl
          className={cx({ selected: status.statusOnAuction })}
          onClick={() => handleStatusChange('statusOnAuction')}
        >
          On Auction
        </FormControl>
      </Body>
    </FilterWrapper>
  );
};

export default ExploreStatus;
