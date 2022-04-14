/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import authAPI from '../api/api';

const initialState = {
    token_type: 'bearer',
    access_token: '',
    expires_in: null,
    refresh_token: '',
    user_id: '',
    user_name: 'Admin',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserName: (state, action) => {
            state.user_name = action.payload;
        },
        setAuthServerResponce: (state, action) => {
            state = {...action.payload };
        },
    },
});

export const { setUserName, setAuthServerResponce } = authSlice.actions;

export const login = (loginData) => async(dispatch) => {
    const response = await authAPI.login(loginData);
    dispatch(setAuthServerResponce(response.data));
    dispatch(setUserName(loginData.username));
    console.log('response', response);
};

export default authSlice.reducer;