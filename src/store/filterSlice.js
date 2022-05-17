/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import entityApi from '../api/entityApi';
import { setResponseError } from './appSlice';

const initialState = {
    categories: [
        {
            updatedAt: null,
            createdAt: null,
            name: '',
            description: '',
            id: '',
        },
    ],
    cities: [
        {
            updatedAt: null,
            createdAt: null,
            name: '',
            id: '',
        },
    ],
    orderStatus: [
        {
            name: '',
            id: '',
        },
    ],
    isFetching: false,
};

export const filterSlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setFilterCategory: (state, action) => {
            state.categories = action.payload.data;
        },
        setFilterCity: (state, action) => {
            state.cities = action.payload.data;
        },
        setOrderStatus: (state, action) => {
            state.orderStatus = action.payload.data;
        },
        setFilterIsFetching: (state, action) => {
            state.isFetching = action.payload;
        },
    },
});

export const {
    setFilterCategory,
    setFilterCity,
    setOrderStatus,
    setFilterIsFetching,
} = filterSlice.actions;

export const getFilters = () => async (dispatch) => {
    dispatch(setFilterIsFetching(true));
    try {
        const categoryResponse = await entityApi.getEntity({
            entity: 'category',
        });
        dispatch(setFilterCategory(categoryResponse.data));
        const cityResponse = await entityApi.getEntity({ entity: 'city' });
        dispatch(setFilterCity(cityResponse.data));
        const orderStatusResponse = await entityApi.getEntity({
            entity: 'orderStatus',
        });
        dispatch(setOrderStatus(orderStatusResponse.data));
    } catch {
        dispatch(setResponseError({ message: 'Ошибка, попробуйте позже' }));
    }
    dispatch(setFilterIsFetching(false));
};

export default filterSlice.reducer;
