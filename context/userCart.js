import React, { useReducer, useEffect } from 'react';
const isServer = typeof window === 'undefined';

let reducer = (userCart, newUserCart) => {
  if (newUserCart === null) {
    if (!isServer) {
      localStorage.removeItem('userCart');
    }
    return initialState;
  }
  return { ...userCart, ...newUserCart };
};

const initialState = {};
let localState;

if (!isServer) {
  localState = JSON.parse(localStorage.getItem('userCart'));
}

const UserCartContext = React.createContext();

function UserCartProvider(props) {
  const [userCart, setUserCart] = useReducer(reducer, localState || initialState);

  useEffect(() => {
    if (!isServer) {
      localStorage.setItem('userCart', JSON.stringify(userCart));
    }
  }, [userCart]);

  return <UserCartContext.Provider value={{ userCart, setUserCart }}>{props.children}</UserCartContext.Provider>;
}

export { UserCartContext, UserCartProvider };
