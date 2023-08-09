import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {configureStore} from "@reduxjs/toolkit"
import { Provider } from 'react-redux';
import  productsReducer , { productsFetch } from './features/productSlice'
import { productsApi } from './features/productApi';

import cartReducer from './features/cartSlice';
import {getTotals} from "./features/cartSlice"
import authReducer, {loaderUser} from './features/authSlice';
import ordersReducer from "./features/ordersSlice";
import usersReducer from "./features/usersSlice";
import selectReducer from "./features/selectSlice";

const store = configureStore({
  reducer : {
    products : productsReducer,
    orders : ordersReducer,
    cart : cartReducer,
    users : usersReducer,
    auth : authReducer,
    filter : selectReducer,
    // [productsApi.reducerPath] : productsApi.reducer,
  },
  // middleware : ( getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(productsApi.middleware)
})

store.dispatch(productsFetch())
store.dispatch(getTotals())
store.dispatch(loaderUser(null))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);

