/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import authAPI from '../api/api';

const initialState = {
    data: {
        token_type: 'bearer',
        access_token: '',
        expires_in: null,
        refresh_token: '',
        user_id: '',
    },
    user_name: 'Admin',
    isAuth: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserName: (state, action) => {
            state.user_name = action.payload;
        },
        setAuthServerResponce: (state, action) => {
            state.data = action.payload;
        },
        resetAuthState: (state) => {
            state.data = initialState.data;
            state.user_name = initialState.user_name;
            state.isAuth = initialState.isAuth;
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        }
    },
});

export const { setUserName, setAuthServerResponce, resetAuthState, setIsAuth } =
authSlice.actions;

export const login = (loginData) => async(dispatch) => {
    const response = await authAPI.login(loginData);
    if (response && response.status === 200) {
        dispatch(setAuthServerResponce(response.data));
        dispatch(setUserName(loginData.username));
        dispatch(setIsAuth(true));
    }
};

export const registration = (registrationData) => async(dispatch) => {
    const response = await authAPI.registration(registrationData);
    if (response && response.status === 200) {
        dispatch(login(registrationData));
    }
};

export const logout = (accessToken) => async(dispatch) => {
    await authAPI.logout(accessToken);
    dispatch(resetAuthState());
};

export default authSlice.reducer;