/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import cityApi from '../api/cityApi';

const initialState = {
    cities: [{
        updatedAt: null,
        createdAt: null,
        name: '',
        id: '',
    }, ],
    pageNumber: 0,
    pageLimit: {
        label: 'по 5 на странице',
        value: 5,
    },
    count: 0,
    sortOption: {
        label: 'Без сортировки',
        value: '',
    },
    isFetching: false,
};

export const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        setCity: (state, action) => {
            state.cities = action.payload.data;
            state.count = action.payload.count;
        },
        setIsFetching: (state, action) => {
            state.isFetching = action.payload;
        },
        setPageNumber: (state, action) => {
            state.pageNumber = action.payload;
        },
        setPageLimit: (state, action) => {
            state.pageLimit = action.payload;
        },
        setSortOption: (state, action) => {
            state.sortOption = action.payload;
        },
        resetFilters: (state) => {
            state.pageNumber = 0;
            state.pageLimit = initialState.pageLimit;
            state.sortOption = initialState.sortOption;
        },
    },
});

export const {
    setCity,
    setIsFetching,
    setPageNumber,
    setPageLimit,
    setSortOption,
    resetFilters,
} = citySlice.actions;

export const getCity =
    ({ page, limit, options }) =>
    async(dispatch) => {
        dispatch(setIsFetching(true));
        try {
            const response = await cityApi.getCity({
                page,
                limit,
                options,
            });
            dispatch(setCity(response.data));
        } catch {
            console.log('getCity slice error');
        }
        dispatch(setIsFetching(false));
    };

export default citySlice.reducer;