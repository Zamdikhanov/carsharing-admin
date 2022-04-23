/* eslint-disable import/no-named-as-default */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import carSlice from './carSlice';
import categorySlice from './categorySlice';
import orderSlice from './orderSlice';

const rootReduser = combineReducers({
    auth: authSlice,
    order: orderSlice,
    car: carSlice,
    category: categorySlice,
});

const store = configureStore({
    reducer: rootReduser,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;