/* eslint-disable import/no-named-as-default */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import carSlice from './carSlice';
import orderSlice from './orderSlice';

const rootReduser = combineReducers({
    auth: authSlice,
    order: orderSlice,
    car: carSlice,
});

const store = configureStore({
    reducer: rootReduser,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;