import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerAPI, loginAPI, logoutAPI } from "../../apis";

export const registerThunk = createAsyncThunk(
    "auth/registerThunk",
    async ({ user, navigate }) => {
        const userRegistered = await registerAPI(user);
        if (!(userRegistered.status === 200) || !userRegistered.status)
            navigate("/login");
        return userRegistered;
    }
);

export const loginThunk = createAsyncThunk(
    "auth/loginThunk",
    async ({ userDataForm, navigate }) => {
        const newUser = await loginAPI(userDataForm);
        navigate("/");
        return newUser;
    }
);

export const logoutThunk = createAsyncThunk(
    "auth/logout",
    async ({ token, dispatch, navigate }) => {
        const result = await logoutAPI(token, dispatch);
        navigate('/login');
        return result;
    }
);
