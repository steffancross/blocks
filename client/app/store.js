import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import productSlice from '../features/allProducts/ProductSlice';
import SingleProductSlice from '../features/SingleProduct/SingleProductSlice';
import CartSlice from '../features/cart/CartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productSlice,
    singleProduct: SingleProductSlice,
    cart: CartSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
