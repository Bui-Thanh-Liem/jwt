import { createAsyncThunk } from "@reduxjs/toolkit";

import { deleteUserAPI, fetchAllUsersAPI } from "../../apis";

// createAsyncThunk không bắt lỗi tự tạo chỉ rejected khi có lỗi thật của code
// createAsyncThunk không cần thiết đặt trong try...catch (vì khi có lỗi createAsyncThunk sẽ trả xuống rejected)

export const fetchAllUsers = createAsyncThunk(
    "users/fetchAllUsers",
    async (token) => {
        const users = await fetchAllUsersAPI(token);
        return users;
    }
);

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async ({ id, token, dispatch}, { rejectWithValue }) => {
        try {
            const listUserNew = await deleteUserAPI(id, token, dispatch);
            return listUserNew;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
