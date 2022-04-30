/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import categoryApi from '../api/categoryApi';
import cityApi from '../api/cityApi';
import orderStatusApi from '../api/orderStatusApi';

const initialState = {
    categories: [{
        updatedAt: null,
        createdAt: null,
        name: '',
        description: '',
        id: '',
    }, ],
    cities: [{
        updatedAt: null,
        createdAt: null,
        name: '',
        id: '',
    }, ],
    orderStatus: [{
        name: "",
        id: ""
    }, ],
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

export const getFilters = () =>
    async(dispatch) => {
        dispatch(setFilterIsFetching(true));
        try {
            const categoryResponse = await categoryApi.getCategory({});
            dispatch(setFilterCategory(categoryResponse.data));
            const cityResponse = await cityApi.getCity({});
            dispatch(setFilterCity(cityResponse.data));
            const orderStatusResponse = await orderStatusApi.getOrderStatus({});
            dispatch(setOrderStatus(orderStatusResponse.data));
        } catch {
            console.log('filter slice error');
        }
        dispatch(setFilterIsFetching(false));
    };

export default filterSlice.reducer;