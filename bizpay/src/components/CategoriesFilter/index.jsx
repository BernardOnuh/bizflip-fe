import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import FilterWrapper from '../FilterWrapper';
import { Categories } from '../constants/filter.constants';
import iconCheck from '../../../public/images/svgs/check_blue.svg';

const Body = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

const CollectionsList = styled('div')({
  overflowY: 'auto',
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
  '&:first-child': {
    marginTop: 0,
  },
  '&:last-child': {
    marginBottom: 0,
  },
});

const Logo = styled('div')({
  width: 40,
  height: 40,
  borderRadius: '50%',
  border: '1px solid #D9E1EE',
  marginRight: 14,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& img': {
    width: 24,
    height: 24,
  },
});

const Name = styled('span')({
  fontWeight: 700,
  fontSize: 16,
  color: '#000',
  opacity: 0.6,
  marginRight: 4,
});

const CategoriesFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = categoryId => {
    setSelectedCategory(prevCategory => (prevCategory === categoryId ? null : categoryId));
  };

  return (
    <FilterWrapper title="Categories">
      <Body>
        <CollectionsList>
          {Categories.map(cat => (
            <Collection
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
            >
              <Logo>
                <img src={cat.id === selectedCategory ? iconCheck : cat.icon} />
              </Logo>
              <Name>{cat.label}</Name>
            </Collection>
          ))}
        </CollectionsList>
      </Body>
    </FilterWrapper>
  );
};

export default CategoriesFilter;
