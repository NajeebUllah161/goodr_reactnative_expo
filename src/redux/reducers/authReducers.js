import {createReducer} from '@reduxjs/toolkit';
export const authReducer = createReducer(
  {
    loginResponse: {},
    logoutResponse: {},
    userProfileResponse: {},
    forgotPasswordResponse: {},
    uploadTokenResponse: {},
  },
  {
    // login
    login: (state, action) => {
      state.loginResponse = action.payload;
    },
  },
);
