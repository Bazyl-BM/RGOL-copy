import { createApi, fetchBaseQuery } from '@rtk-incubator/rtk-query/react';

import type { IProduct } from '../../../models/productModel';

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
  reducerPath: 'productsApi ',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => `products`,
    }),
    getProduct: builder.query<IProduct, void>({
      query: () => `product`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery, useGetProductQuery } = productsApi;
