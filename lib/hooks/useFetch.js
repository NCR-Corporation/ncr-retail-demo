// Learned/Taken from https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/

import { useEffect, useRef, useReducer } from 'react';

export const useFetch = (url) => {
  const cache = useRef({});

  const initialState = {
    isLoading: true,
    isError: false,
    data: []
  };

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'FETCHING':
        return { ...initialState, isLoading: true };
      case 'FETCHED':
        return { ...initialState, isLoading: false, data: action.payload };
      case 'FETCH_ERROR':
        return { ...initialState, isLoading: false, isError: action.payload };
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    let cancelRequest = false;
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: 'FETCHING' });
      try {
        const response = await fetch(url);
        const data = await response.json();
        cache.current[url] = data;
        if (cancelRequest) return;
        dispatch({ type: 'FETCHED', payload: data });
      } catch (error) {
        if (cancelRequest) return;
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    };

    fetchData();

    return function cleanup() {
      cancelRequest = true;
    };
  }, [url]);

  return state;
};
