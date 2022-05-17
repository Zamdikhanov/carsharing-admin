/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import entityApi from '../api/entityApi';
import { setResponseError } from './appSlice';

const initialState = {
    rateType: [
        {
            unit: '',
            name: '',
            id: '',
        },
    ],
    pageNumber: 0,
    pageLimit: {
        value: 5,
        label: 'по 5 на странице',
    },
    count: 0,
    sortOption: {
        label: 'Без сортировки',
        value: '',
    },
    isFetching: false,
};

export const rateTypeSlice = createSlice({
    name: 'rateType',
    initialState,
    reducers: {
        setRateType: (state, action) => {
            state.rateType = action.payload.data;
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
    setRateType,
    setIsFetching,
    setPageNumber,
    setPageLimit,
    setSortOption,
    resetFilters,
} = rateTypeSlice.actions;

export const getRateType =
    ({ page, limit, options }) =>
    async (dispatch) => {
        dispatch(setIsFetching(true));
        try {
            const response = await entityApi.getEntity({
                entity: 'rateType',
                page,
                limit,
                options,
            });
            dispatch(setRateType(response.data));
        } catch {
            dispatch(
                setResponseError({
                    message: 'Список типов тарифов не доступен',
                }),
            );
        }
        dispatch(setIsFetching(false));
    };

export default rateTypeSlice.reducer;
