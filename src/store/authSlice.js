/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import authAPI from '../api/authApi';

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
    authError: '',
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
            localStorage.setItem('accessToken', `${action.payload.access_token}`);
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        setAuthError: (state, action) => {
            state.authError = action.payload;
        },
        resetAuthState: (state) => {
            state.data = initialState.data;
            state.user_name = initialState.user_name;
            state.isAuth = initialState.isAuth;
            state.authError = initialState.authError;
            localStorage.removeItem('accessToken');
        },
    },
});

export const { setUserName, setAuthServerResponce, resetAuthState, setIsAuth, setAuthError } =
authSlice.actions;

export const login = (loginData) => async(dispatch) => {
    try {
        const response = await authAPI.login(loginData);
        dispatch(setAuthServerResponce(response.data));
        dispatch(setUserName(loginData.username));
        dispatch(setIsAuth(true));
        dispatch(setAuthError(''));
    } catch { dispatch(setAuthError('Неверный логин или пароль')); };
};

export const registration = (registrationData) => async(dispatch) => {
    try {
        await authAPI.registration(registrationData);
        dispatch(login(registrationData));
    } catch {
        dispatch(setAuthError('Что то пошло не так. Попробуйте позже'));
    }
};

export const logout = (accessToken) => async(dispatch) => {
    try {
        await authAPI.logout(accessToken);
        dispatch(resetAuthState());
    } catch {
        dispatch(setAuthError('Что то пошло не так. Попробуйте позже'));
    }
};

export default authSlice.reducer;