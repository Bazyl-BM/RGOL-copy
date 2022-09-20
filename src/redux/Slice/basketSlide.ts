/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { deleteCookie, hasCookie, setCookie } from 'cookies-next';

import type { BasketItem, BasketItems } from '@/models/BasketItem';
import type { IProduct } from '@/models/productModel';

interface ProductState {
  products: IProduct[];
  cart: BasketItems;
}

const initialState: ProductState = {
  products: [],
  cart: [],
};

const modifyQtyByOne = (
  cart: BasketItems,
  selectedProduct: BasketItem,
  modificationType?: 'DECREMENT'
) => {
  const previousCart = [...cart];

  const productInCart = previousCart.find(
    (product) => product.productKey === selectedProduct.productKey
  );

  let newCart = [];

  if (!productInCart) {
    previousCart.push(selectedProduct);
    newCart = previousCart;
  } else {
    const filteredCart = previousCart.filter(
      (p) => p.productKey !== productInCart.productKey
    );

    productInCart.quantity += selectedProduct.quantity;

    if (modificationType === 'DECREMENT') {
      newCart = [...filteredCart];
    } else {
      newCart = [...filteredCart, productInCart];
    }
  }
  return newCart;
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    incrementBasketProduct: (state, action: PayloadAction<any>) => {
      const modifiedCart = modifyQtyByOne(state.cart, action.payload);
      state.cart = modifiedCart;
      const productdate = [];
      modifiedCart.forEach((item) =>
        productdate.push({
          name: item.name,
          productKey: item.productKey,
          quantity: item.quantity,
          price: item.price,
          images: item.images,
        })
      );
      if (hasCookie('bas')) {
        deleteCookie('bas');

        setCookie('bas', JSON.stringify(productdate));
      } else {
        setCookie('bas', JSON.stringify(productdate));
      }
    },
    decrementBasketProduct: (state, action: PayloadAction<BasketItem>) => {
      const modifiedCart = modifyQtyByOne(
        state.cart,
        action.payload,
        'DECREMENT'
      );
      if (hasCookie('bas')) {
        deleteCookie('bas');

        setCookie('bas', JSON.stringify(modifiedCart));
      } else {
        setCookie('bas', JSON.stringify(modifiedCart));
      }
      // eslint-disable-next-line no-param-reassign
      state.cart = modifiedCart;
    },
    resetCart: (state) => {
      state.cart = [];
    },
    getBasketProductList: (state, action: PayloadAction<any[]>) => {
      state.cart = action.payload;
    },
  },
});

export const {
  incrementBasketProduct,
  getBasketProductList,
  decrementBasketProduct,
  resetCart,
} = productSlice.actions;

export default productSlice.reducer;
