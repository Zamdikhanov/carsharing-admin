/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import cityApi from '../api/cityApi';

const initialState = {
    cities: [{
        updatedAt: null,
        createdAt: null,
        name: '',
        id: '',
    }, ],
    count: 0,
    isFetching: false,
};

export const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        setCity: (state, action) => {
            state.cities = action.payload.data;
            state.count = action.payload.count;
        },
        setIsFetching: (state, action) => {
            state.isFetching = action.payload;
        },
    },
});

export const { setCity, setIsFetching } = citySlice.actions;

export const getCity =
    ({ page, limit }) =>
    async(dispatch) => {
        dispatch(setIsFetching(true));
        try {
            const response = await cityApi.getCity({
                page,
                limit,
            });
            dispatch(setCity(response.data));
        } catch {
            console.log('getCity slice error');
        }
        dispatch(setIsFetching(false));
    };

export default citySlice.reducer;