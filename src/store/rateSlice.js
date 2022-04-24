/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import rateApi from '../api/rateApi';

const initialState = {
    rate: [{
        updatedAt: null,
        createdAt: null,
        price: null,
        rateTypeId: {
            unit: "",
            name: "",
            id: ""
        },
        id: ""
    }, ],
    count: 0,
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
    },
});

export const { setRate, setIsFetching } = rateSlice.actions;

export const getRate =
    ({ page, limit }) =>
    async(dispatch) => {
        dispatch(setIsFetching(true));
        try {
            const response = await rateApi.getRate({
                page,
                limit,
            });
            dispatch(setRate(response.data));
        } catch {
            console.log('getRate slice error');
        }
        dispatch(setIsFetching(false));
    };

export default rateSlice.reducer;