import {createReducer} from '@reduxjs/toolkit';
export const utilReducer = createReducer(
  {
    currentTheme: true,
  },
  {
    // theme for color change if needed
    current_theme: (state, action) => {
      state.currentTheme = action.payload;
    },
  },
);
