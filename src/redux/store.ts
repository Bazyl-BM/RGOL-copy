import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { productsApi } from './api/products/productAPI';
import addressReducer from './Slice/addressSlide';
import basketReducer from './Slice/basketSlide';
import cupboardBoxReducer from './Slice/cupboardsBox';
import cupboardReducer from './Slice/cupboardSlide';
import invokeReducer from './Slice/invokeSlide';

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    basketItems: basketReducer,
    cupboardItems: cupboardReducer,
    addressItems: addressReducer,
    invokeItems: invokeReducer,
    cupboardBox: cupboardBoxReducer,
  },

  devTools: process.env.NODE_ENV !== 'production',
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([productsApi.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const makeStore = () => store;
export const wrapper = createWrapper(makeStore);
