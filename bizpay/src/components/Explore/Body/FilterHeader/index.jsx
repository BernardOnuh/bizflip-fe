import React from 'react';
import Skeleton from 'react-loading-skeleton';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { GroupFilters, SortByOptions } from '../../../constants/filter.constants';
import { useFilter } from '../../../../context/FilterContext';
import { formatNumber, formatCategory, getRandomIPFS } from '../../../utils';
import nftActiveIcon from '../../../../../public/images/svgs/nft_active.svg';

import styles from './styles.module.scss';

const ExploreFilterHeader = ({ loading, category, collectionItems = [], count }) => {
  const {
    groupType,
    sortBy,
    collections = [],
    updateGroupTypeFilter,
    updateSortByFilter,
    updateCollectionsFilter,
  } = useFilter();

  const selectedCollections = () => {
    if (!collectionItems.length || !collections.length) return [];
    
    const res = new Array(collections.length).fill(null);
    collectionItems.forEach(item => {
      const index = collections.findIndex(_item => _item === item.address);
      if (index > -1) {
        res[index] = item;
      }
    });
    return res.filter(item => !!item);
  };

  const handleGroupTypeChange = (e) => {
    const newGroupType = e.target.value;
    updateGroupTypeFilter(newGroupType);
  };

  const handleSortByChange = (e) => {
    const newSortBy = e.target.value;
    updateSortByFilter(newSortBy);
  };

  const handleDeselectCollection = (addr) => {
    let newCollections = collections.filter(item => item !== addr);
    updateCollectionsFilter(newCollections);
  };

  return (
    <div className="filterHeaderRoot">
      <div className="filterHeaderLeft">
        <label className="filterResultLabel">
          {loading ? (
            <Skeleton width={100} height={24} />
          ) : (
            `${formatNumber(count)} Result${count !== 1 ? 's' : ''}
            ${category === null ? '' : ` - Category: ${formatCategory(category)}`}`
          )}
        </label>
        {selectedCollections().map((item, idx) => (
          <div key={idx} className="filterCollectionItem">
            <Image
              className="filterCollectionItemLogo"
              src={
                item.isVerified
                  ? `${getRandomIPFS('', true)}${item.logoImageHash}`
                  : nftActiveIcon
              }
              alt="Collection Logo"
              width={24}
              height={24}
            />
            <span className="filterCollectionItemName">
              {item.name || item.collectionName}
            </span>
            <CloseIcon
              className="filterCollectionRemoveItem"
              onClick={() => handleDeselectCollection(item.address)}
            />
          </div>
        ))}
      </div>
      <div className="filterSelectGroup">
        <FormControl className="filterHeaderFormControl">
          <Select
            value={groupType}
            onChange={handleGroupTypeChange}
            className="selectBox"
            classes={{
              select: 'selectInner',
              selectMenu: 'selectMenu',
              icon: 'selectIcon',
            }}
            MenuProps={{
              classes: {
                paper: 'menuPropsPaper',
                list: 'menuItemList',
              },
            }}
            IconComponent={ExpandMoreIcon}
          >
            {GroupFilters.map((filter, idx) => (
              <MenuItem
                value={filter.value}
                key={idx}
                className="menuItem"
                classes={{ selected: 'menuItemSelected ' }}
              >
                {filter.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="filterHeaderFormControl">
          <Select
            value={sortBy}
            onChange={handleSortByChange}
            className="selectBox"
            classes={{
              select: 'selectInner',
              selectMenu: 'selectMenu',
              icon: 'selectIcon',
            }}
            MenuProps={{
              classes: {
                paper: 'menuPropsPaper',
                list: 'menuItemList',
              },
            }}
            IconComponent={ExpandMoreIcon}
          >
            {SortByOptions.map((option, idx) => (
              <MenuItem
                value={option.id}
                key={idx}
                className="menuItem"
                classes={{ selected: 'menuItemSelected ' }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default ExploreFilterHeader;
