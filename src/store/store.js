/* eslint-disable import/no-named-as-default */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import authSlice from './authSlice';
import carSlice from './carSlice';
import categorySlice from './categorySlice';
import citySlice from './citySlice';
import filterSlice from './filterSlice';
import orderSlice from './orderSlice';
import pointSlice from './pointSlice';
import rateSlice from './rateSlice';
import rateTypeSlice from './rateTypeSlice';

const rootReduser = combineReducers({
    auth: authSlice,
    order: orderSlice,
    car: carSlice,
    category: categorySlice,
    city: citySlice,
    point: pointSlice,
    rateType: rateTypeSlice,
    rate: rateSlice,
    app: appSlice,
    filter: filterSlice,
});

const store = configureStore({
    reducer: rootReduser,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;