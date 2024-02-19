import {createReducer} from '@reduxjs/toolkit';
export const productReducer = createReducer(
  {
    productResponse: {},
    productDetailsResponse: {},
    deleteProductResponse: {},
  },
  {
    // product
    products: (state, action) => {
      state.productResponse = action.payload;
    },

    // single product
    single_product: (state, action) => {
      state.productDetailsResponse = action.payload;
    },

    // delete single product
    delete_product: (state, action) => {
      state.deleteProductResponse = action.payload;
    },
  },
);
