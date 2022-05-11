/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isFullScreen: false,
    manualRerender: {},
    responseError: { status: '', message: '' },
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
        setResponseError: (state, action) => {
            state.responseError = action.payload;
        },
    },
});

export const { setIsFullScreen, setManualRerender, setResponseError } =
    appSlice.actions;

export const setAppIsFullScreen = (value) => async (dispatch) => {
    dispatch(setIsFullScreen(value));
};

export default appSlice.reducer;
