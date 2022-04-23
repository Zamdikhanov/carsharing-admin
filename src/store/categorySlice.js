/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import categoryApi from '../api/categoryApi';

const initialState = {
    categories: [{
        updatedAt: null,
        createdAt: null,
        name: "",
        description: "",
        id: ""
    }, ],
    count: 0,
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
    },
});

export const { setCategory, setIsFetching } = categorySlice.actions;

export const getCategory =
    ({ page, limit }) =>
    async(dispatch) => {
        dispatch(setIsFetching(true));
        try {
            const response = await categoryApi.getCategory({
                page,
                limit,
            });
            dispatch(setCategory(response.data));
        } catch {
            console.log('getCategory slice error');
        }
        dispatch(setIsFetching(false));
    };

export default categorySlice.reducer;