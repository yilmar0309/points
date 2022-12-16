import {configureStore} from '@reduxjs/toolkit';
// import logger from 'redux-logger';
import {setupListeners} from '@reduxjs/toolkit/query';

import toast from './toastSlice';
import loading from './loadingSlice';
import {baseApi} from '@presenter/domain/RTKQuery/base.rtk';
import {productApi} from '@presenter/domain/RTKQuery/product.rtk';

const store = configureStore({
  reducer: {
    toast,
    loading,
    [baseApi.reducerPath]: baseApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      // .concat(logger)
      .concat(productApi.middleware)
      .concat(baseApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
export default store;
