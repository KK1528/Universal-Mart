import {createSlice} from '@reduxjs/toolkit'
import { removeUserFromLocalStorage } from '../localstorage';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
            // save to local storage 
            state.isFetching = false;
        },
        loginError: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },
        logout: (state) => {
            removeUserFromLocalStorage();
            state.currentUser = null;
        },
    },
})

export const { loginStart, loginSuccess, loginError, logout } = userSlice.actions;
export default userSlice.reducer;