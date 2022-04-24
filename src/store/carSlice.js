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
    count: 0,
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
    },
});

export const { setCar, setIsFetching } = carSlice.actions;

export const getCar =
    ({ page, limit }) =>
    async(dispatch) => {
        dispatch(setIsFetching(true));
        try {
            const response = await carApi.getCar({
                page,
                limit,
            });
            dispatch(setCar(response.data));
        } catch {
            console.log('getOrder slice error');
        }
        dispatch(setIsFetching(false));
    };

export default carSlice.reducer;