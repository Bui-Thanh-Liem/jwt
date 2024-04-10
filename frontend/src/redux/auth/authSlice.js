import { createSlice } from "@reduxjs/toolkit";

import { registerThunk, loginThunk, logoutThunk } from "./authThunk.js";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        register: {
            hihi: true,
            isPending: false,
            userRegistered: {},
        },
        login: {
            isPending: false,
            currentUser: null,
        }
    },
    reducers: {
        refreshToken_login: (state, action) => {
            state.login.currentUser = {
                ...state.login.currentUser,
                accessToken: action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        // Register
        builder.addCase(registerThunk.pending, (state) => {
            state.register.isPending = true;
        });
        builder.addCase(registerThunk.fulfilled, (state, action) => {
            state.register.isPending = false;
            state.register.userRegistered = { ...action.payload };
        });
        builder.addCase(registerThunk.rejected, (state) => {
            state.register.isPending = false;
        });

        // Login
        builder.addCase(loginThunk.pending, (state) => {
            state.login.isPending = true;
        });
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            state.login.isPending = false;
            state.login.currentUser = action.payload;
        });
        builder.addCase(loginThunk.rejected, (state) => {
            state.login.isPending = true;
        });

        // Logout
        builder.addCase(logoutThunk.pending, () => {
        });
        builder.addCase(logoutThunk.fulfilled, (state) => {
            state.register.userRegistered = {};
            state.login.currentUser = null;
        });
        builder.addCase(logoutThunk.rejected, () => {
        });
    },
});

export const { refreshToken_login } = authSlice.actions;
export default authSlice.reducer;
