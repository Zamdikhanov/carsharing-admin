/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import orderApi from '../api/orderApi';

const initialState = {
    orders: [{
        updatedAt: null,
        createdAt: null,
        cityId: null,
        pointId: null,
        carId: {
            priceMax: null,
            priceMin: null,
            name: '',
            number: '',
            tank: null,
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
            colors: [''],
            id: '',
        },
        color: '',
        dateFrom: null,
        dateTo: null,
        rateId: null,
        price: null,
        isFullTank: false,
        isNeedChildChair: false,
        isRightWheel: false,
        orderStatusId: {
            name: '',
            id: '',
        },
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
    isFetching: false,
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrder: (state, action) => {
            state.orders = action.payload.data;
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
    setOrder,
    setIsFetching,
    setPageNumber,
    setPageLimit,
    setSortOption,
} = orderSlice.actions;

export const getOrder =
    ({ page, limit, options, accessToken }) =>
    async(dispatch) => {
        dispatch(setIsFetching(true));
        try {
            const response = await orderApi.getOrder({
                page,
                limit,
                options,
                accessToken,
            });
            dispatch(setOrder(response.data));
        } catch {
            console.log('getOrder slice error');
        }
        dispatch(setIsFetching(false));
    };

export default orderSlice.reducer;