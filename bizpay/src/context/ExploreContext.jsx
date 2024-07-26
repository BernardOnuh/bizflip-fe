// context/ExploreContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const ExploreContext = createContext();

export const ExploreProvider = ({ children }) => {
  const [state, setState] = useState({
    authToken: null,
    upFetching: false,
    downFetching: false,
    tokens: [],
    count: 0,
    from: 0,
    to: 0,
    collections: [],
    groupType: '',
    category: null,
    sortBy: '',
    statusBuyNow: false,
    statusHasBids: false,
    statusHasOffers: false,
    statusOnAuction: false,
  });

  const dispatch = (action) => {
    setState(prevState => ({
      ...prevState,
      ...action.payload
    }));
  };

  return (
    <ExploreContext.Provider value={{ state, dispatch }}>
      {children}
    </ExploreContext.Provider>
  );
};

export const useExplore = () => useContext(ExploreContext);
