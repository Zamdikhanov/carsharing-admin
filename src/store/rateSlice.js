/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import rateApi from '../api/rateApi';

const initialState = {
    rate: [{
        updatedAt: null,
        createdAt: null,
        price: null,
        rateTypeId: {
            unit: '',
            name: '',
            id: '',
        },
        id: '',
    }, ],
    pageLimit: {
        value: 5,
        label: 'по 5 на странице',
    },
    count: 0,
    sortOption: {
        value: 'unsorted',
        label: 'Сортировка',
    },
    isFetching: false,
};

export const rateSlice = createSlice({
    name: 'rate',
    initialState,
    reducers: {
        setRate: (state, action) => {
            state.rate = action.payload.data;
            state.count = action.payload.count;
        },
        setIsFetching: (state, action) => {
            state.isFetching = action.payload;
        },
        setPageLimit: (state, action) => {
            state.pageLimit = action.payload;
        },
        setSortOption: (state, action) => {
            state.sortOption = action.payload;
        },
    },
});

export const { setRate, setIsFetching, setPageLimit, setSortOption } =
rateSlice.actions;

export const getRate =
    ({ page, limit, options }) =>
    async(dispatch) => {
        dispatch(setIsFetching(true));
        try {
            const response = await rateApi.getRate({
                page,
                limit,
                options,
            });
            dispatch(setRate(response.data));
        } catch {
            console.log('getRate slice error');
        }
        dispatch(setIsFetching(false));
    };

export default rateSlice.reducer;