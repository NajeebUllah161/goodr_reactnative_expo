import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from './reducers/authReducers';
import {errorReducer} from './reducers/errorReducer';
import {loaderReducer} from './reducers/loaderReducers';
import {utilReducer} from './reducers/utilsReducer';
import {productReducer} from './reducers/productsReducer';

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    auth: authReducer,
    product: productReducer,
    error: errorReducer,
    util: utilReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export default store;
