/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import pointApi from '../api/pointApi';

const initialState = {
    points: [{
        name: '',
        cityId: {
            name: '',
            id: '',
        },
        address: '',
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

export const pointSlice = createSlice({
    name: 'point',
    initialState,
    reducers: {
        setPoint: (state, action) => {
            state.points = action.payload.data;
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
    setPoint,
    setIsFetching,
    setPageNumber,
    setPageLimit,
    setSortOption,
} = pointSlice.actions;

export const getPoint =
    ({ page, limit, options }) =>
    async(dispatch) => {
        dispatch(setIsFetching(true));
        try {
            const response = await pointApi.getPoint({
                page,
                limit,
                options,
            });
            dispatch(setPoint(response.data));
        } catch {
            console.log('getPoint slice error');
        }
        dispatch(setIsFetching(false));
    };

export default pointSlice.reducer;