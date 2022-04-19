/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import orderApi from '../api/orderApi';

const initialState = {
    data: [{
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
    isFetching: false,
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrder: (state, action) => {
            state.data = action.payload;
        },
        setIsFetching: (state, action) => {
            state.isFetching = action.payload;
        },
    },
});

export const { setOrder, setIsFetching } = orderSlice.actions;

export const getOrder =
    ({ offset, limit, accessToken }) =>
    async(dispatch) => {
        try {
            dispatch(setIsFetching(true));
            const response = await orderApi.getOrder({
                offset,
                limit,
                accessToken,
            });
            dispatch(setOrder(response.data));
            dispatch(setIsFetching(false));
        } catch {
            dispatch(setIsFetching(false));
        }
    };

export default orderSlice.reducer;