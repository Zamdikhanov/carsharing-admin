/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import categoryApi from '../api/categoryApi';
import cityApi from '../api/cityApi';

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
    isFetching: false,
};

export const filterSlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setFilterCategory: (state, action) => {
            state.categories = action.payload.data;
        },
        setFilterIsFetching: (state, action) => {
            state.isFetching = action.payload;
        },
        setFilterCity: (state, action) => {
            state.cities = action.payload.data;
        },
    },
});

export const {
    setFilterCategory,
    setFilterCity,
    setFilterIsFetching,
} = filterSlice.actions;

export const getFilters = () =>
    async(dispatch) => {
        dispatch(setFilterIsFetching(true));
        try {
            const categoryResponse = await categoryApi.getCategory({
                page: 0,
                limit: 0,
                options: '',
            });
            const cityResponse = await cityApi.getCity({
                page: 0,
                limit: 0,
                options: '',
            });
            dispatch(setFilterCategory(categoryResponse.data));
            dispatch(setFilterCity(cityResponse.data));
        } catch {
            console.log('filter slice error');
        }
        dispatch(setFilterIsFetching(false));
    };

export default filterSlice.reducer;