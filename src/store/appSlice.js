/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isFullScreen: false,
    manualRerender: {},
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsFullScreen: (state, action) => {
            state.isFullScreen = action.payload;
        },
        setManualRerender: (state) => {
            state.manualRerender = {};
        },
    },
});

export const { setIsFullScreen, setManualRerender } = appSlice.actions;

export const setAppIsFullScreen = (value) => async(dispatch) => {
    dispatch(setIsFullScreen(value));
};

export default appSlice.reducer;