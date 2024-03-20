import { createReducer, createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    intialState: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    reducer: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
        },
    }
})

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;