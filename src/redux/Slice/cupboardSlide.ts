/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { deleteCookie, hasCookie, setCookie } from 'cookies-next';

import type { IProduct } from '@/models/productModel';

interface ProductState {
  products: IProduct[];
}

const initialState: ProductState = {
  products: [],
};

export const cupboardSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    incrementCupboardProduct: (state, action: PayloadAction<IProduct>) => {
      const newFavouriteProductList = [...state.products, action.payload];
      state.products = newFavouriteProductList;
      console.log(newFavouriteProductList);
      if (hasCookie('cupboardsItem')) {
        deleteCookie('cupboardsItem');
        console.log('aa');
        setCookie('cupboardsItem', JSON.stringify(newFavouriteProductList));
      } else {
        setCookie('cupboardsItem', JSON.stringify(newFavouriteProductList));
      }
    },
    decrementCupboardProduct: (state, action: PayloadAction<IProduct>) => {
      const newFavouriteProductList = state.products.filter(
        (p) => p.productKey !== action.payload.productKey
      );

      state.products = newFavouriteProductList;
      if (hasCookie('cupboardsItem')) {
        deleteCookie('cupboardsItem');
        setCookie('cupboardsItem', JSON.stringify(newFavouriteProductList));
      } else {
        setCookie('cupboardsItem', JSON.stringify(newFavouriteProductList));
      }
    },
    decrementCupboardProductList: (
      state,
      action: PayloadAction<IProduct[]>
    ) => {
      const removeSet = new Set(
        action.payload.map((entry) => entry.productKey)
      );
      const newFavouriteProductList = state.products.filter(
        (entry) => !removeSet.has(entry.productKey)
      );

      state.products = newFavouriteProductList;
      if (hasCookie('cupboardsItem')) {
        deleteCookie('cupboardsItem');
        setCookie('cupboardsItem', JSON.stringify(newFavouriteProductList));
      } else {
        setCookie('cupboardsItem', JSON.stringify(newFavouriteProductList));
      }
    },
    getProductList: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
    resetCart: (state) => {
      state.products = [];
    },
  },
});

export const {
  incrementCupboardProduct,
  decrementCupboardProduct,
  decrementCupboardProductList,
  resetCart,
  getProductList,
} = cupboardSlice.actions;

export default cupboardSlice.reducer;
