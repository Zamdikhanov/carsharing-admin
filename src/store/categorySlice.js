/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import categoryApi from '../api/categoryApi';

const initialState = {
    categories: [{
        updatedAt: null,
        createdAt: null,
        name: '',
        description: '',
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

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.categories = action.payload.data;
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
    },
});

export const {
    setCategory,
    setIsFetching,
    setPageNumber,
    setPageLimit,
    setSortOption,
} = categorySlice.actions;

export const getCategory =
    ({ page, limit, options }) =>
    async(dispatch) => {
        dispatch(setIsFetching(true));
        try {
            const response = await categoryApi.getCategory({
                page,
                limit,
                options,
            });
            dispatch(setCategory(response.data));
        } catch {
            console.log('getCategory slice error');
        }
        dispatch(setIsFetching(false));
    };

export default categorySlice.reducer;