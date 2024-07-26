import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/material/styles';

import { getRandomIPFS } from '../utils'; // Adjust the import path based on your project structure
import FilterWrapper from '../FilterWrapper'; // Adjust the import path based on your project structure
import BootstrapTooltip from '../BootstrapTooltip'; // Adjust the import path based on your project structure
import nftIcon from '../../../public/images/svgs/nft.svg'; 
import nftActiveIcon from '../../../public/images/svgs/nft_active.svg'; // Adjust the import path based on your project structure
import iconCheck from '../../../public/images/svgs/check_blue.svg'; // Adjust the import path based on your project structure

const CollectionExpandDiv = styled('div')({
  borderRadius: 10,
  width: '100%',
  flex: '0 0 48px',
  backgroundColor: '#FFF',
  border: '1px solid #EAEAF1',
  padding: '0 14px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const Input = styled(InputBase)({
  flexGrow: 1,
});

const IconButton = styled(SearchIcon)({
  width: 22,
  height: 22,
  marginRight: 10,
  color: 'rgba(0, 0, 0, 0.5)',
});

const CollectionsList = styled('div')({
  overflowY: 'auto',
  marginTop: 20,
  maxHeight: 260,
});

const Collection = styled('div')({
  height: 40,
  padding: '0 8px',
  margin: '12px 0',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  cursor: 'pointer',
});

const Logo = styled('div')(({ theme, withBorder }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  marginRight: 14,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: withBorder ? '1px solid #D9E1EE' : 'none',
  '& img': {
    width: 24,
    height: 24,
  },
}));

const Name = styled('span')({
  fontWeight: 700,
  fontSize: 16,
  color: '#000',
  opacity: 0.6,
  marginRight: 4,
});

const CheckIcon = styled(CheckCircleIcon)({
  fontSize: 18,
  color: '#007bff',
  marginLeft: 4,
});

const ExploreCollections = ({ initialCollectionItems = [], initialCollections = [] }) => {
  const [filter, setFilter] = useState('');
  const [collections, setCollections] = useState(initialCollections);
  const [collectionItems, setCollectionItems] = useState(initialCollectionItems);
  const [collectionsLoading, setCollectionsLoading] = useState(false);

  const handleSelectCollection = addr => {
    let newCollections = [];
    if (collections.includes(addr)) {
      newCollections = collections.filter(item => item !== addr);
    } else {
      newCollections = [...collections, addr];
    }
    setCollections(newCollections);
  };

  const filteredCollections = () => {
    const selected = [];
    let unselected = [];
    collectionItems.forEach(item => {
      if (collections.includes(item.address)) {
        selected.push(item);
      } else {
        unselected.push(item);
      }
    });
    unselected = unselected.filter(
      item =>
        (item.name || item.collectionName || '')
          .toLowerCase()
          .indexOf(filter.toLowerCase()) > -1
    );
    return [...selected, ...unselected];
  };

  // Mock data fetching logic - replace with your actual data fetching logic
  useEffect(() => {
    setCollectionsLoading(true);
    // Simulate fetching data from an API
    setTimeout(() => {
      setCollectionItems([
        // Add mock data or replace with actual data fetching logic
        { address: '0x1', name: 'Collection 1', logoImageHash: '', isVerified: true, isVisible: true },
        { address: '0x2', name: 'Collection 2', logoImageHash: '', isVerified: false, isVisible: true },
        // Add more collections as needed
      ]);
      setCollectionsLoading(false);
    }, 1000);
  }, []);

  return (
    <FilterWrapper title="Collections">
      <CollectionExpandDiv>
        <IconButton />
        <Input
          placeholder="Filter"
          inputProps={{ 'aria-label': 'Filter' }}
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </CollectionExpandDiv>
      <CollectionsList>
        {collectionsLoading &&
          collectionItems.length === 0 &&
          new Array(8)
            .fill(0)
            .map((_, idx) => (
              <Skeleton
                key={idx}
                width="100%"
                height={40}
                className={Collection}
              />
            ))}
        {filteredCollections()
          .filter(item => item.isVisible)
          .map((item, idx) => (
            <Collection
              key={idx}
              onClick={() => handleSelectCollection(item.address)}
            >
              {collections.includes(item.address) ? (
                <Logo withBorder>
                  <img src={iconCheck} alt="Selected" />
                </Logo>
              ) : (
                <Logo>
                  <img
                    src={
                      item.logoImageHash
                        ? `${getRandomIPFS('', true)}${item.logoImageHash}`
                        : collections.includes(item.address)
                        ? nftActiveIcon
                        : nftIcon
                    }
                    alt="Collection Logo"
                  />
                </Logo>
              )}
              <Name>
                {item.name || item.collectionName}
              </Name>
              {item.isVerified && (
                <BootstrapTooltip title="Verified Collection" placement="top">
                  <CheckIcon />
                </BootstrapTooltip>
              )}
            </Collection>
          ))}
      </CollectionsList>
    </FilterWrapper>
  );
};

export default ExploreCollections;
