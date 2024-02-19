import {createReducer} from '@reduxjs/toolkit';
export const loaderReducer = createReducer(
  {
    loaderStatus: false,
  },
  {
    // loader on
    set_loading_on: state => {
      state.loaderStatus = true;
    },

    // loader off
    set_loading_off: state => {
      state.loaderStatus = false;
    },
  },
);
