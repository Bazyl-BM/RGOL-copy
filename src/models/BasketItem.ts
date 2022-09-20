import type { IProduct } from './productModel';

export interface BasketItem extends IProduct {
  quantity: number;
}

export type BasketItems = BasketItem[];
