// context/FilterContext.jsx
import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [groupType, setGroupType] = useState('defaultGroupType');
  const [sortBy, setSortBy] = useState('defaultSortBy');
  const [collections, setCollections] = useState([]);

  const updateGroupTypeFilter = (newGroupType) => setGroupType(newGroupType);
  const updateSortByFilter = (newSortBy) => setSortBy(newSortBy);
  const updateCollectionsFilter = (newCollections) => setCollections(newCollections);

  return (
    <FilterContext.Provider
      value={{
        groupType,
        sortBy,
        collections,
        updateGroupTypeFilter,
        updateSortByFilter,
        updateCollectionsFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
