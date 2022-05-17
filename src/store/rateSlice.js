/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import entityApi from '../api/entityApi';
import { setResponseError } from './appSlice';

const initialState = {
    rate: [
        {
            updatedAt: null,
            createdAt: null,
            price: null,
            rateTypeId: {
                unit: '',
                name: '',
                id: '',
            },
            id: '',
        },
    ],
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
    setRate,
    setIsFetching,
    setPageNumber,
    setPageLimit,
    setSortOption,
    resetFilters,
} = rateSlice.actions;

export const getRate =
    ({ page, limit, options }) =>
    async (dispatch) => {
        dispatch(setIsFetching(true));
        try {
            const response = await entityApi.getEntity({
                entity: 'rate',
                page,
                limit,
                options,
            });
            dispatch(setRate(response.data));
        } catch {
            dispatch(
                setResponseError({
                    message: 'Список стоимостей тарифов не доступен',
                }),
            );
        }
        dispatch(setIsFetching(false));
    };

export default rateSlice.reducer;
