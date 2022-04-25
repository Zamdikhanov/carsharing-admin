/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isFullScreen: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsFullScreen: (state, action) => {
            state.isFullScreen = action.payload;
        },
    },
});

export const { setIsFullScreen } = appSlice.actions;

export const setAppIsFullScreen = (value) => async(dispatch) => {
    dispatch(setIsFullScreen(value));
};

export default appSlice.reducer;