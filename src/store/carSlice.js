/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import carApi from '../api/carApi';

const initialState = {
    cars: [{
        updatedAt: null,
        createdAt: null,
        priceMax: null,
        priceMin: null,
        name: '',
        thumbnail: {
            path: null,
            mimetype: '',
            originalname: '',
            size: null,
        },
        description: '',
        categoryId: {
            name: '',
            description: '',
            id: '',
        },
        number: '',
        tank: null,
        colors: [],
        id: '',
    }, ],
    pageNumber: 0,
    pageLimit: {
        label: 'по 3 на странице',
        value: 3,
    },
    count: 0,
    sortOption: {
        label: 'Без сортировки',
        value: '',
    },
    categoryOption: {
        label: 'Все категории',
        value: '',
    },
    isFetching: false,
};

export const carSlice = createSlice({
    name: 'car',
    initialState,
    reducers: {
        setCar: (state, action) => {
            state.cars = action.payload.data;
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
        setСategoryOption: (state, action) => {
            state.categoryOption = action.payload;
        },
    },
});

export const {
    setCar,
    setIsFetching,
    setPageNumber,
    setPageLimit,
    setSortOption,
    setСategoryOption,
} = carSlice.actions;

export const getCar =
    ({ page, limit, options }) =>
    async(dispatch) => {
        dispatch(setIsFetching(true));
        try {
            const response = await carApi.getCar({
                page,
                limit,
                options,
            });
            dispatch(setCar(response.data));
        } catch {
            console.log('getOrder slice error');
        }
        dispatch(setIsFetching(false));
    };

export default carSlice.reducer;