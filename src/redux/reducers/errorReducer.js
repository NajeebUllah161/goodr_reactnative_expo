import {createReducer} from '@reduxjs/toolkit';
export const errorReducer = createReducer(
  {
    errorResponse: {},
    popupResponse: {},
  },
  {
    // error
    ERROR: (state, action) => {
      state.errorResponse = action.payload;
    },

    POPUP: (state, action) => {
      state.popupResponse = action.payload;
    },
  },
);
