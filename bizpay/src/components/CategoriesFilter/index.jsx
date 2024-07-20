import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import FilterWrapper from 'components/FilterWrapper';
import { Categories } from 'constants/filter.constants';
import iconCheck from '../../../public/images/svgs/check_blue.svg';


const useStyles = makeStyles(() => ({
  body: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  collectionsList: {
    overflowY: 'auto',
    maxHeight: 260,
  },
  collection: {
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
  },
  logo: {
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
  },
  name: {
    fontWeight: 700,
    fontSize: 16,
    color: '#000',
    opacity: 0.6,
    marginRight: 4,
  },
}));

const CategoriesFilter = () => {
  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = categoryId => {
    setSelectedCategory(prevCategory => (prevCategory === categoryId ? null : categoryId));
  };

  return (
    <FilterWrapper title="Categories" classes={{ body: classes.body }}>
      <div className={classes.collectionsList}>
        {Categories.map(cat => (
          <div
            key={cat.id}
            className={classes.collection}
            onClick={() => handleSelectCategory(cat.id)}
          >
            <div className={classes.logo}>
              <img src={cat.id === selectedCategory ? iconCheck : cat.icon} />
            </div>
            <span className={classes.name}>{cat.label}</span>
          </div>
        ))}
      </div>
    </FilterWrapper>
  );
};

export default CategoriesFilter;
