/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import pointApi from '../api/pointApi';

const initialState = {
    points: [{
        name: "",
        cityId: {
            name: "",
            id: ""
        },
        address: "",
        id: ""
    }, ],
    count: 0,
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
    },
});

export const { setPoint, setIsFetching } = pointSlice.actions;

export const getPoint =
    ({ page, limit }) =>
    async(dispatch) => {
        dispatch(setIsFetching(true));
        try {
            const response = await pointApi.getPoint({
                page,
                limit,
            });
            dispatch(setPoint(response.data));
        } catch {
            console.log('getPoint slice error');
        }
        dispatch(setIsFetching(false));
    };

export default pointSlice.reducer;