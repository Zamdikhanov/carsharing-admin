/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import rateTypeApi from '../api/rateTypeApi';

const initialState = {
    rateType: [{
        unit: "",
        name: "",
        id: ""
    }, ],
    count: 0,
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
    },
});

export const { setRateType, setIsFetching } = rateTypeSlice.actions;

export const getRateType =
    ({ page, limit }) =>
    async(dispatch) => {
        dispatch(setIsFetching(true));
        try {
            const response = await rateTypeApi.getRateType({
                page,
                limit,
            });
            dispatch(setRateType(response.data));
        } catch {
            console.log('getRateType slice error');
        }
        dispatch(setIsFetching(false));
    };

export default rateTypeSlice.reducer;